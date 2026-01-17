import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [dbData, setDbData] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Admin@123') { // Simple check, production me ise secure karein
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      alert("Wrong Password");
    }
  };

  const fetchDashboardData = async () => {

   const response = await axios.get('http://localhost:5000/api/admin/dashboard');
    setDbData(response.data);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handleLogin} className="p-8 bg-white rounded shadow-lg">
          <h2 className="mb-4 text-xl font-bold">Admin Login</h2>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            className="border p-2 mb-4 w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Admin Dashboard (MongoDB Data)</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {dbData.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
