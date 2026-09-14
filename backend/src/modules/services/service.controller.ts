import { Request, Response, NextFunction } from 'express';
import { Service } from '../../models/Service';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';

export async function getServices(req: Request, res: Response, next: NextFunction): Promise<void> {
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
    const [services, total] = await Promise.all([
      Service.find(filter).sort({ displayOrder: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
      Service.countDocuments(filter),
    ]);

    sendSuccess(res, services, 'Services retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getServiceBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.params;
    const service = await Service.findOne({ slug: slug.toLowerCase(), status: 'published' }).lean();

    if (!service) {
      throw AppError.notFound(`Service not found with slug '${slug}'`);
    }

    sendSuccess(res, service, 'Service retrieved successfully');
  } catch (error) {
    next(error);
  }
}
