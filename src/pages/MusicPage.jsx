import { useState } from "react";
import { Cover, MusicWave, PopBar, EmptyState, SpotifyIcon, AppleMusicIcon, YouTubeMusicIcon, RealismButton } from "../components/Common";
import { fmtMs } from "../utils";
import { YOUTUBE_MUSIC_URL, APPLE_MUSIC_URL } from "../config";

export default function MusicPage({ topTracks }) {
  const [hovering, setHovering] = useState(null);
  const [selected, setSelected] = useState(null);

  const getPlatformUrls = () => {
    return {
      spotify: "https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND",
      apple: APPLE_MUSIC_URL,
      ytmusic: YOUTUBE_MUSIC_URL,
    };
  };

  return (
    <div className="page">
      <section className="section page-hero">
        <h1 className="page-title">Discography</h1>
        <p className="page-subtitle">All tracks on Spotify</p>
      </section>

      <section className="section">
        <div className="tracks-grid">
          {topTracks.map((t, i) => (
            <div key={t.id} className="neon-wrap">
              <div className="track-card-wrapper">
                <div 
                  className="track-card" 
                  onMouseEnter={() => setHovering(t.id)} 
                  onMouseLeave={() => setHovering(null)}
                  onClick={() => setSelected(t)}
                >
                  <div className="track-card-cover">
                    <Cover url={t.album?.images?.[0]?.url} name={t.name} size={150} radius={12} />
                    <div className={`track-card-overlay ${hovering === t.id ? "visible" : ""}`}>
                      <div className="track-play-btn">
                        {hovering === t.id ? <MusicWave size={28} /> : "▶"}
                      </div>
                    </div>
                  </div>
                  <div className="content-box">
                    <span className="card-title">{t.name}</span>
                    <p className="card-content">{t.album?.name}</p>
                    <div className="track-card-meta">
                      <span>{fmtMs(t.duration_ms)}</span>
                      <PopBar value={t.popularity} />
                    </div>
                    <span className="see-more">
                      {hovering === t.id ? "Playing..." : "View track"}
                    </span>
                  </div>
                  <div className="date-box">
                    <span className="month">TRACK</span>
                    <span className="date">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {topTracks.length === 0 && <EmptyState message="No tracks found" />}
      </section>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            <div className="modal-cover">
              <Cover url={selected.album?.images?.[0]?.url} name={selected.name} size={200} radius={16} />
            </div>
            <div className="modal-info">
              <h2 className="modal-title">{selected.name}</h2>
              <p className="modal-meta">{selected.album?.name} · {fmtMs(selected.duration_ms)}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
                <RealismButton href={getPlatformUrls().spotify} target="_blank" rel="noreferrer" theme="spotify">
                  <SpotifyIcon size={16} /> Open in Spotify
                </RealismButton>
                <RealismButton href={getPlatformUrls().apple} target="_blank" rel="noreferrer" theme="apple">
                  <AppleMusicIcon size={16} /> Apple Music
                </RealismButton>
                <RealismButton href={getPlatformUrls().ytmusic} target="_blank" rel="noreferrer" theme="yt">
                  <YouTubeMusicIcon size={16} /> YouTube Music
                </RealismButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}