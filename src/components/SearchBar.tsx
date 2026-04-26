import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { CityCrime } from "@/data/crimes";

interface Props {
  cities: CityCrime[];
  onSelect: (c: CityCrime) => void;
}

export function SearchBar({ cities, onSelect }: Props) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return cities
      .filter((c) => c.name.toLowerCase().includes(term) || c.state.toLowerCase().includes(term))
      .slice(0, 6);
  }, [q, cities]);

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[min(560px,92vw)]">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search any city in India…"
          className="w-full h-12 pl-11 pr-4 rounded-full bg-card/90 backdrop-blur border border-border text-foreground placeholder:text-muted-foreground shadow-[var(--shadow-elevated)] outline-none focus:border-primary/60 transition-colors"
        />
        {open && results.length > 0 && (
          <ul className="absolute mt-2 w-full bg-popover border border-border rounded-2xl overflow-hidden shadow-[var(--shadow-elevated)]">
            {results.map((c) => (
              <li key={c.id}>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSelect(c);
                    setQ(c.name);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors flex items-center justify-between"
                >
                  <span className="font-medium">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.state}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
