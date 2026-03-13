import React from 'react';

const alerts = [
    {
        id: 1,
        title: "High API Error Rate",
        description: "Tenant B is experiencing a 15% error rate on /v1/chat/completions",
        severity: "critical",
        time: "10 mins ago"
    },
    {
        id: 2,
        title: "Approaching Cost Limit",
        description: "Monthly budget for Llama-3-70b is at 85% utilization.",
        severity: "warning",
        time: "2 hours ago"
    },
    {
        id: 3,
        title: "Unusual Prompt Activity",
        description: "Detected sequence of 5 rejected prompt injection attempts from 192.168.1.10.",
        severity: "warning",
        time: "5 hours ago"
    }
];

const getSeverityStyles = (severity) => {
    switch (severity) {
        case 'critical':
            return 'bg-red-50 border-red-200 text-red-800';
        case 'warning':
            return 'bg-yellow-50 border-yellow-200 text-yellow-800';
        default:
            return 'bg-gray-50 border-gray-200 text-gray-800';
    }
};

const getIcon = (severity) => {
    switch (severity) {
        case 'critical':
            return (
                <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            );
        case 'warning':
            return (
                <svg className="w-5 h-5 text-yellow-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        default:
            return null;
    }
};

const AlertsExplainability = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Alerts</h2>
                <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">3 Active</span>
            </div>

            <div className="space-y-4">
                {alerts.map((alert) => (
                    <div key={alert.id} className={`p-4 border rounded-xl flex items-start space-x-4 ${getSeverityStyles(alert.severity)}`}>
                        <div className="flex-shrink-0">
                            {getIcon(alert.severity)}
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <h3 className="text-sm font-bold">{alert.title}</h3>
                                <span className="text-xs opacity-75">{alert.time}</span>
                            </div>
                            <p className="text-sm mt-1 opacity-90">{alert.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                View Alert History
            </button>
        </div>
    );
};

export default AlertsExplainability;
