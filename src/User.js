import React, { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const handleRegister = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, newUser]);
      setNewUser({ name: '', email: '' });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>User Management</h1>
      <div className="register-section">
        <h2>Register User</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
      <div className="search-section">
        <h2>Search Users</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="display-section">
        <h2>All Users</h2>
        {filteredUsers.length > 0 ? (
          <ul>
            {filteredUsers.map((user, index) => (
              <li key={index}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        ) : (
          <p>No match found</p>
        )}
      </div>
    </div>
  );
}

export default App;
