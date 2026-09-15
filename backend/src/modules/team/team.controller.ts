import { Request, Response, NextFunction } from 'express';
import { TeamMember } from '../../models/TeamMember';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';

export async function getTeamMembers(req: Request, res: Response, next: NextFunction): Promise<void> {
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
    const [members, total] = await Promise.all([
      TeamMember.find(filter)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      TeamMember.countDocuments(filter),
    ]);

    sendSuccess(res, members, 'Team members retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getTeamMemberBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.params;
    const member = await TeamMember.findOne({ slug: slug.toLowerCase(), status: 'published' }).lean();

    if (!member) {
      throw AppError.notFound(`Team member not found with slug '${slug}'`);
    }

    sendSuccess(res, member, 'Team member retrieved successfully');
  } catch (error) {
    next(error);
  }
}
