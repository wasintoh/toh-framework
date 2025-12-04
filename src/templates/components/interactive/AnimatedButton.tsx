"use client";

import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface AnimatedButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const MotionButton = motion.button;

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <MotionButton
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
        {...(props as MotionProps)}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </MotionButton>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

// CTA Button with glow effect
interface CTAButtonProps extends AnimatedButtonProps {
  glowColor?: string;
}

export function CTAButton({ 
  className, 
  glowColor = "rgba(59, 130, 246, 0.4)",
  ...props 
}: CTAButtonProps) {
  return (
    <motion.div
      whileHover={{ 
        boxShadow: `0 0 30px 5px ${glowColor}`,
      }}
      transition={{ duration: 0.2 }}
      className="inline-block rounded-lg"
    >
      <AnimatedButton
        className={cn("relative", className)}
        size="lg"
        {...props}
      />
    </motion.div>
  );
}

// Icon button with rotation
interface IconButtonProps extends AnimatedButtonProps {
  rotateOnHover?: boolean;
}

export function IconButton({ 
  rotateOnHover = false,
  children,
  className,
  ...props 
}: IconButtonProps) {
  return (
    <AnimatedButton
      size="icon"
      variant="ghost"
      className={className}
      {...props}
    >
      <motion.div
        whileHover={rotateOnHover ? { rotate: 180 } : undefined}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatedButton>
  );
}
