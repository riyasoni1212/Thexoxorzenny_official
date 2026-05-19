import { useState } from "react";
import { Cover, SpotifyIcon, AppleMusicIcon, YouTubeMusicIcon, EmptyState, RealismButton } from "../components/Common";

// ─── ALBUMS PAGE ──────────────────────────────────────────────────────────────
export default function AlbumsPage({ albums }) {
  const [selected, setSelected] = useState(null);

  const fullAlbums = albums.filter(a => a.album_type === "album");
  const singles = albums.filter(a => a.album_type === "single");
  const eps = albums.filter(a => a.album_type === "ep");

  const AlbumGrid = ({ items, label }) => items.length === 0 ? null : (
    <div style={{ marginBottom: 48 }}>
      <h3 className="albums-section-label">{label}</h3>
      <div className="albums-grid">
        {items.map(a => (
          <div key={a.id} className="neon-wrap">
            <div className="album-card-wrapper">
              <button className="album-card" onClick={() => setSelected(a)}>
                <div className="album-card-cover">
                  <Cover url={a.images?.[0]?.url} name={a.name} size={150} radius={12} />
                  <div className="album-card-overlay">
                    <SpotifyIcon size={32} />
                  </div>
                </div>
                <div className="content-box">
                  <span className="card-title">{a.name}</span>
                  <p className="card-content">{a.release_date?.slice(0, 4)} · {a.total_tracks} tracks</p>
                  <span className="see-more">View Album</span>
                </div>
                <div className="date-box">
                  <span className="month">YEAR</span>
                  <span className="date">{a.release_date?.slice(0, 4)}</span>
                </div>
              </button>
            </div>
          </div>
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
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
                <RealismButton href={selected.external_urls?.spotify} target="_blank" rel="noreferrer" theme="spotify">
                  <SpotifyIcon size={16} /> Spotify
                </RealismButton>
                <RealismButton href={`https://music.apple.com/search?term=${encodeURIComponent(selected.name)}`} target="_blank" rel="noreferrer" theme="apple">
                  <AppleMusicIcon size={16} /> Apple Music
                </RealismButton>
                <RealismButton href={`https://music.youtube.com/search?q=${encodeURIComponent(selected.name)}`} target="_blank" rel="noreferrer" theme="yt">
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
