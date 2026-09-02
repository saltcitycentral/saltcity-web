/**
 * Weekday classes — shared config for the pages and the API route.
 * The `key` is what gets written to the spreadsheet tab.
 */
export type WeekdayClass = {
  key: "learn-to-pray" | "read-your-bible";
  title: string;
  teacher: string;
  blurb: string;
  time: string;
  location: string;
  landscape: string;
  portrait: string;
  accent: string;
};

export const WEEKDAY_CLASSES: Record<WeekdayClass["key"], WeekdayClass> = {
  "learn-to-pray": {
    key: "learn-to-pray",
    title: "Learn How To Pray",
    teacher: "Pastor Seun",
    blurb:
      "A weekly class on prayer — how to build a life of it, and how to pray in a way that shapes you and moves things.",
    time: "Every Thursday · 6–7pm",
    location: "Telegram",
    landscape: "/images/weekday-classes/pray-landscape.jpg",
    portrait: "/images/weekday-classes/pray-portrait.jpg",
    accent: "#C2643C",
  },
  "read-your-bible": {
    key: "read-your-bible",
    title: "How To Read Your Bible",
    teacher: "Pastor Edison",
    blurb:
      "A weekly class on Scripture — how to read it, understand it, and let it become the way you actually live.",
    time: "Every Thursday · 6–7pm",
    location: "Telegram",
    landscape: "/images/weekday-classes/bible-landscape.jpg",
    portrait: "/images/weekday-classes/bible-portrait.jpg",
    accent: "#B8862F",
  },
};

export const CLASS_KEYS = Object.keys(WEEKDAY_CLASSES) as WeekdayClass["key"][];
