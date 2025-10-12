"use client";

import { NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { IconMenuDeep } from "@tabler/icons-react";
import { MenuItem } from "./CustomNavbar";

interface NavbarMenuProps {
  menuItems: MenuItem[];
  variant: "mobile" | "desktop";
  isMenuOpen?: boolean;
  onMenuToggle?: () => void;
}

export default function NavbarMenuComponent({ menuItems, variant, isMenuOpen = false, onMenuToggle }: NavbarMenuProps) {
  if (variant === "mobile") {
    return (
      <Dropdown>
        <DropdownTrigger>
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <IconMenuDeep size={24} />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {menuItems.map((item) => (
            <DropdownItem key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <NavbarContent className="hidden sm:flex gap-1" justify="center">
      {menuItems.map((item) => (
        <NavbarItem key={item.name}>
          <Link color="foreground" href={item.href} className="relative px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group">
            <span className="relative z-10 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.name}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </NavbarItem>
      ))}
    </NavbarContent>
  );
}
