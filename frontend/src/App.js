
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateDelivery from './pages/CreateDelivery';
import ViewDeliveries from './pages/ViewDeliveries';
import UpdateDelivery from './pages/UpdateDelivery';
import DroneListing from './pages/DroneListing';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/create-delivery" element={<PrivateRoute><CreateDelivery /></PrivateRoute>} />
          <Route path="/deliveries" element={<PrivateRoute><ViewDeliveries /></PrivateRoute>} />
          <Route path="/update-delivery/:id" element={<PrivateRoute><UpdateDelivery /></PrivateRoute>} />
          <Route path="/drones" element={<PrivateRoute><DroneListing /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;