import { useState } from "react";
import { Filter, Users, Baby, Activity, Check } from "lucide-react";
import type { CrimeCategory } from "@/data/crimes";

const OPTIONS: { value: CrimeCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "women", label: "Women-related", icon: Users },
  { value: "child", label: "Child-related", icon: Baby },
  { value: "overall", label: "Overall crimes", icon: Activity },
];

interface Props {
  value: CrimeCategory;
  onChange: (v: CrimeCategory) => void;
}

export function FilterFab({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-6 left-6 z-10">
      {open && (
        <div className="mb-3 bg-popover border border-border rounded-2xl p-2 shadow-[var(--shadow-elevated)] min-w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-200">
          {OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = opt.value === value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  active ? "bg-secondary text-foreground" : "hover:bg-secondary/60 text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1 text-left text-sm">{opt.label}</span>
                {active && <Check className="h-4 w-4 text-primary" />}
              </button>
            );
          })}
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        title="Filter"
        className="group relative h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-elevated)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
      >
        <Filter className="h-5 w-5" />
        <span className="absolute inset-0 rounded-full opacity-60 blur-xl bg-primary -z-10" />
      </button>
    </div>
  );
}
