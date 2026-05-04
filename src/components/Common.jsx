// ─── MUSIC WAVE ───────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

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

// ─── APPLE MUSIC ICON ─────────────────────────────────────────────────────────
export function AppleMusicIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

// ─── YOUTUBE MUSIC ICON ───────────────────────────────────────────────────────
export function YouTubeMusicIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.65 10.65l-2.5 1.5-1.65-1.04V13.5l2.5-1.5 1.65 1.04V12.65zm-5 0l-2.5 1.5-1.65-1.04V8.5l2.5-1.5 1.65 1.04V7.65z"/>
    </svg>
  );
}

// ─── YOUTUBE ICON ──────────────────────────────────────────────────────────────
export function YouTubeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// ─── STREAMING BUTTONS ───────────────────────────────────────────────────────
export function StreamingButtons({ spotifyUrl, appleUrl, ytmusicUrl, small }) {
  const size = small ? 14 : 18;
  const btnStyle = small ? { padding: "8px 12px", fontSize: 12 } : {};
  return (
    <div className="streaming-buttons" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {spotifyUrl && (
        <a href={spotifyUrl} target="_blank" rel="noreferrer" className="spotify-btn" style={btnStyle}>
          <SpotifyIcon size={size} /> {small ? "" : "Spotify"}
        </a>
      )}
      {appleUrl && (
        <a href={appleUrl} target="_blank" rel="noreferrer" className="streaming-btn apple-btn" style={btnStyle}>
          <AppleMusicIcon size={size} /> {small ? "" : "Apple Music"}
        </a>
      )}
      {ytmusicUrl && (
        <a href={ytmusicUrl} target="_blank" rel="noreferrer" className="streaming-btn ytmusic-btn" style={btnStyle}>
          <YouTubeMusicIcon size={size} /> {small ? "" : "YouTube Music"}
        </a>
      )}
    </div>
  );
}

// ─── COUNTDOWN TIMER ─────────────────────────────────────────────────────────
export function Countdown({ targetDate, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calcTimeLeft(targetDate);
      setTimeLeft(remaining);
      if (remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { val: timeLeft.days, label: "Days" },
    { val: timeLeft.hours, label: "Hours" },
    { val: timeLeft.minutes, label: "Mins" },
    { val: timeLeft.seconds, label: "Secs" },
  ];

  if (timeLeft.days < 0) return null;

  return (
    <div className="countdown-timer">
      {units.map((u, i) => (
        <div key={i} className="countdown-unit">
          <span className="countdown-val">{String(u.val).padStart(2, "0")}</span>
          <span className="countdown-label">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

function calcTimeLeft(target) {
  const diff = new Date(target) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
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
