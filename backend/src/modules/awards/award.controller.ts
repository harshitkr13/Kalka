import { Request, Response, NextFunction } from 'express';
import { Award } from '../../models/Award';
import { sendSuccess } from '../../utils/apiResponse';

export async function getAwards(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { featured, year, limit = 50, page = 1 } = req.query as {
      featured?: string;
      year?: number;
      limit?: number;
      page?: number;
    };

    const filter: Record<string, unknown> = { status: 'published' };
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    if (year) {
      filter.year = year;
    }

    const skip = (page - 1) * limit;
    const [awards, total] = await Promise.all([
      Award.find(filter).sort({ year: -1, displayOrder: 1 }).skip(skip).limit(limit).lean(),
      Award.countDocuments(filter),
    ]);

    sendSuccess(res, awards, 'Awards retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
}
