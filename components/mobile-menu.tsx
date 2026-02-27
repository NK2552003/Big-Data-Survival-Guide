'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sidebar } from './sidebar';
import { DocNode } from '@/lib/docs';

interface MobileMenuProps {
  navTree: DocNode[];
}

export function MobileMenu({ navTree }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden p-2 hover:bg-border rounded transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && <div className="fixed inset-0 top-16 z-40 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />}

      <div className="lg:hidden">
        <Sidebar navTree={navTree} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </>
  );
}
