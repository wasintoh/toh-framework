import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

export function LoadingSpinner({ 
  size = "md", 
  className,
  label,
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2 
        className={cn(
          "animate-spin text-primary",
          sizeClasses[size],
          className
        )} 
      />
      {label && (
        <span className="text-sm text-muted-foreground">{label}</span>
      )}
    </div>
  );
}

// Full page loading
export function PageLoading({ label }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <LoadingSpinner size="lg" label={label} />
    </div>
  );
}

// Inline loading (for buttons, etc.)
export function InlineLoading({ className }: { className?: string }) {
  return <Loader2 className={cn("h-4 w-4 animate-spin", className)} />;
}

// Loading with overlay
interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  label?: string;
}

export function LoadingOverlay({ 
  isLoading, 
  children, 
  label,
}: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <LoadingSpinner size="lg" label={label} />
        </div>
      )}
    </div>
  );
}
