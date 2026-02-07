export type MediaCategory =
  | "sermon-series"
  | "songs"
  | "devotionals"
  | "e-books"
  | "school-of-ministry"
  | "the-faith-convention"
  | "faith-seminars"
  | "school-of-marriage";

export type MediaItem = {
  category: MediaCategory;
  slug: string;

  title: string;
  summary: string;

  heroImage: string; // wide banner
  cardImage: string; // list/rail image

  // “In this series” items
  episodes?: Array<{
    slug: string;
    title: string;
    part?: string;
    duration?: string;
    image: string;
    youtubeID: string
  }>;

  // chips like “Additional Resources”
  resources?: Array<{ label: string; href: string }>;

  // optional links for CTA buttons on detail page
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };

  tags?: string[];
};

export const CATEGORY_META: Record<
  MediaCategory,
  { title: string; subtitle: string; theme?: "light" | "dark" }
> = {
  "sermon-series": {
    title: "Sermon Series",
    subtitle:
      "Scripture-rich teaching that builds conviction and trains believers for victory.",
    theme: "light",
  },
  songs: {
    title: "Songs",
    subtitle:
      "Worship and sound doctrine set to melody — songs that keep your heart on Jesus.",
    theme: "dark",
  },
  devotionals: {
    title: "Devotionals",
    subtitle:
      "Short, consistent devotionals to keep your mind steady on Christ daily.",
    theme: "light",
  },
  "e-books": {
    title: "E Books",
    subtitle:
      "Readable, grounded resources for growth, clarity, and steady discipleship.",
    theme: "light",
  },
  "school-of-ministry": {
    title: "School of Ministry",
    subtitle:
      "Training believers for doctrine, discipline, service, and faithful labour.",
    theme: "dark",
  },
  "the-faith-convention": {
    title: "The Faith Convention",
    subtitle:
      "Convention sessions, messages, and highlights — all in one place.",
    theme: "dark",
  },
  "faith-seminars": {
    title: "Faith Seminars",
    subtitle:
      "Focused teachings that go deep on key subjects with practical clarity.",
    theme: "light",
  },
  "school-of-marriage": {
    title: "School of Marriage",
    subtitle:
      "Biblical marriage teaching — love, order, wisdom, and Christ-centred homes.",
    theme: "light",
  },
};

// Replace these images later with your own.
// For now, use your existing assets.
const img = (path: string) => path;

