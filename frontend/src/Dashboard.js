import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './App.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();

        if (response.ok) {
          setUsers(data.users); // Store users in state
        } else {
          setError('Failed to fetch users');
        }
      } catch (error) {
        setError('Error: ' + error.message);
      }
    };

    fetchUsers(); // Call function to fetch users
  }, []); // Empty dependency array makes sure it runs once when component mounts

  // Function to navigate to the Edit page (UpdateUser)
  const handleEdit = (id) => {
    navigate(`/update-user/${id}`); // Redirect to UpdateUser page with user ID
  };

  // Function to handle logout
  const handleLogout = () => {
    // Optionally, clear user session or token here
    navigate('/register'); // Redirect to login page on logout
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Dashboard</h2>

      {/* Logout Button */}
      <button
        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-3"
        onClick={handleLogout}
      >
        Logout
      </button>

      {error && <div className="alert alert-danger">{error}</div>} {/* Show error if any */}

      {users.length === 0 ? (
        <p>No users found.</p> // If no users are available
      ) : (
        <div className="list-group">
          {/* Display list of users */}
          {users.map((user, index) => (
            <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                {user.firstName} {user.lastName} - {user.email}
              </div>
              {/* Edit button */}
              <button 
                className="btn btn-warning btn-sm"
                onClick={() => handleEdit(user._id)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
