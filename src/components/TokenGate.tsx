import { useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";

interface Props {
  onSubmit: (token: string) => void;
}

export function TokenGate({ onSubmit }: Props) {
  const [token, setToken] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 shadow-[var(--shadow-elevated)]">
        <div className="h-12 w-12 rounded-2xl bg-primary/15 flex items-center justify-center mb-5">
          <MapPin className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Women Safety Heatmap</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Visualize NCRB crime intensity across India. To load the map, paste your Mapbox public access token.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (token.trim()) {
              localStorage.setItem("mapbox_token", token.trim());
              onSubmit(token.trim());
            }
          }}
          className="mt-6 space-y-3"
        >
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="pk.eyJ1Ijo…"
            className="w-full h-11 px-4 rounded-xl bg-input border border-border outline-none focus:border-primary/60 text-sm font-mono"
          />
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Load map
          </button>
        </form>
        <a
          href="https://account.mapbox.com/access-tokens/"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Get a free Mapbox token <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
