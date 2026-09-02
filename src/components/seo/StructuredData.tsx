import {
  CONTACT,
  PRIMARY_LOCATION,
  SAPELE_LOCATION,
  SERVICE_TIMES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/site";

/**
 * Schema.org JSON-LD. This is what tells Google we are a church, where we are,
 * and when services hold — the basis for "church in Warri" style results and
 * the knowledge panel. Rendered once, in the root layout.
 */
export default function StructuredData() {
  const campus = (loc: typeof PRIMARY_LOCATION, id: string) => ({
    "@type": "Church",
    "@id": `${SITE_URL}/#${id}`,
    name: loc.name,
    url: `${SITE_URL}/locations`,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.street,
      addressLocality: loc.city,
      addressRegion: loc.region,
      postalCode: loc.postalCode,
      addressCountry: loc.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng },
  });

  const graph = [
    {
      "@type": ["Church", "PlaceOfWorship"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ["SaltCity", "SaltCity Church", "Salt City Warri"],
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
      image: `${SITE_URL}/og-image.jpg`,
      email: CONTACT.email,
      telephone: CONTACT.phone,
      sameAs: SOCIAL_LINKS,
      address: {
        "@type": "PostalAddress",
        streetAddress: PRIMARY_LOCATION.street,
        addressLocality: PRIMARY_LOCATION.city,
        addressRegion: PRIMARY_LOCATION.region,
        postalCode: PRIMARY_LOCATION.postalCode,
        addressCountry: PRIMARY_LOCATION.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: PRIMARY_LOCATION.lat,
        longitude: PRIMARY_LOCATION.lng,
      },
      hasMap: `https://www.google.com/maps/search/?api=1&query=${PRIMARY_LOCATION.lat},${PRIMARY_LOCATION.lng}`,
      areaServed: [
        { "@type": "City", name: "Warri" },
        { "@type": "City", name: "Effurun" },
        { "@type": "City", name: "Sapele" },
        { "@type": "AdministrativeArea", name: "Delta State" },
      ],
      openingHoursSpecification: SERVICE_TIMES.map((s) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${s.day}`,
        opens: s.opens,
        closes: s.closes,
      })),
      subOrganization: [campus(SAPELE_LOCATION, "sapele")],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-NG",
    },
  ];

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: all values are our own constants.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
