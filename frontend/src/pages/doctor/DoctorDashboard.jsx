import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';

const DoctorDashboard = () => {
    const { user } = useAuth();


    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-32 h-32 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10a7.969 7.969 0 013.5-.804c1.191 0 2.305.26 3.3.725V4.804zM11 4.804A7.969 7.969 0 0114.5 4c1.255 0 2.443.29 3.5.804v10a7.969 7.969 0 00-3.5-.804c-1.191 0-2.305.26-3.3.725V4.804z" />
                        </svg>
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            Dr. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{user?.name}</span>
                        </h1>
                        <p className="text-slate-400 mt-2 text-lg">Manage your appointments and slots efficiently.</p>
                        <Link 
                            to="/doctor/appointments"
                            className="mt-6 inline-block bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
                        >
                            View All Appointments
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link 
                        to="/doctor/appointments"
                        className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/[0.07] transition-colors cursor-pointer group border-l-4 border-l-blue-500 block"
                    >
                        <h3 className="text-3xl font-black text-white">View</h3>
                        <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-bold">Patient Appointments</p>
                    </Link>
                    <Link 
                        to="/doctor/slots"
                        className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/[0.07] transition-colors cursor-pointer group border-l-4 border-l-emerald-500 block"
                    >
                        <h3 className="text-3xl font-black text-white">Manage</h3>
                        <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-bold">Time Slots</p>
                    </Link>
                    <Link 
                        to="/doctor/availability"
                        className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/[0.07] transition-colors cursor-pointer group border-l-4 border-l-purple-500 block"
                    >
                        <h3 className="text-3xl font-black text-white">Set</h3>
                        <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-bold">Availability</p>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DoctorDashboard;
