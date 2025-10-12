"use client";

import { NavbarBrand } from "@heroui/navbar";
import { Link } from "@heroui/link";

interface NavbarBrandProps {
  variant?: "default" | "dashboard";
}

export default function NavbarBrandComponent({ variant = "default" }: NavbarBrandProps) {
  const isDashboard = variant === "dashboard";

  return (
    <NavbarBrand>
      <Link href="/">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            <div
              className={`${
                isDashboard ? "w-10 h-10" : "w-12 h-12"
              } bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
            >
              <span className={`text-white font-bold ${isDashboard ? "text-sm" : "text-xl"}`}>QS</span>
            </div>
            {!isDashboard && <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>}
          </div>
          <div className="flex flex-col">
            <p className={`font-bold ${isDashboard ? "text-xl" : "text-2xl"} bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>Quiz Solver</p>
            <p className={`text-xs text-gray-500 dark:text-gray-400 -mt-1`}>{isDashboard ? "Dashboard" : "AI-Powered"}</p>
          </div>
        </div>
      </Link>
    </NavbarBrand>
  );
}
