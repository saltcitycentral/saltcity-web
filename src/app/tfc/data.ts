/**
 * Everything editable about the Faith Convention page lives here: links,
 * photos, the six "what to expect" cards, past editions and the FAQs.
 */

/** First session: Tuesday 8 December 2026, 9:00 AM WAT. Last: the Sunday 13th thanksgiving, 9:00 AM. */
export const START = "2026-12-08T09:00:00+01:00";
export const END = "2026-12-13T14:00:00+01:00";

export const VENUE_NAME = "Centre of Discipleship";
export const VENUE_ADDRESS = "20 Okumagba Avenue, Warri";

export const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=20+Okumagba+Avenue+Warri+Delta+State";

export const CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=The+Faith+Convention+2026+%E2%80%94+MULTIPLY" +
  "&dates=20261208T080000Z/20261213T130000Z" +
  "&details=Tuesday+to+Saturday%3A+mornings+9%3A00+AM+and+evenings+4%3A30+PM.+Sunday%3A+TFC+Thanksgiving+9%3A00+AM." +
  "&location=Centre+of+Discipleship%2C+20+Okumagba+Avenue%2C+Warri%2C+Delta+State";

/**
 * The invitation from the pastorate. Paste the YouTube video id here (the part
 * after "v=" in the link). While it is empty the page shows a still instead.
 */
export const INVITE_VIDEO_ID = "";

/**
 * The WhatsApp community for people joining online. This is the SaltCity
 * Online community for now; swap in the TFC group link when it exists.
 */
export const COMMUNITY_URL = "https://chat.whatsapp.com/BzDAhudAQ3oHblsdtPgwIV?mode=gi_t";

export const YOUTUBE_URL = "https://youtube.com/@saltcitycentral";
export const TELEGRAM_URL = "https://t.me/mysaltcity";

/** Where partnership giving goes. Same account as the Giving page. */
export const PARTNER_ACCOUNT = {
  bank: "Zenith Bank",
  name: "SaltCity Church",
  number: "1015095018",
};

const img = (name: string) => `/images/tfc/web/${name}.jpg`;

export type Tint = "crimson" | "ember" | "amber";
export type Photo = { src: string; position?: string };

/**
 * The opening sequence: three columns, one word each. Together they spell the
 * church's own name for the convention, a Prophetic Family Inheritance
 * sharing meeting. Each column shows its first photo, then turns to the second.
 */
export const INTRO: { word: string; tint: Tint; photos: [Photo, Photo] }[] = [
  {
    word: "Prophetic.",
    tint: "crimson",
    photos: [
      { src: img("intro-1a"), position: "38% 40%" },
      { src: img("intro-1b"), position: "55% 45%" },
    ],
  },
  {
    word: "Family.",
    tint: "ember",
    photos: [
      { src: img("intro-2a"), position: "50% 35%" },
      { src: img("intro-2b"), position: "50% 30%" },
    ],
  },
  {
    word: "Inheritance.",
    tint: "amber",
    photos: [
      { src: img("intro-3a"), position: "40% 50%" },
      { src: img("intro-3b"), position: "50% 55%" },
    ],
  },
];

/**
 * The hero: three slanted slices, each cycling through its own photos. Between
 * them they show the whole house: the young, couples, fathers, the older
 * members, the teams that serve.
 */
export const HERO_SLICES: { tint: Tint; photos: Photo[] }[] = [
  {
    tint: "crimson",
    photos: [
      { src: img("hero-dance"), position: "38% 30%" },
      { src: img("past-25-d"), position: "50% 25%" },
      { src: img("slice-wave"), position: "50% 25%" },
    ],
  },
  {
    tint: "ember",
    photos: [
      { src: img("hero-hands"), position: "45% 55%" },
      { src: img("expect-family"), position: "50% 30%" },
      { src: img("past-25-f"), position: "32% 30%" },
    ],
  },
  {
    tint: "amber",
    photos: [
      { src: img("expect-joy"), position: "45% 40%" },
      { src: img("expect-children"), position: "50% 30%" },
      { src: img("join-online"), position: "42% 30%" },
    ],
  },
];

export const INVITE_STILL = img("invite-still");

export type ExpectCard = {
  key: string;
  when: string;
  title: string;
  body: string;
  /** Shown as a short line under the body, e.g. the family life groups. */
  list?: string[];
  image: string;
  alt: string;
  position?: string;
};

