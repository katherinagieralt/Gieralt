import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  image?: string; // Alias for ogImage
  ogType?: "website" | "article";
  twitterHandle?: string;
  jsonLd?: object;
}

export function SEO({
  title = "Katarzyna Gierałt | UX/UI Designer & AI Expert",
  description = "Projektuję nowoczesne interfejsy i wdrażam rozwiązania AI, które pomagają firmom rosnąć. Sprawdź moje portfolio i bloga.",
  canonical = "https://katarzynagieralt.pl",
  ogImage,
  image,
  ogType = "website",
  twitterHandle = "@katarzynagieralt",
  jsonLd
}: SEOProps) {
  const siteTitle = title.includes("Katarzyna Gierałt") ? title : `${title} | Katarzyna Gierałt`;
  const finalImage = image || ogImage || "https://katarzynagieralt.pl/og-image.jpg";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={canonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
