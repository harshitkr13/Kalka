import { Request, Response, NextFunction } from 'express';
import { Industry } from '../../models/Industry';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';

export async function getIndustries(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { featured, limit = 50, page = 1 } = req.query as {
      featured?: string;
      limit?: number;
      page?: number;
    };

    const filter: Record<string, unknown> = { status: 'published' };
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }

    const skip = (page - 1) * limit;
    const [industries, total] = await Promise.all([
      Industry.find(filter).sort({ displayOrder: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
      Industry.countDocuments(filter),
    ]);

    sendSuccess(res, industries, 'Industries retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getIndustryBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.params;
    const industry = await Industry.findOne({ slug: slug.toLowerCase(), status: 'published' }).lean();

    if (!industry) {
      throw AppError.notFound(`Industry not found with slug '${slug}'`);
    }

    sendSuccess(res, industry, 'Industry retrieved successfully');
  } catch (error) {
    next(error);
  }
}
