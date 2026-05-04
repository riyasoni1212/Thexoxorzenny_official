import { useState, useEffect } from "react";
import { MusicWave, SpotifyIcon, AppleMusicIcon, YouTubeMusicIcon } from "./Common";
import { ARTIST_NAME, SPOTIFY_URL, APPLE_MUSIC_URL, YOUTUBE_MUSIC_URL } from "../config";

const DEFAULT_URLS = {
  spotify: SPOTIFY_URL || "https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND",
  apple: APPLE_MUSIC_URL || "https://music.apple.com/artist/rzen/1493662188",
  ytmusic: YOUTUBE_MUSIC_URL || "https://music.youtube.com/channel/UC123456789",
};

// ─── NAV ──────────────────────────────────────────────────────────────────────
export default function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [streamUrls, setStreamUrls] = useState(DEFAULT_URLS);

  useEffect(() => {
    const saved = localStorage.getItem("rzen_site_settings");
    if (saved) {
      const settings = JSON.parse(saved);
      setStreamUrls({
        spotify: settings.spotifyArtistUrl || DEFAULT_URLS.spotify,
        apple: settings.appleMusicUrl || DEFAULT_URLS.apple,
        ytmusic: settings.youtubeMusicUrl || DEFAULT_URLS.ytmusic,
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on scroll and resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links = [
    { id: "home", label: "Home" },
    { id: "music", label: "Music" },
    { id: "albums", label: "Albums" },
    { id: "upcoming", label: "Upcoming" },
    { id: "about", label: "About" },
  ];

  const go = (id) => { 
    setPage(id); 
    setMobileOpen(false); 
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <button className="nav-logo" onClick={() => go("home")} aria-label="Go to home">
          <MusicWave size={18} /> <span>{ARTIST_NAME}</span>
        </button>
        <div className="nav-links" role="menubar">
          {links.map(l => (
            <button key={l.id} className={`nav-link ${page === l.id ? "active" : ""}`} onClick={() => go(l.id)} role="menuitem">
              {l.label}
            </button>
          ))}
        </div>
        <div className="nav-streaming">
          <a href={streamUrls.spotify} target="_blank" rel="noopener noreferrer" className="streaming-btn spotify-btn" aria-label="Spotify">
            <SpotifyIcon size={16} />
          </a>
          <a href={streamUrls.apple} target="_blank" rel="noopener noreferrer" className="streaming-btn apple-btn" aria-label="Apple Music">
            <AppleMusicIcon size={16} />
          </a>
          <a href={streamUrls.ytmusic} target="_blank" rel="noopener noreferrer" className="streaming-btn ytmusic-btn" aria-label="YouTube Music">
            <YouTubeMusicIcon size={16} />
          </a>
        </div>
        <button 
          className={`hamburger ${mobileOpen ? "active" : ""}`} 
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu ${mobileOpen ? "active" : ""}`} role="dialog" aria-label="Mobile navigation">
        {links.map(l => (
          <button key={l.id} className={`mobile-link ${page === l.id ? "active" : ""}`} onClick={() => go(l.id)}>
            {l.label}
          </button>
        ))}
        <div className="mobile-streaming">
          <a href={streamUrls.spotify} target="_blank" rel="noopener noreferrer" className="streaming-btn-mobile spotify-btn">
            <SpotifyIcon size={18} /> Spotify
          </a>
          <a href={streamUrls.apple} target="_blank" rel="noopener noreferrer" className="streaming-btn-mobile apple-btn">
            <AppleMusicIcon size={18} /> Apple Music
          </a>
          <a href={streamUrls.ytmusic} target="_blank" rel="noopener noreferrer" className="streaming-btn-mobile ytmusic-btn">
            <YouTubeMusicIcon size={18} /> YouTube Music
          </a>
        </div>
      </div>
    </>
  );
}