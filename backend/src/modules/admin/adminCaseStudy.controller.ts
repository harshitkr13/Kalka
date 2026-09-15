import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { CaseStudy } from '../../models/CaseStudy';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { hasPermission } from '../auth/permissions';
import { paginationQuerySchema, createCaseStudySchema, updateCaseStudySchema } from './admin.validation';

export async function listCaseStudies(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = paginationQuerySchema.parse(req.query);
    const filter: Record<string, unknown> = {};

    if (query.status && query.status !== 'all') {
      filter.status = query.status;
    }

    if (query.industry) {
      filter.industry = query.industry;
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search.trim(), 'i');
      filter.$or = [
        { title: searchRegex },
        { slug: searchRegex },
        { clientName: searchRegex },
        { summary: searchRegex },
      ];
    }

    const skip = (query.page - 1) * query.limit;
    const sortField = query.sort || 'createdAt';
    const sortOrder = query.order === 'asc' ? 1 : -1;

    const [caseStudies, total] = await Promise.all([
      CaseStudy.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(query.limit)
        .lean(),
      CaseStudy.countDocuments(filter),
    ]);

    sendSuccess(res, caseStudies, 'Case studies retrieved successfully', 200, {
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getCaseStudyById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid case study ID format', 400, 'INVALID_IDENTIFIER');
    }

    const caseStudy = await CaseStudy.findById(id).lean();
    if (!caseStudy) {
      throw AppError.notFound(`Case study not found with ID '${id}'`);
    }

    sendSuccess(res, caseStudy, 'Case study retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function createCaseStudy(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = createCaseStudySchema.parse(req.body);

    if (body.status === 'published' && req.user) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Publishing content requires content:publish permission. Save as draft instead.');
      }
    }

    const existing = await CaseStudy.findOne({ slug: body.slug.toLowerCase() });
    if (existing) {
      throw new AppError(`A case study with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
    }

    const newCaseStudy = await CaseStudy.create({
      ...body,
      slug: body.slug.toLowerCase(),
    });

    sendSuccess(res, newCaseStudy, 'Case study created successfully', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateCaseStudy(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid case study ID format', 400, 'INVALID_IDENTIFIER');
    }

    const body = updateCaseStudySchema.parse(req.body);
    const caseStudy = await CaseStudy.findById(id);
    if (!caseStudy) {
      throw AppError.notFound(`Case study not found with ID '${id}'`);
    }

    if (req.user && (body.status === 'published' || caseStudy.status === 'published')) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Modifying or publishing published content requires content:publish permission');
      }
    }

    if (body.slug && body.slug.toLowerCase() !== caseStudy.slug) {
      const slugExists = await CaseStudy.findOne({ slug: body.slug.toLowerCase(), _id: { $ne: id } });
      if (slugExists) {
        throw new AppError(`A case study with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
      }
      caseStudy.slug = body.slug.toLowerCase();
    }

    Object.assign(caseStudy, body);
    await caseStudy.save();

    sendSuccess(res, caseStudy, 'Case study updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteCaseStudy(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid case study ID format', 400, 'INVALID_IDENTIFIER');
    }

    const caseStudy = await CaseStudy.findByIdAndDelete(id);
    if (!caseStudy) {
      throw AppError.notFound(`Case study not found with ID '${id}'`);
    }

    sendSuccess(res, { deleted: true, id }, 'Case study deleted successfully');
  } catch (error) {
    next(error);
  }
}
