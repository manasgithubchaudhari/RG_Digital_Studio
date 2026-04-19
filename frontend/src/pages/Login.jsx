import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    return (
        <main className="min-h-screen pt-32 lg:pt-48 flex items-center justify-center px-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 lg:p-12 rounded-[2.5rem] max-w-md w-full border-white/10"
            >
                <h1 className="text-3xl font-black mb-2 text-slate-900 dark:text-white">Welcome Back</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">Access your RGDS portal account</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                        <input 
                            type="email" 
                            required 
                            className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-slate-900 dark:text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Password</label>
                        <input 
                            type="password" 
                            required 
                            className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-slate-900 dark:text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-primary py-4 rounded-xl font-bold text-white hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20"
                    >
                        Login to Portal
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-slate-500">
                    Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register here</Link>
                </p>
            </motion.div>
        </main>
    );
};

export default Login;
