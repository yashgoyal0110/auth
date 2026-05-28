import { useState } from 'react'
import './App.css'
import axios from "axios"

const API = "http://localhost:3000"

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [users, setUsers] = useState([]);

  // which user row is being edited + the values being typed
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "" });

  async function handleLogin() {
    try {
      await axios.post(`${API}/login`, {
        "email": email, "password": password,
      }, { withCredentials: true })
      window.alert("login successfull")
      setLoggedIn(true)
      getAllUsers()
    }
    catch (err) {
      console.log("login failed", err.message)
      window.alert("login failed")
    }
  }

  async function handleLogout() {
    try {
      await axios.post(`${API}/logout`, {}, { withCredentials: true })
      setLoggedIn(false)
      setUsers([])
    }
    catch (err) {
      console.log("logout failed", err.message)
    }
  }

  // GET /users
  async function getAllUsers() {
    try {
      const res = await axios.get(`${API}/users`, { withCredentials: true })
      setUsers(res.data.users)
    }
    catch (err) {
      console.log("fetch users failed", err.message)
    }
  }

  // DELETE /user/:id
  async function handleDelete(id) {
    try {
      await axios.delete(`${API}/user/${id}`, { withCredentials: true })
      getAllUsers()
    }
    catch (err) {
      console.log("delete failed", err.message)
      window.alert("delete failed")
    }
  }

  function startEdit(user) {
    setEditId(user._id)
    setEditForm({ name: user.name, email: user.email, role: user.role })
  }

  // PUT /user/:id
  async function handleUpdate(id) {
    try {
      await axios.put(`${API}/user/${id}`, editForm, { withCredentials: true })
      setEditId(null)
      getAllUsers()
    }
    catch (err) {
      console.log("update failed", err.message)
      window.alert("update failed")
    }
  }

  // ---- login screen ----
  if (!loggedIn) {
    return (
      <div className="box">
        <h2>Login</h2>
        <input type="text" placeholder="email" value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="password" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>login</button>
      </div>
    )
  }

  // ---- users screen ----
  return (
    <div className="box">
      <div className="header">
        <h2>All Users</h2>
        <button onClick={handleLogout}>logout</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              {editId === user._id ? (
                <>
                  <td>
                    <input value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                  </td>
                  <td>
                    <input value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                  </td>
                  <td>
                    <input value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })} />
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(user._id)}>save</button>
                    <button onClick={() => setEditId(null)}>cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button title="edit" onClick={() => startEdit(user)}>✏️</button>
                    <button title="delete" onClick={() => handleDelete(user._id)}>🗑️</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
