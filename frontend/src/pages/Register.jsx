import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Register = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const { register, verifyOtp, oauthLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMsg('');
        const res = await register(name, email, password);
        if (res.success) {
            if (res.requiresOtp) {
                setMsg(res.message);
                setStep(2);
            } else {
                navigate('/');
            }
        } else {
            setError(res.message);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        const res = await verifyOtp(email, otp);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    const handleOAuth = async (oauthEmail, oauthName, provider) => {
        const res = await oauthLogin(oauthEmail, oauthName, provider);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                handleOAuth(userInfo.data.email, userInfo.data.name || 'Google User', 'google');
            } catch (err) {
                setError('Failed to fetch Google user profile.');
            }
        },
        onError: () => {
            setError('Google Login Failed.');
        }
    });

    const loginWithApple = () => {
        // Apple requires strict developer account verification. Alerting for now.
        alert('Apple Sign-In requires Apple Developer credentials to be configured in the backend. Please use Google or Email for now.');
    };

    return (
        <main className="min-h-screen pt-32 lg:pt-48 flex items-center justify-center px-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 lg:p-12 rounded-[2.5rem] max-w-md w-full border-white/10"
            >
                <h1 className="text-3xl font-black mb-2 text-slate-900 dark:text-white">Join RGDS</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">Create your portal account</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}
                
                {msg && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-xl mb-6 text-sm">
                        {msg}
                    </div>
                )}

                {step === 1 ? (
                    <>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                                <input 
                                    type="text" 
                                    required 
                                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-slate-900 dark:text-white"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
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
                                Continue
                            </button>
                        </form>

                        <div className="mt-6 flex items-center justify-center space-x-4">
                            <div className="h-px bg-slate-200 dark:bg-white/10 w-full"></div>
                            <span className="text-xs font-bold text-slate-400 uppercase">OR</span>
                            <div className="h-px bg-slate-200 dark:bg-white/10 w-full"></div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <button 
                                onClick={() => loginWithGoogle()}
                                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 py-3 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
                            >
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                                <span>Continue with Google</span>
                            </button>
                            <button 
                                onClick={() => loginWithApple()}
                                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 py-3 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
                            >
                                <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-5 h-5 dark:invert" />
                                <span>Continue with Apple</span>
                            </button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Enter 6-digit OTP</label>
                            <input 
                                type="text" 
                                required 
                                maxLength={6}
                                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-slate-900 dark:text-white text-center text-2xl tracking-[0.5em]"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-primary py-4 rounded-xl font-bold text-white hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20"
                        >
                            Verify & Complete Registration
                        </button>
                    </form>
                )}

                <p className="mt-8 text-center text-sm text-slate-500">
                    Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login here</Link>
                </p>
            </motion.div>
        </main>
    );
};

export default Register;
