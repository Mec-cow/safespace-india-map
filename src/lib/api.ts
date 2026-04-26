// API client. Currently returns mock data.
// To wire your Express backend later, set VITE_API_BASE_URL and switch
// the implementations to `fetch(`${BASE}/api/...`)`.

import { CITIES, type CityCrime, type CrimeCategory } from "@/data/crimes";

const BASE = import.meta.env.VITE_API_BASE_URL as string | undefined;

export async function fetchCities(): Promise<CityCrime[]> {
  if (BASE) {
    const r = await fetch(`${BASE}/api/cities`);
    return r.json();
  }
  return CITIES;
}

export async function fetchHeatmap(category: CrimeCategory): Promise<CityCrime[]> {
  if (BASE) {
    const r = await fetch(`${BASE}/api/heatmap?type=${category}`);
    return r.json();
  }
  return CITIES;
}

export function getCount(c: CityCrime, category: CrimeCategory): number {
  return c[category];
}

export function getRatePerLakh(c: CityCrime, category: CrimeCategory): number {
  return getCount(c, category) / Math.max(c.population, 1);
}
