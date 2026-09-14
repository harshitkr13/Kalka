import { Request, Response, NextFunction } from 'express';
import { Career } from '../../models/Career';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';

export async function getCareers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { department, limit = 50, page = 1 } = req.query as {
      department?: string;
      limit?: number;
      page?: number;
    };

    const filter: Record<string, unknown> = { status: 'published', active: true };
    if (department) {
      filter.department = { $regex: new RegExp(department, 'i') };
    }

    const skip = (page - 1) * limit;
    const [careers, total] = await Promise.all([
      Career.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Career.countDocuments(filter),
    ]);

    sendSuccess(res, careers, 'Careers retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getCareerBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.params;
    const career = await Career.findOne({ slug: slug.toLowerCase(), status: 'published', active: true }).lean();

    if (!career) {
      throw AppError.notFound(`Career posting not found with slug '${slug}'`);
    }

    sendSuccess(res, career, 'Career posting retrieved successfully');
  } catch (error) {
    next(error);
  }
}
