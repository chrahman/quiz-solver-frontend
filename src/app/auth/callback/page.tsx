"use client";

import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import CustomContainer from "@/components/custom-components/Common/CustomContainer";
import { API_CONFIG } from "@/config/api";

export default function GoogleCallbackPage({ searchParams }: { searchParams: Promise<{ token?: string; error?: string }> }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = use(searchParams);
  const { login } = useAuth();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const token = params.token;
        const error = params.error;

        if (error) {
          setError("Google authentication failed. Please try again.");
          setIsLoading(false);
          return;
        }

        if (!token) {
          setError("No access token received from authentication.");
          setIsLoading(false);
          return;
        }

        // Store the token and redirect to dashboard
        localStorage.setItem("accessToken", token);

        // Set cookie for middleware
        document.cookie = `accessToken=${token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days

        // Get user profile to store user data
        try {
          const profileResponse = await fetch(`${API_CONFIG.BASE_URL}/auth/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (profileResponse.ok) {
            const userData = await profileResponse.json();
            localStorage.setItem("user", JSON.stringify(userData));
          }
        } catch (profileError) {
          console.warn("Could not fetch user profile:", profileError);
        }

        // Redirect to dashboard
        router.push("/dashboard");
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    handleGoogleCallback();
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <CustomContainer>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Completing Google Sign-In</h2>
            <p className="text-gray-600 dark:text-gray-300">Please wait while we verify your account...</p>
          </div>
        </CustomContainer>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <CustomContainer>
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Authentication Failed</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => router.push("/login")} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Try Again
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </CustomContainer>
      </div>
    );
  }

  return null;
}
