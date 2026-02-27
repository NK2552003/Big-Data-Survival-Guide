import { buildNavTree, flattenNavTree } from '@/lib/docs';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { ShareButton } from '@/components/share-button';
import { SearchOverlay } from '@/components/search-overlay';
export const metadata = {
  title: 'Big Data Survival Guide - Home',
  description: 'A comprehensive guide to navigating the big data landscape with practical insights and best practices.',
};

export default function Home() {
  const navTree = buildNavTree();
  const flatDocs = flattenNavTree(navTree).filter((doc) => !doc.isDir);

  return (
    <div className="min-h-screen bg-background">
     <div className="hidden md:flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
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
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.181.092-.916.35-1.544.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.270.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.194 22 16.440 22 12.017 22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          <a
            href="https://github.com/NK2552003/Big-Data-Survival-Guide/stargazers"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block text-muted-foreground hover:text-yellow-400 transition-colors"
            aria-label="Star on GitHub"
          >
            <Star className="h-5 w-5" />
          </a>

          <ShareButton />
        </div>
      </div>
      {/* Hero Section */}
          <section className="flex justify-start items-start min-h-[calc(100vh-65px)]">
        <div className=" mx-4 max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="space-y-2">
   
            <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">
              Master the Big Data Landscape
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              A comprehensive guide to understanding, implementing, and optimizing big data systems. Learn from industry best practices, practical examples, and deep technical insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {flatDocs.length > 0 && (
                <Link
                  href={`/docs/${flatDocs[0].slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-accent-blue text-background px-6 py-3 rounded-lg font-medium hover:bg-accent-orange/20 transition-colors"
                >
                  Start Reading
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}

              <a
                href="https://github.com/NK2552003/Big-Data-Survival-Guide"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-border transition-colors"
              >
                View on GitHub
              </a>
            </div>

                  
          </div>
        </div>
      </section>
    </div>
  );
}
