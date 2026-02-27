import { Metadata } from 'next';
import { DocNode } from './docs';

export const siteConfig = {
  name: 'Big Data Survival Guide',
  description: 'A comprehensive guide to navigating the big data landscape with practical insights and best practices.',
  url: 'https://big-data-survival-guide.vercel.app',
  ogImage: 'https://big-data-survival-guide.vercel.app/og-image.png',
  links: {
    github: 'https://github.com/NK2552003/Big-Data-Survival-Guide',
    author: 'https://github.com/NK2552003',
  },
};

export function getDocMetadata(
  doc: DocNode,
  slug: string
): Metadata {
  const title = doc.metadata?.title || doc.title;
  const description = doc.metadata?.description || siteConfig.description;
  const url = `${siteConfig.url}/${slug}`;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    authors: [{ name: 'NK2552003', url: siteConfig.links.author }],
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
    canonical: url,
  };
}

export function getStructuredData(doc: DocNode, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: doc.metadata?.title || doc.title,
    description: doc.metadata?.description || siteConfig.description,
    url: `${siteConfig.url}/${slug}`,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: {
      '@type': 'ImageObject',
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
    },
  };
}
