import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('inquiries');

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchInquiries();
        fetchCustomers();
    }, []);

    const fetchInquiries = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'https://rg-digital-studio.onrender.com'}/api/admin/inquiries`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInquiries(res.data);
        } catch (error) {
            console.error('Error fetching inquiries', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'https://rg-digital-studio.onrender.com'}/api/admin/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCustomers(res.data);
        } catch (error) {
            console.error('Error fetching customers', error);
        }
    };

    const deleteInquiry = async (id) => {
        if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_API_URL || 'https://rg-digital-studio.onrender.com'}/api/admin/inquiries/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInquiries(inquiries.filter(i => i._id !== id));
        } catch (error) {
            console.error('Error deleting inquiry', error);
        }
    };

    const updateInquiryStatus = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`${import.meta.env.VITE_API_URL || 'https://rg-digital-studio.onrender.com'}/api/admin/inquiries/${id}/status`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInquiries(inquiries.map(i => i._id === id ? { ...i, status: res.data.status } : i));
        } catch (error) {
            console.error('Error updating status', error);
        }
    };

    return (
        <main className="min-h-screen pt-32 lg:pt-48 pb-20 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white">Agency Command Center</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your inquiries, portfolio, and agency growth</p>
                </div>
                <button 
                    onClick={logout}
                    className="px-6 py-3 rounded-xl bg-red-500/10 text-red-500 font-bold border border-red-500/20 hover:bg-red-500/20 transition-all"
                >
                    Administrative Logout
                </button>
            </div>

            <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
                {['inquiries', 'customers', 'portfolio', 'analytics'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-3 rounded-xl font-bold capitalize transition-all whitespace-nowrap ${
                            activeTab === tab 
                            ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                            : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'inquiries' && (
                    <motion.div 
                        key="inquiries"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {loading ? (
                            <div className="text-center py-20">
                                <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-slate-400">Loading incoming leads...</p>
                            </div>
                        ) : inquiries.length === 0 ? (
                            <div className="glass-card p-20 text-center rounded-[2.5rem]">
                                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">mail</span>
                                <p className="text-slate-500">No inquiries found yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {inquiries.map((inquiry) => (
                                    <div key={inquiry._id} className="glass-card p-8 rounded-3xl border-white/5 group hover:border-primary/30 transition-all relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => deleteInquiry(inquiry._id)}
                                                className="size-10 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                                            <div className="lg:col-span-1">
                                                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                                                    {inquiry.serviceType || 'General'}
                                                </span>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{inquiry.name}</h3>
                                                <p className="text-sm text-slate-500 mt-1">{inquiry.email}</p>
                                            </div>
                                            <div className="lg:col-span-2">
                                                <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3">Project Overview</h4>
                                                <p className="text-slate-600 dark:text-slate-300 line-clamp-3">{inquiry.message}</p>
                                            </div>
                                            <div className="lg:col-span-1 border-l border-slate-200 dark:border-white/5 pl-8">
                                                <div className="space-y-4">
                                                    <div>
                                                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget</span>
                                                        <span className="font-bold text-primary">{inquiry.budget || 'Not specified'}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Timeline</span>
                                                        <span className="font-bold text-slate-600 dark:text-slate-400">{inquiry.timeline || 'Immediate'}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                                                        <select
                                                            value={inquiry.status || 'Pending'}
                                                            onChange={(e) => updateInquiryStatus(inquiry._id, e.target.value)}
                                                            className="mt-1 block w-full text-sm bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg py-1 px-2 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="In Review">In Review</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Completed">Completed</option>
                                                            <option value="Delivered">Delivered</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {activeTab === 'customers' && (
                    <motion.div 
                        key="customers"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {customers.length === 0 ? (
                            <div className="glass-card p-20 text-center rounded-[2.5rem]">
                                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">group</span>
                                <p className="text-slate-500">No customers registered yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {customers.map((customer) => (
                                    <div key={customer._id} className="glass-card p-6 rounded-3xl border-white/5 hover:border-primary/30 transition-all">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl uppercase">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white">{customer.name}</h3>
                                                <p className="text-xs text-slate-500">{customer.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-slate-200 dark:border-white/5 pt-4 mt-4">
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Joined</span>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{new Date(customer.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {activeTab === 'portfolio' && (
                    <motion.div 
                        key="portfolio"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-12 rounded-[2.5rem] text-center"
                    >
                        <span className="material-symbols-outlined text-6xl text-primary mb-4">construction</span>
                        <h2 className="text-2xl font-bold mb-4">Portfolio Manager Coming Soon</h2>
                        <p className="text-slate-500 max-w-md mx-auto">This tool will allow you to upload, edit, and categorize your portfolio projects directly from this dashboard.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
};

export default AdminDashboard;
