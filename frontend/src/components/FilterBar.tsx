import { FilterType } from "../types/task";

interface Props {
  current: FilterType;
  onChange: (f: FilterType) => void;
}

const FILTERS: FilterType[] = ["all", "active", "completed"];

export function FilterBar({ current, onChange }: Props) {
  return (
    <div className="filter-bar">
      {FILTERS.map((f) => (
        <button key={f} className={current === f ? "active" : ""} onClick={() => onChange(f)}>
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
