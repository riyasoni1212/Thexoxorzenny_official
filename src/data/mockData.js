// ─── MOCK DATA (shown when no API key provided) ───────────────────────────────
export const MOCK_ARTIST = {
  name: "Rzen",
  followers: { total: 12847 },
  popularity: 42,
  genres: ["k-pop", "hip-hop", "edm", "indie", "acoustic"],
  images: [{ url: null }],
  external_urls: { spotify: "https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND" },
};

export const MOCK_TRACKS = Array.from({ length: 8 }, (_, i) => ({
  id: `t${i}`,
  name: ["Neon Drift", "Starfall", "Lucid", "Echo Chamber", "Hollow", "Pulse", "Resonance", "Fade Out"][i],
  popularity: [78, 65, 59, 52, 48, 43, 38, 31][i],
  duration_ms: [195000, 212000, 178000, 234000, 167000, 203000, 189000, 221000][i],
  album: {
    name: ["Neon Drift EP", "Starfall", "Lucid", "Echo Chamber", "Hollow", "Pulse", "Resonance", "Fade Out"][i],
    images: [{ url: null }],
    release_date: `202${Math.floor(i / 3) + 2}-0${(i % 9) + 1}-15`,
  },
  external_urls: { spotify: "https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND" },
  preview_url: null,
}));

export const MOCK_ALBUMS = Array.from({ length: 6 }, (_, i) => ({
  id: `a${i}`,
  name: ["Neon Drift EP", "Starfall", "Echoverse", "Hollow EP", "Pulse", "Resonance"][i],
  album_type: i % 3 === 0 ? "album" : "single",
  release_date: `202${Math.floor(i / 2) + 2}-0${(i % 9) + 1}-01`,
  total_tracks: [8, 1, 10, 4, 1, 1][i],
  images: [{ url: null }],
  external_urls: { spotify: "https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND" },
}));
