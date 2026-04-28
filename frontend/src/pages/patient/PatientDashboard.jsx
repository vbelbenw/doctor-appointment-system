import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';

const PatientDashboard = () => {
    const { user } = useAuth();


    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-32 h-32 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" />
                        </svg>
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{user?.name}</span>
                        </h1>
                        <p className="text-slate-400 mt-2 text-lg">You have no appointments scheduled for today. Would you like to book one?</p>
                        <Link 
                            to="/patient/doctors"
                            className="mt-6 inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
                        >
                            Book New Appointment
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link 
                        to="/patient/appointments"
                        className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/[0.07] transition-colors cursor-pointer group block"
                    >
                        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white">Upcoming</h3>
                        <p className="text-slate-400 text-sm mt-1">Check your future schedules</p>
                    </Link>
                    <Link 
                        to="/patient/appointments"
                        className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/[0.07] transition-colors cursor-pointer group block"
                    >
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white">Completed</h3>
                        <p className="text-slate-400 text-sm mt-1">View your past medical history</p>
                    </Link>
                    <button 
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/[0.07] transition-colors cursor-pointer group text-left w-full block"
                    >
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white">Notifications</h3>
                        <p className="text-slate-400 text-sm mt-1">Check alerts in the top menu</p>
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};


export default PatientDashboard;
