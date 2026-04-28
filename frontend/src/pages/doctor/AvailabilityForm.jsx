import React, { useState } from 'react';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';

const AvailabilityForm = () => {
    const [formData, setFormData] = useState({
        day_of_week: 'MONDAY',
        start_time: '09:00',
        end_time: '17:00',
        slot_duration: 30
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', content: '' });

        try {
            // Backend expects start_time and end_time as HH:MM or HH:MM:SS
            // Adding :00 to ensure standard format if needed
            const payload = {
                ...formData,
                start_time: `${formData.start_time}:00`,
                end_time: `${formData.end_time}:00`
            };

            await api.post('/availability', payload);
            setMessage({ type: 'success', content: 'Availability set successfully!' });
        } catch (err) {
            setMessage({ 
                type: 'error', 
                content: err.response?.data?.message || 'Failed to set availability' 
            });
        } finally {
            setLoading(false);
        }
    };

    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-white">Set Weekly <span className="text-emerald-400">Availability</span></h1>
                    <p className="text-slate-400 mt-2">Define your working hours for each day of the week.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                    {message.content && (
                        <div className={`mb-6 p-4 rounded-xl text-sm font-medium border ${
                            message.type === 'success' 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                            {message.content}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Day of Week</label>
                            <select
                                name="day_of_week"
                                value={formData.day_of_week}
                                onChange={handleChange}
                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                            >
                                {days.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Start Time</label>
                                <input
                                    type="time"
                                    name="start_time"
                                    value={formData.start_time}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">End Time</label>
                                <input
                                    type="time"
                                    name="end_time"
                                    value={formData.end_time}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Slot Duration (Minutes)</label>
                            <input
                                type="number"
                                name="slot_duration"
                                value={formData.slot_duration}
                                onChange={handleChange}
                                min="15"
                                max="120"
                                required
                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 ${
                                loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'
                            }`}
                        >
                            {loading ? 'Saving...' : 'Save Availability'}
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AvailabilityForm;
