// ═══════════════════════════════════════════════════════════════════════
// RZEN ARTIST WEBSITE - FULL CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════
// Edit this file to customize your artist website
// After changes, restart the dev server: npm run dev
// ═══════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────
// 🎤 ARTIST INFO
// ─────────────────────────────────────────────────────────────────────
export const ARTIST_NAME = "Rzen";
export const ARTIST_TAGLINE = "Official Artist Page";
export const ARTIST_BIO = `Rzen is an emerging artist pushing boundaries in the music industry. 
With a unique sound blending multiple genres, Rzen continues to create influential music 
that resonates with audiences worldwide.`;
export const ARTIST_GENRES = ["Hip-Hop", "R&B", "Pop"];
export const ARTIST_AGE = "16";

// ─────────────────────────────────────────────────────────────────────
// 🎵 SPOTIFY API CONFIGURATION
// ─────────────────────────────────────────────────────────────────────
// Get credentials from https://developer.spotify.com/dashboard
// Artist ID: Find in your Spotify URL (spotify.com/artist/YOUR_ID)
export const SPOTIFY_CONFIG = {
  artistId: "51mBnXuigxNHmmUenHJpND",
  clientId: "b518e378e27a4a9999b29958c79c6f54",
  clientSecret: "4ad34a6fc4a840a9b5c31af15de66a2c",
};

// Legacy exports for backwards compatibility
export const ARTIST_ID = SPOTIFY_CONFIG.artistId;
export const SPOTIFY_CLIENT_ID = SPOTIFY_CONFIG.clientId;
export const SPOTIFY_CLIENT_SECRET = SPOTIFY_CONFIG.clientSecret;

// ─────────────────────────────────────────────────────────────────────
// 🔗 STREAMING PLATFORMS
// ─────────────────────────────────────────────────────────────────────
export const STREAMING_LINKS = {
  spotify: "https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND",
  appleMusic: "https://music.apple.com/us/artist/rzen/1493662188",
  youtubeMusic: "https://music.youtube.com/channel/UCxcOcJc1QrkkQwwEKJJRq3g",
};

export const SPOTIFY_URL = STREAMING_LINKS.spotify;
export const YOUTUBE_MUSIC_URL = STREAMING_LINKS.youtubeMusic;
export const APPLE_MUSIC_URL = STREAMING_LINKS.appleMusic;

// ─────────────────────────────────────────────────────────────────────
// 📺 YOUTUBE VIDEO
// ─────────────────────────────────────────────────────────────────────
export const YOUTUBE_VIDEO_ID = "https://youtu.be/RZKk2bK5BgE?si=YO8GF3W_A6pVV4HB";

// ─────────────────────────────────────────────────────────────────────
// 📅 UPCOMING RELEASES
// ─────────────────────────────────────────────────────────────────────
// Add your upcoming music releases with release dates for countdown timers
export const UPCOMING_RELEASES = [
  {
    id: 1,
    title: "NEW SINGLE ANNOUCEMENT",
    type: "Single", // Single, EP, or Album
    date: "2026-05-26", // Release date in YYYY-MM-DD format
    cover: "https://imgur.com/ypuIaXX?fbclid=PAVERFWARwMMVleHRuA2FlbQIxMABzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAafmDwKJ9ZOYKvo5kcVqn15zGhaS7sXbI0jkW2h8rCG_ertIX3U4q16tNUyR0g_aem_K21hFS0T5gqkbMj07AtJuQ", // Cover image URL (leave empty to use Spotify)
    // spotifyUrl: "COMING SOON", // Pre-save link
  // appleUrl: "COMING SOON", // Pre-add link
 //  ytmusicUrl: "COMING SOON", // YouTube Music link
  },
];

// ─────────────────────────────────────────────────────────────────────
// 🌐 SOCIAL MEDIA LINKS
// ─────────────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/thexoxorzenny_officiall?igsh=MWVmazhoNGM1aDJmdw%3D%3D&utm_source=qr",
  youtube: "https://youtube.com/@thexoxorzenny_official?si=xBOo2zrCwpXQNkpX",
  spotify: "https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND",
  appleMusic: "https://music.apple.com/us/artist/rzen/1493662188",
};

// ─────────────────────────────────────────────────────────────────────
// 📧 CONTACT EMAILS
// ─────────────────────────────────────────────────────────────────────
export const CONTACT_EMAILS = {
  primary: "rzen.music@gmail.com",
  // secondary: "thexoxorzenny.official@gmail.com",
};

// ─────────────────────────────────────────────────────────────────────
// ⚙️ DISPLAY OPTIONS
// ─────────────────────────────────────────────────────────────────────
// Control which sections appear on your website
export const DISPLAY_OPTIONS = {
  showStats: true,          // Show follower count, popularity on hero
  showLatestVideo: true,    // Show YouTube video on homepage
  showCountdown: true,     // Show countdown to next release
  showFeaturedTracks: true,  // Show top tracks on homepage
  showLatestRelease: true,      // Show latest release section
  showChat: false,          // Show chat box on about page
  showContactForm: true,     // Show contact form on about page
};

// Legacy exports for backwards compatibility
export const SHOW_STATS = DISPLAY_OPTIONS.showStats;
export const SHOW_LATEST_VIDEO = DISPLAY_OPTIONS.showLatestVideo;
export const SHOW_COUNTDOWN = DISPLAY_OPTIONS.showCountdown;
export const SHOW_FEATURED_TRACKS = DISPLAY_OPTIONS.showFeaturedTracks;
export const SHOW_LATEST_RELEASE = DISPLAY_OPTIONS.showLatestRelease;
export const SHOW_CHAT = DISPLAY_OPTIONS.showChat;
export const SHOW_CONTACT_FORM = DISPLAY_OPTIONS.showContactForm;

// ─────────────────────────────────────────────────────────────────────
// 📝 NOTES/FAN MESSAGES CONFIGURATION
// ─────────────────────────────────────────────────────────────────────
export const NOTES_CONFIG = {
  blockedWords: [
    // Words that will be blocked from user messages (spam filter)
    "hate", "stupid", "idiot", "ugly", "trash", "worst", "suck", "die", "kill",
    "bad", "garbage", "dumb", "pathetic", "loser", "shit", "damn", "fuck",
    "ass", "bitch", "crap", "scam", "fake", "RIP", "delete", "cancel"
  ],
  initialNotes: [
    // Initial messages to display on the notes page
    // { id: 1, author: "FanName", message: "Your message here...", date: "2025-04-15" },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// 🎨 VISUAL CUSTOMIZATION (Advanced)
// ─────────────────────────────────────────────────────────────────────
// Color definitions are in src/components/Style.jsx
// Edit the :root CSS variables to change colors:
// --bg, --bg2, --bg3     : Background colors
// --p1, --p2             : Primary gradient colors
// --pink, --purple       : Accent colors
// --text, --text-dim     : Text colors

// ─────────────────────────────────────────────────────────────────────
// ⚠️ DO NOT EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING
// ─────────────────────────────────────────────────────────────────────
