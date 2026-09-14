import { Request, Response, NextFunction } from 'express';
import { Blog } from '../../models/Blog';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';

export async function getBlogs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { featured, category, tag, limit = 20, page = 1 } = req.query as {
      featured?: string;
      category?: string;
      tag?: string;
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
    if (tag) {
      filter.tags = { $in: [new RegExp(tag, 'i')] };
    }

    const skip = (page - 1) * limit;
    const [blogs, total] = await Promise.all([
      Blog.find(filter).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
      Blog.countDocuments(filter),
    ]);

    sendSuccess(res, blogs, 'Blogs retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getBlogBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug: slug.toLowerCase(), status: 'published' }).lean();

    if (!blog) {
      throw AppError.notFound(`Blog article not found with slug '${slug}'`);
    }

    sendSuccess(res, blog, 'Blog retrieved successfully');
  } catch (error) {
    next(error);
  }
}
