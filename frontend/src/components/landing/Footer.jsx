import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 pt-16 pb-8 z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <svg className="w-5 h-5 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            DocAppt
                        </span>
                    </div>

                    <div className="flex gap-8">
                        <a href="#" className="text-slate-400 hover:text-emerald-400 font-semibold transition-colors">About</a>
                        <a href="#" className="text-slate-400 hover:text-emerald-400 font-semibold transition-colors">Contact</a>
                    </div>
                </div>

                <div className="text-center pt-8 border-t border-white/5">
                    <p className="text-slate-600 text-sm">
                        &copy; {new Date().getFullYear()} DocSystem. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
