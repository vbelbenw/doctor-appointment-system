import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await api.get('/doctors');
                setDoctors(response.data);
            } catch (err) {
                setError('Failed to load doctors list. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleViewSlots = (doctorId) => {
        navigate(`/patient/book/${doctorId}`);
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">Find a <span className="text-emerald-400">Specialist</span></h1>
                    <p className="text-slate-400 mt-2">Browse our network of certified medical professionals.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center p-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-3xl text-center">
                        {error}
                    </div>
                ) : doctors.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 p-20 rounded-3xl text-center">
                        <p className="text-slate-400 text-lg">No doctors are registered in the system yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctors.map((doctor) => (
                            <div key={doctor.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all group relative overflow-hidden">
                                {/* Decor */}
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 text-2xl font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                                        {doctor.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{doctor.name}</h3>
                                        <p className="text-emerald-500 text-sm font-semibold uppercase tracking-wider">{doctor.specialization}</p>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-400">Experience</span>
                                        <span className="text-white font-medium">{doctor.experience_years} Years</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-400">Consultation Fee</span>
                                        <span className="text-emerald-400 font-bold">${doctor.consultation_fee}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => handleViewSlots(doctor.id)}
                                    className="w-full mt-6 py-3 bg-white/5 hover:bg-emerald-500 hover:text-slate-950 text-white border border-white/10 hover:border-emerald-500 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                                >
                                    View Available Slots
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default DoctorList;
