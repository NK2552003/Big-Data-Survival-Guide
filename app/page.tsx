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
      <section className="relative flex items-center min-h-[calc(100vh-65px)] overflow-hidden">

        {/* Blur balls – decorative background orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Top-left large orb */}
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent-blue/20 blur-[120px]" />
          {/* Top-right medium orb */}
          <div className="absolute -top-10 right-1/3 w-[350px] h-[350px] rounded-full bg-purple-500/15 blur-[100px]" />
          {/* Center-right large orb */}
          <div className="absolute top-1/3 -right-24 w-[480px] h-[480px] rounded-full bg-accent-blue/15 blur-[130px]" />
          {/* Bottom-left small orb */}
          <div className="absolute bottom-10 left-1/4 w-[280px] h-[280px] rounded-full bg-accent-orange/10 blur-[90px]" />
          {/* Bottom-right glow */}
          <div className="absolute -bottom-20 right-10 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[110px]" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* Left – text content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">
              Master the Big Data Landscape
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              A comprehensive guide to understanding, implementing, and optimizing big data systems. Learn from industry best practices, practical examples, and deep technical insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
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

          {/* Right – Big Data SVG illustration */}
          <div className="flex-1 flex items-center justify-center lg:justify-end order-first lg:order-last">
            <div className="relative w-full max-w-[480px]">
              {/* Soft glow behind SVG */}
              <div className="absolute inset-0 rounded-3xl bg-[#6ba3d6]/10 blur-3xl scale-90 -z-10" />
              <svg viewBox="0 0 480 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">

                {/* Monitor frame */}
                <rect x="40" y="20" width="400" height="270" rx="14" fill="#161412" stroke="#44403c" strokeWidth="1.5"/>
                <rect x="40" y="20" width="400" height="270" rx="14" fill="url(#screenGrad)" fillOpacity="0.5"/>
                {/* Screen inner */}
                <rect x="56" y="36" width="368" height="238" rx="8" fill="#1c1917"/>

                {/* Top bar */}
                <rect x="56" y="36" width="368" height="28" rx="8" fill="#161412"/>
                <rect x="56" y="52" width="368" height="12" fill="#161412"/>
                <circle cx="74" cy="50" r="5" fill="#e8834a" opacity="0.8"/>
                <circle cx="90" cy="50" r="5" fill="#6ba3d6" opacity="0.5"/>
                <circle cx="106" cy="50" r="5" fill="#44403c"/>
                <rect x="160" y="44" width="120" height="12" rx="6" fill="#292524"/>
                <text x="220" y="54" textAnchor="middle" fontSize="7" fill="#6ba3d6" fontFamily="monospace">big-data-dashboard</text>

                {/* Sidebar */}
                <rect x="56" y="64" width="60" height="210" fill="#161412"/>
                <rect x="56" y="64" width="60" height="210" stroke="#44403c" strokeWidth="0.5" strokeOpacity="0.5"/>
                <rect x="64" y="76" width="42" height="8" rx="4" fill="#292524"/>
                {/* active item */}
                <rect x="60" y="90" width="56" height="16" rx="3" fill="#6ba3d6" fillOpacity="0.12"/>
                <rect x="66" y="93" width="6" height="6" rx="1" fill="#6ba3d6"/>
                <rect x="75" y="94" width="28" height="4" rx="2" fill="#6ba3d6" opacity="0.5"/>
                {/* inactive items */}
                <rect x="66" y="112" width="6" height="6" rx="1" fill="#44403c"/>
                <rect x="75" y="113" width="28" height="4" rx="2" fill="#44403c"/>
                <rect x="66" y="128" width="6" height="6" rx="1" fill="#44403c"/>
                <rect x="75" y="129" width="28" height="4" rx="2" fill="#44403c"/>
                <rect x="66" y="144" width="6" height="6" rx="1" fill="#44403c"/>
                <rect x="75" y="145" width="28" height="4" rx="2" fill="#44403c"/>
                <rect x="66" y="160" width="6" height="6" rx="1" fill="#44403c"/>
                <rect x="75" y="161" width="28" height="4" rx="2" fill="#44403c"/>

                {/* Stat cards row */}
                <rect x="126" y="68" width="70" height="38" rx="6" fill="#292524" stroke="#44403c" strokeWidth="0.5"/>
                <text x="161" y="81" textAnchor="middle" fontSize="6" fill="#a8a29e" fontFamily="monospace">NODES</text>
                <text x="161" y="97" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6ba3d6" fontFamily="monospace">1.2K</text>

                <rect x="204" y="68" width="70" height="38" rx="6" fill="#292524" stroke="#44403c" strokeWidth="0.5"/>
                <text x="239" y="81" textAnchor="middle" fontSize="6" fill="#a8a29e" fontFamily="monospace">THROUGHPUT</text>
                <text x="239" y="97" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e8834a" fontFamily="monospace">98.4%</text>

                <rect x="282" y="68" width="70" height="38" rx="6" fill="#292524" stroke="#44403c" strokeWidth="0.5"/>
                <text x="317" y="81" textAnchor="middle" fontSize="6" fill="#a8a29e" fontFamily="monospace">STORAGE</text>
                <text x="317" y="97" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e7e5e4" fontFamily="monospace">4.7 PB</text>

                <rect x="360" y="68" width="64" height="38" rx="6" fill="#292524" stroke="#44403c" strokeWidth="0.5"/>
                <text x="392" y="81" textAnchor="middle" fontSize="6" fill="#a8a29e" fontFamily="monospace">JOBS</text>
                <text x="392" y="97" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e8834a" fontFamily="monospace">247</text>

                {/* Bar chart */}
                <rect x="126" y="116" width="148" height="82" rx="6" fill="#292524" stroke="#44403c" strokeWidth="0.5"/>
                <text x="136" y="128" fontSize="6" fill="#a8a29e" fontFamily="monospace">Data Ingestion (GB/s)</text>
                <line x1="132" y1="190" x2="268" y2="190" stroke="#44403c" strokeWidth="0.8"/>
                {[
                  [136, 14, "#6ba3d6"],
                  [147, 22, "#6ba3d6"],
                  [158, 18, "#6ba3d6"],
                  [169, 30, "#e8834a"],
                  [180, 26, "#6ba3d6"],
                  [191, 38, "#e8834a"],
                  [202, 34, "#6ba3d6"],
                  [213, 42, "#e8834a"],
                  [224, 36, "#6ba3d6"],
                  [235, 44, "#e8834a"],
                  [246, 40, "#6ba3d6"],
                ].map(([x, h, color], i) => (
                  <rect key={i} x={x} y={190 - (h as number)} width="8" height={h as number} rx="2" fill={color as string} opacity="0.8"/>
                ))}

                {/* Sparkline chart */}
                <rect x="282" y="116" width="142" height="82" rx="6" fill="#292524" stroke="#44403c" strokeWidth="0.5"/>
                <text x="292" y="128" fontSize="6" fill="#a8a29e" fontFamily="monospace">MapReduce Jobs</text>
                <polyline
                  points="290,182 303,172 316,176 329,162 342,166 355,152 368,156 381,144 394,148 407,136 420,140"
                  fill="none" stroke="#6ba3d6" strokeWidth="1.8" strokeLinejoin="round"/>
                <polyline
                  points="290,186 303,178 316,181 329,172 342,176 355,165 368,169 381,160 394,163 407,154 420,158"
                  fill="none" stroke="#e8834a" strokeWidth="1.2" strokeLinejoin="round" strokeDasharray="3 2" opacity="0.6"/>
                <polygon
                  points="290,198 290,182 303,172 316,176 329,162 342,166 355,152 368,156 381,144 394,148 407,136 420,140 420,198"
                  fill="url(#lineGrad)" opacity="0.12"/>
                <line x1="286" y1="198" x2="422" y2="198" stroke="#44403c" strokeWidth="0.8"/>

                {/* Heatmap */}
                <rect x="126" y="208" width="298" height="56" rx="6" fill="#292524" stroke="#44403c" strokeWidth="0.5"/>
                <text x="136" y="220" fontSize="6" fill="#a8a29e" fontFamily="monospace">Cluster Activity Heatmap</text>
                {Array.from({ length: 5 }).map((_, row) =>
                  Array.from({ length: 24 }).map((_, col) => {
                    const heat = (row * 7 + col * 3) % 6;
                    const colors = ["#292524", "#44403c", "#6ba3d6", "#6ba3d6", "#e8834a", "#e7e5e4"];
                    const opacities = [1, 0.6, 0.3, 0.6, 0.5, 0.4];
                    return (
                      <rect
                        key={`${row}-${col}`}
                        x={136 + col * 11.5}
                        y={224 + row * 7}
                        width="9" height="5" rx="1"
                        fill={colors[heat]}
                        opacity={opacities[heat]}
                      />
                    );
                  })
                )}

                {/* Monitor stand */}
                <rect x="215" y="291" width="50" height="8" rx="3" fill="#292524" stroke="#44403c" strokeWidth="1"/>
                <rect x="200" y="297" width="80" height="7" rx="3" fill="#292524" stroke="#44403c" strokeWidth="1"/>

                {/* Floating data badges */}
                <rect x="6" y="78" width="52" height="24" rx="6" fill="#292524" stroke="#44403c" strokeWidth="1"/>
                <text x="32" y="88" textAnchor="middle" fontSize="5.5" fill="#a8a29e" fontFamily="monospace">HDFS</text>
                <text x="32" y="98" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#6ba3d6" fontFamily="monospace">3 EB</text>

                <rect x="422" y="56" width="54" height="24" rx="6" fill="#292524" stroke="#44403c" strokeWidth="1"/>
                <text x="449" y="66" textAnchor="middle" fontSize="5.5" fill="#a8a29e" fontFamily="monospace">SPARK</text>
                <text x="449" y="76" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#e8834a" fontFamily="monospace">12 ms</text>

                <rect x="422" y="196" width="54" height="24" rx="6" fill="#292524" stroke="#44403c" strokeWidth="1"/>
                <text x="449" y="206" textAnchor="middle" fontSize="5.5" fill="#a8a29e" fontFamily="monospace">KAFKA</text>
                <text x="449" y="216" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#6ba3d6" fontFamily="monospace">99.9%</text>

                {/* Connector dots + lines */}
                <circle cx="58" cy="90" r="2.5" fill="#6ba3d6" opacity="0.5"/>
                <line x1="58" y1="90" x2="56" y2="105" stroke="#6ba3d6" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.35"/>

                <circle cx="422" cy="68" r="2.5" fill="#e8834a" opacity="0.5"/>
                <line x1="422" y1="68" x2="424" y2="86" stroke="#e8834a" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.35"/>

                {/* Bottom label */}
                <text x="240" y="352" textAnchor="middle" fontSize="8.5" fill="#44403c" fontFamily="monospace" letterSpacing="3">BIG DATA SURVIVAL GUIDE</text>
                <line x1="100" y1="347" x2="180" y2="347" stroke="#44403c" strokeWidth="0.6" opacity="0.6"/>
                <line x1="300" y1="347" x2="380" y2="347" stroke="#44403c" strokeWidth="0.6" opacity="0.6"/>

                <defs>
                  <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6ba3d6" stopOpacity="0.08"/>
                    <stop offset="100%" stopColor="#1c1917" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6ba3d6"/>
                    <stop offset="100%" stopColor="#6ba3d6" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}