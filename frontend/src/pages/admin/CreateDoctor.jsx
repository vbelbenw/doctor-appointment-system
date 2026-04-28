import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const CreateDoctor = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        specialization: '',
        experience_years: '',
        consultation_fee: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await api.post('/doctors', formData);

            if (response.status === 201) {
                setMessage('Doctor profile created successfully!');
                setFormData({ name: '', email: '', phone_number: '', password: '', specialization: '', experience_years: '', consultation_fee: '' });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create doctor. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Create New Doctor</h1>
                    <p className="text-slate-500 mt-1">Register a new medical professional in the system.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    {message && <div className="mb-4 p-4 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 font-medium">{message}</div>}
                    {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 font-medium">{error}</div>}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Dr. John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="doctor@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Temporary Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="••••••••" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
                                <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="+251 960648894" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Specialization</label>
                                <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. Cardiologist" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Experience (Years)</label>
                                <input type="number" name="experience_years" value={formData.experience_years} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="5" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Consultation Fee ($)</label>
                                <input type="number" name="consultation_fee" value={formData.consultation_fee} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="100" />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md">
                            {loading ? 'Registering Doctor...' : 'Register Doctor'}
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CreateDoctor;
