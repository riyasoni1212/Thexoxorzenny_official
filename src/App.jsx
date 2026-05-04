import { useState } from "react";
import { useSpotify } from "./hooks/useSpotify";
import Style from "./components/Style";
import { AnimatedBg, LoadingScreen, ApiNotice } from "./components/Common";
import { DataProvider } from "./context/DataContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MusicPage from "./pages/MusicPage";
import AlbumsPage from "./pages/AlbumsPage";
import UpcomingPage from "./pages/UpcomingPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  const [page, setPage] = useState("home");
  const { artist, topTracks, albums, loading } = useSpotify();

  if (loading) return (
    <>
      <Style />
      <AnimatedBg />
      <LoadingScreen />
    </>
  );

  return (
    <DataProvider>
      <Style />
      <AnimatedBg />
      <Nav page={page} setPage={setPage} />
      <main className="main">
        {page === "home"   && <HomePage  artist={artist} topTracks={topTracks} setPage={setPage} />}
        {page === "music"  && <MusicPage topTracks={topTracks} />}
        {page === "albums" && <AlbumsPage albums={albums} />}
        {page === "upcoming" && <UpcomingPage />}
        {page === "about"  && <AboutPage artist={artist} />}
      </main>
      <Footer setPage={setPage} />
    </DataProvider>
  );
}