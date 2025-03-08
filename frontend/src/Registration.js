import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    general: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    validateField(name);
  };

  const validateField = (fieldName) => {
    let formErrors = { ...errors };
    let isValid = true;

    if (fieldName === 'firstName') {
      if (!formData.firstName) {
        formErrors.firstName = 'First Name is required';
        isValid = false;
      } else {
        formErrors.firstName = '';
      }
    }

    if (fieldName === 'lastName') {
      if (!formData.lastName) {
        formErrors.lastName = 'Last Name is required';
        isValid = false;
      } else {
        formErrors.lastName = '';
      }
    }

    if (fieldName === 'email') {
      if (!formData.email) {
        formErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        formErrors.email = 'Email is invalid';
        isValid = false;
      } else {
        formErrors.email = '';
      }
    }

    if (fieldName === 'password') {
      if (!formData.password) {
        formErrors.password = 'Password is required';
        isValid = false;
      } else if (formData.password.length < 6) {
        formErrors.password = 'Password must be at least 6 characters';
        isValid = false;
      } else {
        formErrors.password = '';
      }
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = Object.keys(formData).every((field) => validateField(field));

    if (!isFormValid) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate('/login'); // Redirect to login page after registration
      } else {
        setErrors({ ...errors, general: data.error || 'Registration failed!' });
      }
    } catch (error) {
      setErrors({ ...errors, general: 'Error: ' + error.message });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Registration</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* First Name */}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}  // Added onBlur event for validation
                  />
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>

                {/* Last Name */}
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}  // Added onBlur event for validation
                  />
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}  // Added onBlur event for validation
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}  // Added onBlur event for validation
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                {/* General Error message */}
                {errors.general && <div className="alert alert-danger">{errors.general}</div>}

                {/* Submit button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                  <br />
                  <button className="btn btn-primary" onClick={()=>navigate('/login')}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
