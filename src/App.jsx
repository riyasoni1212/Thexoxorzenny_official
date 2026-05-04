import { useState } from "react";
import { SPOTIFY_CLIENT_ID } from "./config";
import { useSpotify } from "./hooks/useSpotify";
import Style from "./components/Style";
import { AnimatedBg, LoadingScreen, ApiNotice } from "./components/Common";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MusicPage from "./pages/MusicPage";
import AlbumsPage from "./pages/AlbumsPage";
import StatsPage from "./pages/StatsPage";
import AboutPage from "./pages/AboutPage";

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const { artist, topTracks, albums, loading } = useSpotify();
  const isDemoMode = SPOTIFY_CLIENT_ID === "YOUR_CLIENT_ID";

  if (loading) return (
    <>
      <Style />
      <AnimatedBg />
      <LoadingScreen />
    </>
  );

  return (
    <>
      <Style />
      <AnimatedBg />
      {isDemoMode && <ApiNotice />}
      <Nav page={page} setPage={setPage} />
      <main className="main">
        {page === "home"   && <HomePage  artist={artist} topTracks={topTracks} setPage={setPage} />}
        {page === "music"  && <MusicPage topTracks={topTracks} />}
        {page === "albums" && <AlbumsPage albums={albums} />}
        {page === "stats"  && <StatsPage artist={artist} topTracks={topTracks} albums={albums} />}
        {page === "about"  && <AboutPage artist={artist} />}
      </main>
      <Footer setPage={setPage} />
    </>
  );
}
