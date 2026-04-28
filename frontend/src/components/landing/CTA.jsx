import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-slate-950 z-10 border-b border-white/5">
            <div className="max-w-5xl mx-auto px-6">
                <div className="bg-gradient-to-br from-emerald-600 to-cyan-700 rounded-[3rem] p-12 md:p-20 text-center relative shadow-2xl shadow-emerald-500/20 overflow-hidden">
                    
                    {/* Decorative abstract elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
                            Start managing your health today
                        </h2>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link 
                                to="/register" 
                                className="px-10 py-4 bg-slate-950 hover:bg-slate-900 border border-transparent hover:border-white/20 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg text-lg"
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
