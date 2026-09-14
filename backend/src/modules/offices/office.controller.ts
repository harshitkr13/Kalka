import { Request, Response, NextFunction } from 'express';
import { Office } from '../../models/Office';
import { sendSuccess } from '../../utils/apiResponse';

export async function getOffices(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const offices = await Office.find({ status: 'published' }).sort({ isHeadquarters: -1, displayOrder: 1 }).lean();
    sendSuccess(res, offices, 'Offices retrieved successfully');
  } catch (error) {
    next(error);
  }
}
