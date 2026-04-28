import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const SystemLogs = () => {
    const logs = [
        { time: '10:42 AM', type: 'INFO', message: 'System boot sequence completed.' },
        { time: '10:45 AM', type: 'INFO', message: 'Database backup synchronized successfully.' },
        { time: '11:12 AM', type: 'WARN', message: 'High CPU utilization detected on node 2.' },
        { time: '11:30 AM', type: 'INFO', message: 'New doctor "Dr. Jenkins" registered by Admin.' },
        { time: '12:00 PM', type: 'INFO', message: 'Cron job executed: Slot cleanup.' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">System Logs</h1>
                    <p className="text-slate-500 mt-1">Real-time system events, warnings, and error reporting.</p>
                </div>

                <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-6 font-mono text-sm">
                    <div className="space-y-3">
                        {logs.map((log, idx) => (
                            <div key={idx} className="flex gap-4 border-b border-slate-800 pb-2">
                                <span className="text-slate-500 w-20">{log.time}</span>
                                <span className={`font-bold w-16 ${log.type === 'INFO' ? 'text-emerald-400' : 'text-amber-400'}`}>{log.type}</span>
                                <span className="text-slate-300">{log.message}</span>
                            </div>
                        ))}
                        <div className="flex gap-4 pt-2">
                            <span className="text-slate-500 w-20">Now</span>
                            <span className="font-bold w-16 text-emerald-400">INFO</span>
                            <span className="text-slate-300 animate-pulse">Waiting for new events...</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SystemLogs;
