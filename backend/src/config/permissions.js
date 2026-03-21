export const PERMISSIONS = {
  FULL_ACCESS: ['ADMIN','CO'],
  APPROVE_OFFICER: ['XO'],
  APPROVE_SAILOR: ['RO'],
  ASSIGN_DEPARTMENT: ['RO'],
  ASSIGN_DIVISION: ['GO'],
  VIEW_DEPT_DASHBOARD: ['XO','EO','LO','SO','MO'],
  VIEW_DIV_DASHBOARD: ['DO','GO'],
};

export const hasPermission = (userRoles, action) => {
  if (!Array.isArray(userRoles)) return false;
  // Full access short-circuit
  if (userRoles.some(r => ['ADMIN','CO'].includes(r))) return true;
  const allowed = PERMISSIONS[action] || [];
  return userRoles.some(r => allowed.includes(r));
};
