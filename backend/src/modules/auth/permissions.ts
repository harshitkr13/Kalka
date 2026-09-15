import { UserRole } from '../../models/User';

export type Permission =
  | 'content:view'
  | 'content:edit'
  | 'content:publish'
  | 'leads:view'
  | 'leads:manage'
  | 'careers:view'
  | 'careers:manage'
  | 'users:manage'
  | 'settings:manage';

export const ALL_PERMISSIONS: Permission[] = [
  'content:view',
  'content:edit',
  'content:publish',
  'leads:view',
  'leads:manage',
  'careers:view',
  'careers:manage',
  'users:manage',
  'settings:manage',
];

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    'content:view',
    'content:edit',
    'content:publish',
    'leads:view',
    'leads:manage',
    'careers:view',
    'careers:manage',
    'users:manage',
    'settings:manage',
  ],
  CONTENT_MANAGER: [
    'content:view',
    'content:edit',
    'content:publish',
    'careers:view',
    'leads:view',
  ],
  EDITOR: [
    'content:view',
    'content:edit',
    'careers:view',
  ],
  LEAD_MANAGER: [
    'leads:view',
    'leads:manage',
  ],
  HR_MANAGER: [
    'careers:view',
    'careers:manage',
  ],
};

export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = getRolePermissions(role);
  return permissions.includes(permission);
}

export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  const granted = getRolePermissions(role);
  return permissions.every((p) => granted.includes(p));
}
