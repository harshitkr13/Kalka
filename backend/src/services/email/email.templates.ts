import { LeadNotificationPayload } from './email.types';

export function buildAdminLeadNotification(payload: LeadNotificationPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const urgencyTag =
    payload.urgency === 'crisis'
      ? '[ACUTE CRISIS] '
      : payload.urgency === 'priority'
      ? '[PRIORITY] '
      : '';

  const subject = `${urgencyTag}New Executive Inquiry: ${payload.fullName} (${payload.company})`;

  const text = `
KALKA CO. — NEW CONSULTATION INQUIRY
====================================
Urgency Level: ${payload.urgency.toUpperCase()}
Enquiry Type:  ${payload.enquiryType}
Date/Time:     ${new Date(payload.createdAt).toUTCString()}

CLIENT / CONTACT DETAILS
------------------------
Name:        ${payload.fullName}
Organization: ${payload.company}
Role/Title:  ${payload.designation || 'Not specified'}
Email:       ${payload.email}
Phone:       ${payload.phone}
WhatsApp:    ${payload.whatsapp || 'Same as phone'}

PRACTICE CONTEXT
----------------
Practice Area: ${payload.service || 'General Advisory'}
Industry:      ${payload.industry || 'Not specified'}
Source:        ${payload.source} (${payload.sourcePage || '/contact'})

EXECUTIVE BRIEF / MESSAGE
-------------------------
${payload.message}

--
Kalka Co. Media Consultancy Administrative Desk
Confidential & Proprietary
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1120; color: #f1f5f9; padding: 24px 16px; margin: 0; }
    .card { max-width: 600px; margin: 0 auto; background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; }
    .header { background: #020617; padding: 24px; border-bottom: 1px solid #1e293b; }
    .header h1 { margin: 0; font-size: 18px; color: #f8fafc; font-weight: 700; letter-spacing: 0.05em; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-top: 8px; }
    .badge-crisis { background: rgba(225, 29, 72, 0.2); color: #fb7185; border: 1px solid rgba(225, 29, 72, 0.4); }
    .badge-priority { background: rgba(245, 158, 11, 0.2); color: #fcd34d; border: 1px solid rgba(245, 158, 11, 0.4); }
    .badge-standard { background: rgba(51, 65, 85, 0.5); color: #cbd5e1; border: 1px solid #334155; }
    .content { padding: 24px; }
    .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #1e293b; padding-bottom: 4px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
    .label { font-size: 11px; color: #64748b; text-transform: uppercase; }
    .value { font-size: 13px; color: #f1f5f9; font-weight: 500; }
    .message-box { background: #020617; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; font-size: 13px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; margin-top: 8px; }
    .footer { background: #020617; padding: 16px 24px; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>KALKA CO. — EXECUTIVE INQUIRY RECEIVED</h1>
      <span class="badge ${payload.urgency === 'crisis' ? 'badge-crisis' : payload.urgency === 'priority' ? 'badge-priority' : 'badge-standard'}">
        ${payload.urgency.toUpperCase()} PROTOCOL
      </span>
    </div>
    <div class="content">
      <div class="section-title">Institutional Contact Details</div>
      <div class="grid">
        <div>
          <div class="label">Full Name</div>
          <div class="value">${payload.fullName}</div>
        </div>
        <div>
          <div class="label">Enterprise / Organization</div>
          <div class="value">${payload.company}</div>
        </div>
        <div>
          <div class="label">Email Address</div>
          <div class="value"><a href="mailto:${payload.email}" style="color: #f59e0b; text-decoration: none;">${payload.email}</a></div>
        </div>
        <div>
          <div class="label">Phone Number</div>
          <div class="value">${payload.phone}</div>
        </div>
        <div>
          <div class="label">Designation / Role</div>
          <div class="value">${payload.designation || 'Not specified'}</div>
        </div>
        <div>
          <div class="label">Enquiry Classification</div>
          <div class="value">${payload.enquiryType}</div>
        </div>
      </div>

      <div class="section-title">Practice & Advisory Scope</div>
      <div class="grid">
        <div>
          <div class="label">Service Practice</div>
          <div class="value">${payload.service || 'General Strategic Counsel'}</div>
        </div>
        <div>
          <div class="label">Source & Origin</div>
          <div class="value">${payload.source} (${payload.sourcePage || '/contact'})</div>
        </div>
      </div>

      <div class="section-title">Executive Brief</div>
      <div class="message-box">${payload.message}</div>
    </div>
    <div class="footer">
      Kalka Co. Media Consultancy • Privileged & Confidential Counsel
    </div>
  </div>
</body>
</html>
`;

  return { subject, html, text };
}

export function buildVisitorAcknowledgement(payload: LeadNotificationPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = 'Consultation Inquiry Transmitted | Kalka Co. Media Consultancy';

  const text = `
Dear ${payload.fullName},

Thank you for contacting Kalka Co. Media Consultancy regarding ${payload.company}.

Your consultation inquiry has been securely received by our strategic communications leadership. All inquiries submitted to our practice are protected under strict professional non-disclosure protocols.

WHAT HAPPENS NEXT
-----------------
- A practice director will review your brief against our engagement schedule.
- Standard consultations receive an initial executive scoping response within 24 business hours.
- If your situation represents an acute media or regulatory incident, our crisis team will reach out via the direct contact number provided.

DIRECT CONTACT
--------------
If you require immediate clarification or need to augment your brief:
Email:  contact@kalka.co
Phone:  +91 11 4000 0000

Sincerely,

Executive Advisory Desk
Kalka Co. Media Consultancy
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; padding: 24px 16px; margin: 0; }
    .card { max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #0f172a; padding: 28px 24px; text-align: center; color: #ffffff; }
    .brand { font-size: 18px; font-weight: 700; letter-spacing: 0.1em; color: #f8fafc; margin-bottom: 4px; }
    .subbrand { font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #f59e0b; }
    .content { padding: 32px 24px; font-size: 14px; line-height: 1.6; color: #334155; }
    .content h2 { font-size: 18px; color: #0f172a; margin-top: 0; margin-bottom: 16px; }
    .callout { background: #f8fafc; border-left: 3px solid #f59e0b; padding: 12px 16px; border-radius: 0 8px 8px 0; margin: 20px 0; font-size: 13px; color: #475569; }
    .footer { background: #f1f5f9; padding: 18px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="brand">KALKA CO.</div>
      <div class="subbrand">Strategic Communications & Advisory</div>
    </div>
    <div class="content">
      <h2>Inquiry Securely Transmitted</h2>
      <p>Dear ${payload.fullName},</p>
      <p>Thank you for initiating communication with Kalka Co. on behalf of <strong>${payload.company}</strong>.</p>
      <p>Your strategic brief has been routed to our practice directors. All initial inquiries are handled with strict discretion and protected by our advisory non-disclosure protocols.</p>
      
      <div class="callout">
        <strong>Engagement Protocol:</strong> Our practice lead will evaluate your requirements and provide an initial scoping response within standard operating horizons (24 business hours).
      </div>

      <p>If you have urgent documents or supplementary context to provide, please reply directly to this confirmation or reach our executive desk at <a href="mailto:contact@kalka.co" style="color: #d97706; text-decoration: none; font-weight: 500;">contact@kalka.co</a>.</p>

      <p style="margin-top: 24px;">Sincerely,<br><strong>Executive Advisory Desk</strong><br>Kalka Co. Media Consultancy</p>
    </div>
    <div class="footer">
      Kalka Co. Media Consultancy • Strict Advisory Confidentiality
    </div>
  </div>
</body>
</html>
`;

  return { subject, html, text };
}
