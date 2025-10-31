"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import CustomContainer from "@/components/custom-components/Common/CustomContainer";
import CustomButton from "@/components/custom-components/Common/CustomButton";
import DashboardNavbar from "@/components/custom-components/Common/DashboardNavbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Navigation */}
        <DashboardNavbar user={user} onLogout={handleLogout} />

        {/* Dashboard Content */}
        <div className="py-12">
          <CustomContainer>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Quiz Solver Dashboard</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">Manage your account and access all features for free</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader className="text-center pb-4 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900">Account Info</h3>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Name:</span> {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Email:</span> {user.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Role:</span> {user.role}
                      </p>
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-white shadow-lg border-0">
                  <CardHeader className="text-center pb-4 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900">Download Extension</h3>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <p className="text-sm text-gray-600 mb-4">Get the Quiz Solver Chrome extension to start solving quizzes with AI assistance.</p>
                    <CustomButton
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      size="lg"
                      onPress={() => window.open("https://chromewebstore.google.com/detail/ai-quiz-solver-vu-firewal/jcolddifbbbfedagdgfieejohhmolffk?hl=en-US&utm_source=ext_sidebar", "_blank")}
                    >
                      Download Extension
                    </CustomButton>
                  </CardBody>
                </Card>

                <Card className="bg-white shadow-lg border-0">
                  <CardHeader className="text-center pb-4 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900">Your Free Plan</h3>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Plan:</span> Free Forever
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Status:</span> Active
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Features:</span> All features included
                      </p>
                    </div>
                    <CustomButton className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
                      ✓ All Features Unlocked
                    </CustomButton>
                  </CardBody>
                </Card>
              </div>
            </div>
          </CustomContainer>
        </div>
      </div>
    </ProtectedRoute>
  );
}
