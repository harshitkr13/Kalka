import { Request, Response, NextFunction } from 'express';
import { News } from '../../models/News';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';

export async function getNews(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { featured, category, limit = 20, page = 1 } = req.query as {
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
    const [newsItems, total] = await Promise.all([
      News.find(filter).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
      News.countDocuments(filter),
    ]);

    sendSuccess(res, newsItems, 'News items retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getNewsBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.params;
    const news = await News.findOne({ slug: slug.toLowerCase(), status: 'published' }).lean();

    if (!news) {
      throw AppError.notFound(`News item not found with slug '${slug}'`);
    }

    sendSuccess(res, news, 'News item retrieved successfully');
  } catch (error) {
    next(error);
  }
}
