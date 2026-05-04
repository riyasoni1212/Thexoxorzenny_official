import { createContext, useContext, useState, useEffect } from "react";
import { UPCOMING_RELEASES } from "../config";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load upcoming releases from config
    setReleases(UPCOMING_RELEASES);
    setLoading(false);
  }, []);

  return (
    <DataContext.Provider value={{ releases, loading }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    // Return mock data if context not available (prevents crashes)
    return { releases: [], loading: false };
  }
  return context;
}