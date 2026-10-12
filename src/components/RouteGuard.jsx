import React from 'react';

/**
 * RouteGuard extension point for Stage 4 & 5.
 * Currently allows access and displays informational banners for staff routes.
 * In Stage 4, this will verify JWT tokens and roles (e.g. 'nagarpalika_staff', 'admin').
 */
export default function RouteGuard({ children, requiredRole = 'admin' }) {
  // TODO: [Backend Integration - Stage 4/5]
  // const { user, isAuthenticated } = useAuth();
  // if (!isAuthenticated || !user.roles.includes(requiredRole)) {
  //   return <Navigate to="/login" replace />;
  // }

  return <>{children}</>;
}
