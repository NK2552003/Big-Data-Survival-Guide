'use client';

import { useState, useRef } from 'react';
import { Copy, Check, Download } from 'lucide-react';

interface CodeBlockProps {
  language?: string;
  children: string;
}

export function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const displayLang = language?.replace('language-', '') ?? 'text';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extMap: Record<string, string> = {
      python: 'py', javascript: 'js', typescript: 'ts', bash: 'sh', shell: 'sh',
      sh: 'sh', java: 'java', sql: 'sql', json: 'json', yaml: 'yaml', yml: 'yml',
      html: 'html', css: 'css', rust: 'rs', go: 'go', cpp: 'cpp', c: 'c',
      text: 'txt', xml: 'xml', markdown: 'md', md: 'md',
    };
    const ext = extMap[displayLang] ?? 'txt';
    const blob = new Blob([children], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="my-4 rounded-lg border border-border overflow-hidden bg-code-bg group">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#111] border-b border-border">
        <span className="text-xs font-mono text-muted-foreground select-none">{displayLang}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            title="Copy code"
            className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            title="Download file"
            className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
        </div>
      </div>
      {/* Code */}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed font-mono">
        <code>{children}</code>
      </pre>
    </div>
  );
}
