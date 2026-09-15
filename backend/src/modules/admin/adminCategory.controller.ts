import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Category } from '../../models/Category';
import { Blog } from '../../models/Blog';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { createCategorySchema, updateCategorySchema } from './admin.validation';

export async function listCategories(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const categories = await Category.find().sort({ name: 1 }).lean();

    // Compute blog reference count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const articleCount = await Blog.countDocuments({
          $or: [{ category: cat.name }, { category: cat.slug }],
        });
        return {
          ...cat,
          articleCount,
        };
      })
    );

    sendSuccess(res, categoriesWithCount, 'Categories retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid category ID format', 400, 'INVALID_IDENTIFIER');
    }

    const category = await Category.findById(id).lean();
    if (!category) {
      throw AppError.notFound(`Category not found with ID '${id}'`);
    }

    const articleCount = await Blog.countDocuments({
      $or: [{ category: category.name }, { category: category.slug }],
    });

    sendSuccess(res, { ...category, articleCount }, 'Category retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = createCategorySchema.parse(req.body);

    const existing = await Category.findOne({ slug: body.slug.toLowerCase() });
    if (existing) {
      throw new AppError(`A category with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
    }

    const newCategory = await Category.create({
      ...body,
      slug: body.slug.toLowerCase(),
    });

    sendSuccess(res, newCategory, 'Category created successfully', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid category ID format', 400, 'INVALID_IDENTIFIER');
    }

    const body = updateCategorySchema.parse(req.body);
    const category = await Category.findById(id);
    if (!category) {
      throw AppError.notFound(`Category not found with ID '${id}'`);
    }

    if (body.slug && body.slug.toLowerCase() !== category.slug) {
      const slugExists = await Category.findOne({ slug: body.slug.toLowerCase(), _id: { $ne: id } });
      if (slugExists) {
        throw new AppError(`A category with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
      }
      category.slug = body.slug.toLowerCase();
    }

    const oldName = category.name;
    Object.assign(category, body);
    await category.save();

    // If name changed, optionally sync existing articles using this category name
    if (body.name && body.name !== oldName) {
      await Blog.updateMany({ category: oldName }, { $set: { category: body.name } });
    }

    sendSuccess(res, category, 'Category updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid category ID format', 400, 'INVALID_IDENTIFIER');
    }

    const category = await Category.findById(id);
    if (!category) {
      throw AppError.notFound(`Category not found with ID '${id}'`);
    }

    // Safety Check: verify whether any published or draft blog references this category
    const referencingBlogsCount = await Blog.countDocuments({
      $or: [{ category: category.name }, { category: category.slug }],
    });

    if (referencingBlogsCount > 0) {
      throw new AppError(
        `Cannot delete category '${category.name}' because it is actively referenced by ${referencingBlogsCount} article(s). Please reassign or remove those articles before deleting this category.`,
        400,
        'CATEGORY_IN_USE'
      );
    }

    await Category.findByIdAndDelete(id);

    sendSuccess(res, { deleted: true, id }, 'Category deleted successfully');
  } catch (error) {
    next(error);
  }
}
