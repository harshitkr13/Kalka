import { Request, Response, NextFunction } from 'express';
import { Settings } from '../../models/Settings';
import { sendSuccess } from '../../utils/apiResponse';

export async function getPublicSettings(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let settings = await Settings.findOne().lean();

    if (!settings) {
      // Fallback default settings if none created yet
      settings = {
        siteName: 'Kalka Co. Media Consultancy',
        siteTagline: 'Strategic Media Consultancy',
        contactEmail: 'contact@kalka.co',
        contactPhone: '+91 11 0000 0000',
        primaryOffice: 'New Delhi',
        socialLinks: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          instagram: 'https://instagram.com',
          youtube: 'https://youtube.com',
        },
        seoDefaults: {
          title: 'Kalka Co. — Strategic Media Consultancy',
          description: 'High-stakes media consultancy and strategic communications advisory.',
        },
        isMaintenanceMode: false,
      } as unknown as typeof settings;
    }

    sendSuccess(res, settings, 'Public settings retrieved successfully');
  } catch (error) {
    next(error);
  }
}
