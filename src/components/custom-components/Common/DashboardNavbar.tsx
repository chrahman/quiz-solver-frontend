"use client";

import CustomContainer from "./CustomContainer";
import CustomButton from "./CustomButton";
import Link from "next/link";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface DashboardNavbarProps {
  user: User;
  onLogout: () => void;
}

export default function DashboardNavbar({ user, onLogout }: DashboardNavbarProps) {
  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 shadow-lg">
      <CustomContainer>
        <div className="flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">QS</span>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Quiz Solver</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Dashboard</p>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-300">Welcome, {user.firstName}!</span>
            <CustomButton onClick={onLogout} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg">
              Logout
            </CustomButton>
          </div>
        </div>
      </CustomContainer>
    </nav>
  );
}
