import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: React.ReactNode;
  description?: string;
  columns?: FooterColumn[];
  socialLinks?: React.ReactNode;
  copyright?: string;
  className?: string;
}

export function Footer({
  logo,
  description,
  columns = [],
  socialLinks,
  copyright,
  className,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("border-t bg-muted/30", className)}>
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              {logo || <span className="text-xl font-bold">Logo</span>}
            </Link>
            {description && (
              <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                {description}
              </p>
            )}
            {socialLinks && (
              <div className="flex gap-4">
                {socialLinks}
              </div>
            )}
          </div>

          {/* Link Columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {copyright || `© ${currentYear} Your Company. All rights reserved.`}
          </p>
          <div className="flex gap-6">
            <Link 
              href="/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Simple footer for dashboards
export function SimpleFooter({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn("border-t py-6", className)}>
      <div className="container text-center text-sm text-muted-foreground">
        © {currentYear} Your Company. All rights reserved.
      </div>
    </footer>
  );
}
