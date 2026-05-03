import { useState, useEffect, useRef, useCallback } from "react";

// ─── SPOTIFY CONFIG ───────────────────────────────────────────────────────────
const ARTIST_ID = "51mBnXuigxNHmmUenHJpND";
const SPOTIFY_CLIENT_ID = "b518e378e27a4a9999b29958c79c6f54";     // Replace with your Spotify Client ID
const SPOTIFY_CLIENT_SECRET = "4ad34a6fc4a840a9b5c31af15de66a2c"; // Replace with your Spotify Client Secret

// ─── SPOTIFY API HOOK ─────────────────────────────────────────────────────────
function useSpotify() {
  const [token, setToken] = useState(null);
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tokenExpiry = useRef(null);

  const fetchToken = useCallback(async () => {
    if (token && tokenExpiry.current && Date.now() < tokenExpiry.current) return token;
    try {
      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
        },
        body: "grant_type=client_credentials",
      });
      const data = await res.json();
      if (data.access_token) {
        setToken(data.access_token);
        tokenExpiry.current = Date.now() + data.expires_in * 1000 - 60000;
        return data.access_token;
      }
    } catch (e) {
      setError("token");
    }
    return null;
  }, [token]);

  const spotifyFetch = useCallback(async (endpoint) => {
    const t = await fetchToken();
    if (!t) return null;
    const res = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: { Authorization: `Bearer ${t}` },
    });
    if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
    return res.json();
  }, [fetchToken]);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      try {
        const [artistData, tracksData, albumsData] = await Promise.all([
          spotifyFetch(`/artists/${ARTIST_ID}`),
          spotifyFetch(`/artists/${ARTIST_ID}/top-tracks?market=US`),
          spotifyFetch(`/artists/${ARTIST_ID}/albums?include_groups=album,single&market=US&limit=50`),
        ]);
        if (artistData) setArtist(artistData);
        if (tracksData?.tracks) setTopTracks(tracksData.tracks);
        if (albumsData?.items) setAlbums(albumsData.items);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    if (SPOTIFY_CLIENT_ID !== "YOUR_CLIENT_ID") loadAll();
    else {
      // Demo mode with mock data
      setArtist(MOCK_ARTIST);
      setTopTracks(MOCK_TRACKS);
      setAlbums(MOCK_ALBUMS);
      setLoading(false);
    }
  }, [spotifyFetch]);

  return { artist, topTracks, albums, loading, error };
}

