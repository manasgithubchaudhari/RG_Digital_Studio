import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import axios from 'axios';

const CustomerDashboard = () => {
    const { user, logout } = useAuth();
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyInquiries();
    }, []);

    const fetchMyInquiries = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'https://rg-digital-studio.onrender.com'}/api/customer/my-inquiries`);
            setInquiries(res.data);
        } catch (error) {
            console.error('Error fetching my inquiries', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 lg:pt-48 pb-20 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white">Hello, {user?.name}</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">Track your project inquiries and agency communication</p>
                </div>
                <button 
                    onClick={logout}
                    className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-bold border border-slate-200 dark:border-white/10 hover:bg-slate-200 transition-all"
                >
                    Secure Logout
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <span className="w-8 h-1 bg-primary"></span>
                        Project History
                    </h2>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-400">Loading your inquiries...</p>
                        </div>
                    ) : inquiries.length === 0 ? (
                        <div className="glass-card p-16 text-center rounded-[2rem]">
                            <p className="text-slate-500 mb-6">You haven't submitted any inquiries yet.</p>
                            <a href="/contact" className="bg-primary text-white px-8 py-3 rounded-full font-bold inline-block">Start Your First Project</a>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {inquiries.map((inquiry) => (
                                <div key={inquiry._id} className="glass-card p-8 rounded-3xl group border-white/5">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest">
                                            {inquiry.serviceType}
                                        </span>
                                        <span className="text-xs text-slate-500">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{inquiry.subject}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">{inquiry.message}</p>
                                    <div className="mt-8 flex items-center gap-6 border-t border-slate-200 dark:border-white/5 pt-6">
                                        <div className="flex items-center gap-2">
                                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                                            <span className="text-xs font-bold text-green-500">In Review</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget</span>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{inquiry.budget}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1">
                    <div className="glass-card p-8 rounded-[2rem] border-primary/20 bg-primary/5 sticky top-48">
                        <h3 className="text-xl font-bold mb-6">Need Assistance?</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Our team is currently reviewing your project details. You will receive a response at <strong>{user?.email}</strong> within 24-48 business hours.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                <span>support@rgds.com</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm font-medium">
                                <span className="material-symbols-outlined text-primary">call</span>
                                <span>+91 98XXX XXXXX</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CustomerDashboard;
