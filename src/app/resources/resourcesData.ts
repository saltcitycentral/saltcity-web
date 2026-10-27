export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  fileSize?: string; // optional if you don’t want to maintain it
  href: string; // /downloads/...
  cover?: string; // /downloads/covers/...
  kind: "pdf" | "audio" | "doc" | "link";
  external?: boolean;
  badge?: string; // small label like “Rhapsody”
};

export type ResourceCategory = {
  title: string;
  description: string;
  iconKey: "forms" | "confessions" | "study" | "prayer";
  resources: ResourceItem[];
};

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    title: "Forms & Documents",
    description: "Forms you can download and submit for key church processes.",
    iconKey: "forms",
    resources: [
      {
        id: "spousal-selection-form",
        title: "Spousal Selection Form",
        description: "Guidelines and form for those seeking a life partner.",
        fileSize: "PDF",
        href: "/downloads/spousal-selection-form.pdf",
        kind: "pdf",
        badge: "Form",
      },
      {
        id: "talking-stage-questionnaire",
        title: "Talking Stage Questionnaire",
        description: "Comprehensive Workbook for Christian Talking Stage.",
        fileSize: "PDF",
        href: "/downloads/talking_stage_questionnaire.pdf",
        kind: "pdf",
        badge: "Workbook",
      },
      {
        id: "marry-your-tribe",
        title: "Marry Your Tribe Worksheet",
        description: "A comprehensive worksheet for 'Must Haves' and 'Cannot Haves' in Christian Courtship.",
        fileSize: "PDF",
        href: "/downloads/marry-your-tribe.pdf",
        kind: "pdf",
        badge: "Workbook",
      },
    ],
  },

  {
    title: "Confessions",
    description: "Rhapsodies, confessions and declarations, to read aloud or listen to.",
    iconKey: "confessions",
    resources: [
      {
        id: "life-partner-men",
        title: "Life Partner Rhapsody (Men Only)",
        description: "Confessions themed around godly relationships (men’s edition).",
        fileSize: "PDF",
        href: "/downloads/life-partner-men.pdf",
        cover: "/downloads/covers/life-partner-men.jpg",
        kind: "pdf",
        badge: "Rhapsody",
      },
      {
        id: "life-partner-ladies",
        title: "Life Partner Rhapsody (Ladies Only)",
        description: "Confessions themed around godly relationships (ladies’ edition).",
        fileSize: "PDF",
        href: "/downloads/life-partner-ladies.pdf",
        cover: "/downloads/covers/life-partner-women.jpg",
        kind: "pdf",
        badge: "Rhapsody",
      },
      {
        id: "prosperity-rhapsody-pdf",
        title: "Prosperity Rhapsodies",
        description: "Confessions themed around prosperity and kingdom results.",
        fileSize: "PDF",
        href: "/downloads/prosperity-raphsody.pdf",
        cover: "/downloads/covers/prosperity-rhapsody.jpg",
        kind: "pdf",
        badge: "Rhapsody",
      },
      {
        id: "prosperity-rhapsody-audio",
        title: "Prosperity Rhapsodies (Audio)",
        description: "Audio version for easy playback and sharing.",
        fileSize: "Video",
        href: "/downloads/prosperity-raphsody-video.mpeg",
        cover: "/downloads/covers/prosperity-rhapsody.jpg",
        kind: "audio",
        badge: "Audio",
      },
      {
        id: "in-jesus-rhapsody",
        title: "In Jesus Rhapsody",
        description: "Confessions anchored on identity and victory in Christ.",
        fileSize: "PDF",
        href: "/downloads/in-jesus-raphsody.pdf",
        cover: "/downloads/covers/in-jesus-rhapsody.jpg",
        kind: "pdf",
        badge: "Rhapsody",
      },
      {
        id: "victory-rhapsody",
        title: "Victory Rhapsody",
        description: "Confessions themed around triumph, endurance, and conquest.",
        fileSize: "PDF",
        href: "/downloads/victory-raphsody.pdf",
        cover: "/downloads/covers/victory-rhapsody.jpg",
        kind: "pdf",
        badge: "Rhapsody",
      },
     {
        id: "for-my-husband",
        title: "For My Husband Rhapsody",
        description: "Confessions and declarations for wives to speak over their husbands.",
        fileSize: "PDF",
        href: "/downloads/for-my-husband-raphsody.pdf",
        cover: "/downloads/covers/for-my-husband.jpg",
        kind: "pdf",
        badge: "Rhapsody",
      },
    {
        id: "for-my-wife",
        title: "For My Wife Rhapsody",
        description: "Confessions and declarations for husbands to speak over their wives.",
        fileSize: "Audio",
        href: "/downloads/for-my-wife.mpeg",
        cover: "/downloads/covers/for-my-wife.jpg",
        kind: "audio",
        badge: "Audio",
      },
     {
        id: "for-my-children",
        title: "For My Children Rhapsody",
        description: "Confessions and declarations for parents to speak over their children.",
        fileSize: "PDF",
        href: "/downloads/for-children-raphsody.pdf",
        cover: "/downloads/covers/for-children-rhapsody.jpg",
        kind: "pdf",
        badge: "Rhapsody",
      },
    ],
  },

  {
    title: "Study Materials",
    description: "Tools to help you understand Scripture and grow steadily.",
    iconKey: "study",
    resources: [
      {
        id: "how-to-study-bible",
        title: "How to Study Your Bible",
        description: "A simple guide to studying Scripture with clarity and structure.",
        fileSize: "PDF",
        href: "/downloads/how-to-study-bible.pdf",
        cover: "/downloads/covers/how-to-study-bible.png", // add if you have it
        kind: "pdf",
        badge: "Study Guide",
      },
      {
        id: "personal-devotion",
        title: "Personal devotion",
        description: "A structured insightful guide on how to start, maintain, and maximize your personal devotion time.",
        fileSize: "PDF",
        href: "/downloads/personal-devotion.pdf",
        cover: "/downloads/covers/personal-devotion.png", // add if you have it
        kind: "pdf",
        badge: "Devotional Guide",
      },
    ],
  },


  // {
  //   title: "Prayer Resources",
  //   description: "Prayer tools and guides to strengthen your prayer life.",
  //   iconKey: "prayer",
  //   resources: [
  //     {
  //       id: "prayer-guide",
  //       title: "Prayer Guide",
  //       description: "A practical guide to building a consistent prayer life.",
  //       fileSize: "PDF",
  //       href: "/downloads/prayer-guide.pdf",
  //       kind: "pdf",
  //       badge: "Guide",
  //     },
    
  //   ],
  // },
];
