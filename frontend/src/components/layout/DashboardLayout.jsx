import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-950 font-sans">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 lg:ml-64 p-6 md:p-8 min-h-[calc(100vh-65px)] overflow-x-hidden">
                    <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </main>
            </div>
            
            {/* Background Decor */}
            <div className="fixed top-[-50%] left-[-10%] w-[70%] h-[70%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none -z-10"></div>
            <div className="fixed bottom-[-50%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none -z-10"></div>
        </div>
    );
};

export default DashboardLayout;
