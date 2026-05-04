import { Cover, PopBar } from "../components/Common";
import { fmtMs, fmtNum } from "../utils";

// ─── STATS PAGE ───────────────────────────────────────────────────────────────
export default function StatsPage({ artist, topTracks, albums }) {
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
