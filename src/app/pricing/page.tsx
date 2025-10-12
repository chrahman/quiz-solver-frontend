"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Divider } from "@heroui/divider";
import { IconCheck, IconStar, IconCrown, IconRocket } from "@tabler/icons-react";
import CustomContainer from "@/components/custom-components/Common/CustomContainer";
import CustomButton from "@/components/custom-components/Common/CustomButton";
import CustomNavbar from "@/components/custom-components/Common/CustomNavbar";
import { useAuth } from "@/contexts/AuthContext";
import { API_CONFIG } from "@/config/api";

interface PlanDuration {
  id: string;
  name: string;
  durationInMonths: number;
  discountPercentage: number;
  isActive: boolean;
}

interface PlanPayment {
  id: string;
  planType: string;
  monthlyCost: number;
  isActive: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyCost: number;
  duration: number;
  discount: number;
  features: string[];
  isPopular?: boolean;
  isPremium?: boolean;
}

export default function PricingPage() {
  const { user } = useAuth();
  const [planDurations, setPlanDurations] = useState<PlanDuration[]>([]);
  const [planPayments, setPlanPayments] = useState<PlanPayment[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState<string>("");

  useEffect(() => {
    loadPricingData();
  }, []);

  const loadPricingData = async () => {
    try {
      setIsLoading(true);

      // Load plan durations
      const durationsResponse = await fetch(`${API_CONFIG.BASE_URL}/plan-durations`);
      if (durationsResponse.ok) {
        const durations = await durationsResponse.json();
        setPlanDurations(durations);
        if (durations.length > 0) {
          setSelectedDuration(durations[0].id);
        }
      }

      // Load plan payments
      const paymentsResponse = await fetch(`${API_CONFIG.BASE_URL}/plan-payments`);
      if (paymentsResponse.ok) {
        const payments = await paymentsResponse.json();
        setPlanPayments(payments);
      }

      // Generate pricing plans
      generatePricingPlans();
    } catch (error) {
      console.error("Error loading pricing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePricingPlans = () => {
    const plans: PricingPlan[] = [
      {
        id: "free",
        name: "Free Plan",
        description: "Perfect for getting started",
        monthlyCost: 0,
        duration: 1,
        discount: 0,
        features: ["5 quiz questions per day", "Basic AI assistance", "Standard response time", "Community support", "Basic analytics"],
      },
      {
        id: "premium-monthly",
        name: "Premium Monthly",
        description: "Best for regular users",
        monthlyCost: 500,
        duration: 1,
        discount: 0,
        features: ["Unlimited quiz questions", "Advanced AI assistance", "Priority response time", "Premium support", "Advanced analytics", "Export results", "Custom settings"],
        isPopular: true,
      },
      {
        id: "premium-yearly",
        name: "Premium Yearly",
        description: "Best value for committed users",
        monthlyCost: 400,
        duration: 12,
        discount: 20,
        features: [
          "Unlimited quiz questions",
          "Advanced AI assistance",
          "Priority response time",
          "Premium support",
          "Advanced analytics",
          "Export results",
          "Custom settings",
          "Early access to features",
          "Priority customer support",
        ],
        isPremium: true,
      },
    ];

    setPricingPlans(plans);
  };

  const handleSelectPlan = async (plan: PricingPlan) => {
    if (!user) {
      // Redirect to login
      window.location.href = "/login";
      return;
    }

    try {
      // Here you would integrate with payment processing
      // For now, we'll just show a success message
      alert(`Selected ${plan.name} - Payment integration coming soon!`);
    } catch (error) {
      console.error("Error selecting plan:", error);
      alert("Error selecting plan. Please try again.");
    }
  };

  const formatPrice = (cost: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(cost);
  };

  const menuItems = [
    { name: "About", href: "#about" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Pricing", href: "#pricing" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <CustomNavbar menuItems={menuItems} user={user} />
        <CustomContainer className="py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading pricing plans...</p>
          </div>
        </CustomContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <CustomNavbar menuItems={menuItems} user={user} />

      {/* Hero Section */}
      <CustomContainer className="py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your <span className="gradient-text">Perfect Plan</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Unlock the full potential of AI-powered quiz solving with our flexible pricing plans. Start free and upgrade when you&apos;re ready for more.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.isPopular ? "ring-2 ring-blue-500 shadow-xl scale-105" : plan.isPremium ? "ring-2 ring-purple-500 shadow-lg" : "shadow-lg"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2 text-sm font-semibold">
                  <IconStar className="w-4 h-4 inline mr-1" />
                  Most Popular
                </div>
              )}

              {plan.isPremium && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-semibold">
                  <IconCrown className="w-4 h-4 inline mr-1" />
                  Best Value
                </div>
              )}

              <CardHeader className="pb-4 pt-6">
                <div className="text-center w-full">
                  <div className="flex items-center justify-center mb-4">
                    {plan.id === "free" ? (
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <IconRocket className="w-6 h-6 text-gray-600" />
                      </div>
                    ) : plan.isPremium ? (
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <IconCrown className="w-6 h-6 text-white" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <IconStar className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">{formatPrice(plan.monthlyCost)}</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
                    </div>
                    {plan.discount > 0 && (
                      <div className="mt-2">
                        <Badge color="success" variant="flat">
                          Save {plan.discount}%
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardBody className="pt-0">
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <IconCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <CustomButton
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                      : plan.isPremium
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  }`}
                  size="lg"
                >
                  {plan.id === "free" ? "Get Started Free" : "Choose Plan"}
                </CustomButton>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Can I change my plan anytime?</h3>
                <p className="text-gray-600 dark:text-gray-300">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Is there a free trial?</h3>
                <p className="text-gray-600 dark:text-gray-300">Yes! Our free plan includes 5 quiz questions per day with basic AI assistance.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600 dark:text-gray-300">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-600 dark:text-gray-300">Absolutely! You can cancel your subscription at any time with no cancellation fees.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Quizzes?</h2>
            <p className="text-xl mb-6 opacity-90">Join thousands of students who are already using Quiz Solver to improve their grades.</p>
            <CustomButton size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
              Start Your Free Trial
            </CustomButton>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
}
