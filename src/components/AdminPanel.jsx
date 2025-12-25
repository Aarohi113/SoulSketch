import React, { useState, useEffect } from 'react';
import { Users, CreditCard, LayoutDashboard, LogOut, Search, Clock, Phone, MapPin } from 'lucide-react';
import { db } from '../firebase'; // Firebase import zaroori hai
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]); // Asli data yahan save hoga
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Firebase se Real-time Data Fetch karna
  useEffect(() => {
    if (isLoggedIn) {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersData);
      });
      return () => unsubscribe();
    }
  }, [isLoggedIn]);

  // 2. Login Logic with your specific credentials
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Astro11' && password === 'easyAstro21') {
      setIsLoggedIn(true);
    } else {
      alert('Wrong credentials! ❌');
    }
  };

  // 3. Search Filter
  const filteredOrders = orders.filter(order => 
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.phone?.includes(searchTerm)
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FFF5F5] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-pink-100 w-full max-w-md transform transition-all">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-pink-50 text-[#D689A1] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-pink-100">
              <LayoutDashboard size={30} />
            </div>
            <h2 className="text-2xl font-black text-gray-800">Admin Control</h2>
            <p className="text-sm text-gray-400">Easy Astro Backend Access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Admin ID</label>
              <input 
                type="text" placeholder="Enter Username" 
                className="w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#D689A1] transition-all"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Password</label>
              <input 
                type="password" placeholder="••••••••" 
                className="w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#D689A1] transition-all"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full bg-[#D64D6E] text-white py-4 rounded-2xl font-bold shadow-lg shadow-pink-200 hover:bg-[#b03a55] active:scale-95 transition-all">
              Launch Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFF] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col">
        <div className="p-8 font-black text-[#D64D6E] text-2xl tracking-tighter italic">EASY ASTRO</div>
        <nav className="p-4 flex-1 space-y-2">
          <div className="flex items-center gap-3 p-4 bg-pink-50 text-[#D64D6E] rounded-2xl font-bold">
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div className="flex items-center gap-3 p-4 text-gray-400 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
            <Users size={20} /> All Customers
          </div>
        </nav>
        <div className="p-4 border-t">
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-3 p-4 text-red-400 hover:bg-red-50 rounded-2xl w-full transition-colors font-bold">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-800">Recent Orders</h1>
            <p className="text-gray-400 text-sm">You have {orders.length} total orders</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-3.5 text-gray-300" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              className="w-full pl-12 pr-4 py-3 bg-white border-none shadow-sm rounded-2xl text-sm outline-none focus:ring-2 focus:ring-pink-100" 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* Orders Table */}
        <div className="bg-white rounded-[2rem] shadow-sm border mb-20 border-gray-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer Info</th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Astro Details</th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Status</th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="p-6">
                      <div className="font-bold text-gray-800">{order.customerName}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Phone size={10} /> {order.phone}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
                        <Clock size={12} className="text-pink-300"/> DOB: {order.dob}
                      </div>
                      <div className="text-xs font-medium text-gray-600 flex items-center gap-1 mt-1">
                        <MapPin size={12} className="text-pink-300"/> {order.pob} ({order.gender})
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="font-black text-gray-800">₹{order.totalAmount}</span>
                    </td>
                    <td className="p-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-tighter uppercase ${
                        order.status === 'Paid - Pending Verification' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-orange-100 text-orange-600'
                      }`}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-6">
                      <button 
                        onClick={() => alert(`Full Details for ${order.customerName}:\nEmail: ${order.email}\nGender: ${order.gender}\nAdd-ons: ${JSON.stringify(order.selectedUpsells)}`)}
                        className="bg-gray-100 text-gray-600 text-[10px] font-bold py-2 px-4 rounded-xl hover:bg-[#D64D6E] hover:text-white transition-all"
                      >
                        VIEW FULL
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredOrders.length === 0 && (
            <div className="p-20 text-center text-gray-300 font-medium">
              No orders found... 🏜️
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;