export const MEDIA_ITEMS: MediaItem[] = [
  // SERMON SERIES (example with episodes)
// --- INESCAPABLE WORK ---
  {
    category: "sermon-series",
    slug: "inescapable-work",
    title: "Inescapable Work",
    summary:
      "A profound study on the necessity of spiritual labour, the call to diligence in the kingdom, and the rewards of a life dedicated to God's service.",
    heroImage: img("/images/inescapable-work.jpeg"),
    cardImage: img("/images/inescapable-work.jpeg"),
    primaryCta: { label: "Watch on YouTube", href: "https://youtube.com/saltcitycentral" },
    secondaryCta: { label: "Listen on Telegram", href: "https://t.me/mysaltcity" },
    episodes: [
      {
        slug: "inescapable-work",
        title: "Inescapable Work 1.0",
        part: "PART 1",
        duration: "3:00:00",
        image: img("/images/inescapable-work.jpeg"),
        youtubeID: "aTJFP-TDhHM",
      },
      {
        slug: "inescapale-work-2.0",
        title: "Inescapable Work 2.0",
        part: "PART 2",
        duration: "3:00:00",
        image: img("/images/inescapable-work.jpeg"),
        youtubeID: "9IY9i3rvBew",
      },
      {
        slug: "inescapable-work-3.0",
        title: "Inescapable Work 3.0",
        part: "PART 3",
        duration: "3:00:00",
        image: img("/images/inescapable-work.jpeg"),
        youtubeID: "hWCCIDPmUEs",
      },

    ],
    tags: ["work", "service", "diligence"],
  },

  // --- WRITE THE VISION ---
  {
    category: "sermon-series",
    slug: "write-the-vision",
    title: "Write the Vision",
    summary:
      "Understanding the power of vision, how to document spiritual direction, and the patience required to see the promise manifest.",
    heroImage: img("/images/Write-the-Vision.jpg"),
    cardImage: img("/images/Write-the-Vision.jpg"),
    primaryCta: { label: "Watch on YouTube", href: "https://youtube.com/saltcitycentral" },
    secondaryCta: { label: "Listen on Telegram", href: "https://t.me/mysaltcity" },
    episodes: [
      {
        slug: "write-the-vision",
        title: "Write The Vision",
        part: "PART 1",
        duration: "3:00:00",
        image: img("/images/Write-the-Vision.jpg"),
        youtubeID: "02VNPeZ5O7M"
      },
      {
        slug: "write-the-vision-2.0",
        title: "Write The Vision 2.0",
        part: "PART 2",
        duration: "3:00:00",
        image: img("/images/Write-the-Vision.jpg"),
        youtubeID: "N7EPW9YhFaY"
      },
      {
        slug: "write-the-vision-3.0",
        title: "Write The Vision 3.0",
        part: "PART 3",
        duration: "3:00:00",
        image: img("/images/Write-the-Vision.jpg"),
        youtubeID: "hLNcV4dqAIo"
      },
  
    ],
    tags: ["vision", "purpose", "patience"],
  },


  // --- WRITE THE VISION ---
  {
    category: "sermon-series",
    slug: "fruitful-christianity",
    title: "Fruitful Christianity",
    summary:
      "Understanding the power of vision, how to document spiritual direction, and the patience required to see the promise manifest.",
    heroImage: img("/images/fruitful-christianity.jpeg"),
    cardImage: img("/images/fruitful-christianity.jpeg"),
    primaryCta: { label: "Watch on YouTube", href: "https://youtube.com/saltcitycentral" },
    secondaryCta: { label: "Listen on Telegram", href: "https://t.me/mysaltcity" },
    episodes: [
      {
        slug: "fruitful-christianity",
        title: "Fruitful Christianity",
        part: "PART 1",
        duration: "3:00:00",
        image: img("/images/fruitful-christianity.jpeg"),
        youtubeID: "vG9PZhunBkE"
      },
      {
        slug: "fruitful-christianity-2.0",
        title: "Fruitful Christianity 2.0",
        part: "PART 2",
        duration: "3:00:00",
        image: img("/images/fruitful-christianity.jpeg"),
        youtubeID: "LNlqJzHCQ7g"
      },
  
    ],
    tags: ["vision", "purpose", "patience"],
  },

  // SONGS
  {
    category: "songs",
    slug: "songs-of-faith-vol-1",
    title: "Songs of Faith (Vol. 1)",
    summary:
      "A collection of worship songs that stir faith, strengthen devotion, and keep your heart anchored.",
    heroImage: img("/images/place-for-you.jpg"),
    cardImage: img("/images/giving-phone.jpg"),
    primaryCta: { label: "Listen", href: "#" },
    secondaryCta: { label: "Download", href: "#" },
    tags: ["worship", "songs"],
  },

  // DEVOTIONALS
  {
    category: "devotionals",
    slug: "morning-devotionals",
    title: "Morning Devotionals",
    summary:
      "Short daily devotionals to align your mind with Christ and keep your walk intentional.",
    heroImage: img("/images/new-here.jpg"),
    cardImage: img("/images/new-here.jpg"),
    primaryCta: { label: "Start Here", href: "#" },
    tags: ["devotional", "daily"],
  },

  // E BOOKS
  {
    category: "e-books",
    slug: "the-faith-life-handbook",
    title: "The Faith Life Handbook",
    summary:
      "Clear, Bible-rooted teaching on faith, confession, endurance, and growth — written for daily practice.",
    heroImage: img("/images/giving-hero.jpg"),
    cardImage: img("/images/place-for-you.jpg"),
    primaryCta: { label: "Read", href: "#" },
    secondaryCta: { label: "Download PDF", href: "#" },
    tags: ["ebook", "faith"],
  },

  // SCHOOL OF MINISTRY
  {
    category: "school-of-ministry",
    slug: "ministry-foundations",
    title: "Ministry Foundations",
    summary:
      "Training sessions on doctrine, service, stewardship, and building a faithful ministry life.",
    heroImage: img("/images/place-for-you.jpg"),
    cardImage: img("/images/giving-phone.jpg"),
    primaryCta: { label: "View Sessions", href: "#" },
    tags: ["training", "ministry"],
  },

  // THE FAITH CONVENTION
  {
    category: "the-faith-convention",
    slug: "the-faith-convention-2025",
    title: "The Faith Convention (2025)",
    summary:
      "Convention messages, sessions, and key moments — all gathered in one place for replay and review.",
    heroImage: img("/images/giving-hero.jpg"),
    cardImage: img("/images/new-here.jpg"),
    primaryCta: { label: "Watch Highlights", href: "#" },
    tags: ["convention"],
  },

  // FAITH SEMINARS
  {
    category: "faith-seminars",
    slug: "faith-and-confession",
    title: "Faith & Confession Seminar",
    summary:
      "Focused seminar teaching on what faith is, how it speaks, and how to stay steady through pressure.",
    heroImage: img("/images/new-here.jpg"),
    cardImage: img("/images/giving-phone.jpg"),
    primaryCta: { label: "Watch", href: "#" },
    secondaryCta: { label: "Notes", href: "#" },
    tags: ["seminar", "faith"],
  },

  // SCHOOL OF MARRIAGE
  {
    category: "school-of-marriage",
    slug: "marriage-order-and-love",
    title: "Marriage: Order, Wisdom & Love",
    summary:
      "Biblical marriage teaching — roles, communication, honour, and building a Christ-centred home.",
    heroImage: img("/images/place-for-you.jpg"),
    cardImage: img("/images/place-for-you.jpg"),
    primaryCta: { label: "View Lessons", href: "#" },
    tags: ["marriage", "family"],
  },
];
