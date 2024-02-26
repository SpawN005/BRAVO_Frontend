'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import getUserFromToken from '@/utilities/getUserFromToken '
const RouteGuard = ({ children, requiredPermissionLevel }) => {
  const user = getUserFromToken();
  const router = useRouter();

  React.useEffect(() => {
    if (!user || user.permissionLevel < requiredPermissionLevel) {
      // Redirect to a different page or show an error
      router.push('/auth/signin'); // or any other logic
    }
  }, [user, requiredPermissionLevel, router]);

  return <>{children}</>;
};

export default RouteGuard;