
import { api } from "./client";

const FIELDS =
  "firstName,lastName,email,phone,age,gender,company,address";

export async function fetchUsers({
  page = 1,
  pageSize = 10,
  sortBy = "firstName",
  order = "asc",
  q = "",
  gender = "",
}) {
  const skip = (page - 1) * pageSize;

  const params = new URLSearchParams({
    limit: pageSize,
    skip,
    select: FIELDS,
  });

  let endpoint = "/users";

  if (q.trim()) {
    endpoint = "/users/search";
    params.set("q", q.trim());
  } else if (gender) {
    endpoint = "/users/filter";
    params.set("key", "gender");
    params.set("value", gender);
  }

  if (!q.trim() && !gender) {
    params.set("sortBy", sortBy);
    params.set("order", order);
  }

  return api(`${endpoint}?${params.toString()}`);
}
