/**
 * Client-safe utilities — no fs or path imports.
 * These functions work with already-built DocNode trees.
 */

export interface FlatDoc {
  title: string;
  slug: string;
}

export function flattenTree(tree: { title: string; slug: string; isDir?: boolean; children?: any[] }[]): FlatDoc[] {
  const result: FlatDoc[] = [];
  function walk(nodes: typeof tree) {
    for (const node of nodes) {
      if (!node.isDir) result.push({ title: node.title, slug: node.slug });
      if (node.children) walk(node.children);
    }
  }
  walk(tree);
  return result;
}
