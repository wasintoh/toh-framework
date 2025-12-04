"use client";

import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedCardProps extends Omit<MotionProps, "children"> {
  children: ReactNode;
  className?: string;
  hoverEffect?: "lift" | "glow" | "border" | "scale" | "none";
}

const hoverVariants = {
  lift: {
    whileHover: { y: -4, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.15)" },
    transition: { duration: 0.2 },
  },
  glow: {
    whileHover: { boxShadow: "0 0 20px 2px rgba(59, 130, 246, 0.3)" },
    transition: { duration: 0.2 },
  },
  border: {
    whileHover: { borderColor: "rgba(59, 130, 246, 0.5)" },
    transition: { duration: 0.2 },
  },
  scale: {
    whileHover: { scale: 1.02 },
    transition: { duration: 0.2 },
  },
  none: {
    whileHover: {},
    transition: { duration: 0 },
  },
};

export function AnimatedCard({ 
  children, 
  className,
  hoverEffect = "lift",
  ...motionProps
}: AnimatedCardProps) {
  const variant = hoverVariants[hoverEffect];
  
  return (
    <motion.div
      className={cn(
        "rounded-xl border bg-card p-6 transition-colors",
        className
      )}
      whileHover={variant.whileHover}
      transition={variant.transition}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

// Stat card with animation
interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <AnimatedCard className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        {trend && (
          <span className={cn(
            "text-sm font-medium",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            {trend.isPositive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </AnimatedCard>
  );
}

// Feature card for landing pages
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <AnimatedCard className={cn("text-center md:text-left", className)}>
      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </AnimatedCard>
  );
}
