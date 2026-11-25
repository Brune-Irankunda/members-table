
import { useSearchParams } from "react-router-dom";

export function useTableParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const pageSize = [10, 20, 50].includes(
    Number(searchParams.get("pageSize"))
  )
    ? Number(searchParams.get("pageSize"))
    : 10;

  const sortBy = searchParams.get("sortBy") || "firstName";

  const order = searchParams.get("order") === "desc" ? "desc" : "asc";

  const q = searchParams.get("q") || "";

  const gender = searchParams.get("gender") || "";

  const params = {
    page,
    pageSize,
    sortBy,
    order,
    q,
    gender,
  };

  function update(changes) {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      Object.entries(changes).forEach(([key, value]) => {
        if (value === "" || value === null || value === undefined) {
          nextParams.delete(key);
        } else {
          nextParams.set(key, String(value));
        }
      });

      if (!Object.prototype.hasOwnProperty.call(changes, "page")) {
        nextParams.delete("page");
      }

      return nextParams;
    });
  }

  return { params, update };
}
