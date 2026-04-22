import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', credentials);
            const { token, user } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'PATIENT') {
                navigate('/patient/dashboard');
            } else if (user.role === 'DOCTOR') {
                navigate('/doctor/dashboard');
            } else if (user.role === 'ADMIN') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 font-sans relative overflow-hidden">
            {/* Background Decor */}
            <div className="fixed top-[-50%] left-[-10%] w-[70%] h-[70%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none -z-10"></div>
            <div className="fixed bottom-[-50%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none -z-10"></div>

            <div className="w-full max-w-md animate-in fade-in zoom-in duration-700 relative z-10">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-emerald-500/5">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-emerald-100 to-emerald-400">
                            Welcome Back
                        </h1>
                        <p className="text-slate-400 mt-2">Log in to manage your appointments</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white placeholder-slate-500 transition-all"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white placeholder-slate-500 transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.6)] hover:-translate-y-0.5'}`}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-400 border-t border-white/5 pt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
