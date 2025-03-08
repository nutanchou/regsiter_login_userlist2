import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Fetch user details when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${id}`);
        
        if (!response.ok) {
          throw new Error('User not found');
        }
        
        const data = await response.json();
        setUser(data.user); // Set user data to the form
      } catch (error) {
        setError('Error: ' + error.message);
      }
    };

    fetchUser(); // Fetch user details when the component mounts
  }, [id]);

  // Handle form submission for updating user information
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate the fields before submitting
    const isValid = validateForm();
    if (!isValid) {
      return; // Prevent the form submission if validation fails
    }

    try {
      // Send PUT request to update the user
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user), // Send updated user data
      });

      if (response.ok) {
        alert('User updated successfully');
        navigate('/dashboard'); // Redirect to dashboard after successful update
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update user');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };

  // Handle input changes to update the user state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value }); // Update the corresponding field in state
  };

  // Validate the form fields
  const validateForm = () => {
    const formErrors = { firstName: '', lastName: '', email: '' };
    let isValid = true;

    if (!user.firstName) {
      formErrors.firstName = 'First Name is required';
      isValid = false;
    }

    if (!user.lastName) {
      formErrors.lastName = 'Last Name is required';
      isValid = false;
    }

    if (!user.email) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      formErrors.email = 'Email is invalid';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle blur to validate fields individually
  const handleBlur = (e) => {
    const { name } = e.target;
    validateForm();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update User Information</h2>

      {error && <div className="alert alert-danger">{error}</div>} {/* Show error message if any */}

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            onBlur={handleBlur} // Validate on blur
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            onBlur={handleBlur} // Validate on blur
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            onBlur={handleBlur} // Validate on blur
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
