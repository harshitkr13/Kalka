import { Request, Response, NextFunction } from 'express';
import { Client } from '../../models/Client';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';

export async function getClients(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { featured, industry, limit = 100, page = 1 } = req.query as {
      featured?: string;
      industry?: string;
      limit?: number;
      page?: number;
    };

    const filter: Record<string, unknown> = {
      status: 'published',
      approvalStatus: 'APPROVED',
    };
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    if (industry) {
      filter.industry = { $regex: new RegExp(industry, 'i') };
    }

    const skip = (page - 1) * limit;
    const [rawClients, total] = await Promise.all([
      Client.find(filter).sort({ displayOrder: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
      Client.countDocuments(filter),
    ]);

    const clients = rawClients.map((c: any) => {
      const { confidentiality: _conf, ...safe } = c;
      return safe;
    });

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

export async function getClientBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.params;
    const rawClient = await Client.findOne({
      slug: slug.toLowerCase(),
      status: 'published',
      approvalStatus: 'APPROVED',
    }).lean();

    if (!rawClient) {
      throw AppError.notFound(`Client not found with slug '${slug}'`);
    }

    const { confidentiality: _conf, ...client } = rawClient as any;

    sendSuccess(res, client, 'Client retrieved successfully');
  } catch (error) {
    next(error);
  }
}

