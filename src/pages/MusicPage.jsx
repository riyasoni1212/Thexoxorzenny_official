import { useState } from "react";
import { Cover, MusicWave, PopBar, EmptyState, SpotifyIcon, AppleMusicIcon, YouTubeMusicIcon } from "../components/Common";
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
            <div key={t.id} 
              className="track-card" 
              onMouseEnter={() => setHovering(t.id)} 
              onMouseLeave={() => setHovering(null)}
              onClick={() => setSelected(t)}
            >
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
                <a href={getPlatformUrls().spotify} target="_blank" rel="noreferrer" className="spotify-btn">
                  <SpotifyIcon size={16} /> Open in Spotify
                </a>
                <a href={getPlatformUrls().apple} target="_blank" rel="noreferrer" className="spotify-btn" style={{ background: "#FA243C" }}>
                  <AppleMusicIcon size={16} /> Apple Music
                </a>
                <a href={getPlatformUrls().ytmusic} target="_blank" rel="noreferrer" className="spotify-btn" style={{ background: "#FF0000" }}>
                  <YouTubeMusicIcon size={16} /> YouTube Music
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}