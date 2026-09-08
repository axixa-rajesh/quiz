import React from "react";

function Users() {
  const users = [
    { id: 1, name: "Arjun Sharma", email: "arjun@example.com", role: "Student" },
    { id: 2, name: "Priya Raj", email: "priya@example.com", role: "Instructor" },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Users Management</h1>
      </div>
      <div className="card">
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td><strong>{u.name}</strong></td>
                <td>{u.email}</td>
                <td><span className="role-badge">{u.role}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;