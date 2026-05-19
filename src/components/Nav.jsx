import { useState, useEffect } from "react";
import { MusicWave, SpotifyIcon, AppleMusicIcon, YouTubeMusicIcon, HomeIcon, MusicIcon, AlbumsIcon, UpcomingIcon, AboutIcon } from "./Common";
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
    { id: "home", label: "Home", icon: <HomeIcon size={14} /> },
    { id: "music", label: "Music", icon: <MusicIcon size={14} /> },
    { id: "albums", label: "Albums", icon: <AlbumsIcon size={14} /> },
    { id: "upcoming", label: "Upcoming", icon: <UpcomingIcon size={14} /> },
    { id: "about", label: "About", icon: <AboutIcon size={14} /> },
  ];

  const activeIndex = links.findIndex(l => l.id === page);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const go = (id) => {
    setPage(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <button className="nav-logo" onClick={() => go("home")} aria-label="Go to home">
          <MusicWave size={18} /> <span className="rzen-wordmark nav-wordmark">{ARTIST_NAME}</span>
        </button>
        <div className="nav-links" role="menubar">
          <div
            className="nav-pill"
            style={{
              transform: `translateX(${(hoveredIndex !== null ? hoveredIndex : (activeIndex !== -1 ? activeIndex : 0)) * 88}px)`
            }}
          />
          <svg
            className={`nav-outline ${hoveredIndex !== null ? "is-hovering" : ""}`}
            overflow="visible"
            width={88}
            height={40}
            viewBox="0 0 88 40"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: `translateX(${(hoveredIndex !== null ? hoveredIndex : (activeIndex !== -1 ? activeIndex : 0)) * 88}px)`
            }}
          >
            <rect className="nav-rect" pathLength={100} x={0} y={0} width={88} height={40} fill="transparent" strokeWidth={2} />
          </svg>
          {links.map((l, index) => (
            <button
              key={l.id}
              className={`nav-link ${page === l.id ? "active" : ""}`}
              onClick={() => go(l.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              role="menuitem"
            >
              {l.icon}
              <span className="nav-link-text">{l.label}</span>
            </button>
          ))}
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
            {l.icon && <span className="mobile-link-icon">{l.icon}</span>}
            <span className="mobile-link-text">{l.label}</span>
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
