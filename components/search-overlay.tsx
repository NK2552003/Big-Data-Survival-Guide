'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, FileText, ArrowRight } from 'lucide-react';
import type { FlatDoc } from '@/lib/flat-docs';

interface SearchOverlayProps {
  docs: FlatDoc[];
}

export function SearchOverlay({ docs }: SearchOverlayProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim().length > 0
    ? docs.filter((d) =>
        d.title.toLowerCase().includes(query.toLowerCase()) ||
        d.slug.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 12)
    : [];

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  const navigate = useCallback((slug: string) => {
    router.push(`/docs/${slug}`);
    close();
  }, [router, close]);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [close]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  return (
    <>
      {/* Trigger button (replaces the old static input) */}
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 w-64 px-3 py-1.5 rounded bg-code-bg border border-border text-sm text-muted-foreground hover:border-accent-blue transition-colors"
        aria-label="Search documentation"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">Search documentation...</span>
        <kbd className="hidden lg:inline-flex items-center gap-0.5 text-xs bg-border px-1.5 py-0.5 rounded font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden />

          {/* Dialog */}
          <div className="relative z-10 w-full max-w-xl bg-sidebar-bg border border-border rounded-xl shadow-2xl overflow-hidden">
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent text-foreground placeholder-muted-foreground text-sm focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && results.length > 0) navigate(results[0].slug);
                }}
              />
              <button onClick={close} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim().length > 0 && results.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}

              {results.length > 0 && (
                <ul>
                  {results.map((doc) => (
                    <li key={doc.slug}>
                      <button
                        onClick={() => navigate(doc.slug)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm hover:bg-border transition-colors group"
                      >
                        <FileText className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-accent-blue transition-colors" />
                        <span className="flex-1 text-foreground">{doc.title}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {query.trim().length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                  Start typing to search...
                </p>
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center gap-3 px-4 py-2.5 border-t border-border text-xs text-muted-foreground">
              <span><kbd className="bg-border px-1 py-0.5 rounded font-mono">↵</kbd> to open</span>
              <span><kbd className="bg-border px-1 py-0.5 rounded font-mono">Esc</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
