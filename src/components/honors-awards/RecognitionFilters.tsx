import Card from "@/components/ui/Card";

type RecognitionFiltersProps = {
  years: string[];
  organizations: string[];
  categories: string[];
  activeYear: string;
  activeOrganization: string;
  activeCategory: string;
  activeFocus: string;
  onYearChange: (value: string) => void;
  onOrganizationChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onFocusChange: (value: string) => void;
};

const focusFilters = ["All", "Employer", "Professional Society", "Research", "Leadership", "Innovation"] as const;

export default function RecognitionFilters({
  years,
  organizations,
  categories,
  activeYear,
  activeOrganization,
  activeCategory,
  activeFocus,
  onYearChange,
  onOrganizationChange,
  onCategoryChange,
  onFocusChange,
}: RecognitionFiltersProps) {
  return (
    <Card className="space-y-5 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Filters</p>

      <div className="grid gap-4 md:grid-cols-3">
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

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Organization</span>
          <select
            value={activeOrganization}
            onChange={(event) => onOrganizationChange(event.target.value)}
            className="w-full rounded-2xl border border-border/80 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary/40"
          >
            {["All", ...organizations].map((organization) => (
              <option key={organization} value={organization}>
                {organization}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Category</span>
          <select
            value={activeCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="w-full rounded-2xl border border-border/80 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary/40"
          >
            {["All", ...categories].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Focus</p>
        <div className="flex flex-wrap gap-2">
          {focusFilters.map((filter) => {
            const active = activeFocus === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => onFocusChange(filter)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  active
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-border/80 bg-white/5 text-foreground hover:border-primary/40 hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
