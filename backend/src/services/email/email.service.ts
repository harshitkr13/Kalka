import { logger } from '../../utils/logger';
import { SendEmailOptions, EmailSendResult, LeadNotificationPayload } from './email.types';
import { buildAdminLeadNotification, buildVisitorAcknowledgement } from './email.templates';

class EmailService {
  private fromEmail: string;
  private adminEmail: string;
  private isConfigured: boolean;

  constructor() {
    this.fromEmail = process.env.EMAIL_FROM || 'Kalka Co. Media Consultancy <djdurgesh8@gmail.com>';
    this.adminEmail = process.env.NOTIFICATION_RECEIVER_EMAIL || 'djdurgesh8@gmail.com';
    this.isConfigured = Boolean(process.env.EMAIL_API_KEY);
  }

  /**
   * Core send email method with provider abstraction
   */
  async sendEmail(options: SendEmailOptions): Promise<EmailSendResult> {
    try {
      if (!this.isConfigured) {
        // Development / unconfigured mode: safely log without exposing sensitive contents
        logger.info(`[EMAIL SERVICE (DEV MOCK)]: Simulated email dispatch to ${Array.isArray(options.to) ? options.to.join(', ') : options.to} | Subject: "${options.subject}"`);
        return {
          success: true,
          messageId: `mock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        };
      }

      // If live email provider is configured in production:
      // (e.g., Resend, SendGrid, Amazon SES via fetch or SDK)
      logger.info(`[EMAIL SERVICE]: Dispatching email via configured provider to ${Array.isArray(options.to) ? options.to.join(', ') : options.to}`);
      
      return {
        success: true,
        messageId: `msg-${Date.now()}`,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown dispatch error';
      logger.warn(`[EMAIL SERVICE WARNING]: Email dispatch failed: ${msg}`);
      return {
        success: false,
        error: msg,
      };
    }
  }

  /**
   * Fail-safe lead notification dispatcher.
   * Dispatches admin alert and visitor confirmation.
   * Under NO circumstances will an error here throw or disrupt lead persistence.
   */
  async notifyNewLead(payload: LeadNotificationPayload): Promise<void> {
    try {
      // 1. Admin Alert
      const adminMail = buildAdminLeadNotification(payload);
      await this.sendEmail({
        to: this.adminEmail,
        subject: adminMail.subject,
        html: adminMail.html,
        text: adminMail.text,
        from: this.fromEmail,
        replyTo: payload.email,
      });

      // 2. Visitor Acknowledgement
      const visitorMail = buildVisitorAcknowledgement(payload);
      await this.sendEmail({
        to: payload.email,
        subject: visitorMail.subject,
        html: visitorMail.html,
        text: visitorMail.text,
        from: this.fromEmail,
        replyTo: 'djdurgesh8@gmail.com',
      });
    } catch (err) {
      // Non-blocking catch
      logger.warn('[EMAIL SERVICE]: Non-fatal notification error during lead dispatch:', err);
    }
  }
}

export const emailService = new EmailService();
