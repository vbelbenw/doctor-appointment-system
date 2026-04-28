import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await api.get('/appointments/doctor');
            setAppointments(response.data);
        } catch (err) {
            setError('Failed to load appointments.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        setActionLoading(id);
        try {
            await api.put(`/appointments/${id}/status`, { status });
            // Update local state
            setAppointments(prev => prev.map(app => 
                app.appointment_id === id ? { ...app, appointment_status: status } : app
            ));
            
            // Dispatch notification refresh event
            window.dispatchEvent(new Event('refreshNotifications'));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update appointment status.');
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'BOOKED': return 'bg-blue-500/10 text-blue-400 ring-blue-500/20';
            case 'CONFIRMED': return 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20';
            case 'CANCELLED': return 'bg-red-500/10 text-red-400 ring-red-500/20';
            case 'COMPLETED': return 'bg-slate-500/10 text-slate-400 ring-slate-500/20';
            default: return 'bg-slate-500/10 text-slate-400 ring-slate-500/20';
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">Patient <span className="text-blue-400">Appointments</span></h1>
                    <p className="text-slate-400 mt-2">Manage and approve your booked appointments.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center p-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-3xl text-center">
                        {error}
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 p-20 rounded-3xl text-center">
                        <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-slate-400 text-lg">No appointments have been booked yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {appointments.map((app) => (
                            <div key={app.appointment_id} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.07] transition-all group">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shadow-xl">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{app.patient_name}</h3>
                                        <p className="text-slate-500 text-xs font-bold truncate max-w-[200px]">{app.patient_email}</p>
                                        <div className="flex items-center gap-3 mt-1.5 text-slate-400 text-sm">
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {formatDate(app.date)}
                                            </span>
                                            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                            <span className="flex items-center gap-1.5 font-medium">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {app.start_time.substring(0, 5)} - {app.end_time.substring(0, 5)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className={`px-4 py-1 rounded-full text-xs font-black tracking-widest ring-1 ${getStatusColor(app.appointment_status)}`}>
                                        {app.appointment_status}
                                    </span>
                                    
                                    <div className="flex gap-2 ml-4">
                                        {app.appointment_status === 'BOOKED' && (
                                            <>
                                                <button 
                                                    disabled={actionLoading === app.appointment_id}
                                                    onClick={() => handleUpdateStatus(app.appointment_id, 'CONFIRMED')}
                                                    className="px-4 py-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400 rounded-xl transition-all font-bold text-sm shadow-lg shadow-emerald-500/20"
                                                >
                                                    {actionLoading === app.appointment_id ? 'Wait...' : 'Confirm'}
                                                </button>
                                                <button 
                                                    disabled={actionLoading === app.appointment_id}
                                                    onClick={() => handleUpdateStatus(app.appointment_id, 'CANCELLED')}
                                                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl border border-red-500/20 transition-all font-bold text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                        {app.appointment_status === 'CONFIRMED' && (
                                            <button 
                                                disabled={actionLoading === app.appointment_id}
                                                onClick={() => handleUpdateStatus(app.appointment_id, 'COMPLETED')}
                                                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-400 rounded-xl transition-all font-bold text-sm shadow-lg shadow-blue-500/20"
                                            >
                                                Mark Completed
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default DoctorAppointments;
