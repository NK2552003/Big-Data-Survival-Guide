'use client';

import { useEffect, useRef, useState } from 'react';

interface TOCHeading {
  id: string;
  level: number;
  text: string;
}

interface TableOfContentsProps {
  headings: TOCHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings
        .map((heading) => ({
          id: heading.id,
          element: document.getElementById(heading.id),
        }))
        .filter((item) => item.element !== null);

      const scrollPosition = window.scrollY + 120;

      let current = '';
      for (const item of headingElements) {
        if (item.element && item.element.offsetTop <= scrollPosition) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // Auto-scroll the TOC container so the active item stays in view
  useEffect(() => {
    if (!activeId || !navRef.current) return;
    const activeEl = navRef.current.querySelector<HTMLElement>(`[data-toc-id="${activeId}"]`);
    if (!activeEl) return;
    const container = navRef.current;
    const elTop = activeEl.offsetTop;
    const elBottom = elTop + activeEl.offsetHeight;
    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;
    if (elTop < containerTop + 40) {
      container.scrollTo({ top: elTop - 40, behavior: 'smooth' });
    } else if (elBottom > containerBottom - 40) {
      container.scrollTo({ top: elBottom - container.clientHeight + 40, behavior: 'smooth' });
    }
  }, [activeId]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block text-sm">
      <div ref={navRef} className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto px-4">
        <p className="font-semibold text-foreground mb-3 text-xs uppercase tracking-widest">On this page</p>
        <nav className="space-y-0.5">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block py-1.5 transition-all duration-150 cursor-pointer text-xs leading-relaxed rounded-r ${
                activeId === heading.id
                  ? 'text-accent-orange font-semibold border-l-2 border-accent-orange bg-accent-orange/10'
                  : 'text-muted-foreground/50 hover:text-muted-foreground border-l-2 border-transparent hover:border-border'
              }`}
              data-toc-id={heading.id}
              style={{ paddingLeft: `calc(0.625rem + ${(heading.level - 2) * 0.75}rem)` }}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(heading.id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
