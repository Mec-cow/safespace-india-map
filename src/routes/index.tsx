import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CrimeMap } from "@/components/CrimeMap";
import { SearchBar } from "@/components/SearchBar";
import { FilterFab } from "@/components/FilterFab";
import { Legend } from "@/components/Legend";
import { TokenGate } from "@/components/TokenGate";
import { fetchCities } from "@/lib/api";
import type { CityCrime, CrimeCategory } from "@/data/crimes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Women Safety Heatmap — India" },
      { name: "description", content: "Interactive NCRB-based crime heatmap for women's safety across Indian cities." },
      { property: "og:title", content: "Women Safety Heatmap — India" },
      { property: "og:description", content: "Visualize crime intensity across India by category." },
    ],
  }),
  component: Index,
});

function Index() {
  const [token, setToken] = useState<string | null>(null);
  const [cities, setCities] = useState<CityCrime[]>([]);
  const [category, setCategory] = useState<CrimeCategory>("women");
  const [focus, setFocus] = useState<{ lat: number; lng: number; zoom?: number } | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("mapbox_token"));
    fetchCities().then(setCities);
  }, []);

  if (!token) return <TokenGate onSubmit={setToken} />;

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-background">
      <CrimeMap token={token} cities={cities} category={category} focus={focus} />
      <SearchBar
        cities={cities}
        onSelect={(c) => setFocus({ lat: c.lat, lng: c.lng, zoom: 10 })}
      />
      <FilterFab value={category} onChange={setCategory} />
      <Legend />

      {/* Top-right brand */}
      <div className="absolute top-4 right-4 z-10 bg-card/80 backdrop-blur border border-border rounded-full px-4 py-2 text-xs text-muted-foreground shadow-[var(--shadow-elevated)]">
        <span className="text-foreground font-medium">SafeMap</span> · NCRB India
      </div>
    </main>
  );
}
