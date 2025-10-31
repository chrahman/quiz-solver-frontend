"use client";

import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomContainer from "@/components/custom-components/Common/CustomContainer";
import { API_CONFIG } from "@/config/api";
import { handleSuccessfulLogin } from "@/utils/extension-integration";

export default function GoogleCallbackPage({ searchParams }: { searchParams: Promise<{ token?: string; code?: string; error?: string }> }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = use(searchParams);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const token = params.token;
        const code = params.code;
        const error = params.error;

        if (error) {
          setError("Google authentication failed. Please try again.");
          setIsLoading(false);
          return;
        }

        // If we have a token (from backend redirect), use it directly
        if (token) {
          // Store the token and redirect to dashboard
          localStorage.setItem("accessToken", token);

          // Set cookie for middleware
          document.cookie = `accessToken=${token}; path=/; max-age=${30 * 24 * 60 * 60}`; // 30 days

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

              // Send authentication to extension
              await handleSuccessfulLogin({
                accessToken: token,
                user: userData,
              });
            }
          } catch (profileError) {
            console.warn("Could not fetch user profile:", profileError);
          }

          // Redirect to dashboard
          router.push("/dashboard");
          return;
        }

        // If we have an authorization code, send it to backend for processing
        if (code) {
          try {
            // Send authorization code to backend for secure processing
            const response = await fetch(`${API_CONFIG.BASE_URL}/auth/google/callback`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                code,
                redirectUri: window.location.origin + "/auth/google/callback",
              }),
            });

            if (response.ok) {
              const data = await response.json();

              // Store tokens and user data
              localStorage.setItem("accessToken", data.accessToken);
              localStorage.setItem("refreshToken", data.refreshToken);
              localStorage.setItem("user", JSON.stringify(data.user));

              // Set cookies for middleware
              document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${30 * 24 * 60 * 60}`; // 30 days
              document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=${30 * 24 * 60 * 60}`; // 30 days

              // Send authentication to extension
              await handleSuccessfulLogin({
                accessToken: data.accessToken,
                user: data.user,
              });

              window.location.href = "/dashboard";
            } else {
              setError("Authentication failed. Please try again.");
              setIsLoading(false);
            }
          } catch (err) {
            console.error("Google callback error:", err);
            setError("Network error. Please try again.");
            setIsLoading(false);
          }
          return;
        }

        // If neither token nor code, show error
        setError("No authentication data received.");
        setIsLoading(false);
      } catch (err) {
        console.error("Google callback error:", err);
        setError("Network error. Please try again.");
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
