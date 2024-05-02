"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Corrected import statement
import getUserFromToken from "@/utilities/getUserFromToken ";
import { usePathname } from "next/navigation";

const RouteGuard = ({ children, requiredPermissionLevel }) => {
  const router = useRouter();
  const user = getUserFromToken();
  const pathname = usePathname();

  React.useEffect(() => {
    // Wait until the router is ready to access the pathname

    // Allow unrestricted access to the signup route
    if (pathname === "/auth/signup") {
      return;
    }

    // For other routes, apply the permission level check
    if (!user || user.permissionLevel < requiredPermissionLevel) {
      // Redirect to the signin page
      router.push("/");
    }
  }, [user, requiredPermissionLevel, router]);

  return <>{children}</>;
};

export default RouteGuard;
