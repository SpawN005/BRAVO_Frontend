import React from 'react';
import { useRouter } from 'next/navigation'; // Corrected import statement
import getUserFromToken from '@/utilities/getUserFromToken ';
import { usePathname } from 'next/navigation'

const RouteGuard = ({ children, requiredPermissionLevel }) => {
  const user = getUserFromToken();
  const router = useRouter();

  const pathname = usePathname()

  React.useEffect(() => {
    // Wait until the router is ready to access the pathname
    
    
    // Allow unrestricted access to the signup route
    if (pathname === '/auth/signup') {
      return;
    }

    // For other routes, apply the permission level check
    if (!user || user.permissionLevel < requiredPermissionLevel) {
      // Redirect to the signin page
      router.push('/auth/signin');
    }
  }, [user, requiredPermissionLevel, router]);

  return <>{children}</>;
};

export default RouteGuard;
