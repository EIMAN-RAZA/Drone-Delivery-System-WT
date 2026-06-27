import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const ViewDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchDeliveries = async () => {
    try {
      const res = await api.get('/deliveries');
      setDeliveries(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Failed to load deliveries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Cancel this delivery?')) {
      try {
        await api.delete(`/deliveries/${id}`);
        setMessage('Delivery cancelled');
        fetchDeliveries();
      } catch (err) {
        setMessage('Error cancelling delivery');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">My Deliveries</h2>
      {message && <div className="mb-4 p-2 bg-yellow-100">{message}</div>}
      {deliveries.length === 0 ? (
        <p>No deliveries found. <Link to="/create-delivery" className="text-blue-600">Create one</Link></p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr><th className="py-2 px-4 border">Sender</th><th className="py-2 px-4 border">Receiver</th>
              <th className="py-2 px-4 border">Pickup</th><th className="py-2 px-4 border">Dropoff</th>
              <th className="py-2 px-4 border">Weight</th><th className="py-2 px-4 border">Drone</th>
              <th className="py-2 px-4 border">Status</th><th className="py-2 px-4 border">Actions</th></tr>
            </thead>
            <tbody>
              {deliveries.map(d => (
                <tr key={d._id}>
                  <td className="border px-4 py-2">{d.senderName}</td>
                  <td className="border px-4 py-2">{d.receiverName}</td>
                  <td className="border px-4 py-2">{d.pickupLocation}</td>
                  <td className="border px-4 py-2">{d.dropoffLocation}</td>
                  <td className="border px-4 py-2">{d.packageWeight} kg</td>
                  <td className="border px-4 py-2">{d.droneId}</td>
                  <td className="border px-4 py-2">{d.deliveryStatus}</td>
                  <td className="border px-4 py-2">
                    <Link to={`/update-delivery/${d._id}`} className="text-blue-600 mr-2">Edit</Link>
                    <button onClick={() => handleDelete(d._id)} className="text-red-600">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewDeliveries;