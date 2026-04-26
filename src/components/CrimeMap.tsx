import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { CityCrime, CrimeCategory } from "@/data/crimes";
import { getRatePerLakh } from "@/lib/api";

interface Props {
  cities: CityCrime[];
  category: CrimeCategory;
  focus?: { lat: number; lng: number; zoom?: number } | null;
}

const DARK_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

export function CrimeMap({ cities, category, focus }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    try {
      const c = document.createElement("canvas");
      if (!(c.getContext("webgl2") || c.getContext("webgl"))) {
        setWebglError(true);
        return;
      }
    } catch {
      setWebglError(true);
      return;
    }
    try {
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: DARK_STYLE,
      center: [78.9629, 22.5937],
      zoom: 4,
      attributionControl: false,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }));
    mapRef.current = map;

    map.on("load", () => {
      map.addSource("crimes", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      map.addLayer({
        id: "crimes-heat",
        type: "heatmap",
        source: "crimes",
        maxzoom: 12,
        paint: {
          "heatmap-weight": ["interpolate", ["linear"], ["get", "intensity"], 0, 0, 1, 1],
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 3, 1, 12, 4],
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0, "rgba(0,0,0,0)",
            0.2, "rgba(255, 220, 80, 0.6)",
            0.5, "rgba(255, 140, 40, 0.75)",
            0.8, "rgba(240, 60, 40, 0.9)",
            1, "rgba(220, 20, 30, 1)",
          ],
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 3, 30, 7, 60, 12, 120],
          "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0.85, 12, 0.55],
        },
      });

      map.addLayer({
        id: "crimes-points",
        type: "circle",
        source: "crimes",
        minzoom: 6,
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["get", "intensity"], 0, 4, 1, 16],
          "circle-color": [
            "interpolate", ["linear"], ["get", "intensity"],
            0, "#fde047",
            0.5, "#fb923c",
            1, "#ef4444",
          ],
          "circle-stroke-color": "#0b0f14",
          "circle-stroke-width": 1.5,
          "circle-opacity": 0.9,
        },
      });

      map.on("click", "crimes-points", (e) => {
        const f = e.features?.[0];
        if (!f) return;
        const props = f.properties as { name: string; state: string; count: number };
        new maplibregl.Popup({ offset: 14, className: "crime-popup" })
          .setLngLat((f.geometry as GeoJSON.Point).coordinates as [number, number])
          .setHTML(
            `<div style="font-family:inherit"><div style="font-weight:600">${props.name}</div><div style="opacity:.7;font-size:12px">${props.state}</div><div style="margin-top:6px;font-size:13px">Reported: <b>${Number(props.count).toLocaleString()}</b></div></div>`
          )
          .addTo(map);
      });
    });

      return () => {
        map.remove();
        mapRef.current = null;
      };
    } catch {
      setWebglError(true);
    }
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const updateData = () => {
      const src = map.getSource("crimes") as maplibregl.GeoJSONSource | undefined;
      if (!src) return;
      const rates = cities.map((c) => getRatePerLakh(c, category));
      const max = Math.max(...rates, 1);
      src.setData({
        type: "FeatureCollection",
        features: cities.map((c) => ({
          type: "Feature",
          geometry: { type: "Point", coordinates: [c.lng, c.lat] },
          properties: {
            name: c.name,
            state: c.state,
            count: c[category],
            intensity: getRatePerLakh(c, category) / max,
          },
        })),
      });
    };
    if (map.isStyleLoaded() && map.getSource("crimes")) updateData();
    else map.once("load", updateData);
  }, [cities, category]);

  useEffect(() => {
    if (!mapRef.current || !focus) return;
    mapRef.current.flyTo({ center: [focus.lng, focus.lat], zoom: focus.zoom ?? 10, essential: true });
  }, [focus]);

  if (webglError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-6 bg-background">
        <div className="max-w-md text-center bg-card border border-border rounded-2xl p-6 shadow-[var(--shadow-elevated)]">
          <h2 className="text-lg font-semibold">WebGL is not available</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The map needs WebGL to render. Enable hardware acceleration in your browser
            settings (e.g. Chrome → Settings → System → "Use graphics acceleration"), or
            try a different browser/device.
          </p>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="absolute inset-0" />;
}
