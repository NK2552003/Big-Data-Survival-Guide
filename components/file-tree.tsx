'use client';

import { useState } from 'react';
import {
  Folder, FolderOpen, FileText, FileCode, FileJson,
  File, ChevronRight, ChevronDown,
} from 'lucide-react';

interface TreeNode {
  name: string;
  comment?: string;
  isDir: boolean;
  children: TreeNode[];
}

const EXT_ICONS: Record<string, React.ReactNode> = {
  md:   <FileText className="h-3.5 w-3.5 text-blue-400 shrink-0" />,
  sh:   <FileCode className="h-3.5 w-3.5 text-green-400 shrink-0" />,
  json: <FileJson className="h-3.5 w-3.5 text-yellow-400 shrink-0" />,
  ts:   <FileCode className="h-3.5 w-3.5 text-blue-300 shrink-0" />,
  tsx:  <FileCode className="h-3.5 w-3.5 text-blue-300 shrink-0" />,
  js:   <FileCode className="h-3.5 w-3.5 text-yellow-300 shrink-0" />,
  py:   <FileCode className="h-3.5 w-3.5 text-green-300 shrink-0" />,
};

function fileIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  return EXT_ICONS[ext] ?? <File className="h-3.5 w-3.5 text-muted-foreground shrink-0" />;
}

/** Parse ASCII tree block (├──, └──, │) into tree nodes */
function parseTree(text: string): TreeNode[] {
  const lines = text.split('\n').filter((l) => l.trim() !== '');
  const root: TreeNode[] = [];
  const stack: { node: TreeNode; depth: number }[] = [];

  for (const rawLine of lines) {
    // Measure depth by position of the ── marker
    const match = rawLine.match(/^(.*?)(├──|└──)\s*(.+)$/);
    if (!match) {
      // Top-level entry (e.g. first line without connectors)
      const trimmed = rawLine.trim();
      if (!trimmed) continue;
      const [namePart, ...commentParts] = trimmed.split(/\s+#\s*/);
      const node: TreeNode = {
        name: namePart.trim().replace(/\/$/, ''),
        comment: commentParts.join(' # ') || undefined,
        isDir: trimmed.endsWith('/') || !trimmed.includes('.'),
        children: [],
      };
      root.push(node);
      stack.length = 0;
      stack.push({ node, depth: -1 });
      continue;
    }

    const [, prefix, , nameAndComment] = match;
    const depth = prefix.replace(/[^│ ]/g, '').length; // count pipe/space chars as depth indicator
    // A simpler depth: count (│   ) or (    ) groups — each is 4 chars
    const depthLevel = Math.round(prefix.replace(/├──|└──/g, '').length / 4);

    const [namePart, ...commentParts] = nameAndComment.split(/\s+#\s*/);
    const name = namePart.trim();
    const node: TreeNode = {
      name: name.replace(/\/$/, ''),
      comment: commentParts.join(' # ') || undefined,
      isDir: name.endsWith('/') || (!name.includes('.') && !name.includes('(')),
      children: [],
    };

    // Pop stack to find parent
    while (stack.length > 1 && stack[stack.length - 1].depth >= depthLevel) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];
    if (parent) {
      parent.node.children.push(node);
    } else {
      root.push(node);
    }
    stack.push({ node, depth: depthLevel });
  }

  return root;
}

function TreeNodeRow({ node, depth }: { node: TreeNode; depth: number }) {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children.length > 0;

  return (
    <div>
      <div
        className={`flex items-center gap-1.5 py-0.5 px-2 rounded text-sm hover:bg-white/5 transition-colors ${
          node.isDir ? 'cursor-pointer' : ''
        }`}
        style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
        onClick={() => node.isDir && hasChildren && setOpen((v) => !v)}
      >
        {/* Expand arrow */}
        {node.isDir && hasChildren ? (
          open
            ? <ChevronDown  className="h-3 w-3 text-muted-foreground shrink-0" />
            : <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0" />
        ) : (
          <span className="w-3 shrink-0" />
        )}

        {/* Icon */}
        {node.isDir
          ? (open
              ? <FolderOpen className="h-3.5 w-3.5 text-accent-orange shrink-0" />
              : <Folder     className="h-3.5 w-3.5 text-accent-orange shrink-0" />)
          : fileIcon(node.name)
        }

        {/* Name */}
        <span className={`${node.isDir ? 'text-foreground font-medium' : 'text-muted-foreground'} truncate`}>
          {node.name}{node.isDir ? '/' : ''}
        </span>

        {/* Comment */}
        {node.comment && (
          <span className="text-xs text-muted-foreground/50 ml-2 truncate"># {node.comment}</span>
        )}
      </div>

      {/* Children */}
      {open && hasChildren && (
        <div>
          {node.children.map((child, i) => (
            <TreeNodeRow key={`${child.name}-${i}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTree({ text }: { text: string }) {
  const nodes = parseTree(text);
  if (nodes.length === 0) return null;

  return (
    <div className="my-4 rounded-lg border border-border bg-code-bg overflow-hidden">
      <div className="px-4 py-2 border-b border-border bg-[#111] text-xs text-muted-foreground font-mono select-none">
        folder structure
      </div>
      <div className="py-2 font-mono text-sm">
        {nodes.map((node, i) => (
          <TreeNodeRow key={`${node.name}-${i}`} node={node} depth={0} />
        ))}
      </div>
    </div>
  );
}
