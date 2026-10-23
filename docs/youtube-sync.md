# Sermon series from YouTube

The media pages can read sermon series straight from the church's YouTube
playlists. A playlist on the channel becomes a series on the site: title,
cover image, episode list, durations and embeds all come from YouTube, and
the site refreshes itself every hour.

Until the key below is set, nothing changes — the site keeps showing the
hand-written series in `src/app/media/mediaData.ts`.

## 1. Get a YouTube API key (about five minutes, free, no card)

1. Go to <https://console.cloud.google.com/> and sign in with the church's
   Google account.
2. Create a project: top bar → **Select a project** → **New project** →
   name it `SaltCity Website` → **Create**.
3. Switch on the YouTube API: search **YouTube Data API v3** in the top
   search bar → open it → **Enable**.
4. Make the key: left menu → **APIs & Services → Credentials** →
   **+ Create credentials** → **API key**. Copy the key it shows you.
5. Lock the key down (recommended): on the new key click **Edit**, then
   under **API restrictions** choose **Restrict key** and tick
   **YouTube Data API v3**. Save.

The key only reads public playlists. It cannot post, edit or delete
anything on the channel.

## 2. Add it to the site

In Vercel: **Project → Settings → Environment Variables**, add

| Name | Value |
| --- | --- |
| `YOUTUBE_API_KEY` | the key from step 1 |
| `YOUTUBE_CHANNEL_ID` | `UCUO7U5yQxfcigge00IC4-JA` (optional — this is the default) |

Add it to all environments, then redeploy. Put the same two lines in
`.env.local` for local development. **Never commit the key.**

Free quota is 10,000 units a day; a full refresh of the whole channel costs
roughly 30, so the site uses well under 1% of it.

## 3. Day-to-day use

- **New series:** create the playlist on YouTube and add the videos. It
  appears on the site within the hour, at the top of Sermon Series.
- **New message in an existing series:** add it to that playlist. Same.
- **Remove or reorder:** do it on YouTube; the site follows.

Playlists whose names contain `shorts`, `trailer`, `promo` or `test` are
ignored, and anything already written by hand in `mediaData.ts` wins over a
playlist of the same name, so nothing shows up twice.

## 4. Overriding what YouTube gives us

Edit `OVERRIDES` in `src/app/media/seriesFromYoutube.ts`. Keys are the
playlist name in lowercase with dashes (`A COMPANY OF PROPHETS` →
`a-company-of-prophets`):

```ts
const OVERRIDES: Record<string, Override> = {
  "a-company-of-prophets": {
    summary: "Your own paragraph, instead of the generated one.",
    image: "/images/series/company-of-prophets.jpg", // your artwork
  },
  "faith-fest-2025": { category: "the-faith-convention" }, // file it elsewhere
  "sunday-clips": { hide: true }, // keep it off the site
};
```

Titles in ALL CAPS are converted to normal case automatically, and anything
after a `|` is trimmed, so `NEW TESTAMENT GIVING | SALTCITY CENTRAL` shows
as `New Testament Giving`.

## If something looks wrong

- **A new series hasn't appeared:** the playlist must be Public (not
  Unlisted) and have at least one video. Changes take up to an hour.
- **Nothing from YouTube at all:** the key is missing, mistyped or
  restricted too tightly. The site falls back to the hand-written series, so
  the page still works; check the Vercel runtime logs for a `YouTube ...
  failed` line.
- **Wrong cover image:** YouTube uses the first video's thumbnail. Point
  `image` at your own artwork in the override.
