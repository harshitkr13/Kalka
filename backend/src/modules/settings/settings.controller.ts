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
        siteTagline: 'Strategic Communication. Lasting Impact.',
        contactEmail: 'djdurgesh8@gmail.com',
        contactPhone: '+91 87450 01570 / +91 76830 15257',
        primaryOffice: 'Faridabad, Haryana 121003',
        socialLinks: {},
        seoDefaults: {
          title: 'Kalka Co. Media Consultancy — Strategic Communication. Lasting Impact.',
          description:
            'Kalka Co. Media Consultancy is a strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement through strategic communication, media relations and reputation management.',
        },
        isMaintenanceMode: false,
      } as unknown as typeof settings;
    }

    sendSuccess(res, settings, 'Public settings retrieved successfully');
  } catch (error) {
    next(error);
  }
}
