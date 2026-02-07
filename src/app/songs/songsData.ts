// src/app/songs/songsData.ts

export type Platforms = {
  youtube?: string;
  youtubeMusic?: string;
  spotify?: string;
  appleMusic?: string;
};

export type Track = {
  title: string;
  platforms: Platforms;
};

export type Album = {
  id: string;
  title: string;
  year?: string;
  cover: string;
  description?: string;
  tracks: Track[];
};

export type Single = {
  id: string;
  title: string;
  year?: string;
  cover: string;
  platforms: Platforms;
};

export const ALBUMS: Album[] = [
  {
    id: "surrender-live",
    title: "Surrender (Live)",
    year: "2026",
    cover: "/images/surrender.jpeg",
    description:
      "A powerful live worship experience captured during our gathering. These songs reflect our heart of surrender and encounter with God's presence.",
    tracks: [
      { title: "Surrender (Live)", platforms: { youtube: "https://youtube.com/watch?v=...", spotify: "#", appleMusic: "#" } },
      { title: "Let Your Presence Fall (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "Invade Us (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "Thirsty Lord (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "One Encounter (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "Living Water (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "Running After You (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "Jesus Loves You (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "Apple of His Eyes (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "All Yours (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "Closer (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "Altar (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "Holy Ghost and Fire (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "Miracles (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "All the Way (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "Jesus (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "Matchless One (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
      { title: "One Mic (Live)", platforms: { youtube: "#", spotify: "#", appleMusic: "#" } },
    ],
  },
];

export const SINGLES: Single[] = [
  {
    id: "rest-all-over-live",
    title: "Rest All Over (Live)",
    year: "2026",
    cover: "/images/rest_all_over.jpeg",
    platforms: { youtube: "https://youtube.com/watch?v=...", spotify: "#", appleMusic: "#" },
  },
  {
    id: "make-me-wise-live",
    title: "Make Me Wise (Live)",
    year: "2026",
    cover: "/images/make-me-wise.jpeg",
    platforms: { youtube: "https://youtube.com/watch?v=...", spotify: "#", appleMusic: "#" },
  },
];

export function getAlbumById(id: string) {
  return ALBUMS.find((a) => a.id === id) ?? null;
}
