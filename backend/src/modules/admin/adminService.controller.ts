import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Service } from '../../models/Service';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { hasPermission } from '../auth/permissions';
import { paginationQuerySchema, createServiceSchema, updateServiceSchema } from './admin.validation';

export async function listServices(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = paginationQuerySchema.parse(req.query);
    const filter: Record<string, unknown> = {};

    if (query.status && query.status !== 'all') {
      filter.status = query.status;
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search.trim(), 'i');
      filter.$or = [{ name: searchRegex }, { slug: searchRegex }, { shortDescription: searchRegex }];
    }

    const skip = (query.page - 1) * query.limit;
    const sortField = query.sort || 'createdAt';
    const sortOrder = query.order === 'asc' ? 1 : -1;

    const [services, total] = await Promise.all([
      Service.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(query.limit)
        .lean(),
      Service.countDocuments(filter),
    ]);

    sendSuccess(res, services, 'Services retrieved successfully', 200, {
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getServiceById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid service ID format', 400, 'INVALID_IDENTIFIER');
    }

    const service = await Service.findById(id).lean();
    if (!service) {
      throw AppError.notFound(`Service not found with ID '${id}'`);
    }

    sendSuccess(res, service, 'Service retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function createService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = createServiceSchema.parse(req.body);

    // Permission check for publishing
    if (body.status === 'published' && req.user) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Publishing content requires content:publish permission. Save as draft instead.');
      }
    }

    // Slug uniqueness check
    const existing = await Service.findOne({ slug: body.slug.toLowerCase() });
    if (existing) {
      throw new AppError(`A service with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
    }

    const newService = await Service.create({
      ...body,
      slug: body.slug.toLowerCase(),
    });

    sendSuccess(res, newService, 'Service created successfully', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid service ID format', 400, 'INVALID_IDENTIFIER');
    }

    const body = updateServiceSchema.parse(req.body);
    const service = await Service.findById(id);
    if (!service) {
      throw AppError.notFound(`Service not found with ID '${id}'`);
    }

    // Permission check if updating status to published or modifying a published service
    if (req.user && (body.status === 'published' || service.status === 'published')) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Modifying or publishing published content requires content:publish permission');
      }
    }

    // Check slug collision
    if (body.slug && body.slug.toLowerCase() !== service.slug) {
      const slugExists = await Service.findOne({ slug: body.slug.toLowerCase(), _id: { $ne: id } });
      if (slugExists) {
        throw new AppError(`A service with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
      }
      service.slug = body.slug.toLowerCase();
    }

    Object.assign(service, body);
    await service.save();

    sendSuccess(res, service, 'Service updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid service ID format', 400, 'INVALID_IDENTIFIER');
    }

    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      throw AppError.notFound(`Service not found with ID '${id}'`);
    }

    sendSuccess(res, { deleted: true, id }, 'Service deleted successfully');
  } catch (error) {
    next(error);
  }
}
