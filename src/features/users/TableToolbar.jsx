
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

function TableToolbar({ params, update }) {
  const [search, setSearch] = useState(params.q);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    if (debouncedSearch !== params.q) {
      update({
        q: debouncedSearch,
        gender: "",
      });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    setSearch(params.q);
  }, [params.q]);

  function handleGenderChange(event) {
    update({
      gender: event.target.value,
      q: "",
    });
  }

  function handlePageSizeChange(event) {
    update({
      pageSize: Number(event.target.value),
    });
  }

  function clearSearch() {
    setSearch("");
    update({ q: "", gender: "" });
  }

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">

      <div className="flex flex-wrap items-center gap-3">

        <div className="relative">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search members..."
            aria-label="Search members"
            className="w-64 rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-3 top-2 text-slate-500 hover:text-red-600"
            >
              ✕
            </button>
          )}
        </div>

        <select
          value={params.gender}
          onChange={handleGenderChange}
          aria-label="Filter by gender"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All Genders</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>

        <select
          value={params.pageSize}
          onChange={handlePageSizeChange}
          aria-label="Members per page"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>

      </div>

      <p className="text-xs text-slate-500">
        Search and gender filters cannot be combined.
      </p>

    </div>
  );
}

export default TableToolbar;
