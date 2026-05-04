import { useState, useEffect, useRef } from "react";
import { MusicWave, SpotifyIcon } from "../components/Common";
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
                {CONTACT_EMAILS.secondary && (
                <a href={`mailto:${CONTACT_EMAILS.secondary}`} className="social-link">
                  <span className="social-icon">✉</span>
                  {CONTACT_EMAILS.secondary}
                  <span style={{ marginLeft: "auto", opacity: 0.4 }}>↗</span>
                </a>
                )}
                <a href={`mailto:${CONTACT_EMAILS.primary}`} className="social-link">
                  <span className="social-icon">✉</span>
                  {CONTACT_EMAILS.primary}
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
                  <button type="submit" className="spotify-btn" style={{ width: "100%", justifyContent: "center" }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>}
          </div>
        </div>
      </section>
    </div>
  );
}
