import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface DocNode {
  title: string;
  slug: string;
  path: string;
  children?: DocNode[];
  isDir?: boolean;
  filePath?: string;
  metadata?: Record<string, any>;
}

export interface FlatDocNode extends DocNode {
  fullPath: string;
  depth: number;
}

const cwd = process.cwd();
const docsDir = path.join(cwd, 'docs');

interface ContentSource {
  dir: string;
  prefix: string;
  title: string;
}

const additionalSources: ContentSource[] = [
  { dir: path.join(cwd, 'Big Data ( Full Course)'), prefix: 'big-data', title: 'Big Data Course' },
  { dir: path.join(cwd, 'UNITS'), prefix: 'units', title: 'Units' },
];

const rootMdFiles = [
  { file: path.join(cwd, 'README.md'), slug: 'readme', title: 'Introduction' },
  { file: path.join(cwd, 'Syllabus_Outline.md'), slug: 'syllabus', title: 'Syllabus Outline' },
];

// Custom ordering for Big Data course (based on Readme.md learning path)
const bigDataOrder = {
  topLevel: [
    'Course Outline',
    'Readme',
    'Fundamentals',
    'Installation',
    'Hadoop',
    'Spark',
    'Monitoring',
    'Cloud',
    'Practice',
    'Scripts',
  ],
  subdirs: {
    Fundamentals: [
      'What is Big Data',
      'Big Data Ecosystem',
      'Data Engineering Fundamentals',
      'Pre Topics',
      'Linux Basics',
    ],
    Installation: [
      'Hadoop Installation',
      'Hadoop_Installation(for Mac)',
      'Hadoop Via Docker',
      's3+spark(for MAC)',
    ],
    Hadoop: [
      'Hadoop Ecosystem',
      'Hadoop Structure',
      'HDFS Overview',
      'Hadoop Essential Commands (HDFS)',
      'MapReduce Overview',
      'MapReduce Things',
      'MapReduce Mini Practice',
    ],
    Spark: ['Spark Setup', 'Spark Overview', 'Spark Something Practical'],
    Monitoring: ['Grafana Installation', 'Spark + Grafana'],
    Cloud: ['AWS Setup + S3'],
    Practice: ['Practice Questions Set 1', 'Practice Questions Set 2'],
    Scripts: [
      'install_hadoop_spark_mac',
      'install_hadoop_spark_ubuntu',
      'install_spark_s3_mac',
      'readme',
    ],
  } as Record<string, string[]>,
};

function normalizeForOrder(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function orderNodesByList(nodes: DocNode[], orderList: string[]): DocNode[] {
  const normalizedOrder = orderList.map(normalizeForOrder);
  return [...nodes].sort((a, b) => {
    const aBase = normalizeForOrder(path.basename(a.path).replace(/\.md$/i, ''));
    const bBase = normalizeForOrder(path.basename(b.path).replace(/\.md$/i, ''));
    const aIdx = normalizedOrder.indexOf(aBase);
    const bIdx = normalizedOrder.indexOf(bBase);
    if (aIdx === -1 && bIdx === -1) return 0;
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx - bIdx;
  });
}

function applyBigDataOrdering(sourceNode: DocNode): void {
  if (!sourceNode.children) return;
  // Reorder top-level items (files + subdirectory folders)
  sourceNode.children = orderNodesByList(sourceNode.children, bigDataOrder.topLevel);
  // Reorder files within each subdirectory
  for (const child of sourceNode.children) {
    if (child.isDir && child.children) {
      const dirName = path.basename(child.path);
      const fileOrder = bigDataOrder.subdirs[dirName];
      if (fileOrder) {
        child.children = orderNodesByList(child.children, fileOrder);
      }
    }
  }
}

/**
 * Get all markdown files recursively from the docs directory
 */
export function getAllDocFiles(dir: string = docsDir): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllDocFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Parse markdown file and extract metadata
 */
export function parseMarkdownFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);

  return {
    metadata: data,
    content: body,
  };
}

/**
 * Convert file path to slug
 */
/**
 * Slugify a single path segment (no slashes)
 */
function slugifySegment(segment: string): string {
  return segment
    .toLowerCase()
    .replace(/[_+]/g, ' ')          // underscores/plus → spaces
    .replace(/[^a-z0-9\s-]/g, '')  // remove remaining special chars
    .replace(/\s+/g, '-')           // spaces → dashes
    .replace(/-+/g, '-')            // collapse multiple dashes
    .replace(/^-+|-+$/g, '');       // trim leading/trailing dashes
}

export function filePathToSlug(filePath: string, baseDir: string = docsDir, prefix: string = ''): string {
  const relativePath = path.relative(baseDir, filePath);
  const withoutExt = relativePath.replace(/\.md$/, '');
  const slugParts = withoutExt
    .split(path.sep)
    .map(slugifySegment)
    .join('/');
  return prefix ? `${prefix}/${slugParts}` : slugParts;
}

/**
 * Build navigation tree from file system
 */
