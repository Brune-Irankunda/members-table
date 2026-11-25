
function SortableHeader({ label, sortKey, currentSort, order, onSort }) {
  const isActive = currentSort === sortKey;

  const ariaSort = isActive
    ? order === "asc"
      ? "ascending"
      : "descending"
    : "none";

  return (
    <th
      scope="col"
      aria-sort={ariaSort}
      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="flex items-center gap-2 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      >
        {label}

        <span aria-hidden="true">
          {isActive ? (order === "asc" ? "↑" : "↓") : "↕"}
        </span>
      </button>
    </th>
  );
}

export default SortableHeader;
