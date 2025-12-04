"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
}

export function CountUp({ 
  end, 
  start = 0,
  duration = 2, 
  prefix = "", 
  suffix = "",
  decimals = 0,
  separator = ",",
  className,
}: CountUpProps) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = start + (end - start) * easeOutQuart;
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure exact end value
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, start, end, duration]);

  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals);
    const [intPart, decPart] = fixed.split(".");
    const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return decPart ? `${formatted}.${decPart}` : formatted;
  };

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

// Pre-built stat card with animation
interface AnimatedStatProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedStat({ 
  value, 
  label, 
  prefix, 
  suffix,
  className = "",
}: AnimatedStatProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="text-3xl font-bold tracking-tight">
        <CountUp end={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
