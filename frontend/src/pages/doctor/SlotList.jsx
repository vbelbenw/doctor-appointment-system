import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';

const SlotList = () => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            setLoading(true);
            // 1. Get doctor profile to get internal ID
            const docResponse = await api.get('/doctors/me');
            const doctorId = docResponse.data.id;

            // 2. Fetch all slots (including booked)
            const response = await api.get(`/slots/${doctorId}?all=true`);
            setSlots(response.data);
        } catch (err) {
            setError('Failed to load slots. Please set your availability and generate slots first.');
            console.error(err);
        } finally {
            setLoading(false);
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
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white">My <span className="text-indigo-400">Time Slots</span></h1>
                        <p className="text-slate-400 mt-2">Manage and view your generated appointment slots.</p>
                    </div>
                    <button 
                        onClick={fetchSlots}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-xl border border-white/10 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center p-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-3xl text-center">
                        {error}
                    </div>
                ) : slots.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 p-20 rounded-3xl text-center">
                        <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-slate-400 text-lg">No slots found. Start by generating some slots!</p>
                    </div>
                ) : (
                    <div className="overflow-hidden bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">Time Range</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {slots.map((slot) => (
                                    <tr key={slot.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4 text-white font-medium">{formatDate(slot.date)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <span className="text-white font-semibold bg-slate-900 px-2 py-1 rounded-lg border border-white/5">{slot.start_time.substring(0, 5)}</span>
                                                <span>→</span>
                                                <span className="text-white font-semibold bg-slate-900 px-2 py-1 rounded-lg border border-white/5">{slot.end_time.substring(0, 5)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 ${
                                                slot.status === 'AVAILABLE' 
                                                ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/30' 
                                                : 'bg-red-500/10 text-red-400 ring-red-500/30'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                                    slot.status === 'AVAILABLE' ? 'bg-emerald-400' : 'bg-red-400'
                                                }`}></span>
                                                {slot.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default SlotList;
