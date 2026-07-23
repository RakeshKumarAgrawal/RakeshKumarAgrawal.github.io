type RecognitionSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function RecognitionSearch({ value, onChange }: RecognitionSearchProps) {
  return (
    <label className="block space-y-2" aria-label="Search recognitions">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Search</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by award, organization, category, or year"
        className="w-full rounded-2xl border border-border/80 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary/40"
      />
    </label>
  );
}
