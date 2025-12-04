"use client";

import { motion, useInView, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const getDirectionVariants = (direction: Direction): Variants => {
  const directionOffset = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
    none: {},
  };

  return {
    hidden: { 
      opacity: 0, 
      ...directionOffset[direction],
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
    },
  };
};

export function FadeIn({ 
  children, 
  className,
  direction = "up",
  delay = 0,
  duration = 0.4,
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const variants = getDirectionVariants(direction);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Shorthand components for common directions
export function FadeInUp({ children, ...props }: Omit<FadeInProps, "direction">) {
  return <FadeIn direction="up" {...props}>{children}</FadeIn>;
}

export function FadeInDown({ children, ...props }: Omit<FadeInProps, "direction">) {
  return <FadeIn direction="down" {...props}>{children}</FadeIn>;
}

export function FadeInLeft({ children, ...props }: Omit<FadeInProps, "direction">) {
  return <FadeIn direction="left" {...props}>{children}</FadeIn>;
}

export function FadeInRight({ children, ...props }: Omit<FadeInProps, "direction">) {
  return <FadeIn direction="right" {...props}>{children}</FadeIn>;
}
