import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { MediaMention } from '../../models/MediaMention';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { hasPermission } from '../auth/permissions';
import {
  paginationQuerySchema,
  createMediaMentionSchema,
  updateMediaMentionSchema,
} from './admin.validation';

export async function listMediaMentions(req: Request, res: Response, next: NextFunction): Promise<void> {
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
        { publication: searchRegex },
        { excerpt: searchRegex },
      ];
    }

    const skip = (query.page - 1) * query.limit;
    const sortField = query.sort || 'createdAt';
    const sortOrder = query.order === 'asc' ? 1 : -1;

    const [items, total] = await Promise.all([
      MediaMention.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(query.limit)
        .lean(),
      MediaMention.countDocuments(filter),
    ]);

    sendSuccess(res, items, 'Media mentions retrieved successfully', 200, {
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getMediaMentionById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid media mention ID format', 400, 'INVALID_IDENTIFIER');
    }

    const item = await MediaMention.findById(id).lean();
    if (!item) {
      throw AppError.notFound(`Media mention not found with ID '${id}'`);
    }

    sendSuccess(res, item, 'Media mention retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function createMediaMention(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = createMediaMentionSchema.parse(req.body);

    if (body.status === 'published' && req.user) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Publishing content requires content:publish permission. Save as draft instead.');
      }
    }

    const item = await MediaMention.create(body);
    sendSuccess(res, item, 'Media mention created successfully', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateMediaMention(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid media mention ID format', 400, 'INVALID_IDENTIFIER');
    }

    const body = updateMediaMentionSchema.parse(req.body);
    const item = await MediaMention.findById(id);
    if (!item) {
      throw AppError.notFound(`Media mention not found with ID '${id}'`);
    }

    if (req.user && (body.status === 'published' || item.status === 'published')) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Modifying or publishing published content requires content:publish permission');
      }
    }

    Object.assign(item, body);
    await item.save();

    sendSuccess(res, item, 'Media mention updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteMediaMention(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid media mention ID format', 400, 'INVALID_IDENTIFIER');
    }

    const item = await MediaMention.findByIdAndDelete(id);
    if (!item) {
      throw AppError.notFound(`Media mention not found with ID '${id}'`);
    }

    sendSuccess(res, { deleted: true, id }, 'Media mention deleted successfully');
  } catch (error) {
    next(error);
  }
}
