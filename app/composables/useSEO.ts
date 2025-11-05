export const useSEO = () => {
  /**
   * Generate Article Schema.org JSON-LD
   */
  const generateArticleSchema = (
    post: any,
    siteUrl: string = "https://yourdomain.com"
  ) => {
    if (!post) return null;

    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.seo?.meta_title || post.title,
      description: post.seo?.meta_description || post.excerpt,
      image:
        post.seo?.og_image ||
        post.featured_image ||
        `${siteUrl}/default-og.jpg`,
      author: {
        "@type": "Person",
        name: post.author?.name || "Anonymous",
        url: post.author?.website || siteUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "Your Site Name",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
      },
      datePublished: post.published_at || post.created_at,
      dateModified: post.updated_at,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": post.seo?.canonical_url || `${siteUrl}/p/${post.slug}`,
      },
    };

    // Merge with custom schema if provided
    if (post.seo?.schema_json) {
      return { ...schema, ...post.seo.schema_json };
    }

    return schema;
  };

  /**
   * Generate BreadcrumbList Schema
   */
  const generateBreadcrumbSchema = (
    breadcrumbs: Array<{ name: string; url: string }>
  ) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  };

  /**
   * Setup SEO meta tags for a blog post
   */
  const setupPostSEO = (post: any, options: any = {}) => {
    const config = useRuntimeConfig();
    const siteUrl =
      options.siteUrl || config.public.siteUrl || "https://yourdomain.com";
    const siteName = options.siteName || "Your Site Name";

    if (!post) return;

    const seo = post.seo || {};

    // Meta title
    const title = seo.meta_title || post.title;
    const titleTemplate = `${title} | ${siteName}`;

    // Meta description
    const description = seo.meta_description || post.excerpt || "";

    // Canonical URL
    const canonical = seo.canonical_url || `${siteUrl}/p/${post.slug}`;

    // OG Image
    const ogImage =
      seo.og_image || post.featured_image || `${siteUrl}/default-og.jpg`;

    // Keywords
    const keywords =
      seo.meta_keywords || post.tags?.map((t: any) => t.name).join(", ") || "";

    useHead({
      title: title,
      titleTemplate: titleTemplate,
      meta: [
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        { name: "robots", content: seo.meta_robots || "index,follow" },
        { name: "author", content: post.author?.name || "" },
        {
          property: "article:published_time",
          content: post.published_at || post.created_at,
        },
        { property: "article:modified_time", content: post.updated_at },
        { property: "article:author", content: post.author?.name || "" },
        ...(post.tags || []).map((tag: any) => ({
          property: "article:tag",
          content: tag.name,
        })),
      ],
      link: [{ rel: "canonical", href: canonical }],
    });

    // Open Graph
    useSeoMeta({
      // Open Graph
      ogTitle: seo.og_title || title,
      ogDescription: seo.og_description || description,
      ogImage: ogImage,
      ogImageAlt: title,
      ogUrl: canonical,
      ogType: seo.og_type || "article",
      ogSiteName: siteName,

      // Twitter Card
      twitterCard: seo.twitter_card || "summary_large_image",
      twitterTitle: seo.twitter_title || seo.og_title || title,
      twitterDescription:
        seo.twitter_description || seo.og_description || description,
      twitterImage: seo.twitter_image || ogImage,
      twitterSite: "@yourtwitter",
      twitterCreator: "@yourtwitter",
    });

    // JSON-LD Schema
    const articleSchema = generateArticleSchema(post, siteUrl);

    const breadcrumbs = [
      { name: "Home", url: siteUrl },
      { name: "Blog", url: `${siteUrl}/blog` },
      {
        name: post.category?.name || "Uncategorized",
        url: `${siteUrl}/category/${post.category?.slug}`,
      },
      { name: title, url: canonical },
    ];

    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(articleSchema),
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(breadcrumbSchema),
        },
      ],
    });
  };

  /**
   * Setup SEO for homepage
   */
  const setupHomeSEO = (options: any = {}) => {
    const config = useRuntimeConfig();
    const siteUrl =
      options.siteUrl || config.public.siteUrl || "https://yourdomain.com";
    const siteName = options.siteName || "Your Site Name";
    const description = options.description || "Your site description";

    useHead({
      title: siteName,
      meta: [
        { name: "description", content: description },
        { name: "robots", content: "index,follow" },
      ],
      link: [{ rel: "canonical", href: siteUrl }],
    });

    useSeoMeta({
      ogTitle: siteName,
      ogDescription: description,
      ogUrl: siteUrl,
      ogType: "website",
      ogSiteName: siteName,
      twitterCard: "summary_large_image",
      twitterTitle: siteName,
      twitterDescription: description,
    });
  };

  return {
    generateArticleSchema,
    generateBreadcrumbSchema,
    setupPostSEO,
    setupHomeSEO,
  };
};
