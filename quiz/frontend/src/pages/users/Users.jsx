// =======================================
// React Hooks
// =======================================
import { useState } from "react";

// =======================================
// Custom Hook
// LocalStorage se data save/load karega
// =======================================
import useLocalStorage from "../../hooks/useLocalStorage";

// =======================================
// Reusable Components
// =======================================
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/common/Input";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

function Users() {

  // =======================================
  // Table Headings
  // =======================================

  const columns = [
    "ID",
    "Name",
    "Email",
    "Role",
    "Action",
  ];

  // =======================================
  // Users Data
  // LocalStorage me automatically save hoga
  // =======================================

  const [users, setUsers] = useLocalStorage("users", [
    {
      id: 1,
      name: "Admin",
      email: "admin@gmail.com",
      role: "Admin",
    },
  ]);

  // =======================================
  // Search State
  // =======================================

  const [search, setSearch] = useState("");

  // =======================================
  // Modal Open/Close
  // =======================================

  const [isOpen, setIsOpen] = useState(false);

  // =======================================
  // Edit User State
  // null = Add
  // object = Edit
  // =======================================

  const [editingUser, setEditingUser] = useState(null);

  // =======================================
  // Form States
  // =======================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // =======================================
  // Open Add User Modal
  // =======================================

  const openAddModal = () => {

    setEditingUser(null);

    setName("");
    setEmail("");
    setRole("");

    setIsOpen(true);

  };


  // Edit User
  // Existing Data Form me Fill
  

  const handleEdit = (user) => {

    setEditingUser(user);

    setName(user.name);
    setEmail(user.email);
    setRole(user.role);

    setIsOpen(true);

  };

  
  // Add / Update User
 

  const handleSave = () => {

    // Validation

    if (!name || !email || !role) {

      alert("Please Fill All Fields");

      return;

    }

      // Edit User
   

    if (editingUser) {

      const updatedUsers = users.map((user) =>

        user.id === editingUser.id

          ? {
              ...user,
              name,
              email,
              role,
            }

          : user

      );

      setUsers(updatedUsers);

    }


    // Add User


    else {

      const newUser = {

        id: Date.now(),

        name,

        email,

        role,

      };

      setUsers([...users, newUser]);

    }

    // Reset Form

    setName("");
    setEmail("");
    setRole("");

    setEditingUser(null);

    setIsOpen(false);

  };

 
  // Delete User
  

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    const updatedUsers = users.filter(
      (user) => user.id !== id
    );

    setUsers(updatedUsers);

  };


  // Search User


  const filteredUsers = users.filter((user) =>
    user.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );
    return (
    <div>

      
        {/*  Page Header} */}
   

      <PageHeader
        title="Users"
        buttonTitle="Add User"
        onClick={openAddModal}
      />

      <br />

      {/* 
          Search User
      */}

      <Input
        type="text"
        name="search"
        placeholder="Search User"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      {/* 
          Users Table
      */}

      <Table columns={columns}>

        {filteredUsers.length > 0 ? (

          filteredUsers.map((user) => (

            <tr key={user.id}>

              <td>{user.id}</td>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>

                <div className="flex gap-2">

                  {/* Edit Button */}

                  <Button
                    title="Edit"
                    onClick={() => handleEdit(user)}
                  />

                  {/* Delete Button */}

                  <Button
                    title="Delete"
                    onClick={() => handleDelete(user.id)}
                  />

                </div>

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td colSpan="5">
              No Users Found
            </td>

          </tr>

        )}

      </Table>

      {/* ==========================
          Add / Edit User Modal
      ========================== */}

      <Modal
        isOpen={isOpen}
        title={editingUser ? "Edit User" : "Add User"}
        onClose={() => setIsOpen(false)}
      >

        {/* Name */}

        <Input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        {/* Email */}

        <Input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        {/* Role */}

        <Input
          type="text"
          placeholder="Enter Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <br />
        <br />

        {/* Save / Update */}

        <Button
          title={editingUser ? "Update User" : "Save User"}
          onClick={handleSave}
        />

      </Modal>

    </div>
  );
}

export default Users;