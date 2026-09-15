import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Gallery } from '../../models/Gallery';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { hasPermission } from '../auth/permissions';
import {
  paginationQuerySchema,
  createGallerySchema,
  updateGallerySchema,
} from './admin.validation';

export async function listGalleryItems(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = paginationQuerySchema.parse(req.query);
    const filter: Record<string, unknown> = {};

    if (query.status && query.status !== 'all') {
      filter.status = query.status;
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search.trim(), 'i');
      filter.$or = [
        { title: searchRegex },
        { caption: searchRegex },
        { category: searchRegex },
        { filename: searchRegex },
      ];
    }

    const skip = (query.page - 1) * query.limit;
    const sortField = query.sort || 'createdAt';
    const sortOrder = query.order === 'asc' ? 1 : -1;

    const [items, total] = await Promise.all([
      Gallery.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(query.limit)
        .lean(),
      Gallery.countDocuments(filter),
    ]);

    sendSuccess(res, items, 'Gallery items retrieved successfully', 200, {
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getGalleryItemById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid gallery item ID format', 400, 'INVALID_IDENTIFIER');
    }

    const item = await Gallery.findById(id).lean();
    if (!item) {
      throw AppError.notFound(`Gallery item not found with ID '${id}'`);
    }

    sendSuccess(res, item, 'Gallery item retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function createGalleryItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = createGallerySchema.parse(req.body);

    if (body.status === 'published' && req.user) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Publishing content requires content:publish permission. Save as draft instead.');
      }
    }

    const item = await Gallery.create(body);
    sendSuccess(res, item, 'Gallery item created successfully', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateGalleryItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid gallery item ID format', 400, 'INVALID_IDENTIFIER');
    }

    const body = updateGallerySchema.parse(req.body);
    const item = await Gallery.findById(id);
    if (!item) {
      throw AppError.notFound(`Gallery item not found with ID '${id}'`);
    }

    if (req.user && (body.status === 'published' || item.status === 'published')) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Modifying or publishing published content requires content:publish permission');
      }
    }

    Object.assign(item, body);
    await item.save();

    sendSuccess(res, item, 'Gallery item updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteGalleryItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid gallery item ID format', 400, 'INVALID_IDENTIFIER');
    }

    const item = await Gallery.findByIdAndDelete(id);
    if (!item) {
      throw AppError.notFound(`Gallery item not found with ID '${id}'`);
    }

    sendSuccess(res, { deleted: true, id }, 'Gallery item deleted successfully');
  } catch (error) {
    next(error);
  }
}
