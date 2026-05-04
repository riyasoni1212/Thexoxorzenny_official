import { useState } from "react";
import { MusicWave, Cover, SpotifyIcon, PopBar } from "../components/Common";
import { fmtMs, fmtNum } from "../utils";

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
export default function HomePage({ artist, topTracks, setPage }) {
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
            <p className="hero-genres">{artist?.genres?.join(" · ") || "k-pop · hip-hop · edm · indie · acoustic"}</p>
            <p className="hero-bio">
              RZEN is a 16-year-old singer, rapper, songwriter, composer, and producer creating cinematic,
              emotional music. Entirely self-taught, she builds every track from scratch — blending
              storytelling, layered vocals, and emotion into a unique sonic identity.
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
