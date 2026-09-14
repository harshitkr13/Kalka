import { Request, Response, NextFunction } from 'express';
import { MediaMention } from '../../models/MediaMention';
import { sendSuccess } from '../../utils/apiResponse';

export async function getMediaMentions(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { featured, type, limit = 50, page = 1 } = req.query as {
      featured?: string;
      type?: 'quote' | 'feature' | 'interview' | 'mention';
      limit?: number;
      page?: number;
    };

    const filter: Record<string, unknown> = { status: 'published' };
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    if (type) {
      filter.type = type;
    }

    const skip = (page - 1) * limit;
    const [mentions, total] = await Promise.all([
      MediaMention.find(filter).sort({ displayOrder: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
      MediaMention.countDocuments(filter),
    ]);

    sendSuccess(res, mentions, 'Media mentions retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
}
