import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import NotificationDropdown from './NotificationDropdown';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dropdownRef = useRef(null);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await api.get('/notifications');
            const data = Array.isArray(response.data) ? response.data : [];
            setNotifications(data);
            setUnreadCount(data.filter(n => Number(n.is_read) === 0).length);
            setError(false);
        } catch (err) {
            console.error('Failed to fetch notifications', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchNotifications();
        
        // Setup polling every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);

        // Listen for internal refresh events
        const handleRefresh = () => fetchNotifications();
        window.addEventListener('refreshNotifications', handleRefresh);
        
        // Click outside listener
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            clearInterval(interval);
            window.removeEventListener('refreshNotifications', handleRefresh);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: 1 } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const handleDelete = (id) => {
        const wasUnread = notifications.find(n => n.id === id && !n.is_read);
        setNotifications(prev => prev.filter(n => n.id !== id));
        if (wasUnread) setUnreadCount(prev => Math.max(0, prev - 1));
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-2 rounded-xl transition-all duration-300 ${isOpen ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full border-2 border-slate-900 shadow-lg shadow-emerald-500/20 animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <NotificationDropdown 
                    notifications={notifications} 
                    onRead={handleRead}
                    onDelete={handleDelete}
                    loading={loading}
                    error={error}
                />
            )}

        </div>
    );
};

export default NotificationBell;
