// ─── MUSIC WAVE ───────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import InteractivePlatinumBg from "./InteractivePlatinumBg";

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
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.438-5.305-1.764-8.785-.97-.337.078-.67-.133-.747-.47-.077-.337.133-.67.47-.747 3.81-.87 7.077-.5 9.71 1.114.294.18.385.563.208.857zm1.224-2.723c-.226.367-.707.487-1.074.26-2.69-1.654-6.79-2.134-9.97-1.17-.413.125-.845-.107-.97-.52-.125-.413.107-.845.52-.97 3.633-1.102 8.147-.568 11.233 1.328.368.226.488.707.261 1.072zm.105-2.833C14.838 8.92 9.07 8.73 5.736 9.742c-.513.156-1.05-.133-1.206-.646-.156-.513.133-1.05.646-1.206 3.84-1.163 10.214-.94 13.84 1.214.46.273.61.87.337 1.33-.274.46-.87.61-1.33.337z" />
    </svg>
  );
}

// ─── APPLE MUSIC ICON ─────────────────────────────────────────────────────────
export function AppleMusicIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 2.253a.75.75 0 0 0-.964-.717L7.536 5.088A2.25 2.25 0 0 0 6 7.252v7.712a3.75 3.75 0 1 0 1.5 3v-9.664l12-3.327v6.62a3.75 3.75 0 1 0 1.5 3v-6.937z" />
    </svg>
  );
}

// ─── YOUTUBE MUSIC ICON ───────────────────────────────────────────────────────
export function YouTubeMusicIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.48 0-4.5-2.02-4.5-4.5S9.52 7.5 12 7.5s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7.5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-1 4.5v-3l2.5 1.5-2.5 1.5z" />
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
  const buttonSize = small ? "small" : "normal";
  return (
    <div className="streaming-buttons" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {spotifyUrl && (
        <RealismButton href={spotifyUrl} target="_blank" rel="noreferrer" size={buttonSize} theme="spotify">
          <SpotifyIcon size={size} /> {small ? "" : "Spotify"}
        </RealismButton>
      )}
      {appleUrl && (
        <RealismButton href={appleUrl} target="_blank" rel="noreferrer" size={buttonSize} theme="apple">
          <AppleMusicIcon size={size} /> {small ? "" : "Apple Music"}
        </RealismButton>
      )}
      {ytmusicUrl && (
        <RealismButton href={ytmusicUrl} target="_blank" rel="noreferrer" size={buttonSize} theme="yt">
          <YouTubeMusicIcon size={size} /> {small ? "" : "YouTube Music"}
        </RealismButton>
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
      <div style={{ position: "absolute", inset: 0, pointerEvents: "auto" }}>
        <InteractivePlatinumBg />
      </div>
    </div>
  );
}

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
export function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-orbit" aria-hidden="true">
        <span className="loading-ring loading-ring-one" />
        <span className="loading-ring loading-ring-two" />
        <span className="loading-ring loading-ring-three" />
      </div>
      <div className="loading-notes" aria-hidden="true">
        <span>♪</span>
        <span>♬</span>
        <span>♫</span>
        <span>♩</span>
      </div>
      <div className="loading-logo" aria-label="Loading RZEN">
        <MusicWave size={48} />
        <span className="rzen-wordmark loading-wordmark">RZEN</span>
      </div>
      <div className="loading-eq" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="loading-bar" aria-hidden="true">
        <span />
      </div>
      <p className="loading-copy">Tuning the vibe...</p>
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

// ─── REALISM BUTTON ───────────────────────────────────────────────────────────
export function RealismButton({ href, onClick, target, rel, className, style, children, size = "normal", theme = "", ...rest }) {
  const content = (
    <>
      <div className="blob1" />
      <div className="blob2" />
      <div className="inner">{children}</div>
    </>
  );

  const themeClass = theme ? `${theme}-theme` : "";
  const fullClassName = `realism-btn ${size} ${themeClass} ${className || ""}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={fullClassName} style={style} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={fullClassName} style={style} type="button" {...rest}>
      {content}
    </button>
  );
}

// ─── GLASS CARD STACK ──────────────────────────────────────────────────────────
export function GlassCardStack({ spotifyUrl, appleUrl, ytmusicUrl }) {
  return (
    <div className="glass-card-container">
      {spotifyUrl && (
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noreferrer"
          className="glass-card spotify-card"
          style={{ "--r": -15 }}
          data-text="Spotify"
        >
          <SpotifyIcon size={48} />
        </a>
      )}
      {appleUrl && (
        <a
          href={appleUrl}
          target="_blank"
          rel="noreferrer"
          className="glass-card apple-card"
          style={{ "--r": 5 }}
          data-text="Apple Music"
        >
          <AppleMusicIcon size={48} />
        </a>
      )}
      {ytmusicUrl && (
        <a
          href={ytmusicUrl}
          target="_blank"
          rel="noreferrer"
          className="glass-card yt-card"
          style={{ "--r": 25 }}
          data-text="YouTube Music"
        >
          <YouTubeMusicIcon size={48} />
        </a>
      )}
    </div>
  );
}

// ─── NAV NAVIGATION ICONS ──────────────────────────────────────────────────
export function HomeIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function MusicIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export function AlbumsIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ display: "inline-block", verticalAlign: "middle" }}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function UpcomingIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ display: "inline-block", verticalAlign: "middle" }}>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </svg>
  );
}

export function AboutIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

