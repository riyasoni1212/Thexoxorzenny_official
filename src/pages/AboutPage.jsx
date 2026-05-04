import { useState } from "react";
import { MusicWave, SpotifyIcon } from "../components/Common";

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
export default function AboutPage({ artist }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const socials = [
    {
      label: "Spotify",
      icon: <SpotifyIcon size={22} />,
      url: "https://open.spotify.com/artist/51mBnXuigxNHmmUenHJpND",
    },
    {
      label: "Instagram",
      icon: "📸",
      url: "https://www.instagram.com/thexoxorzenny_officiall?igsh=MWIxOXEwOGp6NW0xaA==",
    },
    {
      label: "YouTube",
      icon: "▶",
      url: "https://youtube.com/@thexoxorzenny_official?si=jaedOpZLlQF7QLzS",
    },
    {
      label: "Apple Music",
      icon: "🎵",
      url: "https://music.apple.com/in/artist/rzen/1493662188",
    },
  ];

  return (
    <div className="page">
      <section className="section page-hero">
        <h1 className="page-title">About RZEN</h1>
      </section>

      <section className="section">
        <div className="about-grid">
          <div className="about-left">
            <div className="about-avatar-wrap">
              {artist?.images?.[0]?.url ? (
                <img src={artist.images[0].url} alt="Rzen" className="about-avatar" />
              ) : (
                <div className="about-avatar avatar-placeholder">
                  <MusicWave size={64} />
                </div>
              )}
            </div>

            <div className="glass-panel" style={{ marginTop: 24 }}>
              <h3 className="panel-title">Connect</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                {socials.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noreferrer" className="social-link">
                    <span className="social-icon">{s.icon}</span>
                    {s.label}
                    <span style={{ marginLeft: "auto", opacity: 0.4 }}>↗</span>
                  </a>
                ))}
              </div>
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                <a href="mailto:rzen.music@gmail.com" className="social-link">
                  <span className="social-icon">✉</span>
                  rzen.music@gmail.com
                  <span style={{ marginLeft: "auto", opacity: 0.4 }}>↗</span>
                </a>
                <a href="mailto:thexoxorzenny.official@gmail.com" className="social-link">
                  <span className="social-icon">✉</span>
                  thexoxorzenny.official@gmail.com
                  <span style={{ marginLeft: "auto", opacity: 0.4 }}>↗</span>
                </a>
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="glass-panel">
              <h3 className="panel-title">The Artist</h3>
              <div style={{ marginTop: 16, lineHeight: 1.8, color: "var(--text-dim)" }}>
                <p>
                  RZEN is a 16-year-old singer, rapper, songwriter, composer, and producer creating
                  cinematic, emotional music across K-pop, hip-hop, EDM, indie, and acoustic styles.
                </p>
                <br />
                <p>
                  Entirely self-taught, she builds every track from scratch, blending storytelling,
                  layered vocals, and emotion into a unique sonic identity.
                </p>
                <br />
                <p>
                  Her music turns thoughts into sound, building a growing artistic universe with each release.
                </p>
              </div>

              {artist?.genres?.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <p style={{ color: "var(--muted)", fontSize: 12, letterSpacing: "0.1em", marginBottom: 10 }}>GENRES</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {artist.genres.map((g, i) => <span key={i} className="genre-pill">{g}</span>)}
                  </div>
                </div>
              )}
            </div>

            <div className="glass-panel" style={{ marginTop: 24 }}>
              <h3 className="panel-title">Send a Message</h3>
              {sent ? (
                <div className="form-success">✓ Message sent! RZEN will get back to you soon.</div>
              ) : (
                <form onSubmit={submit} className="contact-form">
                  <input className="form-input" placeholder="Your name" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} required />
                  <input className="form-input" type="email" placeholder="Email address" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} required />
                  <textarea className="form-input form-textarea" placeholder="Your message..." value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })} rows={4} required />
                  <button type="submit" className="spotify-btn" style={{ width: "100%", justifyContent: "center" }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