export function buildNavTree(): DocNode[] {
  const tree: DocNode[] = [];
  const dirMap = new Map<string, DocNode>();

  // First pass: collect all directories and files
  function traverseDir(dir: string, parentNode: DocNode | null = null, baseDir: string = docsDir, prefix: string = ''): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => {
      // Directories first, then files
      if (a.isDirectory() !== b.isDirectory()) {
        return a.isDirectory() ? -1 : 1;
      }
      // Sort alphabetically
      return a.name.localeCompare(b.name);
    });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);
      const slugPath = relativePath
        .split(path.sep)
        .map(slugifySegment)
        .join('/');

      if (entry.isDirectory()) {
        const dirNode: DocNode = {
          title: formatTitle(entry.name),
          slug: prefix ? `${prefix}/${slugPath}` : slugPath,
          path: relativePath,
          isDir: true,
          children: [],
        };

        dirMap.set(fullPath, dirNode);

        if (parentNode) {
          parentNode.children?.push(dirNode);
        } else {
          tree.push(dirNode);
        }

        traverseDir(fullPath, dirNode, baseDir, prefix);
      } else if (entry.name.endsWith('.md') && entry.name !== 'README.md') {
        const { metadata } = parseMarkdownFile(fullPath);
        const slug = filePathToSlug(fullPath, baseDir, prefix);

        const fileNode: DocNode = {
          title: metadata.title || formatTitle(entry.name.replace(/\.md$/, '')),
          slug,
          path: relativePath,
          filePath: fullPath,
          metadata,
          isDir: false,
        };

        if (parentNode) {
          parentNode.children?.push(fileNode);
        } else {
          tree.push(fileNode);
        }
      }
    }
  }

  // Only traverse docs dir if it exists
  if (fs.existsSync(docsDir)) {
    traverseDir(docsDir);
  }

  // Add root-level markdown files at the top (in defined order)
  const rootNodes: DocNode[] = [];
  for (const rootFile of rootMdFiles) {
    if (!fs.existsSync(rootFile.file)) continue;
    const { metadata } = parseMarkdownFile(rootFile.file);
    const fileNode: DocNode = {
      title: metadata.title || rootFile.title,
      slug: rootFile.slug,
      path: path.basename(rootFile.file),
      filePath: rootFile.file,
      metadata,
      isDir: false,
    };
    rootNodes.push(fileNode);
  }
  tree.unshift(...rootNodes);

  // Add additional content sources as top-level category nodes
  for (const source of additionalSources) {
    if (!fs.existsSync(source.dir)) continue;
    const sourceNode: DocNode = {
      title: source.title,
      slug: source.prefix,
      path: source.prefix,
      isDir: true,
      children: [],
    };
    traverseDir(source.dir, sourceNode, source.dir, source.prefix);
    // Apply custom ordering for Big Data course
    if (source.prefix === 'big-data') {
      applyBigDataOrdering(sourceNode);
    }
    if (sourceNode.children && sourceNode.children.length > 0) {
      tree.push(sourceNode);
    }
  }

  return tree;
}

/**
 * Format folder/file names into readable titles
 */
export function formatTitle(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Flatten the navigation tree for easier searching
 */
export function flattenNavTree(tree: DocNode[], depth = 0): FlatDocNode[] {
  const flattened: FlatDocNode[] = [];

  for (const node of tree) {
    const flatNode: FlatDocNode = {
      ...node,
      fullPath: node.slug,
      depth,
    };

    flattened.push(flatNode);

    if (node.children && node.children.length > 0) {
      flattened.push(...flattenNavTree(node.children, depth + 1));
    }
  }

  return flattened;
}

/**
 * Find a document node by slug
 */
export function findDocBySlug(tree: DocNode[], slug: string): DocNode | null {
  for (const node of tree) {
    if (node.slug === slug && !node.isDir) {
      return node;
    }

    if (node.children) {
      const found = findDocBySlug(node.children, slug);
      if (found) return found;
    }
  }

  return null;
}

/**
 * Get breadcrumb path for a document
 */
export function getBreadcrumbs(tree: DocNode[], slug: string, breadcrumbs: DocNode[] = []): DocNode[] {
  for (const node of tree) {
    const newBreadcrumbs = [...breadcrumbs];

    if (!node.isDir) {
      newBreadcrumbs.push(node);

      if (node.slug === slug) {
        return newBreadcrumbs;
      }

      newBreadcrumbs.pop();
    } else {
      newBreadcrumbs.push(node);

      if (node.children) {
        const found = getBreadcrumbs(node.children, slug, newBreadcrumbs);
        if (found.length > 0 && found[found.length - 1].slug === slug) {
          return found;
        }
      }

      newBreadcrumbs.pop();
    }
  }

  return [];
}

/**
 * Get next and previous documents based on slug
 */
export function getAdjacentDocs(tree: DocNode[], currentSlug: string) {
  const flattened = flattenNavTree(tree).filter((node) => !node.isDir);
  const currentIndex = flattened.findIndex((node) => node.slug === currentSlug);

  return {
    prev: currentIndex > 0 ? flattened[currentIndex - 1] : null,
    next: currentIndex < flattened.length - 1 ? flattened[currentIndex + 1] : null,
  };
}
