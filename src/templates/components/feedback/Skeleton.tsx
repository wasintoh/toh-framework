"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
    />
  );
}

// Pre-built skeleton patterns
export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export function SkeletonList({ count = 5, className }: SkeletonProps & { count?: number }) {
  return (
    <div className={cn("space-y-3", className)}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4, className }: SkeletonProps & { rows?: number; cols?: number }) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex gap-4">
        {[...Array(cols)].map((_, i) => (
          <Skeleton key={i} className="h-8 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4">
          {[...Array(cols)].map((_, j) => (
            <Skeleton key={j} className="h-12 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonStats({ count = 4, className }: SkeletonProps & { count?: number }) {
  return (
    <div className={cn("grid gap-4", className)} style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="space-y-2 p-4 rounded-xl border">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonDashboard({ className }: SkeletonProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Stats */}
      <SkeletonStats count={4} />
      
      {/* Chart area */}
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
      
      {/* Table */}
      <SkeletonTable rows={5} cols={5} />
    </div>
  );
}
