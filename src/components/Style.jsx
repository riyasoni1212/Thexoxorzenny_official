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
        --glass: #0f0f1a;
        --glass-border: rgba(255, 255, 255, 0.03);
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
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* ── SECURITY: Prevent clickjacking ── */
      body { position: relative; }
      
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
        position: fixed;
        top: 24px;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - 48px);
        max-width: 1200px;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 28px;
        background: var(--bg2);
        border-radius: 20px;
        border: 2px solid rgba(255, 255, 255, 0.03);
        box-shadow: 8px 8px 24px rgba(0, 0, 0, 0.5),
                    -8px -8px 24px rgba(255, 255, 255, 0.015);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .nav-scrolled {
        top: 12px;
        background: var(--bg3);
        border-color: rgba(168, 85, 247, 0.25);
        box-shadow: 12px 12px 32px rgba(0, 0, 0, 0.65),
                    -12px -12px 32px rgba(255, 255, 255, 0.02),
                    0 0 24px rgba(168, 85, 247, 0.2);
        padding: 8px 24px;
      }
      .nav-logo {
        display: flex; align-items: center; gap: 8px;
        font-size: 20px; color: var(--text);
        background: none; border: none; cursor: pointer;
        transition: transform 0.3s ease;
      }
      .nav-logo:hover {
        transform: scale(1.02);
      }
      .nav-links {
        position: relative;
        display: flex;
        align-items: center;
        background: var(--bg3);
        border-radius: 12px;
        border: 2px solid rgba(255, 255, 255, 0.02);
        padding: 4px;
        overflow: visible;
        height: 48px;
        width: 448px; /* 5 links * 88px = 440px + 8px padding */
        box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.4),
                    inset -4px -4px 8px rgba(255, 255, 255, 0.005);
      }
      .nav-link {
        background: none; border: none; cursor: pointer;
        color: var(--text-dim); font-size: 14px; font-family: 'DM Sans', sans-serif;
        font-weight: 500;
        width: 88px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.3s ease;
        z-index: 2;
        border-radius: 8px;
      }
      .nav-link:hover { color: var(--text); }
      .nav-link.active { color: #fff; text-shadow: 0 0 8px rgba(168, 85, 247, 0.6); }

      .nav-pill {
        position: absolute;
        top: 4px;
        bottom: 4px;
        left: 4px;
        width: 88px;
        background: var(--bg2);
        border: none;
        border-radius: 8px;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4),
                    -4px -4px 8px rgba(255, 255, 255, 0.01);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 1;
      }

      .nav-outline {
        position: absolute;
        top: 4px;
        bottom: 4px;
        left: 4px;
        width: 88px;
        height: 40px;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 1;
        pointer-events: none;
      }

      .nav-rect {
        stroke-dashoffset: 5;
        stroke-dasharray: 0 0 10 40 10 40;
        transition: stroke-dashoffset 0.5s ease, stroke-dasharray 0.5s ease, stroke 0.5s ease;
        stroke: var(--purple);
        rx: 8px;
        ry: 8px;
      }

      .nav-outline.is-hovering .nav-rect {
        stroke-dashoffset: 20;
        stroke-dasharray: 10 40 10 40;
        stroke: var(--pink);
        filter: drop-shadow(0 0 6px var(--pink));
      }


      .nav-streaming {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      .streaming-btn {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.02);
        color: var(--text-dim);
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .streaming-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 0;
      }
      .streaming-btn svg {
        position: relative;
        z-index: 1;
        transition: fill 0.3s ease, transform 0.3s ease;
      }

      /* Spotify Portal */
      .streaming-btn.spotify-btn {
        border-color: rgba(29, 185, 84, 0.3);
      }
      .streaming-btn.spotify-btn::before {
        background: radial-gradient(circle, rgba(29, 185, 84, 0.15) 0%, transparent 70%);
      }
      .streaming-btn.spotify-btn:hover {
        border-color: var(--green);
        box-shadow: 0 0 14px rgba(29, 185, 84, 0.45);
        transform: scale(1.1) rotate(6deg);
        color: var(--green);
      }

      /* Apple Music Portal */
      .streaming-btn.apple-btn {
        border-color: rgba(250, 36, 60, 0.3);
      }
      .streaming-btn.apple-btn::before {
        background: radial-gradient(circle, rgba(250, 36, 60, 0.15) 0%, transparent 70%);
      }
      .streaming-btn.apple-btn:hover {
        border-color: #FA243C;
        box-shadow: 0 0 14px rgba(250, 36, 60, 0.45);
        transform: scale(1.1) rotate(-6deg);
        color: #FA243C;
      }

      /* YouTube Music Portal */
      .streaming-btn.ytmusic-btn {
        border-color: rgba(255, 0, 0, 0.3);
      }
      .streaming-btn.ytmusic-btn::before {
        background: radial-gradient(circle, rgba(255, 0, 0, 0.15) 0%, transparent 70%);
      }
      .streaming-btn.ytmusic-btn:hover {
        border-color: #FF0000;
        box-shadow: 0 0 14px rgba(255, 0, 0, 0.45);
        transform: scale(1.1) rotate(6deg);
        color: #FF0000;
      }
      
      .streaming-btn:hover::before {
        opacity: 1;
      }

      .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; z-index: 101; }
      .hamburger span { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 2px; transition: all 0.3s; }
      .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
      .hamburger.active span:nth-child(2) { opacity: 0; }
      .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

      .mobile-menu {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99;
        background: #0a0a12;
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;
        opacity: 0; visibility: hidden;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .mobile-menu.active { opacity: 1; visibility: visible; }
      .mobile-link {
        background: none; border: none; cursor: pointer;
        font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 700;
        color: var(--text-dim); padding: 12px 32px; border-radius: 12px;
        transition: all 0.3s;
        letter-spacing: 0.05em;
      }
      .mobile-link:hover, .mobile-link.active {
        color: #fff;
        text-shadow: 0 0 12px rgba(168, 85, 247, 0.8);
        transform: scale(1.05);
      }
      .mobile-streaming {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 36px;
        width: 100%;
        max-width: 280px;
      }
      .streaming-btn-mobile {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 14px 24px;
        border-radius: 14px;
        font-weight: 600;
        font-size: 15px;
        text-decoration: none;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.02);
        color: var(--text-dim);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: pointer;
      }
      
      .streaming-btn-mobile.spotify-btn {
        border-color: rgba(29, 185, 84, 0.3);
      }
      .streaming-btn-mobile.spotify-btn:hover {
        background: rgba(29, 185, 84, 0.1);
        border-color: var(--green);
        color: #fff;
        box-shadow: 0 0 16px rgba(29, 185, 84, 0.35);
        transform: translateY(-2px);
      }
      
      .streaming-btn-mobile.apple-btn {
        border-color: rgba(250, 36, 60, 0.3);
      }
      .streaming-btn-mobile.apple-btn:hover {
        background: rgba(250, 36, 60, 0.1);
        border-color: #FA243C;
        color: #fff;
        box-shadow: 0 0 16px rgba(250, 36, 60, 0.35);
        transform: translateY(-2px);
      }

      .streaming-btn-mobile.ytmusic-btn {
        border-color: rgba(255, 0, 0, 0.3);
      }
      .streaming-btn-mobile.ytmusic-btn:hover {
        background: rgba(255, 0, 0, 0.1);
        border-color: #FF0000;
        color: #fff;
        box-shadow: 0 0 16px rgba(255, 0, 0, 0.35);
        transform: translateY(-2px);
      }

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

      /* ── REALISM BUTTONS ── */
      .realism-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        border-radius: 16px;
        border: none;
        padding: 2px;
        background: radial-gradient(circle 80px at 80% -10%, #ffffff, #181b1b);
        position: relative;
        text-decoration: none;
        color: #fff;
        overflow: visible;
        transition: transform 0.2s, filter 0.2s, box-shadow 0.2s;
        z-index: 2;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      }
      .realism-btn:hover {
        transform: scale(1.04);
        filter: brightness(1.15);
        box-shadow: 0 8px 30px rgba(0,0,0,0.5);
      }
      .realism-btn::after {
        content: "";
        position: absolute;
        width: 65%;
        height: 60%;
        border-radius: 120px;
        top: 0;
        right: 0;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.22);
        z-index: -1;
        pointer-events: none;
      }
      .realism-btn .blob1 {
        position: absolute;
        width: 70px;
        height: 100%;
        border-radius: 16px;
        bottom: 0;
        left: 0;
        background: radial-gradient(
          circle 60px at 0% 100%,
          #3fe9ff,
          #0000ff80,
          transparent
        );
        box-shadow: -10px 10px 30px rgba(0, 81, 255, 0.18);
        pointer-events: none;
      }
      .realism-btn .blob2 {
        position: absolute;
        width: 60px;
        height: 80%;
        border-radius: 16px;
        top: 0;
        right: 0;
        background: radial-gradient(
          circle 50px at 100% 0%,
          rgba(236, 72, 153, 0.5),
          rgba(168, 85, 247, 0.3),
          transparent
        );
        pointer-events: none;
        opacity: 0.7;
      }
      .realism-btn .inner {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px 24px;
        border-radius: 14px;
        color: #fff;
        z-index: 3;
        position: relative;
        background: radial-gradient(circle 80px at 80% -50%, #777777, #0f1111);
        width: 100%;
        height: 100%;
        font-family: 'DM Sans', sans-serif;
        font-weight: 700;
        transition: background 0.3s;
      }
      .realism-btn.large .inner {
        padding: 14px 28px;
        font-size: 16px;
      }
      .realism-btn.small .inner {
        padding: 8px 16px;
        font-size: 12px;
      }
      .realism-btn .inner::before {
        content: "";
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: 14px;
        background: radial-gradient(
          circle 60px at 0% 100%,
          rgba(0, 225, 255, 0.1),
          rgba(0, 0, 255, 0.07),
          transparent
        );
        position: absolute;
        pointer-events: none;
      }
      
      /* Theme overrides for branded streaming buttons */
      .realism-btn.spotify-theme {
        background: radial-gradient(circle 80px at 80% -10%, #ffffff, #111b15);
      }
      .realism-btn.spotify-theme .blob1 {
        background: radial-gradient(
          circle 60px at 0% 100%,
          #1db954,
          rgba(29, 185, 84, 0.5),
          transparent
        );
        box-shadow: -10px 10px 30px rgba(29, 185, 84, 0.25);
      }
      .realism-btn.spotify-theme .inner {
        background: radial-gradient(circle 80px at 80% -50%, #557760, #0a110c);
      }

      .realism-btn.apple-theme {
        background: radial-gradient(circle 80px at 80% -10%, #ffffff, #1c1112);
      }
      .realism-btn.apple-theme .blob1 {
        background: radial-gradient(
          circle 60px at 0% 100%,
          #FA243C,
          rgba(250, 36, 60, 0.5),
          transparent
        );
        box-shadow: -10px 10px 30px rgba(250, 36, 60, 0.25);
      }
      .realism-btn.apple-theme .inner {
        background: radial-gradient(circle 80px at 80% -50%, #7c5558, #110a0a);
      }

      .realism-btn.yt-theme {
        background: radial-gradient(circle 80px at 80% -10%, #ffffff, #1c1111);
      }
      .realism-btn.yt-theme .blob1 {
        background: radial-gradient(
          circle 60px at 0% 100%,
          #FF0000,
          rgba(255, 0, 0, 0.5),
          transparent
        );
        box-shadow: -10px 10px 30px rgba(255, 0, 0, 0.25);
      }
      .realism-btn.yt-theme .inner {
        background: radial-gradient(circle 80px at 80% -50%, #7c5555, #110a0a);
      }

      /* ── GLASS CARD STACK ── */
      .glass-card-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 80px 0;
        min-height: 320px;
        width: 100%;
        overflow: visible;
        margin-top: 20px;
      }

      .glass-card-container .glass-card {
        position: relative;
        width: 180px;
        height: 220px;
        background: var(--bg2);
        border: 2px solid rgba(255, 255, 255, 0.03);
        box-shadow: 12px 12px 24px rgba(0, 0, 0, 0.65),
                    -12px -12px 24px rgba(255, 255, 255, 0.02);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        border-radius: 20px;
        margin: 0 -35px;
        transform: rotate(calc(var(--r) * 1deg));
        text-decoration: none;
        cursor: pointer;
        overflow: hidden;
        z-index: 1;
      }

      .glass-card-container:hover .glass-card {
        transform: rotate(0deg) translateY(-10px);
        margin: 0 16px;
        border-color: rgba(255, 255, 255, 0.08);
        box-shadow: 16px 16px 32px rgba(0, 0, 0, 0.75),
                    -16px -16px 32px rgba(255, 255, 255, 0.02);
      }

      .glass-card-container .glass-card:hover {
        transform: rotate(0deg) translateY(-30px) scale(1.1);
        background: var(--bg3);
        border-color: rgba(255, 255, 255, 0.15);
        z-index: 10;
        box-shadow: 20px 20px 40px rgba(0, 0, 0, 0.85),
                    -20px -20px 40px rgba(255, 255, 255, 0.04);
      }

      .glass-card-container .glass-card::before {
        content: attr(data-text);
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 52px;
        background: var(--bg3);
        border-top: 2px solid rgba(255, 255, 255, 0.02);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-family: 'DM Sans', sans-serif;
        font-weight: 700;
        font-size: 14px;
        letter-spacing: 0.03em;
        transition: background 0.3s, color 0.3s;
      }

      .glass-card-container .glass-card:hover::before {
        background: var(--bg);
      }

      .glass-card-container .glass-card.spotify-card:hover {
        border-color: rgba(29, 185, 84, 0.6);
        box-shadow: 0 0 40px rgba(29, 185, 84, 0.35),
                    20px 20px 40px rgba(0, 0, 0, 0.85),
                    -20px -20px 40px rgba(255, 255, 255, 0.04);
      }
      .glass-card-container .glass-card.apple-card:hover {
        border-color: rgba(250, 36, 60, 0.6);
        box-shadow: 0 0 40px rgba(250, 36, 60, 0.35),
                    20px 20px 40px rgba(0, 0, 0, 0.85),
                    -20px -20px 40px rgba(255, 255, 255, 0.04);
      }
      .glass-card-container .glass-card.yt-card:hover {
        border-color: rgba(255, 0, 0, 0.6);
        box-shadow: 0 0 40px rgba(255, 0, 0, 0.35),
                    20px 20px 40px rgba(0, 0, 0, 0.85),
                    -20px -20px 40px rgba(255, 255, 255, 0.04);
      }

      .glass-card-container .glass-card svg {
        font-size: 3.5em;
        fill: #fff;
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s;
        margin-bottom: 30px;
      }

      .glass-card-container .glass-card:hover svg {
        transform: scale(1.18);
      }

      .glass-card-container .glass-card.spotify-card svg {
        fill: #1db954;
        filter: drop-shadow(0 0 10px rgba(29,185,84,0.4));
      }
      .glass-card-container .glass-card.apple-card svg {
        fill: #FA243C;
        filter: drop-shadow(0 0 10px rgba(250,36,60,0.4));
      }
      .glass-card-container .glass-card.yt-card svg {
        fill: #FF0000;
        filter: drop-shadow(0 0 10px rgba(255,0,0,0.4));
      }

      /* ── MAIN ── */
      .main { position: relative; z-index: 1; padding-top: 80px; }

      /* ── SECTIONS ── */
      .section { max-width: 1100px; margin: 0 auto; padding: 60px 24px; }
      .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; flex-wrap: wrap; gap: 16px; }
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
        font-size: clamp(60px,14vw,120px);
        letter-spacing: 0.02em;
        position: relative;
        display: inline-block;
        z-index: 0;
      }
      .hero-name::after {
        content: "RZEN";
        position: absolute;
        inset: 0;
        color: transparent;
        -webkit-text-stroke: 1px rgba(0, 220, 255, 0.16);
        z-index: -1;
        transform: translate(8px, 8px);
        opacity: 0.65;
      }
      .hero-genres { font-size: 14px; color: var(--muted); letter-spacing: 0.1em; margin: 12px 0; text-transform: uppercase; }
      .hero-bio { color: var(--text-dim); line-height: 1.7; max-width: 560px; margin: 16px auto; }
      .hero-stats-row { display: flex; align-items: center; justify-content: center; gap: 24px; margin: 24px 0; flex-wrap: wrap; }
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
      .featured-tracks { display: flex; flex-direction: column; gap: 10px; padding: 8px 0; }
      .featured-card {
        display: flex; align-items: center; gap: 16px;
        padding: 16px 20px; border-radius: 12px;
        background: var(--bg2);
        border: 2px solid rgba(255, 255, 255, 0.02);
        box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.45),
                    -4px -4px 12px rgba(255, 255, 255, 0.01);
        text-decoration: none; color: var(--text);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); cursor: pointer;
      }
      .featured-card:hover, .featured-card.active {
        background: var(--bg3);
        border-color: rgba(168, 85, 247, 0.25);
        box-shadow: 6px 6px 16px rgba(0, 0, 0, 0.55),
                    -6px -6px 16px rgba(168, 85, 247, 0.05),
                    0 0 12px rgba(168, 85, 247, 0.1);
        transform: translateX(6px);
      }
      .featured-card-num { font-family: 'Syne', sans-serif; font-size: 13px; color: var(--muted); width: 24px; text-align: center; }
      .featured-card-info { flex: 1; min-width: 0; }
      .featured-card-name { display: block; font-weight: 500; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .featured-card-album { font-size: 12px; color: var(--muted); }
      .featured-card-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
      .featured-card-dur { font-size: 12px; color: var(--muted); }
      .featured-card-play { width: 32px; height: 32px; border-radius: 50%; background: rgba(168,85,247,0.2);
        display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--purple); }
      .neon-wrap.featured-neon-wrap {
        border-radius: 14px;
        padding: 2px;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .rzen-wordmark {
        font-family: 'Syne', sans-serif;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        line-height: 0.9;
        color: transparent;
        background:
          linear-gradient(100deg, rgba(255,255,255,0.95) 0%, #d9fbff 24%, var(--purple) 52%, var(--pink) 76%, #fff 100%),
          radial-gradient(circle at 20% 20%, rgba(0, 240, 255, 0.9), transparent 38%);
        background-size: 220% 100%, 100% 100%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 0 18px rgba(168, 85, 247, 0.35),
                     0 0 36px rgba(236, 72, 153, 0.22);
        animation: wordmarkSheen 5s ease-in-out infinite;
      }

      .nav-wordmark {
        font-size: inherit;
        letter-spacing: 0.16em;
      }

      @keyframes wordmarkSheen {
        0%, 100% { background-position: 0% 50%, center; filter: drop-shadow(0 0 0 rgba(0, 220, 255, 0)); }
        50% { background-position: 100% 50%, center; filter: drop-shadow(0 0 12px rgba(0, 220, 255, 0.25)); }
      }
      .neon-wrap.featured-neon-wrap::after {
        border-radius: 12px;
      }
      .featured-neon-wrap .featured-card {
        border-color: rgba(255, 255, 255, 0.03);
      }
      .neon-wrap.featured-neon-wrap:hover,
      .neon-wrap.featured-neon-wrap.active {
        transform: translateX(6px);
      }
      .featured-neon-wrap .featured-card:hover,
      .featured-neon-wrap .featured-card.active {
        transform: none;
      }

      /* ── LATEST RELEASE ── */
      .latest-release {
        display: flex; gap: 40px; align-items: center; flex-wrap: wrap;
        background: var(--bg2);
        border: 2px solid rgba(255, 255, 255, 0.03);
        border-radius: 20px;
        padding: 40px;
        box-shadow: 12px 12px 24px rgba(0, 0, 0, 0.55),
                    -12px -12px 24px rgba(255, 255, 255, 0.015);
      }
      .neon-wrap.latest-release-neon {
        border-radius: 22px;
        padding: 2px;
      }
      .neon-wrap.latest-release-neon::after {
        border-radius: 20px;
      }
      .latest-release-neon .latest-release {
        border-color: rgba(255, 255, 255, 0.04);
      }
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

      /* ── NEON WRAP (for track & album cards) ── */
      .neon-wrap {
        position: relative;
        border-radius: 32px;
        overflow: hidden;
        padding: 2px;
        isolation: isolate;
        box-shadow: 0 0 18px rgba(0, 183, 255, 0.12),
                    0 0 28px rgba(255, 48, 255, 0.10);
      }
      .neon-wrap::before {
        content: '';
        position: absolute;
        inset: -55%;
        background: conic-gradient(
          from 0deg,
          transparent 0deg,
          rgba(0, 220, 255, 0.12) 45deg,
          rgb(0, 220, 255) 90deg,
          rgb(255, 48, 255) 145deg,
          rgba(168, 85, 247, 0.45) 190deg,
          transparent 250deg,
          transparent 360deg
        );
        animation: neonBorderRotate 4.5s linear infinite;
        z-index: 0;
        pointer-events: none;
        filter: blur(1px);
        transform-origin: center;
      }
      .neon-wrap::after {
        content: '';
        position: absolute;
        inset: 2px;
        border-radius: 30px;
        background: var(--bg, #07091a);
        z-index: 0;
        pointer-events: none;
      }
      .neon-wrap > * {
        position: relative;
        z-index: 1;
      }
      .neon-wrap:hover::before {
        animation-duration: 2.4s;
        filter: blur(0);
        background: conic-gradient(
          from 0deg,
          transparent 0deg,
          rgba(0, 220, 255, 0.24) 40deg,
          rgb(0, 240, 255) 85deg,
          rgb(255, 80, 255) 145deg,
          rgb(168, 85, 247) 205deg,
          transparent 270deg,
          transparent 360deg
        );
      }
      @keyframes neonBorderRotate {
        to { transform: rotate(360deg); }
      }

      /* ── TRACK CARDS ── */
      .tracks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 28px; }
      .track-card-wrapper, .album-card-wrapper {
        position: relative;
        perspective: 1000px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
        grid-template-areas: 
          "tr-1 tr-2 tr-3 tr-4 tr-5"
          "tr-6 tr-7 tr-8 tr-9 tr-10"
          "tr-11 tr-12 tr-13 tr-14 tr-15"
          "tr-16 tr-17 tr-18 tr-19 tr-20"
          "tr-21 tr-22 tr-23 tr-24 tr-25";
        width: 100%;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .track-card, .album-card {
        grid-column: 1 / -1;
        grid-row: 1 / -1;
        position: relative;
        text-decoration: none;
        color: var(--text);
        border-radius: 30px;
        border: 2px solid rgba(255, 255, 255, 0.04);
        transform-style: preserve-3d;
        background: linear-gradient(135deg, transparent 18.75%, rgba(168,85,247,0.06) 0 31.25%, transparent 0),
                    repeating-linear-gradient(45deg, rgba(168,85,247,0.03) -6.25% 6.25%, rgba(236,72,153,0.03) 0 18.75%),
                    linear-gradient(135deg, rgba(20,20,36,0.85) 0%, rgba(30,30,55,0.85) 100%);
        background-size: 60px 60px;
        background-position: 0 0, 0 0;
        width: 100%;
        box-shadow: 15px 15px 30px rgba(0, 0, 0, 0.65),
                    -15px -15px 30px rgba(255, 255, 255, 0.02);
        transition: all 0.5s ease-in-out;
        padding-top: 40px;
        cursor: pointer;
        overflow: visible;
        z-index: 0;
        text-align: left;
        display: block;
      }
      .track-card-wrapper:hover .track-card,
      .album-card-wrapper:hover .album-card {
        background-position: -100px 100px, -100px 100px;
        border-color: rgba(168,85,247,0.3);
        box-shadow: 20px 20px 40px rgba(0, 0, 0, 0.75),
                    -20px -20px 40px rgba(168, 85, 247, 0.1);
      }
      .track-card-cover, .album-card-cover {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        width: 150px;
        height: 150px;
        transform: translate3d(0px, 0px, 50px);
        transition: all 0.5s ease-in-out;
        z-index: 2;
        border-radius: 12px;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 15px 20px;
        overflow: hidden;
      }
      .track-card-wrapper:hover .track-card-cover,
      .album-card-wrapper:hover .album-card-cover {
        transform: translate3d(0px, 0px, 70px);
        box-shadow: rgba(168,85,247,0.4) 0px 20px 30px;
      }
      .track-card-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.2s;
      }
      .track-card-overlay.visible {
        opacity: 1;
      }
      .track-play-btn {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--green);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #000;
        font-size: 16px;
      }
      .track-card .content-box, .album-card .content-box {
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.75), rgba(236, 72, 153, 0.75));
        border-radius: 0 0 14px 14px;
        transition: all 0.5s ease-in-out;
        padding: 40px 20px 20px 20px;
        transform-style: preserve-3d;
        margin-top: -20px;
        border-top: 1px solid rgba(255,255,255,0.1);
      }
      .track-card-wrapper:hover .track-card .content-box,
      .album-card-wrapper:hover .album-card .content-box {
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.85), rgba(236, 72, 153, 0.85));
      }
      .track-card .content-box .card-title,
      .album-card .content-box .card-title {
        display: block;
        color: white;
        font-size: 15px;
        font-weight: 700;
        transition: all 0.5s ease-in-out;
        transform: translate3d(0px, 0px, 50px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 4px;
      }
      .track-card-wrapper:hover .track-card .content-box .card-title,
      .album-card-wrapper:hover .album-card .content-box .card-title {
        transform: translate3d(0px, 0px, 60px);
      }
      .track-card .content-box .card-content,
      .album-card .content-box .card-content {
        margin-top: 4px;
        font-size: 12px;
        font-weight: 500;
        color: rgba(255,255,255,0.8);
        transition: all 0.5s ease-in-out;
        transform: translate3d(0px, 0px, 30px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 12px;
      }
      .track-card-wrapper:hover .track-card .content-box .card-content,
      .album-card-wrapper:hover .album-card .content-box .card-content {
        transform: translate3d(0px, 0px, 45px);
      }
      .track-card .content-box .track-card-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        transform: translate3d(0px, 0px, 20px);
        transition: all 0.5s ease-in-out;
        margin-bottom: 12px;
      }
      .track-card .content-box .track-card-meta > span {
        font-size: 11px;
        color: rgba(255,255,255,0.85);
      }
      .track-card-wrapper:hover .track-card .content-box .track-card-meta {
        transform: translate3d(0px, 0px, 35px);
      }
      .track-card .content-box .see-more,
      .album-card .content-box .see-more {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-weight: 700;
        font-size: 11px;
        text-transform: uppercase;
        color: var(--purple);
        background: white;
        padding: 6px 12px;
        border-radius: 20px;
        transition: all 0.5s ease-in-out;
        transform: translate3d(0px, 0px, 20px);
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
      .track-card .content-box .see-more:hover,
      .album-card .content-box .see-more:hover {
        background: #f8f8f8;
      }
      .track-card-wrapper:hover .track-card .content-box .see-more,
      .album-card-wrapper:hover .album-card .content-box .see-more {
        transform: translate3d(0px, 0px, 50px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      }
      .track-card .date-box, .album-card .date-box {
        position: absolute;
        top: 20px;
        right: 20px;
        height: 52px;
        width: 52px;
        background: white;
        border: 1px solid rgba(168,85,247,0.3);
        border-radius: 8px;
        padding: 6px;
        transform: translate3d(0px, 0px, 60px);
        box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 15px -3px;
        transition: all 0.5s ease-in-out;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .track-card .date-box span, .album-card .date-box span {
        display: block;
        text-align: center;
      }
      .track-card .date-box .month, .album-card .date-box .month {
        color: var(--purple);
        font-size: 8px;
        font-weight: 700;
        letter-spacing: 0.05em;
        margin-bottom: 2px;
      }
      .track-card .date-box .date, .album-card .date-box .date {
        font-size: 14px;
        font-weight: 800;
        color: var(--purple);
        line-height: 1.1;
      }
      .track-card-wrapper:hover .track-card .date-box,
      .album-card-wrapper:hover .album-card .date-box {
        transform: translate3d(0px, 0px, 80px);
        box-shadow: rgba(168,85,247,0.4) 0px 15px 25px -5px;
      }

      /* ── ALBUMS ── */
      .albums-section-label { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 20px; color: var(--muted); }
      .albums-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 28px; }
      
      .album-card-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--green);
        opacity: 0;
        transition: opacity 0.2s;
      }
      .album-card-wrapper:hover .album-card-overlay {
        opacity: 1;
      }

      /* ── CSS MOUSE TRACKING SYSTEM ── */
      .tracker {
        position: absolute;
        z-index: 200;
        width: 100%;
        height: 100%;
      }
      .tracker:hover {
        cursor: pointer;
      }
      
      .tr-1 { grid-area: tr-1; }
      .tr-2 { grid-area: tr-2; }
      .tr-3 { grid-area: tr-3; }
      .tr-4 { grid-area: tr-4; }
      .tr-5 { grid-area: tr-5; }
      .tr-6 { grid-area: tr-6; }
      .tr-7 { grid-area: tr-7; }
      .tr-8 { grid-area: tr-8; }
      .tr-9 { grid-area: tr-9; }
      .tr-10 { grid-area: tr-10; }
      .tr-11 { grid-area: tr-11; }
      .tr-12 { grid-area: tr-12; }
      .tr-13 { grid-area: tr-13; }
      .tr-14 { grid-area: tr-14; }
      .tr-15 { grid-area: tr-15; }
      .tr-16 { grid-area: tr-16; }
      .tr-17 { grid-area: tr-17; }
      .tr-18 { grid-area: tr-18; }
      .tr-19 { grid-area: tr-19; }
      .tr-20 { grid-area: tr-20; }
      .tr-21 { grid-area: tr-21; }
      .tr-22 { grid-area: tr-22; }
      .tr-23 { grid-area: tr-23; }
      .tr-24 { grid-area: tr-24; }
      .tr-25 { grid-area: tr-25; }

      .tr-1:hover ~ .track-card, .tr-1:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(20deg) rotateY(-10deg) rotateZ(0deg);
      }
      .tr-2:hover ~ .track-card, .tr-2:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(20deg) rotateY(-5deg) rotateZ(0deg);
      }
      .tr-3:hover ~ .track-card, .tr-3:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg);
      }
      .tr-4:hover ~ .track-card, .tr-4:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(20deg) rotateY(5deg) rotateZ(0deg);
      }
      .tr-5:hover ~ .track-card, .tr-5:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(20deg) rotateY(10deg) rotateZ(0deg);
      }
      .tr-6:hover ~ .track-card, .tr-6:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(10deg) rotateY(-10deg) rotateZ(0deg);
      }
      .tr-7:hover ~ .track-card, .tr-7:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(10deg) rotateY(-5deg) rotateZ(0deg);
      }
      .tr-8:hover ~ .track-card, .tr-8:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(10deg) rotateY(0deg) rotateZ(0deg);
      }
      .tr-9:hover ~ .track-card, .tr-9:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(10deg) rotateY(5deg) rotateZ(0deg);
      }
      .tr-10:hover ~ .track-card, .tr-10:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(10deg) rotateY(10deg) rotateZ(0deg);
      }
      .tr-11:hover ~ .track-card, .tr-11:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(0deg) rotateY(-10deg) rotateZ(0deg);
      }
      .tr-12:hover ~ .track-card, .tr-12:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(0deg) rotateY(-5deg) rotateZ(0deg);
      }
      .tr-13:hover ~ .track-card, .tr-13:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
      }
      .tr-14:hover ~ .track-card, .tr-14:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(0deg) rotateY(5deg) rotateZ(0deg);
      }
      .tr-15:hover ~ .track-card, .tr-15:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(0deg) rotateY(10deg) rotateZ(0deg);
      }
      .tr-16:hover ~ .track-card, .tr-16:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(-10deg) rotateY(-10deg) rotateZ(0deg);
      }
      .tr-17:hover ~ .track-card, .tr-17:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(-10deg) rotateY(-5deg) rotateZ(0deg);
      }
      .tr-18:hover ~ .track-card, .tr-18:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(-10deg) rotateY(0deg) rotateZ(0deg);
      }
      .tr-19:hover ~ .track-card, .tr-19:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(-10deg) rotateY(5deg) rotateZ(0deg);
      }
      .tr-20:hover ~ .track-card, .tr-20:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(-10deg) rotateY(10deg) rotateZ(0deg);
      }
      .tr-21:hover ~ .track-card, .tr-21:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(-20deg) rotateY(-10deg) rotateZ(0deg);
      }
      .tr-22:hover ~ .track-card, .tr-22:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(-20deg) rotateY(-5deg) rotateZ(0deg);
      }
      .tr-23:hover ~ .track-card, .tr-23:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
      }
      .tr-24:hover ~ .track-card, .tr-24:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(-20deg) rotateY(5deg) rotateZ(0deg);
      }
      .tr-25:hover ~ .track-card, .tr-25:hover ~ .album-card {
        transition: 125ms ease-in-out;
        transform: rotateX(-20deg) rotateY(10deg) rotateZ(0deg);
      }

      /* ── MODAL ── */
      .modal-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(5, 5, 8, 0.95);
        display: flex; align-items: center; justify-content: center; padding: 24px; }
      .modal { background: var(--bg3); border: 2px solid rgba(255, 255, 255, 0.03); border-radius: 20px;
        padding: 40px; max-width: 500px; width: 100%; position: relative;
        box-shadow: 16px 16px 36px rgba(0, 0, 0, 0.75),
                    -16px -16px 36px rgba(255, 255, 255, 0.02);
        display: flex; gap: 32px; flex-wrap: wrap; animation: fadeUp 0.3s ease; }
      .modal-close { position: absolute; top: 16px; right: 16px; background: var(--bg2); border: 2px solid rgba(255, 255, 255, 0.02);
        cursor: pointer; color: var(--text); width: 32px; height: 32px; border-radius: 50%; font-size: 14px;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4),
                    -4px -4px 8px rgba(255, 255, 255, 0.005);
        display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
      .modal-close:hover { background: var(--bg); border-color: rgba(255, 255, 255, 0.05); }
      .modal-type { font-size: 11px; color: var(--muted); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px; }
      .modal-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 6px; }
      .modal-meta { font-size: 13px; color: var(--muted); }
      .modal-info { flex: 1; min-width: 180px; }

      /* ── STATS ── */
      .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
      .stat-card { position: relative; background: var(--bg2); border: 2px solid rgba(255, 255, 255, 0.02);
        border-radius: 16px; padding: 24px; text-align: center; overflow: hidden;
        box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.5),
                    -8px -8px 20px rgba(255, 255, 255, 0.01);
        animation: fadeUp 0.5s ease both; transition: all 0.25s; }
      .stat-card:hover {
        background: var(--bg3);
        border-color: rgba(168, 85, 247, 0.25);
        box-shadow: 12px 12px 28px rgba(0, 0, 0, 0.6),
                    -12px -12px 28px rgba(168, 85, 247, 0.05);
        transform: translateY(-4px);
      }
      .stat-card-icon { font-size: 28px; margin-bottom: 12px; }
      .stat-card-val { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; display: block;
        background: linear-gradient(135deg, var(--text), var(--accent, var(--purple)));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .stat-card-lbl { font-size: 12px; color: var(--muted); margin-top: 4px; }
      .stat-card-glow { position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%);
        width: 80px; height: 80px; border-radius: 50%; opacity: 0.15; filter: blur(20px); }

      /* ── GLASS PANEL ── */
      .glass-panel { background: var(--bg2); border: 2px solid rgba(255, 255, 255, 0.02); border-radius: 16px; padding: 28px;
        box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.45),
                    -8px -8px 20px rgba(255, 255, 255, 0.01); }
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
      @media (max-width: 768px) {
        .about-grid { grid-template-columns: 1fr; justify-items: center; }
      }
      .intro-card-wrap {
        perspective: 1000px;
        width: 280px;
        height: 280px;
      }
      .intro-card {
        width: 280px;
        height: 280px;
        background: var(--bg2);
        border-radius: 32px;
        padding: 3px;
        position: relative;
        box-shadow: 12px 12px 28px rgba(0, 0, 0, 0.65),
                    -12px -12px 28px rgba(255, 255, 255, 0.015);
        border: 2px solid rgba(255, 255, 255, 0.02);
        transition: all 0.5s ease-in-out;
        overflow: hidden;
      }

      .intro-card .mail {
        position: absolute;
        right: 2rem;
        top: 1.4rem;
        background: transparent;
        border: none;
        z-index: 10;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .intro-card .mail svg {
        stroke: var(--purple);
        stroke-width: 3px;
        transition: stroke 0.3s ease, filter 0.3s ease;
      }

      .intro-card .mail svg:hover {
        stroke: var(--pink);
        filter: drop-shadow(0 0 8px var(--pink));
      }

      .intro-card .profile-pic {
        position: absolute;
        width: calc(100% - 6px);
        height: calc(100% - 6px);
        top: 3px;
        left: 3px;
        border-radius: 29px;
        z-index: 1;
        border: 0px solid var(--purple);
        overflow: hidden;
        transition: all 0.5s ease-in-out 0.2s, z-index 0.5s ease-in-out 0.2s;
      }

      .intro-card .profile-pic img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        object-position: center;
        transition: all 0.5s ease-in-out 0s;
      }

      .intro-card .profile-pic-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, var(--p1), var(--p2));
      }

      .intro-card .bottom {
        position: absolute;
        bottom: 3px;
        left: 3px;
        right: 3px;
        background: linear-gradient(135deg, var(--bg3), var(--bg2));
        border: 1px solid rgba(255, 255, 255, 0.03);
        top: 80%;
        border-radius: 29px;
        z-index: 2;
        box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.5), 8px 8px 16px rgba(0, 0, 0, 0.4);
        overflow: hidden;
        transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
      }

      .intro-card .bottom .content {
        position: absolute;
        bottom: 50px;
        left: 1.5rem;
        right: 1.5rem;
        height: 160px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      .intro-card .bottom .content .name {
        display: block;
        font-size: 1.3rem;
        font-family: 'Syne', sans-serif;
        color: white;
        font-weight: 800;
        background: linear-gradient(135deg, var(--purple), var(--pink));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
      }

      .intro-card .bottom .content .about-me {
        display: block;
        font-size: 0.82rem;
        color: var(--text-dim);
        margin-top: 0.5rem;
        line-height: 1.4;
      }

      .intro-card .bottom .bottom-bottom {
        position: absolute;
        bottom: 1rem;
        left: 1.5rem;
        right: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .intro-card .bottom .bottom-bottom .social-links-container {
        display: flex;
        gap: 0.8rem;
        align-items: center;
      }

      .intro-card .bottom .bottom-bottom .social-links-container a {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .intro-card .bottom .bottom-bottom .social-links-container svg {
        height: 18px;
        width: 18px;
        fill: var(--text-dim);
        transition: fill 0.3s ease, transform 0.3s ease;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
      }

      .intro-card .bottom .bottom-bottom .social-links-container svg:hover {
        fill: var(--pink);
        transform: scale(1.2);
      }

      .intro-card .bottom .bottom-bottom .button {
        background: linear-gradient(135deg, var(--purple), var(--pink));
        color: white;
        border: none;
        border-radius: 20px;
        font-size: 0.7rem;
        font-family: 'DM Sans', sans-serif;
        font-weight: 700;
        padding: 0.5rem 0.8rem;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 4px 10px 0px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .intro-card .bottom .bottom-bottom .button:hover {
        background: white;
        color: var(--bg);
        transform: translateY(-1px);
        box-shadow: 0 0 10px rgba(168, 85, 247, 0.4);
      }

      .intro-card:hover {
        border-top-left-radius: 55px;
        box-shadow: 16px 16px 36px rgba(0, 0, 0, 0.75),
                    -16px -16px 36px rgba(255, 255, 255, 0.02);
      }

      .intro-card:hover .bottom {
        top: 20%;
        border-radius: 80px 29px 29px 29px;
        transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
        background: linear-gradient(135deg, var(--bg3), var(--bg2));
      }

      .intro-card:hover .profile-pic {
        width: 90px;
        height: 90px;
        aspect-ratio: 1;
        top: 10px;
        left: 10px;
        border-radius: 50%;
        z-index: 3;
        border: 4px solid var(--purple);
        box-shadow: rgba(0,0,0,0.5) 0px 8px 16px 0px;
        transition: all 0.5s ease-in-out, z-index 0.5s ease-in-out 0.1s;
      }

      .intro-card:hover .profile-pic:hover {
        transform: scale(1.1);
      }

      .intro-card:hover .profile-pic img {
        transform: scale(1.1);
        transition: all 0.5s ease-in-out 0.5s;
      }


      /* ── SOCIAL ── */
      .social-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 10px;
        color: var(--text-dim); text-decoration: none; font-size: 14px; transition: all 0.2s;
        border: 1px solid transparent; }
      .social-link:hover { background: var(--bg3); border-color: rgba(255, 255, 255, 0.03); color: var(--text);
        box-shadow: inset 2px 2px 5px rgba(0,0,0,0.3); }
      .social-icon { width: 28px; height: 28px; border-radius: 8px; background: rgba(168,85,247,0.15);
        display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }

      /* ── CONTACT FORM ── */
      .contact-form { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
      .form-input { background: var(--bg3); border: 2px solid rgba(255, 255, 255, 0.02); border-radius: 10px;
        padding: 12px 16px; color: var(--text); font-size: 14px; font-family: 'DM Sans', sans-serif;
        box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.4);
        outline: none; resize: vertical; transition: border-color 0.2s, box-shadow 0.2s; }
      .form-input:focus { border-color: rgba(168, 85, 247, 0.4); box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.4), 0 0 12px rgba(168, 85, 247, 0.15); }
      .form-textarea { min-height: 100px; }
      .form-success { background: rgba(29,185,84,0.1); border: 1px solid rgba(29,185,84,0.3);
        color: var(--green); padding: 16px; border-radius: 10px; margin-top: 16px; font-size: 14px; }

      /* ── LOADING ── */
      .loading-screen {
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 18px;
        text-align: center;
        overflow: hidden;
        background:
          radial-gradient(circle at 50% 44%, rgba(236, 72, 153, 0.18), transparent 24%),
          radial-gradient(circle at 50% 48%, rgba(168, 85, 247, 0.18), transparent 34%),
          radial-gradient(circle at 40% 62%, rgba(0, 220, 255, 0.12), transparent 28%),
          rgba(10, 10, 18, 0.86);
        z-index: 200;
      }
      .loading-screen::before {
        content: "";
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(0deg, transparent 0 7px, rgba(255,255,255,0.025) 8px);
        animation: loadingScan 1.6s linear infinite;
        pointer-events: none;
      }
      .loading-orbit {
        position: absolute;
        width: min(62vw, 420px);
        aspect-ratio: 1;
        display: grid;
        place-items: center;
        opacity: 0.9;
      }
      .loading-ring {
        position: absolute;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,0.08);
        box-shadow: 0 0 28px rgba(168, 85, 247, 0.18);
      }
      .loading-ring-one {
        inset: 0;
        border-top-color: rgba(0, 220, 255, 0.95);
        border-right-color: rgba(236, 72, 153, 0.45);
        animation: loadingOrbit 3.2s linear infinite;
      }
      .loading-ring-two {
        inset: 32px;
        border-left-color: rgba(236, 72, 153, 0.9);
        border-bottom-color: rgba(168, 85, 247, 0.45);
        animation: loadingOrbit 4.8s linear infinite reverse;
      }
      .loading-ring-three {
        inset: 66px;
        border-top-color: rgba(168, 85, 247, 0.8);
        animation: loadingPulse 1.8s ease-in-out infinite;
      }
      .loading-notes {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 1;
      }
      .loading-notes span {
        position: absolute;
        color: rgba(255,255,255,0.75);
        font-family: 'Syne', sans-serif;
        font-size: clamp(18px, 4vw, 34px);
        text-shadow: 0 0 18px rgba(236, 72, 153, 0.65);
        animation: loadingNoteFloat 3.4s ease-in-out infinite;
      }
      .loading-notes span:nth-child(1) {
        top: 24%;
        left: 23%;
        color: #00dcff;
        animation-delay: -0.2s;
      }
      .loading-notes span:nth-child(2) {
        top: 30%;
        right: 22%;
        color: var(--pink);
        animation-delay: -1.1s;
      }
      .loading-notes span:nth-child(3) {
        bottom: 27%;
        left: 28%;
        color: var(--purple);
        animation-delay: -1.8s;
      }
      .loading-notes span:nth-child(4) {
        bottom: 24%;
        right: 27%;
        color: #d9fbff;
        animation-delay: -2.4s;
      }
      .loading-logo {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: loadingRise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      .loading-logo svg {
        color: var(--pink);
        filter: drop-shadow(0 0 14px rgba(236, 72, 153, 0.55));
      }
      .loading-wordmark {
        font-size: clamp(42px, 12vw, 82px);
        letter-spacing: 0.16em;
      }
      .loading-eq {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 6px;
        height: 42px;
        margin-top: 2px;
      }
      .loading-eq span {
        width: 5px;
        height: 14px;
        border-radius: 999px;
        background: linear-gradient(180deg, #00dcff, var(--purple), var(--pink));
        box-shadow: 0 0 14px rgba(0, 220, 255, 0.45);
        animation: loadingEq 0.86s ease-in-out infinite alternate;
      }
      .loading-eq span:nth-child(2) { animation-delay: -0.18s; }
      .loading-eq span:nth-child(3) { animation-delay: -0.36s; }
      .loading-eq span:nth-child(4) { animation-delay: -0.12s; }
      .loading-eq span:nth-child(5) { animation-delay: -0.48s; }
      .loading-eq span:nth-child(6) { animation-delay: -0.26s; }
      .loading-eq span:nth-child(7) { animation-delay: -0.62s; }
      .loading-eq span:nth-child(8) { animation-delay: -0.08s; }
      .loading-bar {
        position: relative;
        z-index: 1;
        width: min(280px, 64vw);
        height: 3px;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(255,255,255,0.08);
      }
      .loading-bar span {
        display: block;
        width: 42%;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, transparent, #00dcff, var(--pink));
        box-shadow: 0 0 16px rgba(0, 220, 255, 0.7);
        animation: loadingBar 1.3s ease-in-out infinite;
      }
      .loading-copy {
        position: relative;
        z-index: 1;
        color: var(--text-dim);
        font-size: 12px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        animation: loadingBlink 1.8s ease-in-out infinite;
      }
      @keyframes loadingOrbit { to { transform: rotate(360deg); } }
      @keyframes loadingPulse {
        0%, 100% { transform: scale(0.96); opacity: 0.42; }
        50% { transform: scale(1.05); opacity: 1; }
      }
      @keyframes loadingNoteFloat {
        0%, 100% { transform: translateY(10px) rotate(-8deg) scale(0.9); opacity: 0.35; }
        50% { transform: translateY(-14px) rotate(10deg) scale(1.08); opacity: 1; }
      }
      @keyframes loadingEq {
        from { height: 10px; opacity: 0.58; }
        to { height: 40px; opacity: 1; }
      }
      @keyframes loadingBar {
        0% { transform: translateX(-105%); }
        100% { transform: translateX(245%); }
      }
      @keyframes loadingRise {
        from { opacity: 0; transform: translateY(18px) scale(0.96); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes loadingBlink {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
      @keyframes loadingScan {
        to { transform: translateY(8px); }
      }

      /* ── API NOTICE ── */
      .api-notice {
        position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 150;
        background: rgba(10, 10, 18, 0.98); border: 2px solid rgba(168, 85, 247, 0.35); border-radius: 12px;
        padding: 12px 20px; font-size: 13px; color: var(--text-dim);
        display: flex; align-items: center; max-width: 90vw;
        box-shadow: 12px 12px 32px rgba(0, 0, 0, 0.8);
      }
      .api-notice code { background: rgba(168,85,247,0.2); padding: 1px 6px; border-radius: 4px; font-size: 12px; color: var(--purple); }

      /* ── EMPTY ── */
      .empty-state { display: flex; flex-direction: column; align-items: center; gap: 16px;
        padding: 80px; color: var(--muted); font-size: 15px; }

      /* ── COUNTDOWN TIMER ── */
      .countdown-container { display: flex; flex-direction: column; align-items: center; gap: 24px; margin: 32px 0; }
      .countdown-timer { display: flex; gap: 16px; }
      .countdown-unit { display: flex; flex-direction: column; align-items: center; }
      .countdown-val { font-family: 'Syne', sans-serif; font-size: clamp(32px, 6vw, 48px); font-weight: 800;
        background: linear-gradient(135deg, var(--purple), var(--pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .countdown-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.15em; margin-top: 4px; }
      .countdown-presave { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }

      /* ── VIDEO EMBED ── */
      .video-container { position: relative; width: 100%; max-width: 800px; margin: 0 auto;
        border-radius: 20px; overflow: hidden; border: 1px solid var(--glass-border); }
      .video-container iframe { width: 100%; aspect-ratio: 16/9; border: none; }
      .video-section { text-align: center; }

      /* ── UPCOMING ── */
      .upcoming-grid { display: flex; flex-direction: column; gap: 24px; }
      .upcoming-card { display: flex; gap: 24px; align-items: center; background: var(--glass);
        border: 1px solid var(--glass-border); border-radius: 16px; padding: 24px; transition: all 0.2s; }
      .upcoming-card:hover { border-color: rgba(168,85,247,0.3); transform: translateY(-2px); }
      .upcoming-cover { width: 120px; height: 120px; border-radius: 12px; overflow: hidden; flex-shrink: 0; }
      .upcoming-cover img { width: 100%; height: 100%; object-fit: cover; }
      .upcoming-info { flex: 1; }
      .upcoming-type { font-size: 11px; color: var(--purple); letter-spacing: 0.15em; text-transform: uppercase; }
      .upcoming-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 700; margin: 8px 0; }
      .upcoming-date { color: var(--muted); font-size: 14px; }

      /* ── NOTES ── */
      .notes-container { max-width: 600px; margin: 0 auto; }
      .notes-form { display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px; }
      .notes-list { display: flex; flex-direction: column; gap: 16px; }
      .note-card { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px; padding: 20px; }
      .note-author { font-weight: 600; color: var(--purple); margin-bottom: 8px; }
      .note-message { color: var(--text-dim); line-height: 1.6; }
      .note-date { font-size: 12px; color: var(--muted); margin-top: 12px; }

      /* ── GALLERY ── */
      .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
      .gallery-item { position: relative; aspect-ratio: 1; border-radius: 12px; overflow: hidden; cursor: pointer;
        border: 1px solid var(--glass-border); transition: all 0.2s; }
      .gallery-item:hover { transform: scale(1.02); border-color: rgba(168,85,247,0.4); }
      .gallery-item img { width: 100%; height: 100%; object-fit: cover; }
      .gallery-preview { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.95);
        display: flex; align-items: center; justify-content: center; padding: 40px; }
      .gallery-preview img { max-width: 100%; max-height: 90vh; border-radius: 12px; object-fit: contain; }
      .gallery-preview-close { position: absolute; top: 20px; right: 20px; background: var(--glass);
        border: none; color: var(--text); width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 18px; }

      /* ── MERCH ── */
      .merch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 24px; }
      .merch-card { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 16px;
        overflow: hidden; transition: all 0.2s; }
      .merch-card:hover { transform: translateY(-6px); border-color: rgba(168,85,247,0.3);
        box-shadow: 0 20px 40px rgba(168,85,247,0.15); }
      .merch-image { width: 100%; aspect-ratio: 1; overflow: hidden; }
      .merch-image img { width: 100%; height: 100%; object-fit: cover; }
      .merch-info { padding: 20px; }
      .merch-name { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 8px; }
      .merch-price { font-size: 20px; color: var(--purple); font-weight: 600; margin-bottom: 16px; }
      .merch-buy-btn { width: 100%; padding: 12px; border-radius: 10px; background: linear-gradient(135deg, var(--purple), var(--pink));
        border: none; color: #fff; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 14px; }
      .merch-buy-btn:hover { filter: brightness(1.1); transform: scale(1.02); }

      /* ── ADMIN DASHBOARD ── */
      .admin-db-status { font-size: 12px; padding: 4px 12px; border-radius: 20px; }
      .admin-db-status.connected { background: rgba(29,185,84,0.15); color: var(--green); }
      .admin-db-status.disconnected { background: rgba(107,107,143,0.15); color: var(--muted); }

      /* ── API CREDENTIALS SECTION ── */
      .api-section { background: var(--bg2); border-radius: 16px; padding: 32px; margin-bottom: 24px; }
      .api-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
      .api-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
      .api-icon.spotify { background: rgba(29,185,84,0.15); }
      .api-info h3 { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 4px; }
      .api-info p { font-size: 13px; color: var(--muted); }
      .api-form { display: flex; flex-direction: column; gap: 16px; }
      .api-saved { background: rgba(29,185,84,0.1); border: 1px solid rgba(29,185,84,0.2);
        color: var(--green); padding: 12px 16px; border-radius: 8px; font-size: 14px; margin-top: 12px; }
      .api-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2);
        color: #ef4444; padding: 12px 16px; border-radius: 8px; font-size: 14px; margin-top: 12px; }

      /* ── PROFESSIONAL ADMIN STYLES ── */
      .admin-dashboard { min-height: 100vh; display: flex; flex-direction: column; background: linear-gradient(135deg, var(--bg), var(--bg2)); }
      .admin-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px;
        background: rgba(15,15,26,0.8); backdrop-filter: blur(20px); border-bottom: 1px solid var(--glass-border); }
      .admin-logo { display: flex; align-items: center; gap: 12px; font-family: 'Syne', sans-serif;
        font-size: 22px; font-weight: 800; background: linear-gradient(135deg, var(--purple), var(--pink));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .admin-logo-icon { font-size: 28px; -webkit-text-fill-color: var(--purple); }
      .admin-logout-btn { background: linear-gradient(135deg, rgba(168,85,247,0.1), rgba(236,72,153,0.1));
        border: 1px solid var(--glass-border); color: var(--text-dim); padding: 10px 20px;
        border-radius: 10px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500;
        transition: all 0.3s ease; }
      .admin-logout-btn:hover { background: linear-gradient(135deg, var(--purple), var(--pink)); color: #fff;
        border-color: transparent; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(168,85,247,0.3); }
      .admin-nav { display: flex; gap: 8px; padding: 20px 40px; background: rgba(15,15,26,0.6);
        border-bottom: 1px solid var(--glass-border); overflow-x: auto; backdrop-filter: blur(20px); }
      .admin-nav::-webkit-scrollbar { display: none; }
      .admin-nav-item { display: flex; align-items: center; gap: 10px; padding: 12px 20px; border-radius: 12px;
        background: transparent; border: none; color: var(--muted); font-family: 'DM Sans', sans-serif;
        font-size: 14px; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all 0.3s ease; }
      .admin-nav-item:hover { background: var(--glass); color: var(--text); transform: translateY(-2px); }
      .admin-nav-item.active { background: linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2));
        color: var(--purple); border: 1px solid rgba(168,85,247,0.3); }
      .admin-nav-icon { font-size: 18px; }
      .admin-content { flex: 1; padding: 40px; background: var(--bg); }
      .admin-section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
      .admin-section-header h2 { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 700; }
      .admin-add-btn { background: var(--purple); color: #fff; border: none; padding: 10px 20px;
        border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.2s; }
      .admin-add-btn:hover { filter: brightness(1.1); }
      .admin-list { display: flex; flex-direction: column; gap: 12px; }
      .admin-card { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px; overflow: hidden; }
      .admin-card-content { display: flex; align-items: center; gap: 16px; padding: 16px 20px; flex-wrap: wrap; }
      .admin-card-info { flex: 1; min-width: 150px; }
      .admin-card-info h3 { font-weight: 600; margin-bottom: 4px; }
      .admin-card-info p { font-size: 13px; color: var(--muted); }
      .admin-card-actions { display: flex; gap: 8px; }
      .admin-edit-btn { background: var(--glass); border: 1px solid var(--glass-border); color: var(--text-dim);
        padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s; }
      .admin-edit-btn:hover { border-color: var(--purple); color: var(--purple); }
      .admin-delete-btn { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3);
        color: #ef4444; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s; }
      .admin-delete-btn:hover { background: rgba(239,68,68,0.2); }
      .admin-form { display: flex; flex-direction: column; gap: 16px; padding: 20px; }
      .admin-form-inline { flex-direction: row; align-items: center; gap: 12px; flex-wrap: wrap; }
      .admin-form-row { display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 200px; }
      .admin-form-row label { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
      .admin-form-actions { display: flex; gap: 12px; align-items: center; margin-top: 8px; flex-wrap: wrap; }
      .admin-save-btn { background: var(--purple); color: #fff; border: none; padding: 10px 20px;
        border-radius: 8px; cursor: pointer; font-weight: 600; }
      .admin-cancel-btn { background: none; border: 1px solid var(--glass-border); color: var(--muted);
        padding: 10px 20px; border-radius: 8px; cursor: pointer; }
      .admin-filter { background: var(--glass); border: 1px solid var(--glass-border); color: var(--text);
        padding: 8px 14px; border-radius: 8px; font-family: 'DM Sans', sans-serif; }
      .admin-gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px; }
      .admin-gallery-item { position: relative; aspect-ratio: 1; border-radius: 12px; overflow: hidden; border: 1px solid var(--glass-border); }
      .admin-gallery-item img { width: 100%; height: 100%; object-fit: cover; }
      .admin-gallery-delete { position: absolute; top: 8px; right: 8px; width: 24px; height: 24px;
        border-radius: 50%; background: rgba(0,0,0,0.7); color: #fff; border: none; cursor: pointer; font-size: 12px; }
      .admin-empty { color: var(--muted); text-align: center; padding: 40px; }
      .admin-saved { color: var(--green); font-size: 14px; }
      .admin-danger-btn { background: #ef4444; color: #fff; border: none; padding: 12px 24px;
        border-radius: 8px; cursor: pointer; font-weight: 600; }
      .merch-thumb { width: 60px; height: 60px; border-radius: 8px; object-fit: cover; }
      .note-card-admin .note-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px; }
      .note-card-admin .note-date { font-size: 12px; color: var(--muted); }
      .admin-db-status { font-size: 12px; padding: 4px 12px; border-radius: 20px; }
      .admin-db-status.connected { background: rgba(29,185,84,0.15); color: var(--green); }
      .admin-db-status.disconnected { background: rgba(107,107,143,0.15); color: var(--muted); }

      /* ── ADMIN LOGIN MODAL ── */
      .admin-login-modal { background: var(--bg3); border: 1px solid var(--glass-border); border-radius: 20px;
        padding: 40px; width: 100%; max-width: 400px; }
      .admin-login-header { display: flex; flex-direction: column; align-items: center; gap: 16px; margin-bottom: 32px; }
      .admin-login-header h2 { font-family: 'Syne', sans-serif; font-size: 24px; }
      .admin-error { color: #ef4444; font-size: 14px; margin-top: 12px; }
      .admin-login-btn { width: 100%; margin-top: 16px; background: var(--purple); color: #fff;
        border: none; padding: 14px; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 16px; }

      /* ── FOOTER ── */
      .footer { border-top: 1px solid var(--glass-border); margin-top: 60px; position: relative; z-index: 1; }
      .footer-inner { max-width: 1100px; margin: 0 auto; padding: 48px 24px; display: flex;
        flex-direction: column; align-items: center; gap: 16px; }
      .footer-links { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
      .footer-link { background: none; border: none; cursor: pointer; color: var(--muted); font-size: 13px; padding: 4px 10px;
        border-radius: 6px; transition: color 0.2s; font-family: 'DM Sans', sans-serif; }
      .footer-link:hover { color: var(--text); }

      /* ═══════════════════════════════════════════════════════════════════════
         RESPONSIVE STYLES - COMPREHENSIVE MOBILE OPTIMIZATION
         ═══════════════════════════════════════════════════════════════════════ */
      
      /* ── Large Desktop ── */
      @media (min-width: 1400px) {
        .section { max-width: 1200px; }
        .hero-content { max-width: 1200px; }
      }

      /* ── Tablet Landscape ── */
      @media (max-width: 1024px) {
        .about-grid { grid-template-columns: 240px 1fr; gap: 24px; }
        .latest-release { padding: 32px; gap: 24px; }
        .tracks-grid { grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); }
        .albums-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
      }

      /* ── Tablet Portrait ── */
      @media (max-width: 768px) {
        .nav { padding: 14px 20px; }
        .nav-links, .nav-streaming { display: none; }
        .hamburger { display: flex; }
        
        .main { padding-top: 70px; }
        .section { padding: 40px 16px; }
        
        /* Hero responsive */
        .hero-avatar, .avatar-placeholder { width: 120px; height: 120px; }
        .hero-name { font-size: clamp(48px, 12vw, 80px); }
        .hero-bio { font-size: 14px; padding: 0 16px; }
        .hero-stats-row { gap: 16px; }
        .hero-stat-divider { display: none; }
        .hero-stats-row { flex-direction: column; gap: 12px; }
        .hero-stat { display: flex; align-items: center; gap: 8px; }
        .hero-stat-val { font-size: 18px; }
        .hero-stat-lbl { font-size: 10px; }
        
        /* Latest release */
        .latest-release { padding: 20px; flex-direction: column; text-align: center; gap: 20px; }
        .latest-cover { width: 200px; height: 200px; }
        .latest-title { font-size: 28px; }
        .latest-info { min-width: 100%; }
        .latest-info .spotify-btn { margin: 12px auto 0; }
        
        /* Featured tracks */
        .featured-card { padding: 10px 12px; gap: 12px; }
        .featured-card-right { display: none; }
        .featured-card-num { font-size: 12px; width: 20px; }
        .featured-card-name { font-size: 14px; }
        
        /* Grid layouts */
        .tracks-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .albums-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .merch-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .gallery-grid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
        
        /* About page */
        .about-grid { grid-template-columns: 1fr; }
        .about-avatar-wrap { max-width: 280px; margin: 0 auto; }
        
        /* Modal */
        .modal { padding: 24px; gap: 16px; flex-direction: column; }
        
        /* Upcoming */
        .upcoming-card { flex-direction: column; text-align: center; padding: 20px; gap: 16px; }
        .upcoming-cover { width: 100px; height: 100px; }
        .upcoming-title { font-size: 20px; }
        .upcoming-info .spotify-btn { margin-top: 12px; }
        
        /* Notes */
        .notes-form { gap: 12px; }
        .note-card { padding: 16px; }
        
        /* Admin */
        .admin-header { padding: 16px 20px; }
        .admin-nav { padding: 12px 16px; }
        .admin-content { padding: 20px 16px; }
        .admin-section-header { flex-direction: column; gap: 12px; align-items: flex-start; }
        .admin-form-row { min-width: 100%; }
        .admin-form-inline { flex-direction: column; }
        .admin-form-inline .form-input { width: 100%; }
        .admin-gallery-grid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
        
        /* Countdown */
        .countdown-timer { gap: 12px; }
        .countdown-val { font-size: 28px; }
        
        /* Video */
        .video-container { border-radius: 12px; }
        
        /* Footer */
        .footer-inner { padding: 32px 16px; }
        .footer-links { gap: 6px; }
        .footer-link { font-size: 12px; padding: 4px 8px; }
      }

      /* ── Large Mobile ── */
      @media (max-width: 600px) {
        .page-title { font-size: 32px; }
        .section-title { font-size: 22px; }
        
        .hero-ctas { flex-direction: column; width: 100%; padding: 0 20px; }
        .hero-cta-primary { width: 100%; max-width: 280px; }
        
        .albums-grid { grid-template-columns: repeat(2, 1fr); }
        
        .track-card-info { padding: 10px; }
        .track-card-name { font-size: 13px; }
        .track-card-rank { font-size: 10px; padding: 2px 6px; }
        
        .stats-grid { grid-template-columns: 1fr 1fr; }
        .stat-card { padding: 16px; }
        .stat-card-val { font-size: 22px; }
        
        .merch-info { padding: 12px; }
        .merch-name { font-size: 14px; }
        .merch-price { font-size: 16px; }
        
        .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
        
        .upcoming-title { font-size: 18px; }
        
        .admin-nav-item { padding: 8px 12px; font-size: 12px; }
        .admin-nav-icon { display: none; }
        
        .countdown-val { font-size: 24px; }
        .countdown-label { font-size: 9px; }
      }

      /* ── Small Mobile ── */
      @media (max-width: 400px) {
        .nav { padding: 12px 16px; }
        .nav-logo { font-size: 16px; }
        
        .page-title { font-size: 28px; }
        
        .hero-avatar, .avatar-placeholder { width: 100px; height: 100px; }
        .hero-name { font-size: 40px; }
        .hero-genres { font-size: 11px; }
        
        .tracks-grid { grid-template-columns: 1fr; }
        .albums-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .album-card-name { font-size: 12px; }
        
        .merch-grid { grid-template-columns: 1fr; }
        
        .gallery-grid { grid-template-columns: repeat(2, 1fr); }
        
        .spotify-btn { padding: 8px 16px; font-size: 13px; }
        
        .section { padding: 32px 12px; }
        
        .form-input { padding: 10px 12px; font-size: 13px; }
        
        .admin-content { padding: 16px 12px; }
        .admin-section-header h2 { font-size: 18px; }
        
        .countdown-timer { gap: 8px; }
        .countdown-val { font-size: 20px; }
        .countdown-label { font-size: 8px; }
      }

      /* ── Touch Device Optimizations ── */
      @media (hover: none) {
        .track-card:hover { transform: none; }
        .merch-card:hover { transform: none; }
        .featured-card:hover { transform: none; }
        
        .track-card:active, .merch-card:active, .featured-card:active {
          transform: scale(0.98);
        }
        
        .spotify-btn:active { transform: scale(0.95); }
      }

      /* ── Reduced Motion ── */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }

      /* ── Security: Prevent text selection on UI elements ── */
      .nav, .hamburger, .nav-link, .spotify-btn, .admin-add-btn, .admin-save-btn, .admin-edit-btn, .admin-delete-btn {
        -webkit-user-select: none;
        user-select: none;
      }

      /* ── Security: Prevent zoom on input focus ── */
      input, textarea, select {
        font-size: 16px;
      }
      @media (max-width: 768px) {
        input, textarea, select {
          font-size: 16px;
        }
      }

      /* ── CHAT BOX ── */
      .chat-toggle {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--purple), var(--pink));
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 32px rgba(168, 85, 247, 0.4);
        z-index: 150;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .chat-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 12px 40px rgba(168, 85, 247, 0.5);
      }
      .chat-toggle-icon {
        font-size: 24px;
      }
      
      .chat-box {
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 380px;
        max-width: calc(100vw - 48px);
        height: 500px;
        max-height: calc(100vh - 180px);
        background: var(--bg3);
        border: 1px solid var(--glass-border);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 150;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      }
      .chat-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2));
        border-bottom: 1px solid var(--glass-border);
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 16px;
      }
      .chat-close {
        background: none;
        border: none;
        color: var(--text-dim);
        cursor: pointer;
        font-size: 18px;
        padding: 4px;
        border-radius: 50%;
        transition: all 0.2s;
      }
      .chat-close:hover {
        background: var(--glass);
        color: var(--text);
      }
      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .chat-empty {
        text-align: center;
        padding: 32px 16px;
        color: var(--text-dim);
      }
      .chat-message {
        display: flex;
        flex-direction: column;
        gap: 4px;
        max-width: 85%;
      }
      .chat-message.user {
        align-self: flex-end;
        align-items: flex-end;
      }
      .chat-message.bot {
        align-self: flex-start;
        align-items: flex-start;
      }
      .chat-bubble {
        padding: 12px 16px;
        border-radius: 18px;
        font-size: 14px;
        line-height: 1.5;
        word-wrap: break-word;
      }
      .chat-message.user .chat-bubble {
        background: linear-gradient(135deg, var(--purple), var(--pink));
        color: #fff;
        border-bottom-right-radius: 4px;
      }
      .chat-message.bot .chat-bubble {
        background: var(--glass);
        border: 1px solid var(--glass-border);
        color: var(--text-dim);
        border-bottom-left-radius: 4px;
      }
      .chat-time {
        font-size: 10px;
        color: var(--muted);
        padding: 0 4px;
      }
      .chat-input-wrap {
        display: flex;
        gap: 8px;
        padding: 16px;
        border-top: 1px solid var(--glass-border);
        background: var(--glass);
      }
      .chat-input {
        flex: 1;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--glass-border);
        border-radius: 24px;
        padding: 12px 16px;
        color: var(--text);
        font-size: 14px;
        font-family: 'DM Sans', sans-serif;
        outline: none;
        transition: border-color 0.2s;
      }
      .chat-input:focus {
        border-color: rgba(168, 85, 247, 0.5);
      }
      .chat-send {
        background: linear-gradient(135deg, var(--purple), var(--pink));
        border: none;
        border-radius: 24px;
        padding: 12px 20px;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s, filter 0.2s;
      }
      .chat-send:hover {
        filter: brightness(1.1);
      }
      .chat-send:active {
        transform: scale(0.95);
      }

      /* ── PIN LOCK SCREEN ── */
      .pin-lock-screen {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background: var(--bg);
      }
      .pin-lock-card {
        background: var(--bg3);
        border: 1px solid var(--glass-border);
        border-radius: 24px;
        padding: 48px 40px;
        text-align: center;
        max-width: 360px;
        width: 100%;
        animation: fadeUp 0.4s ease;
      }
      .pin-lock-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
      .pin-lock-title {
        font-family: 'Syne', sans-serif;
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 8px;
      }
      .pin-lock-subtitle {
        color: var(--muted);
        font-size: 14px;
        margin-bottom: 32px;
      }
      .pin-lock-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .pin-input {
        background: var(--glass);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        padding: 14px 18px;
        color: var(--text);
        font-size: 16px;
        font-family: 'DM Sans', sans-serif;
        text-align: center;
        letter-spacing: 0.2em;
        outline: none;
        transition: border-color 0.2s;
      }
      .pin-input:focus {
        border-color: var(--purple);
      }
      .pin-submit {
        background: linear-gradient(135deg, var(--purple), var(--pink));
        border: none;
        border-radius: 12px;
        padding: 14px;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s, filter 0.2s;
      }
      .pin-submit:hover {
        filter: brightness(1.1);
      }
      .pin-submit:active {
        transform: scale(0.98);
      }
      .pin-error {
        color: #ef4444;
        font-size: 14px;
        animation: shake 0.4s ease;
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-8px); }
        75% { transform: translateX(8px); }
      }

      /* ── DASHBOARD ── */
      .dashboard-page {
        max-width: 900px;
        margin: 0 auto;
        padding: 32px 20px 60px;
      }
      .dashboard-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 32px;
        flex-wrap: wrap;
        gap: 16px;
      }
      .dashboard-title {
        font-family: 'Syne', sans-serif;
        font-size: 32px;
        font-weight: 800;
        background: linear-gradient(135deg, var(--purple), var(--pink));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .dashboard-lock-btn {
        background: var(--glass);
        border: 1px solid var(--glass-border);
        border-radius: 10px;
        padding: 10px 18px;
        color: var(--text-dim);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .dashboard-lock-btn:hover {
        border-color: var(--purple);
        color: var(--purple);
      }
      .dashboard-card {
        background: var(--glass);
        border: 1px solid var(--glass-border);
        border-radius: 20px;
        padding: 28px;
        margin-bottom: 24px;
      }
      .dashboard-section-title {
        font-family: 'Syne', sans-serif;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 24px;
      }
      .dashboard-count {
        font-weight: 400;
        color: var(--muted);
        font-size: 16px;
      }
      .dashboard-form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
      .dashboard-form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .dashboard-form-group label {
        font-size: 12px;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
      .dashboard-input {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--glass-border);
        border-radius: 10px;
        padding: 12px 16px;
        color: var(--text);
        font-size: 14px;
        font-family: 'DM Sans', sans-serif;
        outline: none;
        transition: border-color 0.2s;
      }
      .dashboard-input:focus {
        border-color: rgba(168, 85, 247, 0.5);
      }
      .dashboard-form-actions {
        display: flex;
        gap: 12px;
        align-items: center;
        margin-top: 24px;
        flex-wrap: wrap;
      }
      .dashboard-btn {
        border: none;
        border-radius: 10px;
        padding: 12px 24px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s, filter 0.2s;
      }
      .dashboard-btn-primary {
        background: linear-gradient(135deg, var(--purple), var(--pink));
        color: #fff;
      }
      .dashboard-btn-secondary {
        background: var(--glass);
        border: 1px solid var(--glass-border);
        color: var(--text-dim);
      }
      .dashboard-btn-edit {
        background: var(--purple);
        color: #fff;
        padding: 8px 16px;
        font-size: 13px;
      }
      .dashboard-btn-delete {
        background: rgba(239, 68, 68, 0.15);
        color: #ef4444;
        padding: 8px 16px;
        font-size: 13px;
      }
      .dashboard-btn:active {
        transform: scale(0.95);
      }
      .dashboard-saved {
        color: #4ade80;
        font-size: 14px;
        animation: fadeUp 0.3s ease;
      }
      .releases-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .release-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        padding: 16px 20px;
        flex-wrap: wrap;
        gap: 12px;
      }
      .release-info {
        flex: 1;
        min-width: 150px;
      }
      .release-title {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 4px;
      }
      .release-meta {
        font-size: 13px;
        color: var(--muted);
        margin: 0;
      }
      .release-actions {
        display: flex;
        gap: 8px;
      }
      .releases-empty {
        color: var(--muted);
        text-align: center;
        padding: 20px;
      }
      .dashboard-links-row {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }
      .dashboard-link {
        padding: 12px 24px;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 600;
        font-size: 14px;
        transition: transform 0.2s;
      }
      .dashboard-link.youtube {
        background: #FF0000;
        color: #fff;
      }
      .dashboard-link.apple {
        background: #FA243C;
        color: #fff;
      }
      .dashboard-link:hover {
        transform: translateY(-2px);
      }

      @media (max-width: 768px) {
        .dashboard-page {
          padding: 24px 16px 48px;
        }
        .dashboard-header {
          flex-direction: column;
          align-items: flex-start;
        }
        .dashboard-title {
          font-size: 28px;
        }
        .dashboard-card {
          padding: 20px;
        }
        .dashboard-form-grid {
          grid-template-columns: 1fr;
        }
        .release-item {
          flex-direction: column;
          align-items: flex-start;
        }
        .release-actions {
          width: 100%;
        }
        .dashboard-btn-edit, .dashboard-btn-delete {
          flex: 1;
          text-align: center;
        }
      }

      @media (max-width: 480px) {
        .chat-toggle {
          bottom: 16px;
          right: 16px;
          width: 56px;
          height: 56px;
        }
        .chat-box {
          bottom: 88px;
          right: 16px;
          left: 16px;
          width: auto;
          height: calc(100vh - 120px);
          max-height: 450px;
        }
      }
    `}</style>
  );
}
