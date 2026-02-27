import { MetadataRoute } from 'next';
import { buildNavTree, flattenNavTree } from '@/lib/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  const navTree = buildNavTree();
  const flatDocs = flattenNavTree(navTree).filter((doc) => !doc.isDir);

  const baseUrl = 'https://nk2552003.github.io/Big-Data-Survival-Guide';

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  for (const doc of flatDocs) {
    routes.push({
      url: `${baseUrl}/${doc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  return routes;
}
