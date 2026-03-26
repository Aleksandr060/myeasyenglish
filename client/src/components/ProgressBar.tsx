type ProgressBarProps = {
  value: number;
  label?: string;
  colorClass?: string;
};

export function ProgressBar({
  value,
  label,
  colorClass = "from-brand to-success"
}: ProgressBarProps) {
  return (
    <div className="space-y-2">
      {label ? (
        <div className="text-sm font-bold" data-text="muted">
          {label}
        </div>
      ) : null}
      <div className="h-3 overflow-hidden rounded-full" data-surface="muted">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-500`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}
