import { useState, useEffect, useRef, useCallback } from "react";
import { ARTIST_ID, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "../config";
import { MOCK_ARTIST, MOCK_TRACKS, MOCK_ALBUMS } from "../data/mockData";

// ─── SPOTIFY API HOOK ─────────────────────────────────────────────────────────
export function useSpotify() {
  const [token, setToken] = useState(null);
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tokenExpiry = useRef(null);

  const fetchToken = useCallback(async () => {
    if (token && tokenExpiry.current && Date.now() < tokenExpiry.current) return token;
    try {
      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
        },
        body: "grant_type=client_credentials",
      });
      const data = await res.json();
      if (data.access_token) {
        setToken(data.access_token);
        tokenExpiry.current = Date.now() + data.expires_in * 1000 - 60000;
        return data.access_token;
      }
    } catch (e) {
      setError("token");
    }
    return null;
  }, [token]);

  const spotifyFetch = useCallback(async (endpoint) => {
    const t = await fetchToken();
    if (!t) return null;
    const res = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: { Authorization: `Bearer ${t}` },
    });
    if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
    return res.json();
  }, [fetchToken]);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      try {
        const [artistData, tracksData, albumsData] = await Promise.all([
          spotifyFetch(`/artists/${ARTIST_ID}`),
          spotifyFetch(`/artists/${ARTIST_ID}/top-tracks?market=US`),
          spotifyFetch(`/artists/${ARTIST_ID}/albums?include_groups=album,single&market=US&limit=50`),
        ]);
        if (artistData) setArtist(artistData);
        if (tracksData?.tracks) setTopTracks(tracksData.tracks);
        if (albumsData?.items) setAlbums(albumsData.items);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    if (SPOTIFY_CLIENT_ID !== "YOUR_CLIENT_ID") loadAll();
    else {
      setArtist(MOCK_ARTIST);
      setTopTracks(MOCK_TRACKS);
      setAlbums(MOCK_ALBUMS);
      setLoading(false);
    }
  }, [spotifyFetch]);

  return { artist, topTracks, albums, loading, error };
}
