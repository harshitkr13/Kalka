import { Request, Response, NextFunction } from 'express';
import { Lead } from '../../models/Lead';
import { publicContactSubmissionSchema } from './leads.validation';
import { emailService } from '../../services/email/email.service';
import { sendSuccess } from '../../utils/apiResponse';
import { logger } from '../../utils/logger';

export async function submitContactEnquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = publicContactSubmissionSchema.parse(req.body);

    // 1. Anti-spam Honeypot Trap
    // If the hidden bot field is filled, return clean acknowledgement without saving
    if (data.hp_company_sec && data.hp_company_sec.trim().length > 0) {
      logger.info('[ANTI-SPAM]: Automated bot submission trapped via honeypot field');
      sendSuccess(
        res,
        {
          reference: 'ACK-SIMULATED',
          status: 'RECEIVED',
        },
        'Your consultation inquiry has been securely received.'
      );
      return;
    }

    const normalizedEmail = data.email.toLowerCase().trim();
    const normalizedMessage = data.message.trim();

    // 2. Short-Interval Duplicate Prevention (60-second idempotency window)
    const recentDuplicate = await Lead.findOne({
      email: normalizedEmail,
      message: normalizedMessage,
      createdAt: { $gte: new Date(Date.now() - 60 * 1000) },
    });

    if (recentDuplicate) {
      logger.info(`[DUPLICATE DETECTED]: Suppressing identical inquiry from ${normalizedEmail}`);
      sendSuccess(
        res,
        {
          reference: recentDuplicate._id,
          status: 'RECEIVED',
          duplicate: true,
        },
        'Your consultation inquiry has been securely received by Kalka Co. advisory leadership.'
      );
      return;
    }

    // 3. Persist Lead to MongoDB Atlas
    const newLead = await Lead.create({
      fullName: data.fullName,
      email: normalizedEmail,
      phone: data.phone,
      whatsapp: data.whatsapp || undefined,
      company: data.company,
      designation: data.designation || undefined,
      enquiryType: data.enquiryType,
      service: data.service || undefined,
      serviceSlug: data.serviceSlug || undefined,
      industry: data.industry || undefined,
      urgency: data.urgency,
      message: normalizedMessage,
      source: data.source,
      sourcePage: data.sourcePage || '/contact',
      status: 'NEW',
      priority: data.urgency === 'crisis' ? 'URGENT' : data.urgency === 'priority' ? 'HIGH' : 'MEDIUM',
      consent: data.consent,
      notes: [],
    });

    logger.info(`[LEAD CREATED]: Successfully registered inquiry from ${data.fullName} (${data.company}) [ID: ${newLead._id}]`);

    // 4. Non-blocking Email Notification Sequence
    // Email dispatch failure will NEVER block or invalidate successfully persisted leads
    emailService
      .notifyNewLead({
        fullName: newLead.fullName,
        email: newLead.email,
        phone: newLead.phone,
        whatsapp: newLead.whatsapp,
        company: newLead.company,
        designation: newLead.designation,
        enquiryType: newLead.enquiryType,
        service: newLead.service,
        industry: newLead.industry,
        urgency: newLead.urgency,
        message: newLead.message,
        source: newLead.source,
        sourcePage: newLead.sourcePage,
        createdAt: newLead.createdAt,
      })
      .catch((emailErr) => {
        logger.warn('[EMAIL NOTIFICATION WARNING]: Lead created, but background email notification failed:', emailErr);
      });

    // 5. Clean, Safe Public Response Envelope (no internal notes, admin info, or database internals)
    sendSuccess(
      res,
      {
        reference: newLead._id,
        status: 'RECEIVED',
        fullName: newLead.fullName,
        company: newLead.company,
        enquiryType: newLead.enquiryType,
      },
      'Your consultation inquiry has been securely received by Kalka Co. advisory leadership.',
      201
    );
  } catch (error) {
    next(error);
  }
}
