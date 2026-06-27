import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';


const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ deliveries: 0, drones: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deliveriesRes, dronesRes] = await Promise.all([
          api.get('/deliveries'),
          api.get('/drones')
        ]);
        setStats({
          deliveries: deliveriesRes.data.length,
          drones: dronesRes.data.length
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.email}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-100 p-6 rounded shadow text-center">
          <h2 className="text-xl">Total Deliveries</h2>
          <p className="text-4xl font-bold">{stats.deliveries}</p>
        </div>
        <div className="bg-green-100 p-6 rounded shadow text-center">
          <h2 className="text-xl">Available Drones</h2>
          <p className="text-4xl font-bold">{stats.drones}</p>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;