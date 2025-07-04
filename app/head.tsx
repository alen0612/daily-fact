export default function Head() {
  const title = '🌍 每日冷知識 Daily Fact';
  const description = '每天一則冷知識，支援多語言，讓你每天都學到一點點有趣的事！';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* SEO: Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/og-image.png" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="每日冷知識" />
      <meta property="og:locale" content="zh_TW" />

      {/* SEO: Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}