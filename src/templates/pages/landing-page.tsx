"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Star, Zap, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  PageTransition, 
  StaggerContainer, 
  StaggerItem,
  FadeInUp,
  CountUp,
} from "@/components/motion";
import { AnimatedCard, CTAButton } from "@/components/interactive";

// ============================================
// HERO SECTION
// ============================================
export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Floating shapes (subtle) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <FadeInUp delay={0}>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>New: Feature announcement</span>
            </div>
          </FadeInUp>

          {/* Headline */}
          <FadeInUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Your compelling headline{" "}
              <span className="text-primary">goes here</span>
            </h1>
          </FadeInUp>

          {/* Subheadline */}
          <FadeInUp delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A brief description that explains the value proposition of your product 
              or service. Keep it concise and compelling.
            </p>
          </FadeInUp>

          {/* CTA Buttons */}
          <FadeInUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton size="lg">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </CTAButton>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </FadeInUp>

          {/* Social proof */}
          <FadeInUp delay={0.4}>
            <div className="flex items-center justify-center gap-2 mt-8 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-muted border-2 border-background"
                  />
                ))}
              </div>
              <span>Trusted by 1,000+ users</span>
              <div className="flex text-yellow-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}

// ============================================
// STATS SECTION
// ============================================
export function StatsSection() {
  const stats = [
    { value: 10000, suffix: "+", label: "Active Users" },
    { value: 99.9, suffix: "%", label: "Uptime" },
    { value: 50, suffix: "M+", label: "Transactions" },
    { value: 24, suffix: "/7", label: "Support" },
  ];

  return (
    <section className="py-16 border-y bg-muted/30">
      <div className="container">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StaggerItem key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold tracking-tight">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ============================================
// FEATURES SECTION
// ============================================
export function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Experience blazing fast performance with our optimized infrastructure.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure by Default",
      description: "Enterprise-grade security to keep your data safe and protected.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered",
      description: "Leverage artificial intelligence to automate and enhance your workflow.",
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <FadeInUp className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All the features you need to build amazing products, packed into one platform.
          </p>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <AnimatedCard className="h-full">
                <div className="inline-flex rounded-lg bg-primary/10 p-3 text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ============================================
// PRICING SECTION
// ============================================
export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for getting started",
      features: ["Up to 3 projects", "Basic analytics", "Email support"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For growing teams",
      features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom integrations"],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: ["Everything in Pro", "Dedicated support", "SLA guarantee", "Custom contracts"],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <FadeInUp className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for you. No hidden fees.
          </p>
        </FadeInUp>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <StaggerItem key={index}>
              <AnimatedCard 
                className={`h-full flex flex-col ${
                  plan.popular ? "border-primary ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full self-start mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ============================================
// CTA SECTION
// ============================================
export function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <FadeInUp>
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers using our platform. 
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Start Free Trial
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Talk to Sales
              </Button>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

// ============================================
// FULL LANDING PAGE
// ============================================
export default function LandingPage() {
  return (
    <PageTransition>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </PageTransition>
  );
}
