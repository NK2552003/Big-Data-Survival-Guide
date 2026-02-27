'use client';

import { Share2 } from 'lucide-react';

export function ShareButton() {
  const handleShare = async () => {
    const shareData = {
      title: 'Big Data Survival Guide',
      text: 'A comprehensive guide to navigating the big data landscape.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Share this page"
    >
      <Share2 className="h-5 w-5" />
    </button>
  );
}
