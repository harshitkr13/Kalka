import { Request, Response, NextFunction } from 'express';
import { CaseStudy } from '../../models/CaseStudy';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';

export async function getCaseStudies(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { featured, industry, limit = 50, page = 1 } = req.query as {
      featured?: string;
      industry?: string;
      limit?: number;
      page?: number;
    };

    const filter: Record<string, unknown> = { status: 'published' };
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    if (industry) {
      filter.industry = { $regex: new RegExp(industry, 'i') };
    }

    const skip = (page - 1) * limit;
    const [caseStudies, total] = await Promise.all([
      CaseStudy.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      CaseStudy.countDocuments(filter),
    ]);

    sendSuccess(res, caseStudies, 'Case studies retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getCaseStudyBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.params;
    const caseStudy = await CaseStudy.findOne({ slug: slug.toLowerCase(), status: 'published' }).lean();

    if (!caseStudy) {
      throw AppError.notFound(`Case study not found with slug '${slug}'`);
    }

    sendSuccess(res, caseStudy, 'Case study retrieved successfully');
  } catch (error) {
    next(error);
  }
}
