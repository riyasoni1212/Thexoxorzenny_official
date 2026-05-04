// ─── MUSIC WAVE ───────────────────────────────────────────────────────────────
export function MusicWave({ playing = true, size = 24 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: size }}>
      {[0.6, 1, 0.8, 1, 0.5].map((h, i) => (
        <div key={i} className="wave-bar" style={{
          width: size * 0.12,
          height: playing ? undefined : size * 0.3,
          "--h": h,
          "--delay": `${i * 0.1}s`,
          animationPlayState: playing ? "running" : "paused",
        }} />
      ))}
    </div>
  );
}

// ─── ALBUM COVER ──────────────────────────────────────────────────────────────
export function Cover({ url, name, size = 60, radius = 8 }) {
  if (url) return (
    <img src={url} alt={name} style={{ width: size, height: size, borderRadius: radius, objectFit: "cover", display: "block" }} />
  );
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: "linear-gradient(135deg, var(--p1), var(--p2))",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, color: "rgba(255,255,255,0.4)",
    }}>♪</div>
  );
}

// ─── SPOTIFY ICON ─────────────────────────────────────────────────────────────
export function SpotifyIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

// ─── POPULARITY BAR ───────────────────────────────────────────────────────────
export function PopBar({ value, large }) {
  return (
    <div className={`pop-bar-wrap ${large ? "large" : ""}`}>
      <div className="pop-bar-track">
        <div className="pop-bar-fill" style={{ width: `${value ?? 0}%` }} />
      </div>
      {large && <span className="pop-bar-val">{value ?? 0}%</span>}
    </div>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
export function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <MusicWave size={40} />
      <p>{message}</p>
    </div>
  );
}

// ─── ANIMATED BACKGROUND ──────────────────────────────────────────────────────
export function AnimatedBg() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <div className="grid-lines" />
      <div className="scanline" />
    </div>
  );
}

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
export function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-logo">
        <MusicWave size={48} />
        <span>RZEN</span>
      </div>
      <p>Loading your experience...</p>
    </div>
  );
}

// ─── API SETUP NOTICE ─────────────────────────────────────────────────────────
import { useState } from "react";

export function ApiNotice() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="api-notice">
      <div>
        <strong>Demo Mode</strong> — Replace <code>YOUR_CLIENT_ID</code> & <code>YOUR_CLIENT_SECRET</code> in <code>config.js</code> with your{" "}
        <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noreferrer" style={{ color: "var(--pink)" }}>
          Spotify Developer credentials
        </a>{" "}
        to load live data.
      </div>
      <button onClick={() => setOpen(false)} style={{ marginLeft: 16, opacity: 0.6, background: "none", border: "none", cursor: "pointer", color: "inherit" }}>✕</button>
    </div>
  );
}
