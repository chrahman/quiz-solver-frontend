"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { IconMail, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";
import CustomContainer from "@/components/custom-components/Common/CustomContainer";
import CustomButton from "@/components/custom-components/Common/CustomButton";
import CustomFormInput from "@/components/custom-components/Common/CustomFormInput";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { API_CONFIG } from "@/config/api";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const success = await login(data.email, data.password);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Redirect to backend Google OAuth endpoint
      window.location.href = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.GOOGLE}`;
    } catch {
      setError("Google login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12">
      <CustomContainer>
        <div className="max-w-md mx-auto">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">QS</span>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Quiz Solver</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1">AI-Powered</p>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-300">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-4 pt-6">
              <h2 className="text-xl font-semibold text-gray-900">Sign In</h2>
            </CardHeader>

            <CardBody className="pt-0">
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Google Login Button */}
              <CustomButton
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full mb-4 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
                size="lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </CustomButton>

              <div className="flex items-center my-6">
                <Divider className="flex-1" />
                <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
                <Divider className="flex-1" />
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <CustomFormInput
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    {...register("email")}
                    startContent={<IconMail className="w-4 h-4 text-gray-400" />}
                    isRequired
                    variant="flat"
                    errorMessage={errors.email?.message}
                  />
                </div>

                <div>
                  <CustomFormInput
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="Enter your password"
                    {...register("password")}
                    startContent={<IconLock className="w-4 h-4 text-gray-400" />}
                    endContent={
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-800 rounded p-1 transition-colors">
                        {showPassword ? <IconEyeOff className="w-4 h-4 text-gray-400" /> : <IconEye className="w-4 h-4 text-gray-400" />}
                      </button>
                    }
                    isRequired
                    errorMessage={errors.password?.message}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </Link>
                </div>

                <CustomButton type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200" size="lg">
                  {isLoading ? "Signing in..." : "Sign In"}
                </CustomButton>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </CustomContainer>
    </div>
  );
}
