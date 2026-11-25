
function TablePagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize);

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      Math.abs(i - page) <= 1
    ) {
      pages.push(i);
    } else if (
      pages[pages.length - 1] !== "..."
    ) {
      pages.push("...");
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 px-6 py-4">
      <p className="text-sm text-slate-500">
        Showing{" "}
        {total === 0 ? 0 : (page - 1) * pageSize + 1}
        {"–"}
        {Math.min(page * pageSize, total)}
        {" "}of {total} members
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {pages.map((item, index) =>
          item === "..." ? (
            <span key={`dots-${index}`} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-current={page === item ? "page" : undefined}
              className={`rounded-lg border px-3 py-2 text-sm ${
                page === item
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 hover:bg-slate-100"
              }`}
            >
              {item}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TablePagination;
