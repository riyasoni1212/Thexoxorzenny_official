import { Cover, SpotifyIcon, AppleMusicIcon, YouTubeMusicIcon, Countdown, RealismButton } from "../components/Common";
import { useData } from "../context/DataContext";

export default function UpcomingPage() {
  const { releases, loading } = useData();

  if (loading) {
    return (
      <div className="page">
        <section className="section page-hero">
          <h1 className="page-title">Upcoming</h1>
          <p className="page-subtitle">Future releases and what's next</p>
        </section>
        <section className="section">
          <p>Loading...</p>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="section page-hero">
        <h1 className="page-title">Upcoming</h1>
        <p className="page-subtitle">Future releases and what's next</p>
      </section>

      <section className="section">
        <div className="upcoming-grid">
          {releases.map((release) => (
            <div key={release.id} className="upcoming-card">
              <div className="upcoming-cover">
                <Cover url={release.cover} name={release.title} size={120} radius={12} />
              </div>
              <div className="upcoming-info">
                <p className="upcoming-type">{release.type}</p>
                <h3 className="upcoming-title">{release.title}</h3>
                <p className="upcoming-date">{new Date(release.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                <div className="countdown-container" style={{ margin: "16px 0 0", justifyContent: "flex-start" }}>
                  <Countdown targetDate={release.date} />
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                  <RealismButton href={release.spotifyUrl} target="_blank" rel="noreferrer" theme="spotify">
                    <SpotifyIcon size={16} /> Spotify
                  </RealismButton>
                  <RealismButton href={release.appleUrl} target="_blank" rel="noreferrer" theme="apple">
                    <AppleMusicIcon size={16} /> Apple Music
                  </RealismButton>
                  <RealismButton href={release.ytmusicUrl} target="_blank" rel="noreferrer" theme="yt">
                    <YouTubeMusicIcon size={16} /> YouTube Music
                  </RealismButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}