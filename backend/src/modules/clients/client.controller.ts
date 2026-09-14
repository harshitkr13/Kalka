import { Request, Response, NextFunction } from 'express';
import { Client } from '../../models/Client';
import { sendSuccess } from '../../utils/apiResponse';

export async function getClients(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { featured, industry, limit = 100, page = 1 } = req.query as {
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
    const [clients, total] = await Promise.all([
      Client.find(filter).sort({ displayOrder: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
      Client.countDocuments(filter),
    ]);

    sendSuccess(res, clients, 'Clients retrieved successfully', 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
}
