import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Industry } from '../../models/Industry';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { hasPermission } from '../auth/permissions';
import { paginationQuerySchema, createIndustrySchema, updateIndustrySchema } from './admin.validation';

export async function listIndustries(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = paginationQuerySchema.parse(req.query);
    const filter: Record<string, unknown> = {};

    if (query.status && query.status !== 'all') {
      filter.status = query.status;
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search.trim(), 'i');
      filter.$or = [{ name: searchRegex }, { slug: searchRegex }, { description: searchRegex }];
    }

    const skip = (query.page - 1) * query.limit;
    const sortField = query.sort || 'createdAt';
    const sortOrder = query.order === 'asc' ? 1 : -1;

    const [industries, total] = await Promise.all([
      Industry.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(query.limit)
        .lean(),
      Industry.countDocuments(filter),
    ]);

    sendSuccess(res, industries, 'Industries retrieved successfully', 200, {
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getIndustryById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid industry ID format', 400, 'INVALID_IDENTIFIER');
    }

    const industry = await Industry.findById(id).lean();
    if (!industry) {
      throw AppError.notFound(`Industry not found with ID '${id}'`);
    }

    sendSuccess(res, industry, 'Industry retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function createIndustry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = createIndustrySchema.parse(req.body);

    if (body.status === 'published' && req.user) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Publishing content requires content:publish permission. Save as draft instead.');
      }
    }

    const existing = await Industry.findOne({ slug: body.slug.toLowerCase() });
    if (existing) {
      throw new AppError(`An industry with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
    }

    const newIndustry = await Industry.create({
      ...body,
      slug: body.slug.toLowerCase(),
    });

    sendSuccess(res, newIndustry, 'Industry created successfully', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateIndustry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid industry ID format', 400, 'INVALID_IDENTIFIER');
    }

    const body = updateIndustrySchema.parse(req.body);
    const industry = await Industry.findById(id);
    if (!industry) {
      throw AppError.notFound(`Industry not found with ID '${id}'`);
    }

    if (req.user && (body.status === 'published' || industry.status === 'published')) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Modifying or publishing published content requires content:publish permission');
      }
    }

    if (body.slug && body.slug.toLowerCase() !== industry.slug) {
      const slugExists = await Industry.findOne({ slug: body.slug.toLowerCase(), _id: { $ne: id } });
      if (slugExists) {
        throw new AppError(`An industry with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
      }
      industry.slug = body.slug.toLowerCase();
    }

    Object.assign(industry, body);
    await industry.save();

    sendSuccess(res, industry, 'Industry updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteIndustry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid industry ID format', 400, 'INVALID_IDENTIFIER');
    }

    const industry = await Industry.findByIdAndDelete(id);
    if (!industry) {
      throw AppError.notFound(`Industry not found with ID '${id}'`);
    }

    sendSuccess(res, { deleted: true, id }, 'Industry deleted successfully');
  } catch (error) {
    next(error);
  }
}
