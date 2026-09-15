import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Blog } from '../../models/Blog';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { hasPermission } from '../auth/permissions';
import { paginationQuerySchema, createBlogSchema, updateBlogSchema } from './admin.validation';

export async function listBlogs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = paginationQuerySchema.parse(req.query);
    const filter: Record<string, unknown> = {};

    if (query.status && query.status !== 'all') {
      filter.status = query.status;
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search.trim(), 'i');
      filter.$or = [
        { title: searchRegex },
        { slug: searchRegex },
        { excerpt: searchRegex },
        { 'author.name': searchRegex },
      ];
    }

    const skip = (query.page - 1) * query.limit;
    const sortField = query.sort || 'createdAt';
    const sortOrder = query.order === 'asc' ? 1 : -1;

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(query.limit)
        .lean(),
      Blog.countDocuments(filter),
    ]);

    sendSuccess(res, blogs, 'Articles retrieved successfully', 200, {
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getBlogById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid article ID format', 400, 'INVALID_IDENTIFIER');
    }

    const blog = await Blog.findById(id).lean();
    if (!blog) {
      throw AppError.notFound(`Article not found with ID '${id}'`);
    }

    sendSuccess(res, blog, 'Article retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function createBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = createBlogSchema.parse(req.body);

    if (body.status === 'published' && req.user) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Publishing content requires content:publish permission. Save as draft instead.');
      }
    }

    const existing = await Blog.findOne({ slug: body.slug.toLowerCase() });
    if (existing) {
      throw new AppError(`An article with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
    }

    const newBlog = await Blog.create({
      ...body,
      slug: body.slug.toLowerCase(),
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    });

    sendSuccess(res, newBlog, 'Article created successfully', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid article ID format', 400, 'INVALID_IDENTIFIER');
    }

    const body = updateBlogSchema.parse(req.body);
    const blog = await Blog.findById(id);
    if (!blog) {
      throw AppError.notFound(`Article not found with ID '${id}'`);
    }

    if (req.user && (body.status === 'published' || blog.status === 'published')) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Modifying or publishing published content requires content:publish permission');
      }
    }

    if (body.slug && body.slug.toLowerCase() !== blog.slug) {
      const slugExists = await Blog.findOne({ slug: body.slug.toLowerCase(), _id: { $ne: id } });
      if (slugExists) {
        throw new AppError(`An article with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
      }
      blog.slug = body.slug.toLowerCase();
    }

    Object.assign(blog, body);
    if (body.publishedAt) {
      blog.publishedAt = new Date(body.publishedAt);
    }
    await blog.save();

    sendSuccess(res, blog, 'Article updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid article ID format', 400, 'INVALID_IDENTIFIER');
    }

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      throw AppError.notFound(`Article not found with ID '${id}'`);
    }

    sendSuccess(res, { deleted: true, id }, 'Article deleted successfully');
  } catch (error) {
    next(error);
  }
}
