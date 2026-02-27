'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '3px',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
        background: 'var(--border)',
        opacity: 0.3,
      }}
    >
      <div
        style={{
          width: '100%',
          height: `${progress}%`,
          background: 'linear-gradient(to bottom, var(--accent-orange), var(--accent-blue))',
          transition: 'height 0.05s linear',
        }}
      />
    </div>
  );
}
