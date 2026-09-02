/**
 * Single source of truth for site-wide SEO / structured data.
 * Update here and it flows to metadata, sitemap, robots and JSON-LD.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.saltcitycentral.org"
).replace(/\/$/, "");

export const SITE_NAME = "SaltCity Central";
export const SITE_TAGLINE = "A church in Warri, Delta State";

export const SITE_DESCRIPTION =
  "SaltCity Central is a church in Warri, Delta State, Nigeria. " +
  "Join us Sundays at 9:00 AM at 20 Okumagba Avenue — we teach believers how to " +
  "live victoriously by practicing the Written Word of GOD, with JESUS as our EXAMPLE.";

export const CONTACT = {
  email: "info@saltcity.church",
  phone: "+2348030597015",
  phoneDisplay: "+234 803 059 7015",
};

export const SOCIAL_LINKS = [
  "https://youtube.com/@saltcitycentral",
  "https://instagram.com/saltcitycentral",
  "https://x.com/saltcitycentral",
  "https://t.me/mysaltcity",
  "https://open.spotify.com/show/0ZH0Zaojh617RRjrGzQsMw",
];

export const PRIMARY_LOCATION = {
  name: "SaltCity Central — Warri",
  street: "20 Okumagba Avenue",
  city: "Warri",
  region: "Delta",
  postalCode: "332104",
  country: "NG",
  lat: 5.529802967900948,
  lng: 5.741930554276473,
};

export const SAPELE_LOCATION = {
  name: "SaltCity — Sapele",
  street: "110 Sapele-Warri Road",
  city: "Sapele",
  region: "Delta",
  postalCode: "331107",
  country: "NG",
  lat: 5.879486636186575,
  lng: 5.698460446593333,
};

/** Weekly services at the Warri campus (WAT). */
export const SERVICE_TIMES = [
  { day: "Sunday", opens: "09:00", closes: "12:00" },
  { day: "Wednesday", opens: "17:00", closes: "19:00" },
  { day: "Friday", opens: "17:00", closes: "19:00" },
];
