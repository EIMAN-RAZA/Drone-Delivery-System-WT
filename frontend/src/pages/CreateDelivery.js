import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateDelivery = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    senderName: '', receiverName: '', pickupLocation: '', dropoffLocation: '',
    packageWeight: '', droneId: '', deliveryStatus: 'pending'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.senderName || !form.receiverName || !form.pickupLocation || !form.dropoffLocation) return 'All location fields are required';
    if (form.packageWeight <= 0) return 'Package weight must be > 0';
    if (!form.droneId) return 'Drone ID required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = validate();
    if (errMsg) return setError(errMsg);
    setLoading(true);
    setError('');
    try {
      await api.post('/deliveries', form);
      setSuccess('Delivery created successfully!');
      setTimeout(() => navigate('/deliveries'), 1500);
    } catch (err) {
      setError(err.response?.data?.msg || 'Creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl mb-4">Create New Delivery</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input name="senderName" placeholder="Sender Name" className="w-full p-2 border mb-3" value={form.senderName} onChange={handleChange} required />
        <input name="receiverName" placeholder="Receiver Name" className="w-full p-2 border mb-3" value={form.receiverName} onChange={handleChange} required />
        <input name="pickupLocation" placeholder="Pickup Location" className="w-full p-2 border mb-3" value={form.pickupLocation} onChange={handleChange} required />
        <input name="dropoffLocation" placeholder="Dropoff Location" className="w-full p-2 border mb-3" value={form.dropoffLocation} onChange={handleChange} required />
        <input name="packageWeight" type="number" step="0.1" placeholder="Weight (kg)" className="w-full p-2 border mb-3" value={form.packageWeight} onChange={handleChange} required />
        <input name="droneId" placeholder="Drone ID (e.g., DR-101)" className="w-full p-2 border mb-3" value={form.droneId} onChange={handleChange} required />
        <select name="deliveryStatus" className="w-full p-2 border mb-4" value={form.deliveryStatus} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white p-2 rounded disabled:bg-green-300">
          {loading ? 'Creating...' : 'Create Delivery'}
        </button>
      </form>
    </div>
  );
};

export default CreateDelivery;