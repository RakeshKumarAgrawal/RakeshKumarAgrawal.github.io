import Card from "@/components/ui/Card";

type CertificationFiltersProps = {
  groups: string[];
  activeGroup: string;
  onGroupChange: (group: string) => void;
  providers: string[];
  activeProvider: string;
  onProviderChange: (provider: string) => void;
  years: string[];
  activeYear: string;
  onYearChange: (year: string) => void;
};

export default function CertificationFilters({
  groups,
  activeGroup,
  onGroupChange,
  providers,
  activeProvider,
  onProviderChange,
  years,
  activeYear,
  onYearChange,
}: CertificationFiltersProps) {
  return (
    <Card className="space-y-5 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Filters</p>

      <div className="flex flex-wrap gap-2">
        {groups.map((group) => {
          const active = group === activeGroup;
          return (
            <button
              key={group}
              type="button"
              onClick={() => onGroupChange(group)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                active
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-border/80 bg-white/5 text-foreground hover:border-primary/40 hover:bg-white/10"
              }`}
            >
              {group}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Provider</span>
          <select
            value={activeProvider}
            onChange={(event) => onProviderChange(event.target.value)}
            className="w-full rounded-2xl border border-border/80 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary/40"
          >
            {["All", ...providers].map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Year</span>
          <select
            value={activeYear}
            onChange={(event) => onYearChange(event.target.value)}
            className="w-full rounded-2xl border border-border/80 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary/40"
          >
            {["All", ...years].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>
    </Card>
  );
}
