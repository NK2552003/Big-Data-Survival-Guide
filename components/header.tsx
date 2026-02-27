'use client';

import Link from 'next/link';
import { MobileMenu } from './mobile-menu';
import { SearchOverlay } from './search-overlay';
import type { DocNode } from '@/lib/docs';
import { flattenTree } from '@/lib/flat-docs';

interface HeaderProps {
  navTree: DocNode[];
}

export function Header({ navTree }: HeaderProps) {
  const flatDocs = flattenTree(navTree);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <MobileMenu navTree={navTree} />

          <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:text-accent-blue transition-colors">
            <div className="w-6 h-6 bg-accent-blue rounded flex items-center justify-center text-background text-sm font-bold">
              BD
            </div>
            <span>Big Data Survival Guide</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <SearchOverlay docs={flatDocs} />

          <a
            href="https://github.com/NK2552003/Big-Data-Survival-Guide"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub repository"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.181.092-.916.35-1.544.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.270.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.194 22 16.440 22 12.017 22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}

