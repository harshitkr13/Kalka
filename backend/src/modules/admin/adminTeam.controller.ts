import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { TeamMember } from '../../models/TeamMember';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { hasPermission } from '../auth/permissions';
import {
  paginationQuerySchema,
  createTeamMemberSchema,
  updateTeamMemberSchema,
} from './admin.validation';

export async function listTeamMembers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = paginationQuerySchema.parse(req.query);
    const filter: Record<string, unknown> = {};

    if (query.status && query.status !== 'all') {
      filter.status = query.status;
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search.trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { slug: searchRegex },
        { designation: searchRegex },
        { bio: searchRegex },
      ];
    }

    const skip = (query.page - 1) * query.limit;
    const sortField = query.sort || 'displayOrder';
    const sortOrder = query.order === 'asc' ? 1 : -1;

    const [members, total] = await Promise.all([
      TeamMember.find(filter)
        .sort({ [sortField]: sortOrder, createdAt: -1 })
        .skip(skip)
        .limit(query.limit)
        .lean(),
      TeamMember.countDocuments(filter),
    ]);

    sendSuccess(res, members, 'Team members retrieved successfully', 200, {
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getTeamMemberById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid team member ID format', 400, 'INVALID_IDENTIFIER');
    }

    const member = await TeamMember.findById(id).lean();
    if (!member) {
      throw AppError.notFound(`Team member not found with ID '${id}'`);
    }

    sendSuccess(res, member, 'Team member retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function createTeamMember(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = createTeamMemberSchema.parse(req.body);

    if (body.status === 'published' && req.user) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Publishing content requires content:publish permission. Save as draft instead.');
      }
    }

    const existing = await TeamMember.findOne({ slug: body.slug.toLowerCase() });
    if (existing) {
      throw new AppError(`A team member with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
    }

    const newMember = await TeamMember.create({
      ...body,
      slug: body.slug.toLowerCase(),
    });

    sendSuccess(res, newMember, 'Team member created successfully', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateTeamMember(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid team member ID format', 400, 'INVALID_IDENTIFIER');
    }

    const body = updateTeamMemberSchema.parse(req.body);
    const member = await TeamMember.findById(id);
    if (!member) {
      throw AppError.notFound(`Team member not found with ID '${id}'`);
    }

    if (req.user && (body.status === 'published' || member.status === 'published')) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Modifying or publishing published content requires content:publish permission');
      }
    }

    if (body.slug && body.slug.toLowerCase() !== member.slug) {
      const slugExists = await TeamMember.findOne({ slug: body.slug.toLowerCase(), _id: { $ne: id } });
      if (slugExists) {
        throw new AppError(`A team member with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
      }
      member.slug = body.slug.toLowerCase();
    }

    Object.assign(member, body);
    await member.save();

    sendSuccess(res, member, 'Team member updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteTeamMember(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid team member ID format', 400, 'INVALID_IDENTIFIER');
    }

    const member = await TeamMember.findByIdAndDelete(id);
    if (!member) {
      throw AppError.notFound(`Team member not found with ID '${id}'`);
    }

    sendSuccess(res, { deleted: true, id }, 'Team member deleted successfully');
  } catch (error) {
    next(error);
  }
}
