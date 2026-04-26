export function Legend() {
  return (
    <div className="absolute bottom-6 right-6 z-10 bg-card/90 backdrop-blur border border-border rounded-2xl p-3 shadow-[var(--shadow-elevated)]">
      <div className="text-xs text-muted-foreground mb-2 px-1">Crime intensity</div>
      <div className="h-2 w-44 rounded-full" style={{ background: "linear-gradient(90deg, #fde047, #fb923c, #ef4444)" }} />
      <div className="flex justify-between text-[10px] mt-1.5 px-0.5 text-muted-foreground">
        <span>Low</span><span>Medium</span><span>High</span>
      </div>
    </div>
  );
}
