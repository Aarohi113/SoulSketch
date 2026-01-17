import React, { useState } from 'react';
import { db } from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [dbData, setDbData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Admin@123') { 
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      alert("Wrong Password");
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Screenshot ke hisaab se collection ka naam 'orders' hai
      const querySnapshot = await getDocs(collection(db, "orders"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDbData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Data fetch nahi ho paya.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="p-8 bg-white rounded shadow-lg w-96">
          <h2 className="mb-4 text-xl font-bold text-center text-pink-600">Admin Login</h2>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            className="border p-2 mb-4 w-full rounded focus:ring-2 focus:ring-pink-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded w-full font-bold transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Management Dashboard</h1>
        <button 
          onClick={fetchDashboardData} 
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow-md transition"
        >
          {loading ? "Syncing..." : "Refresh Orders"}
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-4 border-b text-left">Customer</th>
              <th className="py-3 px-4 border-b text-left">Email / Phone</th>
              <th className="py-3 px-4 border-b text-left">Location (POB)</th>
              <th className="py-3 px-4 border-b text-left">Services</th>
              <th className="py-3 px-4 border-b text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {dbData.length > 0 ? (
              dbData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 px-4">
                    <div className="font-bold">{item.customerName || 'N/A'}</div>
                    <div className="text-xs text-gray-400">{item.id}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div>{item.email}</div>
                    <div className="text-sm text-gray-500">{item.phone}</div>
                  </td>
                  <td className="py-4 px-4">{item.pob || 'N/A'}</td>
                  <td className="py-4 px-4">
                    {item.selectedUpsells?.ebook ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">E-BOOK</span>
                    ) : (
                      <span className="text-gray-400 text-xs">Standard</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm">
                    {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-400">
                  {loading ? "Fetching orders from Firestore..." : "No orders found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
