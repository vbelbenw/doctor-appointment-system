import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';

const MyAppointments = () => {
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
            const response = await api.get('/appointments/my');
            setAppointments(response.data);
        } catch (err) {
            setError('Failed to load your appointments.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (appointmentId) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
        
        setActionLoading(appointmentId);
        try {
            await api.put(`/appointments/${appointmentId}/cancel`);
            // Update local state instead of full refresh
            setAppointments(appointments.map(app => 
                app.appointment_id === appointmentId 
                ? { ...app, appointment_status: 'CANCELLED' } 
                : app
            ));

            // Trigger notification refresh
            window.dispatchEvent(new Event('refreshNotifications'));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to cancel appointment.');
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
                    <h1 className="text-3xl font-extrabold text-white">My <span className="text-emerald-400">Appointments</span></h1>
                    <p className="text-slate-400 mt-2">View and manage your upcoming and past medical visits.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center p-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
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
                        <p className="text-slate-400 text-lg">You haven't booked any appointments yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {appointments.map((app) => (
                            <div key={app.appointment_id} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.07] transition-all group">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-xl">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{app.doctor_name}</h3>
                                        <p className="text-emerald-500 text-xs font-bold uppercase tracking-widest">{app.specialization}</p>
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

                                <div className="flex items-center gap-4">
                                    <span className={`px-4 py-1 rounded-full text-xs font-black tracking-widest ring-1 ${getStatusColor(app.appointment_status)}`}>
                                        {app.appointment_status}
                                    </span>
                                    
                                    {(app.appointment_status === 'BOOKED' || app.appointment_status === 'CONFIRMED') && (
                                        <button 
                                            disabled={actionLoading === app.appointment_id}
                                            onClick={() => handleCancel(app.appointment_id)}
                                            className="px-5 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl border border-red-500/20 transition-all font-bold text-sm"
                                        >
                                            {actionLoading === app.appointment_id ? 'Cancelling...' : 'Cancel'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default MyAppointments;
