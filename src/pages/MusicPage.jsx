import { useState } from "react";
import { Cover, MusicWave, PopBar, EmptyState } from "../components/Common";
import { fmtMs } from "../utils";

// ─── MUSIC PAGE ───────────────────────────────────────────────────────────────
export default function MusicPage({ topTracks }) {
  const [hovering, setHovering] = useState(null);

  return (
    <div className="page">
      <section className="section page-hero">
        <h1 className="page-title">Discography</h1>
        <p className="page-subtitle">All tracks on Spotify</p>
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
