import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(form.email, form.password);
    if (!result.success) {
      setError(result.msg);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" className="w-full p-2 border mb-3" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="w-full p-2 border mb-3" value={form.password} onChange={handleChange} required />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-blue-300">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-3 text-center">No account? <Link to="/register" className="text-blue-600">Register</Link></p>
    </div>
  );
};


export default Login;