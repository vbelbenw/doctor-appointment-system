import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
    const { isAuthenticated, user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isAuthenticated && user) {
            if (user.role === 'PATIENT') navigate('/patient/dashboard');
            else if (user.role === 'DOCTOR') navigate('/doctor/dashboard');
            else if (user.role === 'ADMIN') navigate('/admin/dashboard');
        }
    }, [isAuthenticated, user, loading, navigate]);

    if (loading) return null;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 scroll-smooth">
            <Navbar />
            <main>
                <HeroSection />
                <Features />
                <HowItWorks />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
