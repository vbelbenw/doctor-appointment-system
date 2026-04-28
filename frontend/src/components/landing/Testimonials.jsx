import React from 'react';

const Testimonials = () => {
    const reviews = [
        {
            name: "Sarah Jenkins",
            role: "Patient",
            text: "This platform completely changed how I manage my family's healthcare. Booking a pediatrician took exactly 30 seconds. Incredible.",
            avatar: "SJ"
        },
        {
            name: "Dr. Michael Chen",
            role: "Cardiologist",
            text: "As a doctor, the streamlined dashboard removes all the scheduling friction from my clinic. I can finally just focus on treating patients.",
            avatar: "MC"
        },
        {
            name: "Emily Rodriguez",
            role: "Patient",
            text: "The instant notifications and ability to easily cancel or reschedule without calling a receptionist is a massive game changer.",
            avatar: "ER"
        }
    ];

    return (
        <section id="testimonials" className="py-24 bg-slate-50 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">Loved by doctors and patients</h2>
                    <p className="text-lg text-slate-600">Don't just take our word for it.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
                            <div className="flex gap-1 text-amber-400 mb-6">
                                ★★★★★
                            </div>
                            <p className="text-slate-700 mb-8 leading-relaxed">"{review.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500">
                                    {review.avatar}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">{review.name}</h4>
                                    <p className="text-xs text-slate-500">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
