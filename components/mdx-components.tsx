import React, { ReactNode } from 'react';
import path from 'path';

/** Recursively extract plain text from React children (handles string | array | ReactElement) */
function extractText(node: ReactNode): string {
  if (node === null || node === undefined) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number' || typeof node === 'boolean') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: ReactNode }>;
    return extractText(el.props.children);
  }
  return '';
}
import Link from 'next/link';
import Image from 'next/image';
import { Check, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { MermaidDiagram } from './mermaid';
import { CodeBlock } from './code-block';
import { FileTree } from './file-tree';

const cwd = process.cwd();

const contentSources = [
  { dir: path.join(cwd, 'Big Data ( Full Course)'), prefix: 'big-data' },
  { dir: path.join(cwd, 'UNITS'), prefix: 'units' },
];

function slugifySegment(segment: string): string {
  return segment
    .toLowerCase()
    .replace(/[_+]/g, ' ')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function slugifyPath(filePath: string): string {
  return filePath
    .replace(/\.md$/, '')
    .split(path.sep)
    .map(slugifySegment)
    .join('/');
}

function resolveMarkdownHref(href: string, currentFilePath?: string): string {
  if (!href) return href;
  // Leave external, absolute, and anchor links as-is
  if (href.startsWith('http') || href.startsWith('/') || href.startsWith('#')) return href;
  // Only transform relative .md links
  if (!href.endsWith('.md') && !href.includes('.md#')) return href;

  // Decode URL encoding (spaces encoded as %20 etc.)
  const decoded = decodeURIComponent(href);

  // Resolve relative to current file's directory if we have it
  let resolvedAbs = decoded;
  if (currentFilePath) {
    const currentDir = path.dirname(currentFilePath);
    resolvedAbs = path.resolve(currentDir, decoded);
  }

  // Strip any anchor fragment before slugifying
  const [filePart, anchor] = resolvedAbs.split(/(#.*)$/);

  for (const source of contentSources) {
    if (filePart.startsWith(source.dir + path.sep) || filePart === source.dir) {
      const relative = path.relative(source.dir, filePart);
      const slug = slugifyPath(relative);
      return `/docs/${source.prefix}/${slug}${anchor ?? ''}`;
    }
  }

  // Fallback for root-level files (README, Syllabus)
  const rootFiles: Record<string, string> = {
    'readme.md': '/docs/readme',
    'syllabus_outline.md': '/docs/syllabus',
  };
  const basename = path.basename(filePart).toLowerCase();
  if (rootFiles[basename]) return rootFiles[basename];

  // Generic fallback
  const slug = slugifyPath(filePart);
  return `/docs/${slug}${anchor ?? ''}`;
}

interface HeadingProps {
  children: ReactNode;
  level?: number;
  id?: string;
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  return function Heading({ children, id }: HeadingProps) {
    const Tag = `h${level}` as const;
    const className = {
      h1: 'text-3xl sm:text-4xl font-bold mt-8 mb-4',
      h2: 'text-2xl sm:text-3xl font-bold mt-8 mb-4 border-b border-border pb-4',
      h3: 'text-xl sm:text-2xl font-bold mt-6 mb-3',
      h4: 'text-lg font-bold mt-4 mb-2',
      h5: 'font-bold text-base mt-4 mb-2',
      h6: 'font-bold text-sm mt-3 mb-1',
    };

    return (
      <Tag id={id} className={className[Tag]}>
        {children}
      </Tag>
    );
  };
}

export function createMdxComponents(currentFilePath?: string) {
  return buildMdxComponents(currentFilePath);
}

export const mdxComponents = buildMdxComponents();

function buildMdxComponents(currentFilePath?: string) {
  return {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),

  p: ({ children }: { children: ReactNode }) => (
    <div className="mb-4 leading-relaxed">{children}</div>
  ),

  a: ({ href, children }: { href?: string; children: ReactNode }) => {
    const resolved = resolveMarkdownHref(href ?? '', currentFilePath);
    const isExternal = resolved.startsWith('http');
    if (isExternal) {
      return (
        <a href={resolved} target="_blank" rel="noopener noreferrer"
          className="text-accent-blue hover:text-accent-orange transition-colors break-words">
          {children}
        </a>
      );
    }
    return (
      <Link href={resolved}
        className="text-accent-blue hover:text-accent-orange transition-colors break-words">
        {children}
      </Link>
    );
  },

  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc list-outside space-y-1 mb-4 ml-6">{children}</ul>
  ),

  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-outside space-y-1 mb-4 ml-6">{children}</ol>
  ),

  li: ({ children }: { children: ReactNode }) => (
    <li className="text-base leading-relaxed [&>div]:inline [&>div]:mb-0">{children}</li>
  ),

  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-accent-blue bg-code-bg px-4 py-2 my-4 italic text-muted-foreground rounded-r">
      {children}
    </blockquote>
  ),

  code: ({ children }: { children: ReactNode }) => (
    <code className="bg-code-bg border border-border px-1.5 py-0.5 rounded text-accent-blue font-mono text-sm">
      {children}
    </code>
  ),

  pre: ({ children }: { children: ReactNode }) => {
    if (React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string; children?: ReactNode }>;
      const lang = child.props.className ?? '';
      const raw  = extractText(child.props.children).replace(/\n$/, '');

      if (lang.includes('language-mermaid')) {
        return <MermaidDiagram chart={raw} />;
      }

      if (lang.includes('language-tree') || lang.includes('language-filetree')) {
        return <FileTree text={raw} />;
      }

      const language = lang.replace('language-', '') || 'text';
      return <CodeBlock language={language}>{raw}</CodeBlock>;
    }
    // Fallback for pre without a code child
    return (
      <pre className="bg-code-bg border border-border rounded-lg p-4 overflow-x-auto my-4">
        {children}
      </pre>
    );
  },

  table: ({ children }: { children: ReactNode }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse border border-border">{children}</table>
    </div>
  ),

  thead: ({ children }: { children: ReactNode }) => (
    <thead className="bg-code-bg border-b border-border">{children}</thead>
  ),

  tbody: ({ children }: { children: ReactNode }) => (
    <tbody>{children}</tbody>
  ),

  tr: ({ children }: { children: ReactNode }) => (
    <tr className="border-b border-border">{children}</tr>
  ),

  th: ({ children }: { children: ReactNode }) => (
    <th className="text-left px-4 py-2 font-semibold">{children}</th>
  ),

  td: ({ children }: { children: ReactNode }) => (
    <td className="px-4 py-2">{children}</td>
  ),

  img: ({ src, alt, ...props }: any) => (
    <div className="my-6 rounded-lg overflow-hidden border border-border">
      <Image src={src} alt={alt} width={800} height={600} {...props} className="w-full h-auto" />
    </div>
  ),

  Callout: ({ type = 'info', children }: { type?: 'info' | 'warning' | 'success' | 'error'; children: ReactNode }) => {
    const styles = {
      info: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        icon: <Info className="h-5 w-5 text-blue-400" />,
      },
      warning: {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30',
        icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
      },
      success: {
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        icon: <Check className="h-5 w-5 text-green-400" />,
      },
      error: {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        icon: <AlertCircle className="h-5 w-5 text-red-400" />,
      },
    };

    const style = styles[type];

    return (
      <div className={`${style.bg} border ${style.border} rounded-lg p-4 my-4 flex gap-3`}>
        {style.icon}
        <div className="flex-1">{children}</div>
      </div>
    );
  },

  CodeBlock: ({ language = 'text', children }: { language?: string; children: string }) => (
    <div className="my-4">
      <div className="bg-code-bg border border-border rounded-lg overflow-hidden">
        <div className="bg-border px-4 py-2 text-xs text-muted-foreground font-mono">{language}</div>
        <pre className="p-4 overflow-x-auto">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  ),

  Mermaid: MermaidDiagram,
  };
}
