import React from 'react';

const Features = () => {
    const features = [
        {
            title: "Easy Booking",
            desc: "Schedule your appointments with specialists in just a few clicks. No more complex phone trees.",
            icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        {
            title: "Doctor Availability",
            desc: "View real-time doctor availability and never worry about schedule conflicts again.",
            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10"
        },
        {
            title: "Secure System",
            desc: "Your historical appointments and private data are protected with robust authentication.",
            icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z",
            color: "text-purple-400",
            bg: "bg-purple-500/10"
        },
        {
            title: "Notifications",
            desc: "Receive immediate updates when your appointments are confirmed or canceled.",
            icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
            color: "text-amber-400",
            bg: "bg-amber-500/10"
        }
    ];

    return (
        <section id="features" className="py-24 bg-slate-900 relative z-10 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Core Features</h2>
                    <p className="text-slate-400 text-lg">Everything you need to manage your healthcare journey efficiently.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-slate-800/50 border border-white/5 rounded-2xl p-8 hover:bg-slate-800 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                            <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <svg className={`w-7 h-7 ${feature.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
