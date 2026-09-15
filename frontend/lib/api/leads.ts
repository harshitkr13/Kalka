/**
 * Leads & Inquiries API Client
 * 
 * Provides typed methods for:
 * 1. Public contact & service enquiry submissions
 * 2. Admin lead management, status updates, and note logging
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface PublicContactPayload {
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  company: string;
  designation?: string;
  enquiryType?: string;
  service?: string;
  serviceSlug?: string;
  industry?: string;
  urgency?: 'standard' | 'priority' | 'crisis';
  message: string;
  source?: 'CONTACT_FORM' | 'SERVICE_ENQUIRY' | 'WHATSAPP' | 'EMAIL_CTA' | 'OTHER';
  sourcePage?: string;
  consent?: boolean;
  hp_company_sec?: string; // Honeypot trap
}

export interface PublicContactResponse {
  reference: string;
  status: string;
  fullName?: string;
  company?: string;
  enquiryType?: string;
  duplicate?: boolean;
}

export interface LeadNote {
  _id: string;
  author: string;
  authorId?: string;
  content: string;
  createdAt: string;
}

export interface LeadItem {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  company: string;
  designation?: string;
  enquiryType: 'GENERAL' | 'SERVICE' | 'MEDIA' | 'PARTNERSHIP' | 'CAREERS' | 'OTHER';
  service?: string;
  serviceSlug?: string;
  industry?: string;
  urgency: 'standard' | 'priority' | 'crisis';
  message: string;
  source: 'CONTACT_FORM' | 'SERVICE_ENQUIRY' | 'WHATSAPP' | 'EMAIL_CTA' | 'OTHER';
  sourcePage?: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'WON' | 'LOST' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignedTo?: {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  notes: LeadNote[];
  consent: boolean;
  lastContactedAt?: string;
  closedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errorCode?: string;
  details?: Array<{ field: string; message: string }>;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Public Contact Submission
 */
export async function submitPublicContact(
  payload: PublicContactPayload
): Promise<ApiResponse<PublicContactResponse>> {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const body = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 429) {
        return {
          success: false,
          error: 'Rate limit reached. Too many inquiries submitted from this connection. Please try again shortly or contact us directly via telephone.',
          errorCode: 'RATE_LIMIT_EXCEEDED',
        };
      }
      if (res.status === 503) {
        return {
          success: false,
          error: 'Inquiry service is temporarily degraded. Please email contact@kalka.co or call our direct switchboard.',
          errorCode: 'DATABASE_UNAVAILABLE',
        };
      }
      return {
        success: false,
        error: body?.error?.message || 'Failed to submit inquiry. Please verify the form and try again.',
        errorCode: body?.error?.code || 'SUBMISSION_ERROR',
        details: body?.error?.details,
      };
    }

    return {
      success: true,
      data: body?.data,
      message: body?.message,
    };
  } catch {
    return {
      success: false,
      error: 'Network connection failed while transmitting inquiry. Please check your connection or email contact@kalka.co directly.',
      errorCode: 'NETWORK_ERROR',
    };
  }
}

/**
 * Admin: Fetch paginated leads list
 */
export async function fetchAdminLeads(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  enquiryType?: string;
  priority?: string;
  serviceSlug?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<ApiResponse<LeadItem[]>> {
  try {
    const url = new URL(`${API_BASE}/admin/leads`);
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          url.searchParams.append(key, String(val));
        }
      });
    }

    const res = await fetch(url.toString(), {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    const body = await res.json().catch(() => null);
    if (!res.ok) {
      return {
        success: false,
        error: body?.error?.message || `HTTP Error ${res.status}`,
        errorCode: body?.error?.code,
      };
    }

    return {
      success: true,
      data: body.data,
      meta: body.meta,
      message: body.message,
    };
  } catch {
    return {
      success: false,
      error: 'Network error occurred while fetching leads',
      errorCode: 'NETWORK_ERROR',
    };
  }
}

/**
 * Admin: Fetch single lead by ID
 */
export async function fetchAdminLeadById(id: string): Promise<ApiResponse<LeadItem>> {
  try {
    const res = await fetch(`${API_BASE}/admin/leads/${id}`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    const body = await res.json().catch(() => null);
    if (!res.ok) {
      return {
        success: false,
        error: body?.error?.message || `HTTP Error ${res.status}`,
        errorCode: body?.error?.code,
      };
    }

    return {
      success: true,
      data: body.data,
      message: body.message,
    };
  } catch {
    return {
      success: false,
      error: 'Network error occurred while retrieving lead profile',
      errorCode: 'NETWORK_ERROR',
    };
  }
}

/**
 * Admin: Update lead status or priority
 */
export async function updateAdminLead(
  id: string,
  updates: {
    status?: string;
    priority?: string;
    assignedTo?: string | null;
  }
): Promise<ApiResponse<LeadItem>> {
  try {
    const res = await fetch(`${API_BASE}/admin/leads/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    const body = await res.json().catch(() => null);
    if (!res.ok) {
      return {
        success: false,
        error: body?.error?.message || `HTTP Error ${res.status}`,
        errorCode: body?.error?.code,
      };
    }

    return {
      success: true,
      data: body.data,
      message: body.message,
    };
  } catch {
    return {
      success: false,
      error: 'Network error occurred while updating lead',
      errorCode: 'NETWORK_ERROR',
    };
  }
}

/**
 * Admin: Update lead status
 */
export async function updateAdminLeadStatus(
  id: string,
  status: string
): Promise<ApiResponse<LeadItem>> {
  return updateAdminLead(id, { status });
}

/**
 * Admin: Update lead priority
 */
export async function updateAdminLeadPriority(
  id: string,
  priority: string
): Promise<ApiResponse<LeadItem>> {
  return updateAdminLead(id, { priority });
}

/**
 * Admin: Append internal note to lead
 */
export async function addAdminLeadNote(
  id: string,
  content: string
): Promise<ApiResponse<LeadItem>> {
  try {
    const res = await fetch(`${API_BASE}/admin/leads/${id}/notes`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    const body = await res.json().catch(() => null);
    if (!res.ok) {
      return {
        success: false,
        error: body?.error?.message || `HTTP Error ${res.status}`,
        errorCode: body?.error?.code,
      };
    }

    return {
      success: true,
      data: body.data,
      message: body.message,
    };
  } catch {
    return {
      success: false,
      error: 'Network error occurred while appending note',
      errorCode: 'NETWORK_ERROR',
    };
  }
}

/**
 * Admin: Delete lead
 */
export async function deleteAdminLead(id: string): Promise<ApiResponse<{ id: string }>> {
  try {
    const res = await fetch(`${API_BASE}/admin/leads/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    const body = await res.json().catch(() => null);
    if (!res.ok) {
      return {
        success: false,
        error: body?.error?.message || `HTTP Error ${res.status}`,
        errorCode: body?.error?.code,
      };
    }

    return {
      success: true,
      data: body.data,
      message: body.message,
    };
  } catch {
    return {
      success: false,
      error: 'Network error occurred while removing lead',
      errorCode: 'NETWORK_ERROR',
    };
  }
}
