import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';
import Dashboard from './Dashboard';
import UpdateUser from './UpdateUser';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/update-user/:id" element={<UpdateUser />} /> {/* New route */}
    </Routes>
  );
};

export default App;
