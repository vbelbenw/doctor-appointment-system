import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => scrollToSection(e, 'home')}>
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
                        DocAppt
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors">Home</a>
                    <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors">Features</a>
                    <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors">How it works</a>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors hidden sm:block">
                        Login
                    </Link>
                    <Link to="/register" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-xl font-bold transition-all shadow-md hover:-translate-y-0.5">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