export const EXPECT: ExpectCard[] = [
  {
    key: "sons",
    when: "Tuesday Night",
    title: "The Blessing Of Sons",
    body: "The convention kicks off with an in-house gathering of sons raised in SaltCity, coming together to receive a Father’s blessing from our Senior PASTOR.",
    image: img("expect-blessing"),
    alt: "The congregation with hands raised on the first day of the convention",
    position: "50% 45%",
  },
  {
    key: "family",
    when: "Through The Week",
    title: "Family Life",
    body: "Specific days have been set aside for each demographic group in our church, with teachings, ministrations, and activities thoughtfully tailored to their unique needs.",
    list: ["Single men", "Single women", "Married men", "Married women", "Teens and children"],
    image: img("expect-familylife"),
    alt: "Members gathered close around one another in prayer",
    position: "50% 40%",
  },
  {
    key: "ministry",
    when: "Saturday, 9:00 AM",
    title: "School Of Ministry",
    body: "Saturday morning session is for believers who lead a ministry, or serve in another person’s ministry, to equip them to become exemplary in their speech, faith, and overall conduct.",
    image: img("expect-ministry"),
    alt: "Members taking notes during a teaching session",
    position: "50% 60%",
  },
  {
    key: "joy",
    when: "Saturday Evening",
    title: "Joy Night",
    body: "Saturday evening is a joy meeting. Expect an atmosphere filled with loud music, dancing and rejoicing as we celebrate answered prayers, and prophetically displace the spirit of heaviness, depression and discouragement.",
    image: img("expect-joy"),
    alt: "Members celebrating with horns and trumpets",
    position: "50% 40%",
  },
  {
    key: "thanksgiving",
    when: "Sunday, 9:00 AM",
    title: "TFC Thanksgiving",
    body: "As a right response to Grace received, The Faith Convention comes to a close with its own thanksgiving service.",
    image: img("expect-thanks"),
    alt: "Members dancing in thanksgiving",
    position: "50% 30%",
  },
];

export const JOIN = {
  ground: { image: img("join-ground"), alt: "Members seated in the hall, facing the stage" },
  online: { image: img("join-online"), alt: "The choir leading worship on stage" },
};

export const PARTNER_IMAGE = {
  src: img("partner"),
  alt: "A member holding the MULTIPLY banner overhead",
};

export type PastEdition = {
  year: string;
  /** Leave empty when the theme isn't confirmed; the page then shows the year alone. */
  theme: string;
  note: string;
  photos: { src: string; alt: string; tall?: boolean; position?: string }[];
  youtube: string;
};

const ytSearch = (q: string) =>
  `https://www.youtube.com/@saltcitycentral/search?query=${encodeURIComponent(q)}`;

export const PAST: PastEdition[] = [
  {
    year: "2025",
    theme: "INFLUENCE",
    note: "9–14 December 2025. Morning and evening sessions, closing with thanksgiving.",
    photos: [
      { src: img("past-25-a"), alt: "The congregation rejoicing, in black and white" },
      { src: img("past-25-d"), alt: "A couple laughing together outside the hall", tall: true, position: "50% 25%" },
      { src: img("past-25-b"), alt: "Performers on stage during Joy Night" },
      { src: img("past-25-f"), alt: "A father of the house arriving with his Bible", position: "40% 30%" },
      { src: img("past-25-e"), alt: "Two young women at the convention backdrop", tall: true, position: "50% 20%" },
      { src: img("past-25-c"), alt: "A minister preaching, in black and white", position: "50% 30%" },
      { src: img("past-25-g"), alt: "A bass guitarist from the music team" },
      { src: img("past-25-j"), alt: "A young woman smiling in the congregation", position: "40% 30%" },
      { src: img("past-25-h"), alt: "A woman bowed to the ground in thanksgiving" },
    ],
    youtube: ytSearch("The Faith Convention 2025"),
  },
  {
    year: "2024",
    theme: "",
    note: "Five days of teaching, closing with a Joy Festival.",
    photos: [],
    youtube: ytSearch("Faith Convention 2024"),
  },
  {
    year: "2023",
    theme: "",
    note: "Teaching sessions through the week, with a Special School of Ministry.",
    photos: [],
    youtube: ytSearch("Faith Convention 2023"),
  },
  {
    year: "2022",
    theme: "Unforced Rhythms of Grace",
    note: "Stories from this convention are told in our Faith Stories series.",
    photos: [],
    youtube: ytSearch("Faith Convention 2022"),
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Where is it holding?",
    a: "At the Centre of Discipleship, 20 Okumagba Avenue, Warri. Every SaltCity church is gathering there. There are no other venues and no watch parties.",
  },
  {
    q: "What time are the sessions?",
    a: "From Tuesday 8 to Saturday 12 December, mornings at 9:00 AM and evenings at 4:30 PM. On Sunday there is one session, the TFC Thanksgiving at 9:00 AM.",
  },
  {
    q: "Is there a morning session on Tuesday?",
    a: "Yes. Tuesday has two sessions: one at 9:00 AM and another at 4:30 PM.",
  },
  {
    q: "Is there an evening session on Sunday?",
    a: "No. There is only one session on Sunday, at 9:00 AM, which is our TFC Thanksgiving.",
  },
  {
    q: "Will my children be catered for?",
    a: "Yes. Children's church runs while the convention holds, so your children are taught and blessed in their own meeting.",
  },
  {
    q: "I can't be in Warri. How do I take part?",
    a: "Join the convention's online community on WhatsApp for livestream links, updates and further inquiries. The sessions are also on our YouTube channel.",
  },
  {
    q: "How can I partner with the convention?",
    a: "Give into the partnership account shown on this page, or use any of the other ways on our Giving page.",
  },
];
