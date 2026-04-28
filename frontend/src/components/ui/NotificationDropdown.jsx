import React from 'react';
import api from '../../services/api';

const NotificationDropdown = ({ notifications, onRead, onDelete, loading, error }) => {
    const handleRead = async (id, isRead) => {
        if (Number(isRead) === 0) {

            try {
                await api.put(`/notifications/${id}/read`);
                onRead(id);
            } catch (err) {
                console.error('Failed to mark notification as read', err);
            }
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation(); // Prevent triggering handleRead
        try {
            await api.delete(`/notifications/${id}`);
            onDelete(id);
        } catch (err) {
            console.error('Failed to delete notification', err);
        }
    };

    const formatTime = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-white font-bold">Notifications</h3>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Recent</span>
            </div>
            
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
                {loading && notifications.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                        <p className="text-slate-500 text-sm mt-3">Loading alerts...</p>
                    </div>
                ) : error ? (
                    <div className="p-8 text-center">
                        <p className="text-red-400 text-sm">Failed to sync notifications</p>
                        <button onClick={() => window.location.reload()} className="text-[10px] text-emerald-400 font-bold uppercase mt-2">Retry</button>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm">
                        No notifications yet
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {notifications.map((notif) => (
                            <div 
                                key={notif.id}
                                onClick={() => handleRead(notif.id, notif.is_read)}
                                className={`p-4 hover:bg-white/5 transition-colors cursor-pointer group flex items-start gap-3 ${Number(notif.is_read) === 0 ? 'bg-emerald-500/5' : ''}`}
                            >
                                <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${Number(notif.is_read) === 0 ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-slate-700'}`}></div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm leading-relaxed ${Number(notif.is_read) === 0 ? 'text-white font-medium' : 'text-slate-400'}`}>

                                        {notif.message}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-[10px] text-slate-500 font-bold uppercase">{formatTime(notif.created_at)}</span>
                                        <button 
                                            onClick={(e) => handleDelete(e, notif.id)}
                                            className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {notifications.length > 0 && (
                <div className="p-3 bg-white/[0.02] border-t border-white/5 text-center">
                    <button className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest">
                        View All Activity
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
