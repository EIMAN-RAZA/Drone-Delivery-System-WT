import React, { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const DroneListing = () => {
  const [drones, setDrones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const res = await api.get('/drones');
        setDrones(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDrones();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Available Drones</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drones.map(drone => (
          <div key={drone._id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-bold">{drone.droneId}</h3>
            <p>Model: {drone.model}</p>
            <p>Battery: {drone.batteryLevel}%</p>
            <p>Status: <span className={`font-semibold ${drone.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>{drone.status}</span></p>
            <p>Max Weight: {drone.maxWeight} kg</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DroneListing;