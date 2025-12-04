import { cn } from "@/lib/utils";
import { LucideIcon, FileQuestion, Inbox, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4 text-center",
      className
    )}>
      <div className="rounded-full bg-muted p-4 mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
      )}
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-col sm:flex-row gap-2">
          {actionLabel && onAction && (
            <Button onClick={onAction}>{actionLabel}</Button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <Button variant="outline" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Pre-built empty states for common cases
export function NoDataEmpty({ 
  title = "No data yet",
  description = "Get started by creating your first item.",
  actionLabel = "Create new",
  onAction,
}: Partial<EmptyStateProps>) {
  return (
    <EmptyState
      icon={Inbox}
      title={title}
      description={description}
      actionLabel={actionLabel}
      onAction={onAction}
    />
  );
}

export function SearchEmpty({ 
  query,
  onClear,
}: { 
  query?: string; 
  onClear?: () => void;
}) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description={query 
        ? `We couldn't find anything matching "${query}".`
        : "Try adjusting your search or filters."
      }
      actionLabel="Clear search"
      onAction={onClear}
    />
  );
}

export function ErrorEmpty({ 
  title = "Something went wrong",
  description = "We encountered an error. Please try again.",
  onRetry,
}: { 
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      icon={AlertCircle}
      title={title}
      description={description}
      actionLabel="Try again"
      onAction={onRetry}
    />
  );
}

export function NotFoundEmpty({ 
  title = "Page not found",
  description = "The page you're looking for doesn't exist or has been moved.",
  onGoBack,
  onGoHome,
}: { 
  title?: string;
  description?: string;
  onGoBack?: () => void;
  onGoHome?: () => void;
}) {
  return (
    <EmptyState
      icon={FileQuestion}
      title={title}
      description={description}
      actionLabel="Go back"
      onAction={onGoBack}
      secondaryActionLabel="Go home"
      onSecondaryAction={onGoHome}
    />
  );
}
