export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  from?: string;
  replyTo?: string;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface LeadNotificationPayload {
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  company: string;
  designation?: string;
  enquiryType: string;
  service?: string;
  industry?: string;
  urgency: string;
  message: string;
  source: string;
  sourcePage?: string;
  createdAt: Date;
}
