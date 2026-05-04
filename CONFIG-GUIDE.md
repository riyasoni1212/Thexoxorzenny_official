# Rzen Artist Website - Configuration Guide

A fully customizable artist website powered by Spotify API.

---

## Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Configuration

Edit `/ryn/Yuuu/src/config.js` to customize your website.

### Artist Info

```js
export const ARTIST_NAME = "Rzen";
export const ARTIST_TAGLINE = "Official Artist Page";
export const ARTIST_BIO = `Your bio here...`;
export const ARTIST_GENRES = ["Hip-Hop", "R&B", "Pop"];
export const ARTIST_AGE = "16";
```

### Spotify API

Get credentials from [Spotify Developer Dashboard](https://developer.spotify.com/dashboard):

```js
export const SPOTIFY_CONFIG = {
  artistId: "51mBnXuigxNHmmUenHJpND",
  clientId: "your_client_id",
  clientSecret: "your_client_secret",
};
```

### Streaming Links

```js
export const STREAMING_LINKS = {
  spotify: "https://open.spotify.com/artist/...",
  appleMusic: "https://music.apple.com/artist/...",
  youtubeMusic: "https://music.youtube.com/channel/...",
};
```

### YouTube Video

```js
export const YOUTUBE_VIDEO_ID = "video_id_here";
```

### Upcoming Releases

```js
export const UPCOMING_RELEASES = [
  {
    id: 1,
    title: "New Single",
    type: "Single",
    date: "2026-06-01",
    cover: "",
    spotifyUrl: "",
    appleUrl: "",
    ytmusicUrl: "",
  },
];
```

### Social Links

```js
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/yourname",
  twitter: "https://twitter.com/yourname",
  tiktok: "https://tiktok.com/@yourname",
  youtube: "https://youtube.com/@yourname",
  spotify: "https://open.spotify.com/artist/...",
  appleMusic: "https://music.apple.com/artist/...",
};
```

### Contact Emails

```js
export const CONTACT_EMAILS = {
  primary: "contact@email.com",
  // secondary: "other@email.com",
};
```

### Display Options

```js
export const DISPLAY_OPTIONS = {
  showStats: true,          // Follower count on hero
  showLatestVideo: false,  // YouTube video section
  showCountdown: false,    // Release countdown
  showFeaturedTracks: true, // Top tracks section
  showLatestRelease: true, // Latest release section
  showChat: false,          // Chat box
  showContactForm: true,      // Contact form
};
```

---

## Troubleshooting

**Site loads white:**
- Run `npm install` then `npm run dev`

**Spotify not loading:**
- Check your Client ID/Secret in config.js
- Restart dev server after changes

**Build errors:**
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

---

## Tech Stack

- React + Vite
- Spotify Web API
- Custom CSS (no framework)

---

## License

MIT