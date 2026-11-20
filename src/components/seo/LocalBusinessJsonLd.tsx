import { getReviews, getServiceArea } from "@/lib/content";
import { coreServices } from "@/lib/services";
import { site } from "@/lib/site";

const openingHours = [
  { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "19:00" },
  { dayOfWeek: ["Saturday"], opens: "09:00", closes: "17:00" },
  { dayOfWeek: ["Sunday"], opens: "10:00", closes: "16:00" },
];

export async function LocalBusinessJsonLd() {
  const [reviews, area] = await Promise.all([getReviews(), getServiceArea()]);
  const sameAs = [...Object.values(site.social), reviews.googleBusinessUrl].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.shortName,
    description: site.tagline,
    url: site.url,
    logo: `${site.url}/images/logo.png`,
    image: `${site.url}/images/hero-tire-service.webp`,
    telephone: site.phone.href.replace("tel:", ""),
    email: site.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: [
      { "@type": "State", name: "Maryland" },
      { "@type": "City", name: area.hub.name },
      ...area.cities.slice(0, 12).map((name) => ({ "@type": "City", name })),
    ],
    openingHoursSpecification: openingHours.map((h) => ({ "@type": "OpeningHoursSpecification", ...h })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mobile tire services",
      itemListElement: coreServices.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.description },
      })),
    },
    ...(reviews.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviews.rating,
            reviewCount: reviews.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
          review: reviews.reviews.slice(0, 5).map((r) => ({
            "@type": "Review",
            reviewBody: r.text,
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
            author: { "@type": "Person", name: r.author },
          })),
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
