import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SpisakKorisnika.css';

const SpisakKorisnika = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user. Please try again later.');
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="spisak-korisnika">
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpisakKorisnika;
