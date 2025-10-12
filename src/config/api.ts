export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      GOOGLE: "/auth/google",
      REFRESH: "/auth/refresh",
      LOGOUT: "/auth/logout",
    },
    USER: {
      PROFILE: "/users/profile",
      PLANS: "/user-plans/my-plans",
    },
    PLANS: {
      DURATIONS: "/plan-durations",
      PAYMENTS: "/plan-payments",
    },
    AI: {
      ASK_STREAM: "/ask-question/ask-stream",
    },
  },
} as const;
