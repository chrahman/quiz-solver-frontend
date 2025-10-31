"use client";

import { NavbarContent, NavbarItem } from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { IconLogout } from "@tabler/icons-react";
import Image from "next/image";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface NavbarActionsProps {
  showDownloadButton?: boolean;
  showUserActions?: boolean;
  user?: User | null;
  onLogout?: () => void;
}

export default function NavbarActions({ showDownloadButton = true, showUserActions = true, user, onLogout }: NavbarActionsProps) {
  return (
    <NavbarContent justify="end">
      <NavbarItem className="hidden sm:flex">
        <div className="flex items-center gap-4">
          {showDownloadButton && (
            <Button
              as={Link}
              color="default"
              variant="bordered"
              href="#download"
              size="lg"
              className="font-medium bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-700 transition-colors px-6 flex items-center gap-2"
              onPress={() => window.open("https://chromewebstore.google.com/detail/ai-quiz-solver-vu-firewal/jcolddifbbbfedagdgfieejohhmolffk?hl=en-US&utm_source=ext_sidebar", "_blank")}
            >
              <Image width={20} height={20} src="/chrome-webstore.svg" alt="Chrome Web Store" className="w-5 h-5" />
              Download Extension
            </Button>
          )}

          {showUserActions && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  <Button as={Link} color="default" variant="solid" href="/dashboard" size="lg" className="font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors px-6">
                    Dashboard
                  </Button>
                  <Button
                    onClick={onLogout}
                    color="default"
                    variant="light"
                    size="lg"
                    className="font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors px-4 flex items-center gap-2"
                  >
                    <IconLogout className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button as={Link} color="default" variant="solid" href="/login" size="lg" className="font-medium bg-gray-800 hover:bg-gray-900 text-white transition-colors px-6">
                  Login
                </Button>
              )}
            </>
          )}
        </div>
      </NavbarItem>
    </NavbarContent>
  );
}
