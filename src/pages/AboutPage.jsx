import { useState, useEffect, useRef } from "react";
import { MusicWave, SpotifyIcon, RealismButton } from "../components/Common";
import {
  ARTIST_NAME, ARTIST_BIO, ARTIST_GENRES, ARTIST_AGE,
  CONTACT_EMAILS,
  SOCIAL_LINKS,
  SHOW_CHAT, SHOW_CONTACT_FORM
} from "../config";

// ─── CHAT BOX COMPONENT ─────────────────────────────────────────────────────────────
function ChatBox({ onSend }) {
  const [messages, setMessages] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) return;

    const mailtoLink = `mailto:${CONTACT_EMAILS.primary}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;

    const userMsg = { id: Date.now(), subject, text: message, sender: "user", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setSent(true);
    setSubject("");
    setMessage("");
    onSend?.(userMsg);

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: "Thanks for your message! RZEN will get back to you soon. 💜",
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setSent(false);
    }, 3000);
  };

  return (
    <>
      {!isOpen ? (
        <button
          className="chat-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <span className="chat-toggle-icon">💬</span>
        </button>
      ) : (
        <div className="chat-box">
          <div className="chat-header">
            <span>Chat with {ARTIST_NAME}</span>
            <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-empty">
                <p>Send a message to RZEN 💜</p>
                <p style={{ fontSize: 12, opacity: 0.6 }}>Opens your email app</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                <div className="chat-bubble">
                  {msg.subject && <strong>Subject: {msg.subject}</strong>}
                  {msg.subject && <br />}
                  {msg.text}
                </div>
                <span className="chat-time">{msg.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-wrap" style={{ flexDirection: "column", gap: 8, padding: 12 }}>
            <input
              type="text"
              className="chat-input"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ width: "100%" }}
            />
            <textarea
              className="chat-input"
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              style={{ width: "100%", resize: "none" }}
            />
            <button className="chat-send" onClick={handleSend} style={{ alignSelf: "flex-end" }}>
              {sent ? "Opening Email..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
export default function AboutPage({ artist }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:${CONTACT_EMAILS.primary}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const handleChatSend = (msg) => {
    console.log("Chat message:", msg);
  };

  const socials = [
    {
      label: "Spotify",
      icon: <SpotifyIcon size={22} />,
      url: SOCIAL_LINKS.spotify,
    },
    {
      label: "Instagram",
      icon: "📸",
      url: SOCIAL_LINKS.instagram,
    },
    {
      label: "YouTube",
      icon: "▶",
      url: SOCIAL_LINKS.youtube,
    },
    {
      label: "Apple Music",
      icon: "🎵",
      url: SOCIAL_LINKS.appleMusic,
    },
  ];

  return (
    <div className="page">
      {SHOW_CHAT && <ChatBox onSend={handleChatSend} />}
      <section className="section page-hero">
        <h1 className="page-title">About {ARTIST_NAME}</h1>
      </section>

      <section className="section">
        <div className="about-grid">
          <div className="about-left">
            <div className="intro-card">
              <a href={`mailto:${CONTACT_EMAILS.primary}`} className="mail" title="Email Rzen">
                <svg className="lucide lucide-mail" strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="currentColor" fill="none" viewBox="0 0 24 24" height={24} width={24} xmlns="http://www.w3.org/2000/svg">
                  <rect rx={2} y={4} x={2} height={16} width={20} />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
              <div className="profile-pic">
                {artist?.images?.[0]?.url ? (
                  <img src={artist.images[0].url} alt={ARTIST_NAME} />
                ) : (
                  <div className="profile-pic-placeholder">
                    <MusicWave size={40} />
                  </div>
                )}
              </div>
              <div className="bottom">
                <div className="content">
                  <span className="name">{ARTIST_NAME}</span>
                  <span className="about-me">
                    {ARTIST_AGE} y/o singer, songwriter, and composer creating emotional cinematic soundscapes.
                  </span>
                </div>
                <div className="bottom-bottom">
                  <div className="social-links-container">
                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" title="Instagram">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                      </svg>
                    </a>
                    <a href={SOCIAL_LINKS.spotify} target="_blank" rel="noreferrer" title="Spotify">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.377-1.454-5.37-1.783-8.894-.982-.336.076-.67-.135-.746-.47-.076-.336.135-.67.47-.746 3.856-.882 7.15-.5 9.82 1.137.295.18.387.563.207.857zm1.225-2.72c-.226.367-.707.487-1.074.26-2.722-1.672-6.87-2.157-10.082-1.182-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.673-1.114 8.238-.575 11.35 1.34.367.226.487.707.26 1.074zm.107-2.834C14.338 8.71 8.423 8.51 5.006 9.548c-.524.16-1.077-.14-1.237-.664-.16-.525.14-1.078.664-1.237 3.907-1.186 10.428-.95 14.542 1.492.473.28.627.893.347 1.366-.28.473-.893.627-1.366.347z" />
                      </svg>
                    </a>
                    <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" title="YouTube">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                  <button className="button" onClick={() => {
                    const form = document.querySelector('.contact-form');
                    if (form) form.scrollIntoView({ behavior: 'smooth' });
                  }}>Contact Me</button>
                </div>
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="glass-panel">
              <h3 className="panel-title">The Artist</h3>
              <div style={{ marginTop: 16, lineHeight: 1.8, color: "var(--text-dim)" }}>
                <p>
                  {ARTIST_NAME} is a {ARTIST_AGE}-year-old singer, rapper, songwriter, composer, and producer creating
                  cinematic, emotional music across {ARTIST_GENRES.slice(0, 3).join(", ")} styles.
                </p>
                <br />
                <p>
                  {ARTIST_BIO}
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

            {SHOW_CONTACT_FORM && <div className="glass-panel" style={{ marginTop: 24 }}>
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
                  <RealismButton type="submit" style={{ width: "100%", justifyContent: "center" }}>
                    Send Message
                  </RealismButton>
                </form>
              )}
            </div>}
          </div>
        </div>
      </section>
    </div>
  );
}