// ─── MOCK DATA (shown when no API key provided) ───────────────────────────────
const MOCK_ARTIST = {
  name: "Rzen",
  followers: { total: 12847 },
  popularity: 42,
  genres: ["indie pop", "lo-fi", "alternative"],
  images: [{ url: null }],
  external_urls: { spotify: "https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND" },
};
const MOCK_TRACKS = Array.from({ length: 8 }, (_, i) => ({
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
const MOCK_ALBUMS = Array.from({ length: 6 }, (_, i) => ({
  id: `a${i}`,
  name: ["Neon Drift EP", "Starfall", "Echoverse", "Hollow EP", "Pulse", "Resonance"][i],
  album_type: i % 3 === 0 ? "album" : "single",
  release_date: `202${Math.floor(i / 2) + 2}-0${(i % 9) + 1}-01`,
  total_tracks: [8, 1, 10, 4, 1, 1][i],
  images: [{ url: null }],
  external_urls: { spotify: "https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND" },
}));

// ─── UTILS ────────────────────────────────────────────────────────────────────
const fmtMs = (ms) => {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}:${s.toString().padStart(2, "0")}`;
};
const fmtNum = (n) => n?.toLocaleString() ?? "—";

// ─── ANIMATED BACKGROUND ──────────────────────────────────────────────────────
function AnimatedBg() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <div className="grid-lines" />
      <div className="scanline" />
    </div>
  );
}

// ─── MUSIC WAVE ───────────────────────────────────────────────────────────────
function MusicWave({ playing = true, size = 24 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: size }}>
      {[0.6, 1, 0.8, 1, 0.5].map((h, i) => (
        <div key={i} className="wave-bar" style={{
          width: size * 0.12,
          height: playing ? undefined : size * 0.3,
          "--h": h,
          "--delay": `${i * 0.1}s`,
          animationPlayState: playing ? "running" : "paused",
        }} />
      ))}
    </div>
  );
}

// ─── ALBUM COVER ──────────────────────────────────────────────────────────────
function Cover({ url, name, size = 60, radius = 8 }) {
  if (url) return (
    <img src={url} alt={name} style={{ width: size, height: size, borderRadius: radius, objectFit: "cover", display: "block" }} />
  );
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: "linear-gradient(135deg, var(--p1), var(--p2))",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, color: "rgba(255,255,255,0.4)",
    }}>♪</div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "music", label: "Music" },
    { id: "albums", label: "Albums" },
    { id: "stats", label: "Stats" },
    { id: "about", label: "About" },
  ];

  const go = (id) => { setPage(id); setMobileOpen(false); window.scrollTo(0, 0); };

  return (
    <>
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <button className="nav-logo" onClick={() => go("home")}>
          <MusicWave size={18} /> <span>RZEN</span>
        </button>
        <div className="nav-links">
          {links.map(l => (
            <button key={l.id} className={`nav-link ${page === l.id ? "active" : ""}`} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
        <a href="https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND" target="_blank" rel="noreferrer" className="spotify-btn nav-spotify">
          <SpotifyIcon /> Listen
        </a>
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span /><span /><span />
        </button>
      </nav>
      {mobileOpen && (
        <div className="mobile-menu">
          {links.map(l => (
            <button key={l.id} className={`mobile-link ${page === l.id ? "active" : ""}`} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
          <a href="https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND" target="_blank" rel="noreferrer" className="spotify-btn" style={{ marginTop: 12 }}>
            <SpotifyIcon /> Listen on Spotify
          </a>
        </div>
      )}
    </>
  );
}

// ─── SPOTIFY ICON ─────────────────────────────────────────────────────────────
function SpotifyIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ artist, topTracks, setPage }) {
  const [currentTrack, setCurrentTrack] = useState(0);

  const featured = topTracks.slice(0, 5);

  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content animate-in">
          <div className="hero-avatar-wrap">
            <div className="avatar-ring" />
            {artist?.images?.[0]?.url ? (
              <img src={artist.images[0].url} alt="Rzen" className="hero-avatar" />
            ) : (
              <div className="hero-avatar avatar-placeholder">
                <MusicWave size={48} />
              </div>
            )}
            <div className="avatar-pulse" />
          </div>
          <div className="hero-text">
            <p className="hero-tag">✦ Official Artist Page</p>
            <h1 className="hero-name">RZEN</h1>
            <p className="hero-genres">{artist?.genres?.join(" · ") || "indie · electronic · alternative"}</p>
            <p className="hero-bio">
              Crafting sonic landscapes that blur the line between the ethereal and the electric.
              Rzen's music is an exploration of emotion through layered soundscapes and introspective lyricism.
            </p>
            <div className="hero-stats-row">
              <div className="hero-stat">
                <span className="hero-stat-val">{fmtNum(artist?.followers?.total)}</span>
                <span className="hero-stat-lbl">Followers</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-val">{artist?.popularity ?? "—"}</span>
                <span className="hero-stat-lbl">Popularity</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-val">{topTracks.length}+</span>
                <span className="hero-stat-lbl">Top Tracks</span>
              </div>
            </div>
            <div className="hero-ctas">
              <a href={artist?.external_urls?.spotify} target="_blank" rel="noreferrer" className="spotify-btn hero-cta-primary">
                <SpotifyIcon size={20} /> Listen on Spotify
              </a>
              <button className="hero-cta-secondary" onClick={() => setPage("music")}>
                View Discography →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tracks */}
      {featured.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Featured Tracks</h2>
            <button className="see-all" onClick={() => setPage("music")}>See all →</button>
          </div>
          <div className="featured-tracks">
            {featured.map((t, i) => (
              <a key={t.id} href={t.external_urls?.spotify} target="_blank" rel="noreferrer"
                className={`featured-card ${currentTrack === i ? "active" : ""}`}
                onMouseEnter={() => setCurrentTrack(i)}>
                <div className="featured-card-num">{String(i + 1).padStart(2, "0")}</div>
                <Cover url={t.album?.images?.[0]?.url} name={t.name} size={56} radius={6} />
                <div className="featured-card-info">
                  <span className="featured-card-name">{t.name}</span>
                  <span className="featured-card-album">{t.album?.name}</span>
                </div>
                <div className="featured-card-right">
                  <PopBar value={t.popularity} />
                  <span className="featured-card-dur">{fmtMs(t.duration_ms)}</span>
                </div>
                <div className="featured-card-play">
                  {currentTrack === i ? <MusicWave size={20} /> : "▶"}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Latest Release */}
      {topTracks[0] && (
        <section className="section">
          <h2 className="section-title">Latest Release</h2>
          <div className="latest-release">
            <div className="latest-cover">
              <Cover url={topTracks[0].album?.images?.[0]?.url} name={topTracks[0].album?.name} size={180} radius={16} />
              <div className="latest-cover-glow" />
            </div>
            <div className="latest-info">
              <p className="latest-type">TOP TRACK</p>
              <h3 className="latest-title">{topTracks[0].name}</h3>
              <p className="latest-album">{topTracks[0].album?.name}</p>
              <p className="latest-date">{topTracks[0].album?.release_date}</p>
              <div style={{ margin: "16px 0" }}>
                <p style={{ color: "var(--muted)", fontSize: 12, marginBottom: 6 }}>POPULARITY</p>
                <PopBar value={topTracks[0].popularity} large />
              </div>
              <a href={topTracks[0].external_urls?.spotify} target="_blank" rel="noreferrer" className="spotify-btn">
                <SpotifyIcon /> Play on Spotify
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// ─── POPULARITY BAR ───────────────────────────────────────────────────────────
function PopBar({ value, large }) {
  return (
    <div className={`pop-bar-wrap ${large ? "large" : ""}`}>
      <div className="pop-bar-track">
        <div className="pop-bar-fill" style={{ width: `${value ?? 0}%` }} />
      </div>
      {large && <span className="pop-bar-val">{value ?? 0}%</span>}
    </div>
  );
}

// ─── MUSIC PAGE ───────────────────────────────────────────────────────────────
function MusicPage({ topTracks }) {
  const [filter, setFilter] = useState("all");
  const [hovering, setHovering] = useState(null);

  return (
    <div className="page">
      <section className="section page-hero">
        <h1 className="page-title">Discography</h1>
        <p className="page-subtitle">All tracks powered by Spotify</p>
      </section>

      <section className="section">
        <div className="tracks-grid">
          {topTracks.map((t, i) => (
            <a key={t.id} href={t.external_urls?.spotify} target="_blank" rel="noreferrer"
              className="track-card" onMouseEnter={() => setHovering(t.id)} onMouseLeave={() => setHovering(null)}>
              <div className="track-card-cover">
                <Cover url={t.album?.images?.[0]?.url} name={t.name} size={200} radius={10} />
                <div className={`track-card-overlay ${hovering === t.id ? "visible" : ""}`}>
                  <div className="track-play-btn">
                    {hovering === t.id ? <MusicWave size={28} /> : "▶"}
                  </div>
                </div>
              </div>
              <div className="track-card-info">
                <p className="track-card-name">{t.name}</p>
                <p className="track-card-album">{t.album?.name}</p>
                <div className="track-card-meta">
                  <span>{fmtMs(t.duration_ms)}</span>
                  <PopBar value={t.popularity} />
                </div>
              </div>
              <div className="track-card-rank">#{i + 1}</div>
            </a>
          ))}
        </div>
        {topTracks.length === 0 && <EmptyState message="No tracks found" />}
      </section>
    </div>
  );
}

// ─── ALBUMS PAGE ──────────────────────────────────────────────────────────────
function AlbumsPage({ albums }) {
  const [selected, setSelected] = useState(null);

  const fullAlbums = albums.filter(a => a.album_type === "album");
  const singles = albums.filter(a => a.album_type === "single");
  const eps = albums.filter(a => a.album_type === "ep");

  const AlbumGrid = ({ items, label }) => items.length === 0 ? null : (
    <div style={{ marginBottom: 48 }}>
      <h3 className="albums-section-label">{label}</h3>
      <div className="albums-grid">
        {items.map(a => (
          <button key={a.id} className="album-card" onClick={() => setSelected(a)}>
            <div className="album-card-cover">
              <Cover url={a.images?.[0]?.url} name={a.name} size={180} radius={12} />
              <div className="album-card-overlay">
                <SpotifyIcon size={32} />
              </div>
            </div>
            <p className="album-card-name">{a.name}</p>
            <p className="album-card-meta">{a.release_date?.slice(0, 4)} · {a.total_tracks} tracks</p>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="page">
      <section className="section page-hero">
        <h1 className="page-title">Albums</h1>
        <p className="page-subtitle">{albums.length} releases on Spotify</p>
      </section>

      <section className="section">
        <AlbumGrid items={fullAlbums} label="Albums" />
        <AlbumGrid items={eps} label="EPs" />
        <AlbumGrid items={singles} label="Singles" />
        {albums.length === 0 && <EmptyState message="No albums found" />}
      </section>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            <div className="modal-cover">
              <Cover url={selected.images?.[0]?.url} name={selected.name} size={200} radius={16} />
            </div>
            <div className="modal-info">
              <p className="modal-type">{selected.album_type?.toUpperCase()}</p>
              <h2 className="modal-title">{selected.name}</h2>
              <p className="modal-meta">{selected.release_date} · {selected.total_tracks} tracks</p>
              <a href={selected.external_urls?.spotify} target="_blank" rel="noreferrer" className="spotify-btn" style={{ marginTop: 20 }}>
                <SpotifyIcon /> Open in Spotify
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── STATS PAGE ───────────────────────────────────────────────────────────────
function StatsPage({ artist, topTracks, albums }) {
  const totalDuration = topTracks.reduce((s, t) => s + (t.duration_ms || 0), 0);
  const avgPop = topTracks.length ? Math.round(topTracks.reduce((s, t) => s + t.popularity, 0) / topTracks.length) : 0;

  const statCards = [
    { label: "Spotify Followers", value: fmtNum(artist?.followers?.total), icon: "♥", color: "#ff6b9d" },
    { label: "Popularity Score", value: `${artist?.popularity ?? 0}/100`, icon: "⚡", color: "#a78bfa" },
    { label: "Top Tracks", value: topTracks.length, icon: "♪", color: "#34d399" },
    { label: "Total Releases", value: albums.length, icon: "💿", color: "#60a5fa" },
    { label: "Avg Popularity", value: `${avgPop}%`, icon: "📈", color: "#fbbf24" },
    { label: "Total Playtime", value: fmtMs(totalDuration), icon: "⏱", color: "#f87171" },
  ];

  return (
    <div className="page">
      <section className="section page-hero">
        <h1 className="page-title">Artist Stats</h1>
        <p className="page-subtitle">Real-time data from Spotify</p>
      </section>

      <section className="section">
        <div className="stats-grid">
          {statCards.map((s, i) => (
            <div key={i} className="stat-card" style={{ "--accent": s.color, animationDelay: `${i * 0.08}s` }}>
              <div className="stat-card-icon" style={{ color: s.color }}>{s.icon}</div>
              <div className="stat-card-val">{s.value}</div>
              <div className="stat-card-lbl">{s.label}</div>
              <div className="stat-card-glow" style={{ background: s.color }} />
            </div>
          ))}
        </div>

        {/* Popularity ranking */}
        <div className="glass-panel" style={{ marginTop: 48 }}>
          <h3 className="panel-title">Top Tracks by Popularity</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {topTracks.slice(0, 8).map((t, i) => (
              <div key={t.id} className="pop-row">
                <span className="pop-row-rank">#{i + 1}</span>
                <Cover url={t.album?.images?.[0]?.url} name={t.name} size={36} radius={4} />
                <span className="pop-row-name">{t.name}</span>
                <div style={{ flex: 1, margin: "0 16px" }}>
                  <PopBar value={t.popularity} />
                </div>
                <span className="pop-row-val">{t.popularity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Genre pills */}
        {artist?.genres?.length > 0 && (
          <div className="glass-panel" style={{ marginTop: 24 }}>
            <h3 className="panel-title">Genres</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
              {artist.genres.map((g, i) => (
                <span key={i} className="genre-pill">{g}</span>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ artist }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const socials = [
    { label: "Spotify", icon: <SpotifyIcon size={22} />, url: "https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND" },
    { label: "Instagram", icon: "📸", url: "#" },
    { label: "Twitter / X", icon: "𝕏", url: "#" },
    { label: "YouTube", icon: "▶", url: "#" },
    { label: "SoundCloud", icon: "☁", url: "#" },
  ];

  return (
    <div className="page">
      <section className="section page-hero">
        <h1 className="page-title">About Rzen</h1>
      </section>

      <section className="section">
        <div className="about-grid">
          <div className="about-left">
            <div className="about-avatar-wrap">
              {artist?.images?.[0]?.url ? (
                <img src={artist.images[0].url} alt="Rzen" className="about-avatar" />
              ) : (
                <div className="about-avatar avatar-placeholder">
                  <MusicWave size={64} />
                </div>
              )}
            </div>

            <div className="glass-panel" style={{ marginTop: 24 }}>
              <h3 className="panel-title">Connect</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                {socials.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noreferrer" className="social-link">
                    <span className="social-icon">{s.icon}</span>
                    {s.label}
                    <span style={{ marginLeft: "auto", opacity: 0.4 }}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="glass-panel">
              <h3 className="panel-title">The Artist</h3>
              <div style={{ marginTop: 16, lineHeight: 1.8, color: "var(--text-dim)" }}>
                <p>Rzen is an independent artist pushing the boundaries of contemporary music. Drawing from a deep well of emotion and sonic experimentation, their work resonates with listeners who crave authenticity.</p>
                <br />
                <p>With a sound that defies easy categorization — weaving through electronic textures, intimate acoustic moments, and genre-bending arrangements — Rzen crafts experiences, not just songs.</p>
                <br />
                <p>Every track is a journey inward: an invitation to feel, reflect, and drift.</p>
              </div>

              {artist?.genres?.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <p style={{ color: "var(--muted)", fontSize: 12, letterSpacing: "0.1em", marginBottom: 10 }}>GENRES</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {artist.genres.map((g, i) => <span key={i} className="genre-pill">{g}</span>)}
                  </div>
                </div>
              )}
            </div>

            <div className="glass-panel" style={{ marginTop: 24 }}>
              <h3 className="panel-title">Send a Message</h3>
              {sent ? (
                <div className="form-success">✓ Message sent! Rzen will get back to you soon.</div>
              ) : (
                <form onSubmit={submit} className="contact-form">
                  <input className="form-input" placeholder="Your name" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} required />
                  <input className="form-input" type="email" placeholder="Email address" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} required />
                  <textarea className="form-input form-textarea" placeholder="Your message..." value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })} rows={4} required />
                  <button type="submit" className="spotify-btn" style={{ width: "100%", justifyContent: "center" }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── LOADING ──────────────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-logo">
        <MusicWave size={48} />
        <span>RZEN</span>
      </div>
      <p>Loading your experience...</p>
    </div>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <MusicWave size={40} />
      <p>{message}</p>
    </div>
  );
}

// ─── API SETUP NOTICE ─────────────────────────────────────────────────────────
function ApiNotice() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="api-notice">
      <div>
        <strong>Demo Mode</strong> — Replace <code>YOUR_CLIENT_ID</code> & <code>YOUR_CLIENT_SECRET</code> in the source with your{" "}
        <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noreferrer" style={{ color: "var(--pink)" }}>
          Spotify Developer credentials
        </a>{" "}
        to load live data.
      </div>
      <button onClick={() => setOpen(false)} style={{ marginLeft: 16, opacity: 0.6, background: "none", border: "none", cursor: "pointer", color: "inherit" }}>✕</button>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <button className="nav-logo" onClick={() => setPage("home")} style={{ marginBottom: 12 }}>
          <MusicWave size={16} /> <span>RZEN</span>
        </button>
        <p style={{ color: "var(--muted)", fontSize: 13 }}>
          Powered by Spotify Web API · Built with ♥
        </p>
        <div className="footer-links">
          {["home", "music", "albums", "stats", "about"].map(p => (
            <button key={p} className="footer-link" onClick={() => { setPage(p); window.scrollTo(0, 0); }}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const { artist, topTracks, albums, loading } = useSpotify();
  const isDemoMode = SPOTIFY_CLIENT_ID === "YOUR_CLIENT_ID";

  if (loading) return (
    <>
      <Style />
      <AnimatedBg />
      <LoadingScreen />
    </>
  );

  return (
    <>
      <Style />
      <AnimatedBg />
      {isDemoMode && <ApiNotice />}
      <Nav page={page} setPage={setPage} />
      <main className="main">
        {page === "home" && <HomePage artist={artist} topTracks={topTracks} setPage={setPage} />}
        {page === "music" && <MusicPage topTracks={topTracks} />}
        {page === "albums" && <AlbumsPage albums={albums} />}
        {page === "stats" && <StatsPage artist={artist} topTracks={topTracks} albums={albums} />}
        {page === "about" && <AboutPage artist={artist} />}
      </main>
      <Footer setPage={setPage} />
    </>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
function Style() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --bg: #0a0a12;
        --bg2: #0f0f1a;
        --bg3: #14142a;
        --glass: rgba(255,255,255,0.04);
        --glass-border: rgba(255,255,255,0.08);
        --p1: #c026d3;
        --p2: #7c3aed;
        --pink: #ec4899;
        --purple: #a855f7;
        --text: #f0f0ff;
        --text-dim: #b8b8d8;
        --muted: #6b6b8f;
        --green: #1db954;
        --r: 16px;
      }

      html { scroll-behavior: smooth; }

      body {
        font-family: 'DM Sans', sans-serif;
        background: var(--bg);
        color: var(--text);
        min-height: 100vh;
        overflow-x: hidden;
      }

      /* ── BACKGROUND ── */
      .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.18; }
      .orb1 {
        width: 600px; height: 600px;
        background: radial-gradient(circle, #c026d3, transparent);
        top: -200px; left: -200px;
        animation: drift1 18s ease-in-out infinite;
      }
      .orb2 {
        width: 500px; height: 500px;
        background: radial-gradient(circle, #7c3aed, transparent);
        top: 30%; right: -150px;
        animation: drift2 22s ease-in-out infinite;
      }
      .orb3 {
        width: 400px; height: 400px;
        background: radial-gradient(circle, #ec4899, transparent);
        bottom: 10%; left: 30%;
        animation: drift1 26s ease-in-out infinite reverse;
      }
      .grid-lines {
        position: absolute; inset: 0;
        background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
        background-size: 60px 60px;
      }
      .scanline {
        position: absolute; inset: 0;
        background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
        pointer-events: none;
      }
      @keyframes drift1 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(60px,-40px)} 66%{transform:translate(-40px,60px)} }
      @keyframes drift2 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(-50px,50px)} 66%{transform:translate(70px,-30px)} }

      /* ── NAV ── */
      .nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 100;
        display: flex; align-items: center; gap: 8px;
        padding: 20px 40px;
        transition: all 0.3s ease;
      }
      .nav-scrolled {
        background: rgba(10,10,18,0.85);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--glass-border);
        padding: 14px 40px;
      }
      .nav-logo {
        display: flex; align-items: center; gap: 8px;
        font-family: 'Syne', sans-serif; font-weight: 800;
        font-size: 20px; color: var(--text);
        background: none; border: none; cursor: pointer;
        letter-spacing: 0.12em;
        background: linear-gradient(135deg, var(--purple), var(--pink));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .nav-links { display: flex; gap: 4px; margin-left: auto; }
      .nav-link {
        background: none; border: none; cursor: pointer;
        color: var(--muted); font-size: 14px; font-family: 'DM Sans', sans-serif;
        padding: 8px 14px; border-radius: 8px;
        transition: all 0.2s;
      }
      .nav-link:hover { color: var(--text); background: var(--glass); }
      .nav-link.active { color: var(--purple); background: rgba(168,85,247,0.1); }
      .nav-spotify { margin-left: 16px; }

      .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
      .hamburger span { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 2px; }

      .mobile-menu {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99;
        background: rgba(10,10,18,0.97); backdrop-filter: blur(20px);
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
      }
      .mobile-link {
        background: none; border: none; cursor: pointer;
        font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 700;
        color: var(--text-dim); padding: 12px 32px; border-radius: 12px;
        transition: all 0.2s;
      }
      .mobile-link:hover, .mobile-link.active { color: var(--purple); }

      /* ── SPOTIFY BUTTON ── */
      .spotify-btn {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 10px 20px; border-radius: 40px;
        background: var(--green); color: #000;
        font-weight: 700; font-size: 14px; text-decoration: none;
        border: none; cursor: pointer;
        transition: all 0.2s; white-space: nowrap;
      }
      .spotify-btn:hover { transform: scale(1.04); filter: brightness(1.1); }

      /* ── MAIN ── */
      .main { position: relative; z-index: 1; padding-top: 80px; }

      /* ── SECTIONS ── */
      .section { max-width: 1100px; margin: 0 auto; padding: 60px 24px; }
      .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
      .section-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; }
      .see-all { background: none; border: none; cursor: pointer; color: var(--purple); font-size: 14px; }
      .see-all:hover { text-decoration: underline; }

      /* ── PAGE ── */
      .page { min-height: calc(100vh - 80px); }
      .page-hero { padding-top: 80px; padding-bottom: 20px; }
      .page-title { font-family: 'Syne', sans-serif; font-size: clamp(36px,6vw,64px); font-weight: 800;
        background: linear-gradient(135deg, #fff 30%, var(--purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .page-subtitle { color: var(--muted); margin-top: 8px; font-size: 16px; }

      /* ── HERO ── */
      .hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; }
      .hero-glow {
        position: absolute; width: 800px; height: 800px; border-radius: 50%;
        background: radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%);
        top: 50%; left: 50%; transform: translate(-50%,-50%);
        pointer-events: none;
      }
      .hero-content {
        max-width: 1100px; margin: 0 auto; padding: 0 24px;
        display: flex; flex-direction: column; align-items: center; text-align: center; gap: 32px;
        width: 100%;
      }
      .hero-avatar-wrap { position: relative; }
      .hero-avatar {
        width: 160px; height: 160px; border-radius: 50%;
        border: 2px solid rgba(168,85,247,0.4); display: block;
      }
      .avatar-placeholder {
        width: 160px; height: 160px; border-radius: 50%;
        background: linear-gradient(135deg, var(--p1), var(--p2));
        display: flex; align-items: center; justify-content: center;
        border: 2px solid rgba(168,85,247,0.4);
      }
      .avatar-ring {
        position: absolute; inset: -8px; border-radius: 50%;
        border: 2px solid transparent;
        background: linear-gradient(135deg, var(--purple), var(--pink)) border-box;
        -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out; mask-composite: exclude;
        animation: spin 8s linear infinite;
      }
      .avatar-pulse {
        position: absolute; inset: -20px; border-radius: 50%;
        border: 1px solid rgba(168,85,247,0.2);
        animation: pulse-ring 3s ease-out infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes pulse-ring { 0%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(1.5)} }

      .hero-text { max-width: 700px; }
      .hero-tag { font-size: 12px; letter-spacing: 0.2em; color: var(--purple); text-transform: uppercase; margin-bottom: 8px; }
      .hero-name {
        font-family: 'Syne', sans-serif; font-size: clamp(60px,14vw,120px); font-weight: 800;
        line-height: 0.9; letter-spacing: -0.02em;
        background: linear-gradient(135deg, #fff 0%, var(--purple) 50%, var(--pink) 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }
      .hero-genres { font-size: 14px; color: var(--muted); letter-spacing: 0.1em; margin: 12px 0; text-transform: uppercase; }
      .hero-bio { color: var(--text-dim); line-height: 1.7; max-width: 560px; margin: 16px auto; }
      .hero-stats-row { display: flex; align-items: center; justify-content: center; gap: 24px; margin: 24px 0; }
      .hero-stat { text-align: center; }
      .hero-stat-val { display: block; font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 700;
        background: linear-gradient(135deg, var(--purple), var(--pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .hero-stat-lbl { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
      .hero-stat-divider { width: 1px; height: 40px; background: var(--glass-border); }
      .hero-ctas { display: flex; gap: 12px; align-items: center; justify-content: center; flex-wrap: wrap; margin-top: 8px; }
      .hero-cta-primary { font-size: 15px; padding: 14px 28px; }
      .hero-cta-secondary { background: none; border: 1px solid var(--glass-border); color: var(--text-dim);
        padding: 14px 24px; border-radius: 40px; cursor: pointer; font-size: 15px; font-family: 'DM Sans', sans-serif;
        transition: all 0.2s; }
      .hero-cta-secondary:hover { border-color: var(--purple); color: var(--purple); }

      /* ── ANIMATE IN ── */
      .animate-in { animation: fadeUp 0.8s ease both; }
      @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }

      /* ── FEATURED TRACKS ── */
      .featured-tracks { display: flex; flex-direction: column; gap: 6px; }
      .featured-card {
        display: flex; align-items: center; gap: 16px;
        padding: 12px 16px; border-radius: 12px;
        background: var(--glass); border: 1px solid transparent;
        text-decoration: none; color: var(--text);
        transition: all 0.2s; cursor: pointer;
      }
      .featured-card:hover, .featured-card.active {
        background: rgba(168,85,247,0.08);
        border-color: rgba(168,85,247,0.2);
        transform: translateX(4px);
      }
      .featured-card-num { font-family: 'Syne', sans-serif; font-size: 13px; color: var(--muted); width: 24px; text-align: center; }
      .featured-card-info { flex: 1; min-width: 0; }
      .featured-card-name { display: block; font-weight: 500; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .featured-card-album { font-size: 12px; color: var(--muted); }
      .featured-card-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
      .featured-card-dur { font-size: 12px; color: var(--muted); }
      .featured-card-play { width: 32px; height: 32px; border-radius: 50%; background: rgba(168,85,247,0.2);
        display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--purple); }

      /* ── LATEST RELEASE ── */
      .latest-release { display: flex; gap: 40px; align-items: center; flex-wrap: wrap;
        background: var(--glass); border: 1px solid var(--glass-border); border-radius: 20px; padding: 40px; }
      .latest-cover { position: relative; flex-shrink: 0; }
      .latest-cover-glow { position: absolute; inset: -20px; border-radius: 50%; background: radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%); z-index: -1; }
      .latest-type { font-size: 11px; color: var(--muted); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px; }
      .latest-title { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; margin-bottom: 4px; }
      .latest-album { color: var(--muted); margin-bottom: 4px; }
      .latest-date { font-size: 13px; color: var(--muted); }
      .latest-info { flex: 1; min-width: 240px; }

      /* ── POP BAR ── */
      .pop-bar-wrap { display: flex; align-items: center; gap: 8px; }
      .pop-bar-track { flex: 1; height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; min-width: 60px; }
      .pop-bar-wrap.large .pop-bar-track { height: 6px; min-width: 200px; }
      .pop-bar-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, var(--purple), var(--pink)); transition: width 1s ease; }
      .pop-bar-val { font-size: 13px; color: var(--muted); white-space: nowrap; }

      /* ── WAVE BAR ── */
      .wave-bar {
        background: linear-gradient(180deg, var(--pink), var(--purple));
        border-radius: 2px;
        animation: wave 1s ease-in-out infinite alternate;
        animation-delay: var(--delay);
        transform-origin: bottom;
      }
      @keyframes wave { from{scaleY:0.3} to{transform:scaleY(var(--h, 1))} }

      /* ── TRACK CARDS ── */
      .tracks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
      .track-card { position: relative; text-decoration: none; color: var(--text); border-radius: 14px;
        background: var(--glass); border: 1px solid var(--glass-border);
        overflow: hidden; transition: all 0.25s; }
      .track-card:hover { transform: translateY(-6px); border-color: rgba(168,85,247,0.3);
        box-shadow: 0 20px 40px rgba(168,85,247,0.15); }
      .track-card-cover { position: relative; overflow: hidden; }
      .track-card-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6);
        display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; }
      .track-card-overlay.visible { opacity: 1; }
      .track-play-btn { width: 48px; height: 48px; border-radius: 50%; background: var(--green);
        display: flex; align-items: center; justify-content: center; color: #000; font-size: 18px; }
      .track-card-info { padding: 14px; }
      .track-card-name { font-weight: 600; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; }
      .track-card-album { font-size: 12px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 10px; }
      .track-card-meta { display: flex; justify-content: space-between; align-items: center; }
      .track-card-meta > span { font-size: 11px; color: var(--muted); }
      .track-card-rank { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.6);
        color: var(--purple); font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700;
        padding: 2px 8px; border-radius: 20px; }

      /* ── ALBUMS ── */
      .albums-section-label { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 20px; color: var(--muted); }
      .albums-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; }
      .album-card { background: none; border: none; cursor: pointer; text-align: left; color: var(--text); }
      .album-card-cover { position: relative; border-radius: 12px; overflow: hidden; transition: transform 0.2s; }
      .album-card:hover .album-card-cover { transform: scale(1.03); }
      .album-card-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5);
        display: flex; align-items: center; justify-content: center; color: var(--green);
        opacity: 0; transition: opacity 0.2s; }
      .album-card:hover .album-card-overlay { opacity: 1; }
      .album-card-name { font-weight: 600; font-size: 14px; margin-top: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .album-card-meta { font-size: 12px; color: var(--muted); margin-top: 2px; }

      /* ── MODAL ── */
      .modal-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center; padding: 24px; }
      .modal { background: var(--bg3); border: 1px solid var(--glass-border); border-radius: 20px;
        padding: 40px; max-width: 500px; width: 100%; position: relative;
        display: flex; gap: 32px; flex-wrap: wrap; animation: fadeUp 0.3s ease; }
      .modal-close { position: absolute; top: 16px; right: 16px; background: var(--glass); border: none;
        cursor: pointer; color: var(--text); width: 32px; height: 32px; border-radius: 50%; font-size: 14px; }
      .modal-type { font-size: 11px; color: var(--muted); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px; }
      .modal-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 6px; }
      .modal-meta { font-size: 13px; color: var(--muted); }
      .modal-info { flex: 1; min-width: 180px; }

      /* ── STATS ── */
      .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
      .stat-card { position: relative; background: var(--glass); border: 1px solid var(--glass-border);
        border-radius: 16px; padding: 24px; text-align: center; overflow: hidden;
        animation: fadeUp 0.5s ease both; transition: all 0.25s; }
      .stat-card:hover { border-color: var(--accent); transform: translateY(-4px); }
      .stat-card-icon { font-size: 28px; margin-bottom: 12px; }
      .stat-card-val { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; display: block;
        background: linear-gradient(135deg, var(--text), var(--accent, var(--purple)));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .stat-card-lbl { font-size: 12px; color: var(--muted); margin-top: 4px; }
      .stat-card-glow { position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%);
        width: 80px; height: 80px; border-radius: 50%; opacity: 0.15; filter: blur(20px); }

      /* ── GLASS PANEL ── */
      .glass-panel { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 16px; padding: 28px; }
      .panel-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; }

      /* ── POP ROW ── */
      .pop-row { display: flex; align-items: center; gap: 12px; }
      .pop-row-rank { font-family: 'Syne', sans-serif; font-size: 12px; color: var(--muted); width: 28px; }
      .pop-row-name { font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; max-width: 200px; }
      .pop-row-val { font-size: 12px; color: var(--muted); white-space: nowrap; }

      /* ── GENRE PILL ── */
      .genre-pill { background: rgba(168,85,247,0.12); border: 1px solid rgba(168,85,247,0.25);
        color: var(--purple); padding: 4px 12px; border-radius: 20px; font-size: 12px; white-space: nowrap; }

      /* ── ABOUT ── */
      .about-grid { display: grid; grid-template-columns: 280px 1fr; gap: 32px; align-items: start; }
      .about-avatar { width: 100%; border-radius: 16px; display: block; }
      .about-avatar-wrap { overflow: hidden; border-radius: 16px; border: 1px solid var(--glass-border); }
      .about-avatar.avatar-placeholder { min-height: 240px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--p1), var(--p2)); }

      /* ── SOCIAL ── */
      .social-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 10px;
        color: var(--text-dim); text-decoration: none; font-size: 14px; transition: all 0.2s;
        border: 1px solid transparent; }
      .social-link:hover { background: var(--glass); border-color: var(--glass-border); color: var(--text); }
      .social-icon { width: 28px; height: 28px; border-radius: 8px; background: rgba(168,85,247,0.15);
        display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }

      /* ── CONTACT FORM ── */
      .contact-form { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
      .form-input { background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border); border-radius: 10px;
        padding: 12px 16px; color: var(--text); font-size: 14px; font-family: 'DM Sans', sans-serif;
        outline: none; resize: vertical; transition: border-color 0.2s; }
      .form-input:focus { border-color: rgba(168,85,247,0.5); }
      .form-textarea { min-height: 100px; }
      .form-success { background: rgba(29,185,84,0.1); border: 1px solid rgba(29,185,84,0.3);
        color: var(--green); padding: 16px; border-radius: 10px; margin-top: 16px; font-size: 14px; }

      /* ── LOADING ── */
      .loading-screen { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; }
      .loading-logo { display: flex; align-items: center; gap: 10px;
        font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800;
        background: linear-gradient(135deg, var(--purple), var(--pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

      /* ── API NOTICE ── */
      .api-notice {
        position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 150;
        background: rgba(20,20,42,0.95); border: 1px solid rgba(168,85,247,0.3); border-radius: 12px;
        padding: 12px 20px; font-size: 13px; color: var(--text-dim);
        display: flex; align-items: center; max-width: 90vw; backdrop-filter: blur(12px);
      }
      .api-notice code { background: rgba(168,85,247,0.2); padding: 1px 6px; border-radius: 4px; font-size: 12px; color: var(--purple); }

      /* ── EMPTY ── */
      .empty-state { display: flex; flex-direction: column; align-items: center; gap: 16px;
        padding: 80px; color: var(--muted); font-size: 15px; }

      /* ── FOOTER ── */
      .footer { border-top: 1px solid var(--glass-border); margin-top: 60px; position: relative; z-index: 1; }
      .footer-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px; display: flex;
        flex-direction: column; align-items: center; gap: 16px; }
      .footer-links { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
      .footer-link { background: none; border: none; cursor: pointer; color: var(--muted); font-size: 13px; padding: 4px 10px;
        border-radius: 6px; transition: color 0.2s; font-family: 'DM Sans', sans-serif; }
      .footer-link:hover { color: var(--text); }

      /* ── RESPONSIVE ── */
      @media (max-width: 768px) {
        .nav { padding: 16px 20px; }
        .nav-links, .nav-spotify { display: none; }
        .hamburger { display: flex; }
        .hero-avatar, .avatar-placeholder { width: 120px; height: 120px; }
        .latest-release { padding: 24px; flex-direction: column; gap: 24px; }
        .tracks-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }
        .albums-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
        .stats-grid { grid-template-columns: repeat(2, 1fr); }
        .about-grid { grid-template-columns: 1fr; }
        .section { padding: 40px 16px; }
        .featured-card-right { display: none; }
        .pop-row-name { max-width: 120px; }
        .hero-stats-row { gap: 16px; }
        .modal { flex-direction: column; gap: 20px; padding: 28px; }
      }
      @media (max-width: 480px) {
        .stats-grid { grid-template-columns: 1fr 1fr; }
        .hero-name { font-size: 56px; }
        .hero-cta-secondary { display: none; }
      }
    `}</style>
  );
}
