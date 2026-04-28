import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';

const SlotBooking = () => {
    const { doctor_id } = useParams();
    const navigate = useNavigate();
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(null); // Track which slot is being booked
    const [message, setMessage] = useState({ type: '', content: '' });

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await api.get(`/slots/${doctor_id}`);
                setSlots(response.data);
            } catch (err) {
                setMessage({ type: 'error', content: 'Failed to fetch available slots.' });
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSlots();
    }, [doctor_id]);

    const handleBook = async (slotId) => {
        setBookingLoading(slotId);
        setMessage({ type: '', content: '' });

        try {
            await api.post('/appointments/book', { slot_id: slotId });
            setMessage({ type: 'success', content: 'Appointment booked successfully!' });
            
            // Remove the booked slot from the UI or refresh
            setSlots(slots.filter(s => s.id !== slotId));

            // Trigger notification refresh
            window.dispatchEvent(new Event('refreshNotifications'));

            // Optional: Redirect after success
            setTimeout(() => navigate('/patient/appointments'), 2000);
        } catch (err) {
            setMessage({ 
                type: 'error', 
                content: err.response?.data?.message || 'Failed to book appointment. The slot might have been taken.' 
            });
        } finally {
            setBookingLoading(null);
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/patient/doctors')}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-slate-400 hover:text-white transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-3xl font-extrabold text-white">Book an <span className="text-emerald-400">Appointment</span></h1>
                        <p className="text-slate-400 mt-1">Select an available time slot to confirm your booking.</p>
                    </div>
                </div>

                {message.content && (
                    <div className={`p-4 rounded-2xl text-sm font-medium border animate-in fade-in slide-in-from-top-2 duration-300 ${
                        message.type === 'success' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                        {message.content}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center p-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                    </div>
                ) : slots.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 p-20 rounded-3xl text-center">
                        <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-slate-400 text-lg">No available slots found for this doctor at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {slots.map((slot) => (
                            <div key={slot.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-emerald-500/50 transition-all group">
                                <div className="text-slate-400 text-sm mb-3 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatDate(slot.date)}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="px-3 py-1.5 bg-slate-900 rounded-xl border border-white/5 text-white font-bold tracking-tight">
                                            {slot.start_time.substring(0, 5)}
                                        </div>
                                        <span className="text-slate-600">→</span>
                                        <div className="px-3 py-1.5 bg-slate-900 rounded-xl border border-white/5 text-white font-bold tracking-tight">
                                            {slot.end_time.substring(0, 5)}
                                        </div>
                                    </div>
                                    <button 
                                        disabled={bookingLoading === slot.id}
                                        onClick={() => handleBook(slot.id)}
                                        className={`px-6 py-2 rounded-xl font-bold transition-all shadow-lg ${
                                            bookingLoading === slot.id 
                                            ? 'bg-emerald-500/50 cursor-not-allowed text-slate-950' 
                                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 hover:-translate-y-0.5'
                                        }`}
                                    >
                                        {bookingLoading === slot.id ? 'Booking...' : 'Book'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default SlotBooking;
