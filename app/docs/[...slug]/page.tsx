import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { buildNavTree, findDocBySlug, getBreadcrumbs, getAdjacentDocs } from '@/lib/docs';
import { getMDXContent, extractTableOfContents, getReadingTime, getGitHubEditUrl, mdxOptions, stripTopicsSection } from '@/lib/mdx';
import { Breadcrumb } from '@/components/breadcrumb';
import { TableOfContents } from '@/components/table-of-contents';
import { mdxComponents, createMdxComponents } from '@/components/mdx-components';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import path from 'path';

interface DocPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join('/');

  // Get navigation tree
  const navTree = buildNavTree();

  // Find the document
  const doc = findDocBySlug(navTree, slug);

  if (!doc || doc.isDir || !doc.filePath) {
    notFound();
  }

  // Get breadcrumbs
  const breadcrumbs = getBreadcrumbs(navTree, slug).slice(0, -1);

  // Get adjacent docs for navigation
  const { prev, next } = getAdjacentDocs(navTree, slug);

  // Create MDX components with current file path for resolving relative .md links
  const components = createMdxComponents(doc.filePath);

  // Read and parse the MDX file
  const mdxContent = await getMDXContent(doc.filePath);

  if (!mdxContent) {
    notFound();
  }

  // Strip ### Topics section for UNITS files (shown in right sidebar TOC instead)
  const unitsDir = path.join(process.cwd(), 'UNITS');
  const renderContent = doc.filePath.startsWith(unitsDir)
    ? stripTopicsSection(mdxContent.content)
    : mdxContent.content;

  // Extract table of contents
  const headings = extractTableOfContents(renderContent);
  const readingTime = getReadingTime(renderContent);
  const githubEditUrl = getGitHubEditUrl(doc.filePath);

  return (
    <article className="w-full">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && <Breadcrumb breadcrumbs={breadcrumbs} currentTitle={doc.title} />}

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
          {doc.metadata?.title || doc.title}
        </h1>

        {doc.metadata?.description && (
          <p className="text-lg text-muted-foreground mb-4">{doc.metadata.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {doc.metadata?.date && <time dateTime={doc.metadata.date}>{doc.metadata.date}</time>}
          {readingTime && <span>{readingTime} min read</span>}
          <a
            href={githubEditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue hover:text-accent-orange transition-colors flex items-center gap-1"
          >
            Edit on GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="xl:col-span-3 prose prose-invert max-w-none">
          <MDXRemote source={renderContent} components={components} options={mdxOptions as any} />
        </div>

        {/* Table of Contents */}
        {headings.length > 0 && <TableOfContents headings={headings} />}
      </div>

      {/* Navigation Footer */}
      <nav className="mt-12 border-t border-border pt-8 grid sm:grid-cols-2 gap-4">
        {prev && (
          <Link
            href={`/docs/${prev.slug}`}
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-accent-blue transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-accent-blue transition-colors" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Previous</p>
              <p className="font-medium group-hover:text-accent-blue transition-colors">{prev.title}</p>
            </div>
          </Link>
        )}

        {next && (
          <Link
            href={`/docs/${next.slug}`}
            className="flex items-center justify-between gap-3 p-4 rounded-lg border border-border hover:border-accent-blue transition-colors group sm:col-start-2"
          >
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Next</p>
              <p className="font-medium group-hover:text-accent-blue transition-colors">{next.title}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent-blue transition-colors flex-shrink-0" />
          </Link>
        )}
      </nav>
    </article>
  );
}

export async function generateStaticParams() {
  const navTree = buildNavTree();
  const params: Array<{ slug: string[] }> = [];

  function collectDocs(nodes: any[]): void {
    for (const node of nodes) {
      if (!node.isDir && node.filePath) {
        const slug = node.slug.split('/');
        params.push({ slug });
      }

      if (node.children) {
        collectDocs(node.children);
      }
    }
  }

  collectDocs(navTree);
  return params;
}

export async function generateMetadata({ params }: DocPageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join('/');

  const navTree = buildNavTree();
  const doc = findDocBySlug(navTree, slug);

  if (!doc || !doc.filePath) {
    return {
      title: 'Not found',
    };
  }

  const mdxContent = await getMDXContent(doc.filePath);

  return {
    title: doc.metadata?.title || doc.title,
    description: doc.metadata?.description || 'Big Data Survival Guide',
  };
}
