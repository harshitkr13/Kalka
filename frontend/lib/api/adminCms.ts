import { apiClient, ApiResponse } from '../api';

export async function fetchAdminList<T>(
  resource: string,
  params: Record<string, string | number | boolean | undefined> = {}
): Promise<ApiResponse<T[]>> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      query.set(key, String(val));
    }
  });

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return apiClient<T[]>(`/admin/${resource}${queryString}`);
}

export async function fetchAdminItem<T>(
  resource: string,
  id: string
): Promise<ApiResponse<T>> {
  return apiClient<T>(`/admin/${resource}/${id}`);
}

export async function createAdminItem<T>(
  resource: string,
  payload: unknown
): Promise<ApiResponse<T>> {
  return apiClient<T>(`/admin/${resource}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateAdminItem<T>(
  resource: string,
  id: string,
  payload: unknown
): Promise<ApiResponse<T>> {
  return apiClient<T>(`/admin/${resource}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminItem(
  resource: string,
  id: string
): Promise<ApiResponse<{ deleted: boolean; id: string }>> {
  return apiClient<{ deleted: boolean; id: string }>(`/admin/${resource}/${id}`, {
    method: 'DELETE',
  });
}
