import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden bg-slate-950">
            {/* Dark mode background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-full bg-emerald-900/40 blur-[150px] rounded-full pointer-events-none opacity-50"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                <div className="text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                        Book Doctor Appointments <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Easily</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        A seamless platform to connect with verified medical professionals. Skip the waiting room and schedule your next visit instantly from anywhere.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-1 text-lg">
                            Get Started
                        </Link>
                        <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl font-bold transition-all shadow-sm text-lg backdrop-blur-md">
                            Login
                        </Link>
                    </div>
                </div>
                
                <div className="relative flex items-center justify-center animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 hidden md:flex">
                    <div className="relative w-full max-w-md aspect-square rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(52,211,153,0.15)] border border-slate-800 group">
                        <img 
                            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80" 
                            alt="Professional medical staff" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Overlay gradient for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    </div>
                </div>
                
            </div>
        </section>
    );
};

export default HeroSection;
