import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { buildNavTree } from '@/lib/docs';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const navTree = buildNavTree();

  return (
    <div className="min-h-screen bg-background">
      <Header navTree={navTree} />

      <div className="flex">
        {/* Left sidebar — sticky, scrollable */}
        <div className="hidden lg:block w-sidebar-width border-r border-border flex-shrink-0">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <Sidebar navTree={navTree} isOpen={true} />
          </div>
        </div>

        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-content-max px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
