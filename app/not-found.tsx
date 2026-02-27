import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-accent-blue">404</h1>
          <h2 className="text-3xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-accent-blue text-background px-6 py-3 rounded-lg font-medium hover:bg-accent-orange/10 transition-colors"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>

          <Link
            href="/docs/readme"
            className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-border transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            View Docs
          </Link>
        </div>
      </div>
    </div>
  );
}
