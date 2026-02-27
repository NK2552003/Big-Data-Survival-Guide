'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DocNode } from '@/lib/docs';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  navTree: DocNode[];
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ navTree, isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set());

  // Expand only top-level directories on initial load
  useEffect(() => {
    const expanded = new Set<string>();
    for (const node of navTree) {
      if (node.isDir) {
        expanded.add(node.slug);
      }
    }
    setExpandedDirs(expanded);
  }, [navTree]);

  const toggleDirectory = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    const newExpanded = new Set(expandedDirs);
    if (newExpanded.has(slug)) {
      newExpanded.delete(slug);
    } else {
      newExpanded.add(slug);
    }
    setExpandedDirs(newExpanded);
  };

  const isPathActive = (slug: string): boolean => {
    return pathname === `/${slug}` || pathname === `/docs/${slug}`;
  };

  const hasActiveChild = (nodes: DocNode[], path: string): boolean => {
    return nodes.some((node) => {
      if (!node.isDir && isPathActive(node.slug)) return true;
      if (node.children) return hasActiveChild(node.children, path);
      return false;
    });
  };

  return (
    <nav
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-sidebar-width overflow-y-auto border-r border-border bg-sidebar-bg p-4 transition-transform duration-200
        lg:relative lg:top-0 lg:h-full lg:w-full lg:border-none lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      role="navigation"
      aria-label="Documentation navigation"
    >
      <ul className="space-y-1">
        {navTree.map((node) => (
          <SidebarItem
            key={node.slug}
            node={node}
            expandedDirs={expandedDirs}
            onToggle={toggleDirectory}
            isPathActive={isPathActive}
            onNavigate={onClose}
          />
        ))}
      </ul>
    </nav>
  );
}

interface SidebarItemProps {
  node: DocNode;
  expandedDirs: Set<string>;
  onToggle: (slug: string, e: React.MouseEvent) => void;
  isPathActive: (slug: string) => boolean;
  onNavigate?: () => void;
}

function SidebarItem({
  node,
  expandedDirs,
  onToggle,
  isPathActive,
  onNavigate,
}: SidebarItemProps) {
  const isExpanded = expandedDirs.has(node.slug);
  const isActive = isPathActive(node.slug);

  if (node.isDir && node.children) {
    return (
      <li className="space-y-1">
        <button
          onClick={(e) => onToggle(node.slug, e)}
          className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-border hover:text-foreground"
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0" />
          )}
          <span className="flex-1 text-left">{node.title}</span>
        </button>

        {isExpanded && node.children && (
          <ul className="ml-3 space-y-1 border-l border-border pl-3">
            {node.children.map((child) => (
              <SidebarItem
                key={child.slug}
                node={child}
                expandedDirs={expandedDirs}
                onToggle={onToggle}
                isPathActive={isPathActive}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={`/docs/${node.slug}`}
        className={`block rounded px-2 py-1.5 text-sm transition-colors ${
          isActive
            ? 'bg-accent-blue text-background font-medium'
            : 'text-muted-foreground hover:bg-border hover:text-foreground'
        }`}
        onClick={onNavigate}
      >
        {node.title}
      </Link>
    </li>
  );
}
