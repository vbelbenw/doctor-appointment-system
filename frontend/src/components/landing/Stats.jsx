import React from 'react';

const Stats = () => {
    return (
        <section className="py-16 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    
                    <div className="p-4 group">
                        <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight group-hover:scale-110 transition-transform duration-300">100+</div>
                        <div className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wide">Top Doctors</div>
                    </div>
                    
                    <div className="p-4 group">
                        <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight group-hover:scale-110 transition-transform duration-300">1000+</div>
                        <div className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wide">Appointments</div>
                    </div>

                    <div className="p-4 group">
                        <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight group-hover:scale-110 transition-transform duration-300">99%</div>
                        <div className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wide">Satisfaction</div>
                    </div>

                    <div className="p-4 group">
                        <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight group-hover:scale-110 transition-transform duration-300">24/7</div>
                        <div className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wide">Support</div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default Stats;
