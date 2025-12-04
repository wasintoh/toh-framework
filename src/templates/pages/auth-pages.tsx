"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageTransition, FadeInUp } from "@/components/motion";
import { AnimatedButton } from "@/components/interactive";

// ============================================
// LOGIN PAGE
// ============================================
export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <FadeInUp>
              <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                <p className="mt-2 text-muted-foreground">
                  Sign in to your account to continue
                </p>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      href="/auth/forgot-password" 
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <AnimatedButton 
                  type="submit" 
                  className="w-full"
                  isLoading={isLoading}
                  loadingText="Signing in..."
                >
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </AnimatedButton>
              </form>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <Chrome className="h-4 w-4 mr-2" />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </FadeInUp>
          </div>
        </div>

        {/* Right side - Branding */}
        <div className="hidden lg:flex flex-1 bg-muted items-center justify-center p-8">
          <div className="max-w-md text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">T</span>
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">Your App Name</h2>
            <p className="text-muted-foreground">
              A brief tagline or description of your product that highlights its value.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

// ============================================
// REGISTER PAGE
// ============================================
export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-1 bg-muted items-center justify-center p-8">
          <div className="max-w-md text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">T</span>
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">Join thousands of users</h2>
            <p className="text-muted-foreground">
              Start building amazing products with our platform today.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <FadeInUp>
              <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
                <p className="mt-2 text-muted-foreground">
                  Enter your details to get started
                </p>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>

                <AnimatedButton 
                  type="submit" 
                  className="w-full"
                  isLoading={isLoading}
                  loadingText="Creating account..."
                >
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </AnimatedButton>
              </form>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <p className="text-center text-xs text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-foreground">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </Link>
                .
              </p>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </FadeInUp>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

// Export default login
export default LoginPage;
