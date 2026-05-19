import { useState } from "react";
import { MusicWave, Cover, SpotifyIcon, AppleMusicIcon, YouTubeMusicIcon, PopBar, Countdown, RealismButton, GlassCardStack } from "../components/Common";
import { fmtMs, fmtNum } from "../utils";
import { YOUTUBE_MUSIC_URL, APPLE_MUSIC_URL, YOUTUBE_VIDEO_ID, ARTIST_NAME, ARTIST_TAGLINE, ARTIST_BIO, ARTIST_GENRES, SHOW_STATS, SHOW_LATEST_VIDEO, SHOW_COUNTDOWN, SHOW_FEATURED_TRACKS, SHOW_LATEST_RELEASE } from "../config";
import { useData } from "../context/DataContext";

export default function HomePage({ artist, topTracks, setPage }) {
  const { releases } = useData();
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
            <p className="hero-tag">✦ {ARTIST_TAGLINE}</p>
            <h1 className="hero-name rzen-wordmark">{ARTIST_NAME}</h1>
            <p className="hero-genres">{artist?.genres?.join(" · ") || ARTIST_GENRES.join(" · ")}</p>
            <p className="hero-bio">
              {ARTIST_BIO}
            </p>
            {SHOW_STATS && (
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
            )}
            <div className="hero-ctas">
              <RealismButton href={artist?.external_urls?.spotify} target="_blank" rel="noreferrer" size="large" theme="spotify" className="hero-cta-primary">
                <SpotifyIcon size={20} /> Listen on Spotify
              </RealismButton>
              <RealismButton onClick={() => setPage("music")} size="large" className="hero-cta-secondary">
                View Discography →
              </RealismButton>
            </div>
          </div>
        </div>
      </section>

      {/* Streaming Portals (Glass Card Stack) */}
      <section className="section" style={{ textAlign: "center", paddingTop: 40, paddingBottom: 40, overflow: "hidden" }}>
        <h2 className="section-title">Streaming Portals</h2>
        <p style={{ color: "var(--muted)", maxWidth: 500, margin: "8px auto 0px", fontSize: "0.95rem" }}>
          Listen to my official tracks, compilations, and albums on your favorite platforms.
        </p>
        <GlassCardStack 
          spotifyUrl={artist?.external_urls?.spotify || "https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND"} 
          appleUrl={APPLE_MUSIC_URL} 
          ytmusicUrl={YOUTUBE_MUSIC_URL} 
        />
      </section>

      {/* YouTube Video */}
      {SHOW_LATEST_VIDEO && YOUTUBE_VIDEO_ID && (
      <div className="video-section section">
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: 24 }}>Latest Video</h2>
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
            title="Latest Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
      )}

      {/* Upcoming Release Countdown */}
      {SHOW_COUNTDOWN && releases[0] && (
      <section className="section">
        <div className="glass-panel" style={{ textAlign: "center" }}>
          <p style={{ color: "#a3a3a3", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>Coming Soon</p>
          <h2 style={{ fontFamily: "Syne", fontSize: "clamp(20px, 6vw, 36px)", fontWeight: 800, margin: "12px 0", lineHeight: 1.1, overflowWrap: "break-word" }}>{releases[0].title}</h2>
          <p style={{ color: "var(--muted)" }}>{releases[0].type}</p>
          <div className="countdown-container">
            <Countdown targetDate={releases[0].date} />
          </div>
          <div className="countdown-presave">
            <RealismButton href={releases[0].spotifyUrl || "https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND"} target="_blank" rel="noreferrer" theme="spotify">
              <SpotifyIcon /> Pre-Save on Spotify
            </RealismButton>
            <RealismButton href={releases[0].appleUrl || APPLE_MUSIC_URL} target="_blank" rel="noreferrer" theme="apple">
              <AppleMusicIcon /> Pre-Add on Apple Music
            </RealismButton>
          </div>
        </div>
      </section>
      )}

      {/* Featured Tracks */}
      {SHOW_FEATURED_TRACKS && featured.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Featured Tracks</h2>
            <button className="see-all" onClick={() => setPage("music")}>See all →</button>
          </div>
          <div className="featured-tracks">
            {featured.map((t, i) => (
              <div key={t.id} className={`neon-wrap featured-neon-wrap ${currentTrack === i ? "active" : ""}`}>
                <a href={t.external_urls?.spotify} target="_blank" rel="noreferrer"
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
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Latest Release */}
      {SHOW_LATEST_RELEASE && topTracks[0] && (
        <section className="section">
          <h2 className="section-title">Latest Release</h2>
          <div className="neon-wrap latest-release-neon">
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
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <RealismButton href={topTracks[0].external_urls?.spotify} target="_blank" rel="noreferrer" theme="spotify">
                    <SpotifyIcon size={16} /> Spotify
                  </RealismButton>
                  <RealismButton href={APPLE_MUSIC_URL} target="_blank" rel="noreferrer" theme="apple">
                    <AppleMusicIcon size={16} /> Apple Music
                  </RealismButton>
                  <RealismButton href={YOUTUBE_MUSIC_URL} target="_blank" rel="noreferrer" theme="yt">
                    <YouTubeMusicIcon size={16} /> YouTube Music
                  </RealismButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
