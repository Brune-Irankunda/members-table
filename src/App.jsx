
import "./App.css";

import UsersTable from "./features/users/UsersTable";
import { useTableParams } from "./hooks/useTableParams";

function App() {
  const { params, update } = useTableParams();

  return (
    <div className="app">
      <header className="dashboard-header">
        <div>
          <h1>Abanyamuryango</h1>
          <p>Kigali Cooperative Members Directory</p>
        </div>

        <div className="header-info">
          <span className="status-dot"></span>
          <span>Members Management</span>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="welcome-section">
          <div>
            <h2>Members Directory</h2>
            <p>
              Manage, search, and organize cooperative members.
            </p>
          </div>

          <div className="member-count">
            <span>Total Members</span>
            <strong>208</strong>
          </div>
        </section>

        <section className="table-section">
          <h3>All Members</h3>

          <UsersTable
            params={params}
            update={update}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
