import React, { useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';

const SlotGeneration = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        start_date: '',
        end_date: ''
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
            // We need the doctor internal ID. 
            // In a real app, the backend might extract it from the user token.
            // Based on backend code, it checks 'doctors' table for user_id = req.user.id.
            // So we need to pass a doctor_id. We can fetch the doctor profile first or 
            // since we don't have a direct "getProfile" easily available here, 
            // we'll assume the backend can handle looking it up if we don't pass it, 
            // OR we'll help it. Looking at generateSlots in the backend:
            // if (!doctor_id) ... returns 400.
            // So we need to find the internal doctor_id.
            
            const docResponse = await api.get('/doctors/me'); // Assuming an endpoint exists or we create one
            const doctorId = docResponse.data.id;

            const payload = {
                doctor_id: doctorId,
                start_date: formData.start_date,
                end_date: formData.end_date
            };

            const response = await api.post('/slots/generate', payload);
            setMessage({ type: 'success', content: response.data.message || 'Slots generated successfully!' });
        } catch (err) {
            setMessage({ 
                type: 'error', 
                content: err.response?.data?.message || 'Failed to generate slots. Make sure you have set your availability first.' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-white">Generate <span className="text-blue-400">Appointment Slots</span></h1>
                    <p className="text-slate-400 mt-2">Automatically create bookable slots based on your defined availability.</p>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Start Date</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">End Date</label>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={formData.end_date}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 ${
                                loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'
                            }`}
                        >
                            {loading ? 'Generating...' : 'Generate Slots'}
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SlotGeneration;
