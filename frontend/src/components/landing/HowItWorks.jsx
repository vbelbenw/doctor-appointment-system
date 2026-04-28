import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            num: "1",
            title: "Register/Login",
            desc: "Create your free account or sign in to access your dashboard.",
            icon: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        },
        {
            num: "2",
            title: "Choose Doctor",
            desc: "Browse our directory of verified specialists and view their profiles.",
            icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        },
        {
            num: "3",
            title: "Book Appointment",
            desc: "Select an available time slot that fits your schedule perfectly.",
            icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        },
        {
            num: "4",
            title: "Get Notified",
            desc: "Receive instant updates when your booking is confirmed or updated.",
            icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-slate-950 relative z-10 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">How It Works</h2>
                    <p className="text-slate-400 text-lg">Four simple steps to get the medical care you need.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="bg-slate-900 border border-white/5 rounded-2xl p-8 text-center relative group hover:shadow-[0_0_30px_rgba(52,211,153,0.1)] transition-all duration-300">
                            <div className="w-16 h-16 mx-auto bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-300 relative">
                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-slate-800 text-emerald-400 text-xs font-bold rounded-full flex items-center justify-center border border-emerald-500/30">{step.num}</span>
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon} />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
