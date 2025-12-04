"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function StaggerContainer({ 
  children, 
  className,
  delay = 0.1,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// Pre-built grid for cards
interface StaggerGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export function StaggerGrid({ 
  children, 
  columns = 3, 
  gap = "md",
  className = "",
}: StaggerGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };
  
  const gapSizes = {
    sm: "gap-3",
    md: "gap-4 md:gap-6",
    lg: "gap-6 md:gap-8",
  };

  return (
    <StaggerContainer className={`grid ${gridCols[columns]} ${gapSizes[gap]} ${className}`}>
      {children}
    </StaggerContainer>
  );
}
