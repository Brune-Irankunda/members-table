
import { useUsers } from "./queries";
import SortableHeader from "./SortableHeader";

function UsersTable({ params, update }) {
  const { data, isLoading, isError, error, isFetching, refetch } =
    useUsers(params);

  const users = data?.users || [];

  function handleSort(sortKey) {
    const nextOrder =
      params.sortBy === sortKey && params.order === "asc"
        ? "desc"
        : "asc";

    update({
      sortBy: sortKey,
      order: nextOrder,
    });
  }

  if (isLoading) {
    return <p className="p-6">Loading members...</p>;
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-red-600">
          {error.message}
        </p>

        <button
          onClick={() => refetch()}
          className="mt-3 rounded bg-blue-600 px-4 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <p className="p-6 text-slate-500">
        No members found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      {isFetching && (
        <p className="px-6 py-2 text-sm text-blue-600">
          Updating...
        </p>
      )}

      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <SortableHeader
              label="First Name"
              sortKey="firstName"
              currentSort={params.sortBy}
              order={params.order}
              onSort={handleSort}
            />

            <SortableHeader
              label="Last Name"
              sortKey="lastName"
              currentSort={params.sortBy}
              order={params.order}
              onSort={handleSort}
            />

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
              Email
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
              Phone
            </th>

            <SortableHeader
              label="Age"
              sortKey="age"
              currentSort={params.sortBy}
              order={params.order}
              onSort={handleSort}
            />

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
              Gender
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
              Company
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-900">
                {user.firstName}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {user.lastName}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {user.email}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {user.phone}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {user.age}
              </td>

              <td className="px-6 py-4 capitalize text-slate-600">
                {user.gender}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {user.company?.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
