import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';

const AdminDashboard = () => {
    const { user, token } = useAuth();
    const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0, users: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/stats', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [token]);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-32 h-32 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Control Panel</span>
                        </h1>
                        <p className="text-slate-400 mt-2 text-lg">System Health: <span className="text-emerald-400 font-bold">Optimal</span>. All services are running normally.</p>
                        <div className="flex gap-4 mt-6">
                            <Link to="/admin/create-doctor" className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-purple-500/20 hover:-translate-y-0.5 inline-block">
                                Create Doctor
                            </Link>
                            <Link to="/admin/doctors" className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 inline-block">
                                Manage Doctors
                            </Link>
                            <Link to="/admin/logs" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-2xl font-bold transition-all border border-white/10 inline-block">
                                System Logs
                            </Link>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-6 text-slate-400">Loading system metrics...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Total Doctors</p>
                            <h3 className="text-3xl font-black text-white mt-1">{stats.doctors}</h3>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Total Patients</p>
                            <h3 className="text-3xl font-black text-white mt-1">{stats.patients}</h3>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Appointments</p>
                            <h3 className="text-3xl font-black text-white mt-1">{stats.appointments}</h3>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Total Users</p>
                            <h3 className="text-3xl font-black text-emerald-400 mt-1">{stats.users}</h3>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
