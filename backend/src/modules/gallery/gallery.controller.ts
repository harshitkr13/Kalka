import { Request, Response, NextFunction } from 'express';
import { Gallery } from '../../models/Gallery';
import { sendSuccess } from '../../utils/apiResponse';

export async function getGallery(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { featured, category, limit = 50, page = 1 } = req.query as {
      featured?: string;
      category?: string;
      limit?: number;
      page?: number;
    };

    const filter: Record<string, unknown> = { status: 'published' };
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    if (category) {
      filter.category = { $regex: new RegExp(category, 'i') };
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Gallery.find(filter).sort({ displayOrder: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
      Gallery.countDocuments(filter),
    ]);

    sendSuccess(res, items, 'Gallery items retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
}
