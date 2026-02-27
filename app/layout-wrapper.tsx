import { Header } from '@/components/header';
import { buildNavTree } from '@/lib/docs';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const navTree = buildNavTree();

  return (
    <div className="min-h-screen bg-background">
      <Header navTree={navTree} />
      {children}
    </div>
  );
}
