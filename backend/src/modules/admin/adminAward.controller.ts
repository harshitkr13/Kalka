import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Award } from '../../models/Award';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { hasPermission } from '../auth/permissions';
import {
  paginationQuerySchema,
  createAwardSchema,
  updateAwardSchema,
} from './admin.validation';

export async function listAwards(req: Request, res: Response, next: NextFunction): Promise<void> {
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
        { organization: searchRegex },
        { category: searchRegex },
        { description: searchRegex },
      ];
    }

    const skip = (query.page - 1) * query.limit;
    const sortField = query.sort || 'year';
    const sortOrder = query.order === 'asc' ? 1 : -1;

    const [items, total] = await Promise.all([
      Award.find(filter)
        .sort({ [sortField]: sortOrder, displayOrder: 1 })
        .skip(skip)
        .limit(query.limit)
        .lean(),
      Award.countDocuments(filter),
    ]);

    sendSuccess(res, items, 'Awards retrieved successfully', 200, {
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getAwardById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid award ID format', 400, 'INVALID_IDENTIFIER');
    }

    const item = await Award.findById(id).lean();
    if (!item) {
      throw AppError.notFound(`Award not found with ID '${id}'`);
    }

    sendSuccess(res, item, 'Award retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function createAward(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = createAwardSchema.parse(req.body);

    if (body.status === 'published' && req.user) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Publishing content requires content:publish permission. Save as draft instead.');
      }
    }

    const item = await Award.create(body);
    sendSuccess(res, item, 'Award created successfully', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateAward(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid award ID format', 400, 'INVALID_IDENTIFIER');
    }

    const body = updateAwardSchema.parse(req.body);
    const item = await Award.findById(id);
    if (!item) {
      throw AppError.notFound(`Award not found with ID '${id}'`);
    }

    if (req.user && (body.status === 'published' || item.status === 'published')) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Modifying or publishing published content requires content:publish permission');
      }
    }

    Object.assign(item, body);
    await item.save();

    sendSuccess(res, item, 'Award updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteAward(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid award ID format', 400, 'INVALID_IDENTIFIER');
    }

    const item = await Award.findByIdAndDelete(id);
    if (!item) {
      throw AppError.notFound(`Award not found with ID '${id}'`);
    }

    sendSuccess(res, { deleted: true, id }, 'Award deleted successfully');
  } catch (error) {
    next(error);
  }
}
