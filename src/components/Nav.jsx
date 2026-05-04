import { useState, useEffect } from "react";
import { MusicWave, SpotifyIcon } from "./Common";

// ─── NAV ──────────────────────────────────────────────────────────────────────
export default function Nav({ page, setPage }) {
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
