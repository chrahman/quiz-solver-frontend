import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Quiz Solver for VU - AI-Powered Quiz Assistant",
  description: "Revolutionary browser extension that helps VU students solve quizzes with AI assistance. Get instant answers and improve your academic performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="drawer-portal">
      <head>
        <meta name="google-site-verification" content="JLUCyXVLAgL1E5MKu0BWJMKIMcf2u-NWYeLnWdlxdeY" />
      </head>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
