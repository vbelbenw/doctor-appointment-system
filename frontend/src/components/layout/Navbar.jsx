import React from 'react';
import { useAuth } from '../../context/AuthContext';

import NotificationBell from '../ui/NotificationBell';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-6 py-3">
            <div className="flex items-center justify-between max-w-[1600px] mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <svg className="w-5 h-5 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
                        Doctor<span className="text-emerald-400">Appointment</span>
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <NotificationBell />

                    <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-semibold text-white">{user?.name}</p>
                            <p className="text-xs text-slate-400 capitalize">{user?.role.toLowerCase()}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all border border-red-500/20 hover:border-red-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
