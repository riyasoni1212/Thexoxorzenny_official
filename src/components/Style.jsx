// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
export default function Style() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --bg: #0a0a12;
        --bg2: #0f0f1a;
        --bg3: #14142a;
        --glass: rgba(255,255,255,0.04);
        --glass-border: rgba(255,255,255,0.08);
        --p1: #c026d3;
        --p2: #7c3aed;
        --pink: #ec4899;
        --purple: #a855f7;
        --text: #f0f0ff;
        --text-dim: #b8b8d8;
        --muted: #6b6b8f;
        --green: #1db954;
        --r: 16px;
      }

      html { scroll-behavior: smooth; }

      body {
        font-family: 'DM Sans', sans-serif;
        background: var(--bg);
        color: var(--text);
        min-height: 100vh;
        overflow-x: hidden;
      }

      /* ── BACKGROUND ── */
      .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.18; }
      .orb1 {
        width: 600px; height: 600px;
        background: radial-gradient(circle, #c026d3, transparent);
        top: -200px; left: -200px;
        animation: drift1 18s ease-in-out infinite;
      }
      .orb2 {
        width: 500px; height: 500px;
        background: radial-gradient(circle, #7c3aed, transparent);
        top: 30%; right: -150px;
        animation: drift2 22s ease-in-out infinite;
      }
      .orb3 {
        width: 400px; height: 400px;
        background: radial-gradient(circle, #ec4899, transparent);
        bottom: 10%; left: 30%;
        animation: drift1 26s ease-in-out infinite reverse;
      }
      .grid-lines {
        position: absolute; inset: 0;
        background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
        background-size: 60px 60px;
      }
      .scanline {
        position: absolute; inset: 0;
        background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
        pointer-events: none;
      }
      @keyframes drift1 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(60px,-40px)} 66%{transform:translate(-40px,60px)} }
      @keyframes drift2 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(-50px,50px)} 66%{transform:translate(70px,-30px)} }

      /* ── NAV ── */
      .nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 100;
        display: flex; align-items: center; gap: 8px;
        padding: 20px 40px;
        transition: all 0.3s ease;
      }
      .nav-scrolled {
        background: rgba(10,10,18,0.85);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--glass-border);
        padding: 14px 40px;
      }
      .nav-logo {
        display: flex; align-items: center; gap: 8px;
        font-family: 'Syne', sans-serif; font-weight: 800;
        font-size: 20px; color: var(--text);
        background: none; border: none; cursor: pointer;
        letter-spacing: 0.12em;
        background: linear-gradient(135deg, var(--purple), var(--pink));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .nav-links { display: flex; gap: 4px; margin-left: auto; }
      .nav-link {
        background: none; border: none; cursor: pointer;
        color: var(--muted); font-size: 14px; font-family: 'DM Sans', sans-serif;
        padding: 8px 14px; border-radius: 8px;
        transition: all 0.2s;
      }
      .nav-link:hover { color: var(--text); background: var(--glass); }
      .nav-link.active { color: var(--purple); background: rgba(168,85,247,0.1); }
      .nav-spotify { margin-left: 16px; }

      .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
      .hamburger span { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 2px; }

      .mobile-menu {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99;
        background: rgba(10,10,18,0.97); backdrop-filter: blur(20px);
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
      }
      .mobile-link {
        background: none; border: none; cursor: pointer;
        font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 700;
        color: var(--text-dim); padding: 12px 32px; border-radius: 12px;
        transition: all 0.2s;
      }
      .mobile-link:hover, .mobile-link.active { color: var(--purple); }

      /* ── SPOTIFY BUTTON ── */
      .spotify-btn {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 10px 20px; border-radius: 40px;
        background: var(--green); color: #000;
        font-weight: 700; font-size: 14px; text-decoration: none;
        border: none; cursor: pointer;
        transition: all 0.2s; white-space: nowrap;
      }
      .spotify-btn:hover { transform: scale(1.04); filter: brightness(1.1); }

      /* ── MAIN ── */
      .main { position: relative; z-index: 1; padding-top: 80px; }

      /* ── SECTIONS ── */
      .section { max-width: 1100px; margin: 0 auto; padding: 60px 24px; }
      .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
      .section-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; }
      .see-all { background: none; border: none; cursor: pointer; color: var(--purple); font-size: 14px; }
      .see-all:hover { text-decoration: underline; }

      /* ── PAGE ── */
      .page { min-height: calc(100vh - 80px); }
      .page-hero { padding-top: 80px; padding-bottom: 20px; }
      .page-title { font-family: 'Syne', sans-serif; font-size: clamp(36px,6vw,64px); font-weight: 800;
        background: linear-gradient(135deg, #fff 30%, var(--purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .page-subtitle { color: var(--muted); margin-top: 8px; font-size: 16px; }

      /* ── HERO ── */
      .hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; }
      .hero-glow {
        position: absolute; width: 800px; height: 800px; border-radius: 50%;
        background: radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%);
        top: 50%; left: 50%; transform: translate(-50%,-50%);
        pointer-events: none;
      }
      .hero-content {
        max-width: 1100px; margin: 0 auto; padding: 0 24px;
        display: flex; flex-direction: column; align-items: center; text-align: center; gap: 32px;
        width: 100%;
      }
      .hero-avatar-wrap { position: relative; }
      .hero-avatar {
        width: 160px; height: 160px; border-radius: 50%;
        border: 2px solid rgba(168,85,247,0.4); display: block;
      }
      .avatar-placeholder {
        width: 160px; height: 160px; border-radius: 50%;
        background: linear-gradient(135deg, var(--p1), var(--p2));
        display: flex; align-items: center; justify-content: center;
        border: 2px solid rgba(168,85,247,0.4);
      }
      .avatar-ring {
        position: absolute; inset: -8px; border-radius: 50%;
        border: 2px solid transparent;
        background: linear-gradient(135deg, var(--purple), var(--pink)) border-box;
        -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out; mask-composite: exclude;
        animation: spin 8s linear infinite;
      }
      .avatar-pulse {
        position: absolute; inset: -20px; border-radius: 50%;
        border: 1px solid rgba(168,85,247,0.2);
        animation: pulse-ring 3s ease-out infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes pulse-ring { 0%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(1.5)} }

      .hero-text { max-width: 700px; }
      .hero-tag { font-size: 12px; letter-spacing: 0.2em; color: var(--purple); text-transform: uppercase; margin-bottom: 8px; }
      .hero-name {
        font-family: 'Syne', sans-serif; font-size: clamp(60px,14vw,120px); font-weight: 800;
        line-height: 0.9; letter-spacing: -0.02em;
        background: linear-gradient(135deg, #fff 0%, var(--purple) 50%, var(--pink) 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }
      .hero-genres { font-size: 14px; color: var(--muted); letter-spacing: 0.1em; margin: 12px 0; text-transform: uppercase; }
      .hero-bio { color: var(--text-dim); line-height: 1.7; max-width: 560px; margin: 16px auto; }
      .hero-stats-row { display: flex; align-items: center; justify-content: center; gap: 24px; margin: 24px 0; }
      .hero-stat { text-align: center; }
      .hero-stat-val { display: block; font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 700;
        background: linear-gradient(135deg, var(--purple), var(--pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .hero-stat-lbl { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
      .hero-stat-divider { width: 1px; height: 40px; background: var(--glass-border); }
      .hero-ctas { display: flex; gap: 12px; align-items: center; justify-content: center; flex-wrap: wrap; margin-top: 8px; }
      .hero-cta-primary { font-size: 15px; padding: 14px 28px; }
      .hero-cta-secondary { background: none; border: 1px solid var(--glass-border); color: var(--text-dim);
        padding: 14px 24px; border-radius: 40px; cursor: pointer; font-size: 15px; font-family: 'DM Sans', sans-serif;
        transition: all 0.2s; }
      .hero-cta-secondary:hover { border-color: var(--purple); color: var(--purple); }

      /* ── ANIMATE IN ── */
      .animate-in { animation: fadeUp 0.8s ease both; }
      @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }

      /* ── FEATURED TRACKS ── */
      .featured-tracks { display: flex; flex-direction: column; gap: 6px; }
      .featured-card {
        display: flex; align-items: center; gap: 16px;
        padding: 12px 16px; border-radius: 12px;
        background: var(--glass); border: 1px solid transparent;
        text-decoration: none; color: var(--text);
        transition: all 0.2s; cursor: pointer;
      }
      .featured-card:hover, .featured-card.active {
        background: rgba(168,85,247,0.08);
        border-color: rgba(168,85,247,0.2);
        transform: translateX(4px);
      }
      .featured-card-num { font-family: 'Syne', sans-serif; font-size: 13px; color: var(--muted); width: 24px; text-align: center; }
      .featured-card-info { flex: 1; min-width: 0; }
      .featured-card-name { display: block; font-weight: 500; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .featured-card-album { font-size: 12px; color: var(--muted); }
      .featured-card-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
      .featured-card-dur { font-size: 12px; color: var(--muted); }
      .featured-card-play { width: 32px; height: 32px; border-radius: 50%; background: rgba(168,85,247,0.2);
        display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--purple); }

      /* ── LATEST RELEASE ── */
      .latest-release { display: flex; gap: 40px; align-items: center; flex-wrap: wrap;
        background: var(--glass); border: 1px solid var(--glass-border); border-radius: 20px; padding: 40px; }
      .latest-cover { position: relative; flex-shrink: 0; }
      .latest-cover-glow { position: absolute; inset: -20px; border-radius: 50%; background: radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%); z-index: -1; }
      .latest-type { font-size: 11px; color: var(--muted); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px; }
      .latest-title { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; margin-bottom: 4px; }
      .latest-album { color: var(--muted); margin-bottom: 4px; }
      .latest-date { font-size: 13px; color: var(--muted); }
      .latest-info { flex: 1; min-width: 240px; }

      /* ── POP BAR ── */
      .pop-bar-wrap { display: flex; align-items: center; gap: 8px; }
      .pop-bar-track { flex: 1; height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; min-width: 60px; }
      .pop-bar-wrap.large .pop-bar-track { height: 6px; min-width: 200px; }
      .pop-bar-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, var(--purple), var(--pink)); transition: width 1s ease; }
      .pop-bar-val { font-size: 13px; color: var(--muted); white-space: nowrap; }

      /* ── WAVE BAR ── */
      .wave-bar {
        background: linear-gradient(180deg, var(--pink), var(--purple));
        border-radius: 2px;
        animation: wave 1s ease-in-out infinite alternate;
        animation-delay: var(--delay);
        transform-origin: bottom;
      }
      @keyframes wave { from{scaleY:0.3} to{transform:scaleY(var(--h, 1))} }

      /* ── TRACK CARDS ── */
      .tracks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
      .track-card { position: relative; text-decoration: none; color: var(--text); border-radius: 14px;
        background: var(--glass); border: 1px solid var(--glass-border);
        overflow: hidden; transition: all 0.25s; }
      .track-card:hover { transform: translateY(-6px); border-color: rgba(168,85,247,0.3);
        box-shadow: 0 20px 40px rgba(168,85,247,0.15); }
      .track-card-cover { position: relative; overflow: hidden; }
      .track-card-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6);
        display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; }
      .track-card-overlay.visible { opacity: 1; }
      .track-play-btn { width: 48px; height: 48px; border-radius: 50%; background: var(--green);
        display: flex; align-items: center; justify-content: center; color: #000; font-size: 18px; }
      .track-card-info { padding: 14px; }
      .track-card-name { font-weight: 600; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; }
      .track-card-album { font-size: 12px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 10px; }
      .track-card-meta { display: flex; justify-content: space-between; align-items: center; }
      .track-card-meta > span { font-size: 11px; color: var(--muted); }
      .track-card-rank { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.6);
        color: var(--purple); font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700;
        padding: 2px 8px; border-radius: 20px; }

      /* ── ALBUMS ── */
      .albums-section-label { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 20px; color: var(--muted); }
      .albums-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; }
      .album-card { background: none; border: none; cursor: pointer; text-align: left; color: var(--text); }
      .album-card-cover { position: relative; border-radius: 12px; overflow: hidden; transition: transform 0.2s; }
      .album-card:hover .album-card-cover { transform: scale(1.03); }
      .album-card-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5);
        display: flex; align-items: center; justify-content: center; color: var(--green);
        opacity: 0; transition: opacity 0.2s; }
      .album-card:hover .album-card-overlay { opacity: 1; }
      .album-card-name { font-weight: 600; font-size: 14px; margin-top: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .album-card-meta { font-size: 12px; color: var(--muted); margin-top: 2px; }

      /* ── MODAL ── */
      .modal-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center; padding: 24px; }
      .modal { background: var(--bg3); border: 1px solid var(--glass-border); border-radius: 20px;
        padding: 40px; max-width: 500px; width: 100%; position: relative;
        display: flex; gap: 32px; flex-wrap: wrap; animation: fadeUp 0.3s ease; }
      .modal-close { position: absolute; top: 16px; right: 16px; background: var(--glass); border: none;
        cursor: pointer; color: var(--text); width: 32px; height: 32px; border-radius: 50%; font-size: 14px; }
      .modal-type { font-size: 11px; color: var(--muted); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px; }
      .modal-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 6px; }
      .modal-meta { font-size: 13px; color: var(--muted); }
      .modal-info { flex: 1; min-width: 180px; }

      /* ── STATS ── */
      .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
      .stat-card { position: relative; background: var(--glass); border: 1px solid var(--glass-border);
        border-radius: 16px; padding: 24px; text-align: center; overflow: hidden;
        animation: fadeUp 0.5s ease both; transition: all 0.25s; }
      .stat-card:hover { border-color: var(--accent); transform: translateY(-4px); }
      .stat-card-icon { font-size: 28px; margin-bottom: 12px; }
      .stat-card-val { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; display: block;
        background: linear-gradient(135deg, var(--text), var(--accent, var(--purple)));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .stat-card-lbl { font-size: 12px; color: var(--muted); margin-top: 4px; }
      .stat-card-glow { position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%);
        width: 80px; height: 80px; border-radius: 50%; opacity: 0.15; filter: blur(20px); }

      /* ── GLASS PANEL ── */
      .glass-panel { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 16px; padding: 28px; }
      .panel-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; }

      /* ── POP ROW ── */
      .pop-row { display: flex; align-items: center; gap: 12px; }
      .pop-row-rank { font-family: 'Syne', sans-serif; font-size: 12px; color: var(--muted); width: 28px; }
      .pop-row-name { font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; max-width: 200px; }
      .pop-row-val { font-size: 12px; color: var(--muted); white-space: nowrap; }

      /* ── GENRE PILL ── */
      .genre-pill { background: rgba(168,85,247,0.12); border: 1px solid rgba(168,85,247,0.25);
        color: var(--purple); padding: 4px 12px; border-radius: 20px; font-size: 12px; white-space: nowrap; }

      /* ── ABOUT ── */
      .about-grid { display: grid; grid-template-columns: 280px 1fr; gap: 32px; align-items: start; }
      .about-avatar { width: 100%; border-radius: 16px; display: block; }
      .about-avatar-wrap { overflow: hidden; border-radius: 16px; border: 1px solid var(--glass-border); }
      .about-avatar.avatar-placeholder { min-height: 240px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--p1), var(--p2)); }

      /* ── SOCIAL ── */
      .social-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 10px;
        color: var(--text-dim); text-decoration: none; font-size: 14px; transition: all 0.2s;
        border: 1px solid transparent; }
      .social-link:hover { background: var(--glass); border-color: var(--glass-border); color: var(--text); }
      .social-icon { width: 28px; height: 28px; border-radius: 8px; background: rgba(168,85,247,0.15);
        display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }

      /* ── CONTACT FORM ── */
      .contact-form { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
      .form-input { background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border); border-radius: 10px;
        padding: 12px 16px; color: var(--text); font-size: 14px; font-family: 'DM Sans', sans-serif;
        outline: none; resize: vertical; transition: border-color 0.2s; }
      .form-input:focus { border-color: rgba(168,85,247,0.5); }
      .form-textarea { min-height: 100px; }
      .form-success { background: rgba(29,185,84,0.1); border: 1px solid rgba(29,185,84,0.3);
        color: var(--green); padding: 16px; border-radius: 10px; margin-top: 16px; font-size: 14px; }

      /* ── LOADING ── */
      .loading-screen { position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; text-align: center; }
      .loading-logo { display: flex; align-items: center; gap: 10px;
        font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800;
        background: linear-gradient(135deg, var(--purple), var(--pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

      /* ── API NOTICE ── */
      .api-notice {
        position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 150;
        background: rgba(20,20,42,0.95); border: 1px solid rgba(168,85,247,0.3); border-radius: 12px;
        padding: 12px 20px; font-size: 13px; color: var(--text-dim);
        display: flex; align-items: center; max-width: 90vw; backdrop-filter: blur(12px);
      }
      .api-notice code { background: rgba(168,85,247,0.2); padding: 1px 6px; border-radius: 4px; font-size: 12px; color: var(--purple); }

      /* ── EMPTY ── */
      .empty-state { display: flex; flex-direction: column; align-items: center; gap: 16px;
        padding: 80px; color: var(--muted); font-size: 15px; }

      /* ── FOOTER ── */
      .footer { border-top: 1px solid var(--glass-border); margin-top: 60px; position: relative; z-index: 1; }
      .footer-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px; display: flex;
        flex-direction: column; align-items: center; gap: 16px; }
      .footer-links { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
      .footer-link { background: none; border: none; cursor: pointer; color: var(--muted); font-size: 13px; padding: 4px 10px;
        border-radius: 6px; transition: color 0.2s; font-family: 'DM Sans', sans-serif; }
      .footer-link:hover { color: var(--text); }

      /* ── RESPONSIVE ── */
      @media (max-width: 768px) {
        .nav { padding: 16px 20px; }
        .nav-links, .nav-spotify { display: none; }
        .hamburger { display: flex; }
        .hero-avatar, .avatar-placeholder { width: 120px; height: 120px; }
        .latest-release { padding: 24px; flex-direction: column; gap: 24px; }
        .tracks-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }
        .albums-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
        .stats-grid { grid-template-columns: repeat(2, 1fr); }
        .about-grid { grid-template-columns: 1fr; }
        .section { padding: 40px 16px; }
        .featured-card-right { display: none; }
        .pop-row-name { max-width: 120px; }
        .hero-stats-row { gap: 16px; }
        .modal { flex-direction: column; gap: 20px; padding: 28px; }
      }
      @media (max-width: 480px) {
        .stats-grid { grid-template-columns: 1fr 1fr; }
        .hero-name { font-size: 56px; }
        .hero-cta-secondary { display: none; }
      }
    `}</style>
  );
}
