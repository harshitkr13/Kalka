import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Career } from '../../models/Career';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { hasPermission } from '../auth/permissions';
import {
  paginationQuerySchema,
  createCareerSchema,
  updateCareerSchema,
} from './admin.validation';

export async function listCareers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = paginationQuerySchema.parse(req.query);
    const filter: Record<string, unknown> = {};

    if (query.status && query.status !== 'all') {
      filter.status = query.status;
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search.trim(), 'i');
      filter.$or = [
        { title: searchRegex },
        { slug: searchRegex },
        { department: searchRegex },
        { location: searchRegex },
        { description: searchRegex },
      ];
    }

    const skip = (query.page - 1) * query.limit;
    const sortField = query.sort || 'createdAt';
    const sortOrder = query.order === 'asc' ? 1 : -1;

    const [careers, total] = await Promise.all([
      Career.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(query.limit)
        .lean(),
      Career.countDocuments(filter),
    ]);

    sendSuccess(res, careers, 'Careers retrieved successfully', 200, {
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getCareerById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid career ID format', 400, 'INVALID_IDENTIFIER');
    }

    const career = await Career.findById(id).lean();
    if (!career) {
      throw AppError.notFound(`Career opening not found with ID '${id}'`);
    }

    sendSuccess(res, career, 'Career retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function createCareer(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = createCareerSchema.parse(req.body);

    if (req.user && !hasPermission(req.user.role, 'careers:manage')) {
      throw AppError.forbidden('Managing career postings requires careers:manage permission');
    }

    const existing = await Career.findOne({ slug: body.slug.toLowerCase() });
    if (existing) {
      throw new AppError(`A career with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
    }

    const newCareer = await Career.create({
      ...body,
      slug: body.slug.toLowerCase(),
    });

    sendSuccess(res, newCareer, 'Career created successfully', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateCareer(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid career ID format', 400, 'INVALID_IDENTIFIER');
    }

    const body = updateCareerSchema.parse(req.body);

    if (req.user && !hasPermission(req.user.role, 'careers:manage')) {
      throw AppError.forbidden('Managing career postings requires careers:manage permission');
    }

    const career = await Career.findById(id);
    if (!career) {
      throw AppError.notFound(`Career opening not found with ID '${id}'`);
    }

    if (body.slug && body.slug.toLowerCase() !== career.slug) {
      const slugExists = await Career.findOne({ slug: body.slug.toLowerCase(), _id: { $ne: id } });
      if (slugExists) {
        throw new AppError(`A career with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
      }
      career.slug = body.slug.toLowerCase();
    }

    Object.assign(career, body);
    await career.save();

    sendSuccess(res, career, 'Career updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteCareer(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid career ID format', 400, 'INVALID_IDENTIFIER');
    }

    if (req.user && !hasPermission(req.user.role, 'careers:manage')) {
      throw AppError.forbidden('Deleting career postings requires careers:manage permission');
    }

    const career = await Career.findByIdAndDelete(id);
    if (!career) {
      throw AppError.notFound(`Career opening not found with ID '${id}'`);
    }

    sendSuccess(res, { deleted: true, id }, 'Career deleted successfully');
  } catch (error) {
    next(error);
  }
}
