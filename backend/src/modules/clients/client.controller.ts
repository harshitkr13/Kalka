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

    // Strict Client Approval Business Rule:
    // Only exposed as full logo if status === 'published' AND approvalStatus === 'APPROVED'
    // Pending / restricted clients must never leak logo assets publicly.
    const sanitizedClients = clients.map((client) => {
      if (client.approvalStatus !== 'APPROVED') {
        const { logo: _l, logoAsset: _la, ...safeClient } = client;
        return { ...safeClient, approvalStatus: client.approvalStatus || 'PENDING_APPROVAL' };
      }
      return client;
    });

    sendSuccess(res, sanitizedClients, 'Clients retrieved successfully', 200, {
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
    const client = await Client.findOne({ slug: slug.toLowerCase(), status: 'published' }).lean();

    if (!client) {
      throw AppError.notFound(`Client not found with slug '${slug}'`);
    }

    if (client.approvalStatus !== 'APPROVED') {
      delete client.logo;
      delete client.logoAsset;
    }

    sendSuccess(res, client, 'Client retrieved successfully');
  } catch (error) {
    next(error);
  }
}

