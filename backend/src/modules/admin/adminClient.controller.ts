import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Client } from '../../models/Client';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import { hasPermission } from '../auth/permissions';
import {
  paginationQuerySchema,
  createClientSchema,
  updateClientSchema,
  clientApprovalSchema,
} from './admin.validation';

export async function listClients(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = paginationQuerySchema.parse(req.query);
    const filter: Record<string, unknown> = {};

    if (query.status && query.status !== 'all') {
      filter.status = query.status;
    }

    const approvalQuery = req.query.approvalStatus as string | undefined;
    if (approvalQuery && approvalQuery !== 'all') {
      filter.approvalStatus = approvalQuery;
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search.trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { slug: searchRegex },
        { industry: searchRegex },
        { shortDescription: searchRegex },
      ];
    }

    const skip = (query.page - 1) * query.limit;
    const sortField = query.sort || 'displayOrder';
    const sortOrder = query.order === 'asc' ? 1 : -1;

    const [clients, total] = await Promise.all([
      Client.find(filter)
        .sort({ [sortField]: sortOrder, createdAt: -1 })
        .skip(skip)
        .limit(query.limit)
        .lean(),
      Client.countDocuments(filter),
    ]);

    sendSuccess(res, clients, 'Clients retrieved successfully', 200, {
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getClientById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid client ID format', 400, 'INVALID_IDENTIFIER');
    }

    const client = await Client.findById(id).lean();
    if (!client) {
      throw AppError.notFound(`Client not found with ID '${id}'`);
    }

    sendSuccess(res, client, 'Client retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function createClient(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = createClientSchema.parse(req.body);

    if (body.status === 'published' && req.user) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Publishing content requires content:publish permission. Save as draft instead.');
      }
    }

    const existing = await Client.findOne({ slug: body.slug.toLowerCase() });
    if (existing) {
      throw new AppError(`A client with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
    }

    const newClient = await Client.create({
      ...body,
      slug: body.slug.toLowerCase(),
    });

    sendSuccess(res, newClient, 'Client created successfully', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateClient(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid client ID format', 400, 'INVALID_IDENTIFIER');
    }

    const body = updateClientSchema.parse(req.body);
    const client = await Client.findById(id);
    if (!client) {
      throw AppError.notFound(`Client not found with ID '${id}'`);
    }

    if (req.user && (body.status === 'published' || client.status === 'published')) {
      if (!hasPermission(req.user.role, 'content:publish')) {
        throw AppError.forbidden('Modifying or publishing published content requires content:publish permission');
      }
    }

    if (body.slug && body.slug.toLowerCase() !== client.slug) {
      const slugExists = await Client.findOne({ slug: body.slug.toLowerCase(), _id: { $ne: id } });
      if (slugExists) {
        throw new AppError(`A client with slug '${body.slug}' already exists`, 409, 'DUPLICATE_SLUG');
      }
      client.slug = body.slug.toLowerCase();
    }

    Object.assign(client, body);
    await client.save();

    sendSuccess(res, client, 'Client updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function updateClientApproval(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid client ID format', 400, 'INVALID_IDENTIFIER');
    }

    const { approvalStatus } = clientApprovalSchema.parse(req.body);

    if (req.user && !hasPermission(req.user.role, 'content:publish')) {
      throw AppError.forbidden('Changing client approval status requires content:publish permission');
    }

    const client = await Client.findById(id);
    if (!client) {
      throw AppError.notFound(`Client not found with ID '${id}'`);
    }

    client.approvalStatus = approvalStatus;
    await client.save();

    sendSuccess(res, client, `Client approval status updated to ${approvalStatus}`);
  } catch (error) {
    next(error);
  }
}

export async function deleteClient(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid client ID format', 400, 'INVALID_IDENTIFIER');
    }

    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      throw AppError.notFound(`Client not found with ID '${id}'`);
    }

    sendSuccess(res, { deleted: true, id }, 'Client deleted successfully');
  } catch (error) {
    next(error);
  }
}
