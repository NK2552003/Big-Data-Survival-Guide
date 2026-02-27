import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { DocNode } from '@/lib/docs';

interface BreadcrumbProps {
  breadcrumbs: DocNode[];
  currentTitle: string;
}

export function Breadcrumb({ breadcrumbs, currentTitle }: BreadcrumbProps) {
  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-foreground transition-colors">
        Home
      </Link>

      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={crumb.slug} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="text-foreground font-medium">{crumb.title}</span>
            ) : (
              <Link href={`/${crumb.slug}`} className="hover:text-foreground transition-colors">
                {crumb.title}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
