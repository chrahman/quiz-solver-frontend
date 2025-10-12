"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Badge } from "@heroui/badge";
import { IconRobot, IconBolt, IconCode, IconBrowser } from "@tabler/icons-react";
import CustomContainer from "@/components/custom-components/Common/CustomContainer";
import CustomButton from "@/components/custom-components/Common/CustomButton";
import CustomNavbar from "@/components/custom-components/Common/CustomNavbar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Link } from "@heroui/link";
import { API_CONFIG } from "@/config/api";

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [pricingData, setPricingData] = useState({
    planDurations: [],
    planPayments: [],
  });

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    loadPricingData();
  }, []);

  const loadPricingData = async () => {
    try {
      // Load plan durations
      const durationsResponse = await fetch(`${API_CONFIG.BASE_URL}/plan-durations`);
      if (durationsResponse.ok) {
        const durations = await durationsResponse.json();
        setPricingData((prev) => ({ ...prev, planDurations: durations }));
      }

      // Load plan payments
      const paymentsResponse = await fetch(`${API_CONFIG.BASE_URL}/plan-payments`);
      if (paymentsResponse.ok) {
        const payments = await paymentsResponse.json();
        setPricingData((prev) => ({ ...prev, planPayments: payments }));
      }
    } catch (error) {
      console.error("Error loading pricing data:", error);
    }
  };

  const menuItems = [
    { name: "About", href: "#about" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Pricing", href: "#pricing" },
  ];

  const features = [
    {
      title: "AI-Powered Quiz Assistance",
      description: "Automatically detects quiz questions and provides instant AI-powered assistance using ChatGPT with real-time streaming responses.",
      icon: IconRobot,
    },
    {
      title: "Smart Lecture Skipping",
      description: "Skip lectures with intelligent cooldown system (50,000 skips limit, 90-second cooldown) and progress tracking.",
      icon: IconBolt,
    },
    {
      title: "Enhanced Formatting",
      description: "Markdown support with syntax highlighting for code blocks, making responses more readable and professional.",
      icon: IconCode,
    },
    {
      title: "Seamless Browser Integration",
      description: "Works directly in Chrome with VU's learning management system through a beautiful side modal interface.",
      icon: IconBrowser,
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out the extension",
      features: ["5 quiz questions per day", "Basic AI assistance", "Community support"],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      price: "$5.00",
      period: "per month",
      description: "Best for regular students",
      features: ["Unlimited quiz questions", "Advanced AI assistance", "Priority support", "Study analytics"],
      buttonText: "Upgrade Now",
      popular: true,
    },
    // {
    //   name: "Enterprise",
    //   price: "Custom",
    //   period: "pricing",
    //   description: "For organizations and institutions",
    //   features: ["Everything in Premium", "Custom integrations", "Dedicated support", "Advanced analytics"],
    //   buttonText: "Contact Sales",
    //   popular: false,
    // },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <CustomNavbar menuItems={menuItems} user={user} onLogout={handleLogout} />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <CustomContainer>
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="relative inline-block">
                <Chip color="primary" variant="flat" size="lg" className="pr-8">
                  <span className="mr-2">🚀</span>
                  AI-Powered Learning
                </Chip>
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
              Solve VU Quizzes
              <br />
              <span className="text-4xl lg:text-6xl">with AI</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              The revolutionary Chrome extension that helps VU students with quizzes and lecture skipping. Get AI-powered assistance with automatic question detection, real-time streaming responses,
              and smart lecture skipping capabilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <CustomButton color="primary" size="lg" className="text-lg px-8 py-6" as={Link} href="#pricing">
                Start Free Trial
              </CustomButton>
              <CustomButton variant="bordered" size="lg" className="text-lg px-8 py-6" as={Link} href="#about">
                Learn More
              </CustomButton>
            </div>

            <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Setup in 2 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Works on all browsers</span>
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white/50 dark:bg-gray-800/50">
        <CustomContainer>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Powerful Features for VU Students</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to excel in your Virtual University journey with AI-powered assistance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="text-center pb-4 pt-6">
                    <div className="w-12 h-12 mx-auto bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <p className="text-gray-600 text-sm leading-relaxed text-center">{feature.description}</p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </CustomContainer>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <CustomContainer>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for your learning journey</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 ${plan.popular ? "ring-2 ring-blue-500 shadow-lg" : ""}`}>
                <CardHeader className="text-center pb-4 pt-6 flex flex-col items-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{plan.name} plan</h3>

                  <div className="mb-4">
                    {plan.name === "Free" ? (
                      <div className="text-3xl font-bold text-blue-600">Free</div>
                    ) : (
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-3xl font-bold text-blue-600">{plan.price}</span>
                        <span className="text-gray-500 text-sm">/{plan.period}</span>
                        {plan.name === "Pro" && <span className="text-sm text-gray-400 line-through">$49.99/month</span>}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardBody className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <CustomButton color="primary" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200" size="lg">
                    {plan.buttonText}
                  </CustomButton>
                </CardBody>
              </Card>
            ))}
          </div>
        </CustomContainer>
      </section>

      {/* Privacy Policy Section */}
      <section id="privacy" className="py-20 bg-white/50 dark:bg-gray-800/50">
        <CustomContainer>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Your Privacy Matters</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">We are committed to protecting your privacy and ensuring your data is secure</p>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <CardBody className="text-center">
                  <div className="text-4xl mb-4">🔐</div>
                  <h3 className="text-xl font-semibold mb-3">End-to-End Encryption</h3>
                  <p className="text-gray-600 dark:text-gray-300">All your data is encrypted and never stored on our servers</p>
                </CardBody>
              </Card>

              <Card className="p-6">
                <CardBody className="text-center">
                  <div className="text-4xl mb-4">🚫</div>
                  <h3 className="text-xl font-semibold mb-3">No Data Selling</h3>
                  <p className="text-gray-600 dark:text-gray-300">We never sell or share your personal information with third parties</p>
                </CardBody>
              </Card>

              <Card className="p-6">
                <CardBody className="text-center">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h3 className="text-xl font-semibold mb-3">GDPR Compliant</h3>
                  <p className="text-gray-600 dark:text-gray-300">Fully compliant with international privacy regulations</p>
                </CardBody>
              </Card>
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <CustomContainer>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">QS</span>
                </div>
                <p className="font-bold text-lg">Quiz Solver</p>
              </div>
              <p className="text-gray-400">AI-powered quiz assistance for VU students. Learn smarter, not harder.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#about" className="text-gray-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Download
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Status
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Divider className="my-8 bg-gray-700" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 Quiz Solver. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white">
                Twitter
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                LinkedIn
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                GitHub
              </Link>
            </div>
          </div>
        </CustomContainer>
      </footer>
    </div>
  );
}
