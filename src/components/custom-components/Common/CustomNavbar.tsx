"use client";

import { useState } from "react";
import { Navbar, NavbarContent } from "@heroui/navbar";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import NavbarBrand from "./NavbarBrand";
import NavbarMenu from "./NavbarMenu";
import NavbarActions from "./NavbarActions";

export interface MenuItem {
  name: string;
  href: string;
}

export interface NavbarProps {
  variant?: "default" | "dashboard";
  menuItems?: MenuItem[];
  showDownloadButton?: boolean;
  showUserActions?: boolean;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  } | null;
  onLogout?: () => void;
  className?: string;
}

export default function CustomNavbar({ variant = "default", menuItems = [], showDownloadButton = true, showUserActions = true, user, onLogout, className = "" }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useBreakpoint("sm", "down");

  const baseClassName = "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 shadow-lg shadow-black/5";
  const variantClassName = variant === "dashboard" ? "min-h-[60px] py-2" : "min-h-[80px] py-4";

  const navbarClassName = `${baseClassName} ${variantClassName} ${className}`;

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className={navbarClassName} maxWidth="xl" isBordered>
      <NavbarContent>
        <NavbarBrand variant={variant} />
      </NavbarContent>

      {isMobile && menuItems.length > 0 && <NavbarMenu menuItems={menuItems} isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} variant="mobile" />}

      {!isMobile && (
        <>
          {menuItems.length > 0 && <NavbarMenu menuItems={menuItems} variant="desktop" />}

          <NavbarActions showDownloadButton={showDownloadButton} showUserActions={showUserActions} user={user || undefined} onLogout={onLogout} />
        </>
      )}
    </Navbar>
  );
}
