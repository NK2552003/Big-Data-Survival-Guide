'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import mermaid from 'mermaid';
import {
  ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2,
  Download, Copy, Check, Code2, Image as ImageIcon,
} from 'lucide-react';

let counter = 0;

const THEMES = ['dark', 'default', 'forest', 'neutral', 'base'] as const;
type Theme = (typeof THEMES)[number];

const darkVars = {
  primaryColor: '#3b82f6', primaryBorderColor: '#1e40af',
  lineColor: '#44403c', secondBkgColor: '#292524',
  tertiaryColor: '#1c1917', textColor: '#e7e5e4',
  noteBkgColor: '#292524', noteBorderColor: '#44403c',
};

async function renderChart(id: string, chart: string, theme: Theme): Promise<string> {
  mermaid.initialize({
    startOnLoad: false,
    theme,
    securityLevel: 'loose',
    themeVariables: theme === 'dark' ? darkVars : {},
  });
  const { svg } = await mermaid.render(id, chart.trim());
  return svg;
}

export function MermaidDiagram({ chart }: { chart: string }) {
  const [svg, setSvg]         = useState('');
  const [error, setError]     = useState('');
  const [theme, setTheme]     = useState<Theme>('dark');
  const [scale, setScale]     = useState(1);
  const [translate, setTrans] = useState({ x: 0, y: 0 });
  const [full, setFull]       = useState(false);
  const [copied, setCopied]   = useState(false);
  const [showSource, setShowSource] = useState(false);

  const idRef      = useRef(`mermaid-${++counter}`);
  const renderKey  = useRef(0);
  const dragging   = useRef(false);
  const lastPos    = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chart?.trim()) return;
    const key = ++renderKey.current;
    const renderId = `${idRef.current}-${theme}-${key}`;
    renderChart(renderId, chart, theme)
      .then((s) => { if (renderKey.current === key) setSvg(s); })
      .catch((err) => { console.error('Mermaid render error:', err); setError(String(err)); });
  }, [chart, theme]);

  const resetView = () => { setScale(1); setTrans({ x: 0, y: 0 }); };
  const zoom      = (delta: number) =>
    setScale((s) => Math.min(4, Math.max(0.25, +(s + delta).toFixed(2))));

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    lastPos.current  = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return;
    setTrans((t) => ({
      x: t.x + e.clientX - lastPos.current.x,
      y: t.y + e.clientY - lastPos.current.y,
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);
  const onMouseUp = () => { dragging.current = false; };

  const onWheel = (e: React.WheelEvent) => {
    // Only intercept scroll when Ctrl or Meta (Cmd) is held — otherwise let page scroll
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    zoom(e.deltaY < 0 ? 0.1 : -0.1);
  };

  const downloadSVG = () => {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'diagram.svg'; a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    const svgEl = containerRef.current?.querySelector('svg');
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob    = new Blob([svgData], { type: 'image/svg+xml' });
    const url     = URL.createObjectURL(blob);
    const img     = new window.Image();
    img.onload = () => {
      const canvas  = document.createElement('canvas');
      canvas.width  = img.naturalWidth  || 1200;
      canvas.height = img.naturalHeight || 800;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = 'diagram.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const copySource = async () => {
    await navigator.clipboard.writeText(chart);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (error) {
    return (
      <pre className="bg-code-bg border border-border rounded-lg p-4 overflow-x-auto my-4 text-sm text-muted-foreground">
        {chart}
      </pre>
    );
  }

  if (!svg) return null;

  const wrapClass = full
    ? 'fixed inset-0 z-[100] flex flex-col bg-background'
    : 'relative my-6 rounded-lg border border-border bg-code-bg overflow-hidden';

  return (
    <div className={wrapClass}>
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-border bg-[#111] text-xs text-muted-foreground select-none">
        {/* Theme switcher */}
        <div className="flex items-center gap-1">
          <span className="mr-1 opacity-60">Theme:</span>
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-2 py-0.5 rounded capitalize transition-colors ${
                theme === t
                  ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/40'
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button onClick={() => zoom(0.2)}  title="Zoom in"  className="p-1.5 rounded hover:bg-white/5 transition-colors"><ZoomIn  className="h-4 w-4" /></button>
          <button onClick={() => zoom(-0.2)} title="Zoom out" className="p-1.5 rounded hover:bg-white/5 transition-colors"><ZoomOut className="h-4 w-4" /></button>
          <span className="px-1 opacity-60 tabular-nums w-12 text-center">{Math.round(scale * 100)}%</span>
          <button onClick={resetView} title="Reset view" className="p-1.5 rounded hover:bg-white/5 transition-colors"><RotateCcw className="h-4 w-4" /></button>

          <div className="w-px h-4 bg-border mx-1" />

          <button onClick={copySource} title="Copy source" className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/5 transition-colors">
            {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button onClick={() => setShowSource((v) => !v)} title="Toggle source" className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${showSource ? 'text-accent-blue bg-accent-blue/10' : 'hover:bg-white/5'}`}>
            <Code2 className="h-3.5 w-3.5" />Source
          </button>
          <button onClick={downloadSVG} title="Download SVG" className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/5 transition-colors">
            <Download className="h-3.5 w-3.5" />SVG
          </button>
          <button onClick={downloadPNG} title="Download PNG" className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/5 transition-colors">
            <ImageIcon className="h-3.5 w-3.5" />PNG
          </button>

          <div className="w-px h-4 bg-border mx-1" />

          <button onClick={() => { setFull((v) => !v); resetView(); }} title="Toggle fullscreen" className="p-1.5 rounded hover:bg-white/5 transition-colors">
            {full ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Source pane */}
      {showSource && (
        <pre className="border-b border-border bg-code-bg px-4 py-3 text-xs font-mono text-muted-foreground overflow-x-auto max-h-48">
          {chart}
        </pre>
      )}

      {/* Diagram canvas — draggable + zoomable */}
      <div
        ref={containerRef}
        className="overflow-hidden flex-1 cursor-grab active:cursor-grabbing"
        style={{ minHeight: full ? 0 : 280, userSelect: 'none' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
      >
        <div
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            display: 'flex',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    </div>
  );
}

