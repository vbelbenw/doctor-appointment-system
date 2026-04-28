import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-50">
            {/* Soft background gradients */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-blue-100 backdrop-blur-md shadow-sm mb-8">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                    <span className="text-sm font-semibold text-blue-700 tracking-wide uppercase">The #1 Booking Platform</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
                    Smart Doctor Appointments, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Simplified.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Say goodbye to endless phone calls and waiting rooms. Instantly book, manage, and attend appointments with top specialists using our intelligent scheduling platform.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                    <Link to="/register" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 text-lg">
                        Get Started
                    </Link>
                    <Link to="/login" className="px-8 py-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-full font-semibold transition-all shadow-sm text-lg">
                        Book Appointment
                    </Link>
                </div>

                {/* Floating Mockup Preview */}
                <div className="relative max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10 pointer-events-none pt-20"></div>
                    <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-4 md:p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] relative">
                        <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-inner aspect-[16/9] relative">
                            {/* Mockup UI Inner Structure */}
                            <div className="absolute top-0 left-0 w-full h-12 border-b border-slate-200 bg-white flex items-center px-4 gap-2">
                                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-amber-400"></div><div className="w-3 h-3 rounded-full bg-emerald-400"></div></div>
                            </div>
                            <div className="pt-16 p-8 flex gap-8 h-full opacity-60">
                                <div className="w-1/4 space-y-4">
                                    <div className="h-6 w-3/4 bg-slate-200 rounded-md"></div>
                                    <div className="h-4 w-full bg-slate-200 rounded-md"></div>
                                    <div className="h-4 w-5/6 bg-slate-200 rounded-md"></div>
                                    <div className="h-4 w-4/6 bg-slate-200 rounded-md"></div>
                                </div>
                                <div className="w-3/4 grid grid-cols-2 gap-6 pb-12">
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between">
                                        <div className="h-8 w-1/3 bg-blue-100 rounded-md mb-4"></div>
                                        <div className="space-y-2"><div className="h-3 w-full bg-slate-100 rounded"></div><div className="h-3 w-5/6 bg-slate-100 rounded"></div></div>
                                    </div>
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                                        <div className="h-8 w-1/3 bg-emerald-100 rounded-md mb-4"></div>
                                        <div className="space-y-2"><div className="h-3 w-full bg-slate-100 rounded"></div><div className="h-3 w-4/6 bg-slate-100 rounded"></div></div>
                                    </div>
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 col-span-2 relative overflow-hidden">
                                        <div className="absolute right-0 bottom-0 w-32 h-32 bg-blue-50 focus:outline-none rounded-full blur-2xl"></div>
                                        <div className="h-6 w-1/4 bg-slate-200 rounded-md mb-6 relative z-10"></div>
                                        <div className="flex justify-between items-end relative z-10"><div className="w-1/6 h-12 bg-slate-100 rounded-t-md"></div><div className="w-1/6 h-24 bg-blue-100 rounded-t-md"></div><div className="w-1/6 h-16 bg-slate-100 rounded-t-md"></div><div className="w-1/6 h-32 bg-blue-600 rounded-t-md"></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
