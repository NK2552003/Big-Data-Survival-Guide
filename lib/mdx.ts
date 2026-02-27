import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

export interface MDXMetadata {
  title: string;
  description?: string;
  date?: string;
  author?: string;
  [key: string]: any;
}

/**
 * Read and parse MDX file
 */
export async function getMDXContent(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    metadata: data as MDXMetadata,
    content,
    rawContent: fileContents,
  };
}

/**
 * MDX serialization options
 */
export const mdxOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    format: 'md' as const,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: 'heading-link',
            ariaLabel: 'Link to this section',
          },
        },
      ],
    ],
  },
};

/**
 * Extract table of contents from markdown content
 */
export function extractTableOfContents(content: string): Array<{
  id: string;
  level: number;
  text: string;
}> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ id: string; level: number; text: string }> = [];
  const seenIds = new Map<string, number>();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const rawText = match[2];
    // Strip inline markdown: bold, italic, code, links, strikethrough
    const text = rawText
      .replace(/\*\*(.+?)\*\*/g, '$1')   // **bold**
      .replace(/\*(.+?)\*/g, '$1')        // *italic*
      .replace(/__(.+?)__/g, '$1')        // __bold__
      .replace(/_(.+?)_/g, '$1')          // _italic_
      .replace(/~~(.+?)~~/g, '$1')        // ~~strikethrough~~
      .replace(/`(.+?)`/g, '$1')          // `code`
      .replace(/\[(.+?)\]\(.+?\)/g, '$1') // [link](url)
      .trim();
    const baseId = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    // Deduplicate: append -2, -3, ... for repeated IDs (same as rehype-slug)
    const count = seenIds.get(baseId) ?? 0;
    seenIds.set(baseId, count + 1);
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

    // Only include h2 and h3 for TOC
    if (level === 2 || level === 3) {
      headings.push({ id, level, text });
    }
  }

  return headings;
}

/**
 * Get reading time in minutes
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate edit on GitHub URL
 */
export function getGitHubEditUrl(filePath: string): string {
  const relativePath = path.relative(process.cwd(), filePath);
  const repo = 'NK2552003/Big-Data-Survival-Guide';
  const branch = 'main';
  return `https://github.com/${repo}/edit/${branch}/${relativePath}`;
}

/**
 * Strip the "### Topics" section (heading + list) from content without modifying the file.
 * Removes the heading and all immediately following list lines (numbered or bulleted).
 */
export function stripTopicsSection(content: string): string {
  // Match "### Topics" + any blank lines + consecutive list lines (numbered/bulleted), then a trailing blank line
  return content.replace(
    /^###\s+Topics\s*\n(?:[ \t]*(?:\d+[.)\-]|[-*+])[ \t]+[^\n]*\n)*[ \t]*\n?/m,
    ''
  );
}
