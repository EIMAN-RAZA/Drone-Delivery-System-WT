import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const UpdateDelivery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const res = await api.get(`/deliveries/${id}`);
        setForm(res.data);
      } catch (err) {
        setError('Delivery not found');
      } finally {
        setLoading(false);
      }
    };
    fetchDelivery();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/deliveries/${id}`, form);
      setSuccess('Updated successfully');
      setTimeout(() => navigate('/deliveries'), 1500);
    } catch (err) {
      setError('Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl mb-4">Update Delivery</h2>
      {success && <div className="bg-green-100 p-2 mb-4">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input name="senderName" value={form.senderName} onChange={handleChange} className="w-full p-2 border mb-3" required />
        <input name="receiverName" value={form.receiverName} onChange={handleChange} className="w-full p-2 border mb-3" required />
        <input name="pickupLocation" value={form.pickupLocation} onChange={handleChange} className="w-full p-2 border mb-3" required />
        <input name="dropoffLocation" value={form.dropoffLocation} onChange={handleChange} className="w-full p-2 border mb-3" required />
        <input name="packageWeight" type="number" value={form.packageWeight} onChange={handleChange} className="w-full p-2 border mb-3" required />
        <input name="droneId" value={form.droneId} onChange={handleChange} className="w-full p-2 border mb-3" required />
        <select name="deliveryStatus" value={form.deliveryStatus} onChange={handleChange} className="w-full p-2 border mb-4">
          <option>pending</option><option>in-progress</option><option>delivered</option><option>cancelled</option>
        </select>
        <button type="submit" className="w-full bg-yellow-600 text-white p-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default UpdateDelivery;