import { MusicWave } from "./Common";
import { ARTIST_NAME } from "../config";

// ─── FOOTER ───────────────────────────────────────────────────────────────────
export default function Footer({ setPage, onAdminClick }) {
  const pages = ["home", "music", "albums", "upcoming", "about"];
  return (
    <footer className="footer">
      <div className="footer-inner">
        <button className="nav-logo" onClick={() => setPage("home")} style={{ marginBottom: 12 }}>
          <MusicWave size={16} /> <span className="rzen-wordmark nav-wordmark">{ARTIST_NAME}</span>
        </button>
        <div className="footer-links">
          {pages.map(p => (
            <button key={p} className="footer-link" onClick={() => { setPage(p); window.scrollTo(0, 0); }}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 16, opacity: 0.5, fontSize: 12 }}>
          All rights reserved by {ARTIST_NAME}
        </div>
      </div>
    </footer>
  );
}
