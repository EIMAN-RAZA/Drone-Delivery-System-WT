import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Register = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await register(form.email, form.password);
    if (!result.success) {
      setError(result.msg);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Register</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" className="w-full p-2 border mb-3" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password (min 6 chars)" className="w-full p-2 border mb-3" value={form.password} onChange={handleChange} required minLength="6" />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-blue-300">
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
      <p className="mt-3 text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
    </div>
  );
};


export default Register;