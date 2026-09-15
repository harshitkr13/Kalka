import { Request, Response, NextFunction } from 'express';
import mongoose, { FilterQuery } from 'mongoose';
import { Lead, ILead } from '../../models/Lead';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';
import {
  adminLeadQuerySchema,
  adminUpdateLeadSchema,
  adminAddNoteSchema,
} from '../leads/leads.validation';

export async function listLeads(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = adminLeadQuerySchema.parse(req.query);
    const filter: FilterQuery<ILead> = {};

    if (query.status && query.status !== 'all') {
      filter.status = query.status;
    }

    if (query.priority && query.priority !== 'all') {
      filter.priority = query.priority;
    }

    if (query.enquiryType && query.enquiryType !== 'all') {
      filter.enquiryType = query.enquiryType.toUpperCase();
    }

    if (query.serviceSlug && query.serviceSlug !== 'all') {
      filter.serviceSlug = query.serviceSlug;
    }

    if (query.search && query.search.trim().length > 0) {
      const searchRegex = new RegExp(query.search.trim(), 'i');
      filter.$or = [
        { fullName: searchRegex },
        { email: searchRegex },
        { company: searchRegex },
        { phone: searchRegex },
      ];
    }

    const sortOrder = query.order === 'asc' ? 1 : -1;
    const sortField = query.sort || 'createdAt';

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .populate('assignedTo', 'name email avatar role')
        .sort({ [sortField]: sortOrder })
        .skip((query.page - 1) * query.limit)
        .limit(query.limit)
        .lean(),
      Lead.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / query.limit) || 1;

    sendSuccess(
      res,
      leads,
      'Leads retrieved successfully',
      200,
      {
        total,
        page: query.page,
        limit: query.limit,
        totalPages,
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function getLeadById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid lead ID format', 400, 'INVALID_IDENTIFIER');
    }

    const lead = await Lead.findById(id)
      .populate('assignedTo', 'name email avatar role')
      .lean();

    if (!lead) {
      throw AppError.notFound(`Lead not found with ID '${id}'`);
    }

    sendSuccess(res, lead, 'Lead details retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function updateLead(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid lead ID format', 400, 'INVALID_IDENTIFIER');
    }

    const body = adminUpdateLeadSchema.parse(req.body);
    const lead = await Lead.findById(id);

    if (!lead) {
      throw AppError.notFound(`Lead not found with ID '${id}'`);
    }

    if (body.status !== undefined) {
      lead.status = body.status;
      if (body.status === 'CONTACTED' && !lead.lastContactedAt) {
        lead.lastContactedAt = new Date();
      }
      if (['WON', 'LOST', 'CLOSED'].includes(body.status) && !lead.closedAt) {
        lead.closedAt = new Date();
      }
    }

    if (body.priority !== undefined) {
      lead.priority = body.priority;
    }

    if (body.assignedTo !== undefined) {
      if (body.assignedTo === null || body.assignedTo === '') {
        lead.assignedTo = undefined;
      } else if (mongoose.Types.ObjectId.isValid(body.assignedTo)) {
        lead.assignedTo = new mongoose.Types.ObjectId(body.assignedTo);
      } else {
        throw new AppError('Invalid assigned user ID format', 400, 'INVALID_IDENTIFIER');
      }
    }

    await lead.save();

    const updated = await Lead.findById(id)
      .populate('assignedTo', 'name email avatar role')
      .lean();

    sendSuccess(res, updated, 'Lead updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function addLeadNote(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid lead ID format', 400, 'INVALID_IDENTIFIER');
    }

    const body = adminAddNoteSchema.parse(req.body);
    const lead = await Lead.findById(id);

    if (!lead) {
      throw AppError.notFound(`Lead not found with ID '${id}'`);
    }

    const user = req.user;
    const authorName = user ? user.name : 'Administrator';
    const authorId = user && mongoose.Types.ObjectId.isValid(user.id)
      ? new mongoose.Types.ObjectId(user.id)
      : undefined;

    lead.notes.push({
      author: authorName,
      authorId,
      content: body.content,
      createdAt: new Date(),
    });

    await lead.save();

    const updated = await Lead.findById(id)
      .populate('assignedTo', 'name email avatar role')
      .lean();

    sendSuccess(res, updated, 'Note added successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteLead(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid lead ID format', 400, 'INVALID_IDENTIFIER');
    }

    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      throw AppError.notFound(`Lead not found with ID '${id}'`);
    }

    sendSuccess(res, { id }, 'Lead removed successfully');
  } catch (error) {
    next(error);
  }
}
