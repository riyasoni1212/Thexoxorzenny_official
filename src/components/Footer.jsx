import { MusicWave } from "./Common";

// ─── FOOTER ───────────────────────────────────────────────────────────────────
export default function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <button className="nav-logo" onClick={() => setPage("home")} style={{ marginBottom: 12 }}>
          <MusicWave size={16} /> <span>RZEN</span>
        </button>
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
