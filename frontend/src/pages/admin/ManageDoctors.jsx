import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const ManageDoctors = () => {
    const { token } = useAuth();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await api.get('/doctors');
                setDoctors(response.data);
            } catch (error) {
                // Error handled by interceptor or local state if needed
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, [token]);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Manage Doctors</h1>
                        <p className="text-slate-500 font-medium text-sm">View and manage all registered medical professionals.</p>
                    </div>
                    <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg font-bold">
                        {doctors.length} Active Doctors
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mx-auto"></div></div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="p-4 font-bold text-slate-600">Doctor Name</th>
                                    <th className="p-4 font-bold text-slate-600">Specialization</th>
                                    <th className="p-4 font-bold text-slate-600">Email</th>
                                    <th className="p-4 font-bold text-slate-600 border-none">Fee</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map((doc) => (
                                    <tr key={doc.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 font-semibold text-slate-800">{doc.name}</td>
                                        <td className="p-4 text-emerald-600 font-medium">{doc.specialization}</td>
                                        <td className="p-4 text-slate-500">{doc.email}</td>
                                        <td className="p-4 font-bold text-slate-700">${doc.consultation_fee}</td>
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

export default ManageDoctors;
