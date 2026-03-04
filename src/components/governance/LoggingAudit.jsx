import React from 'react';

const mockLogs = [
    { id: '1', timestamp: '2026-03-04 10:11:23', user: 'admin@aifleet.com', action: 'Accessed Cost Dashboard', status: 'Success', statusColor: 'bg-green-100 text-green-800' },
    { id: '2', timestamp: '2026-03-04 10:05:14', user: 'system_service', action: 'Vector DB Synchronization', status: 'Success', statusColor: 'bg-green-100 text-green-800' },
    { id: '3', timestamp: '2026-03-04 09:42:01', user: 'viewer@aifleet.com', action: 'Attempted to export model data', status: 'Denied (RBAC)', statusColor: 'bg-red-100 text-red-800' },
    { id: '4', timestamp: '2026-03-04 09:15:33', user: 'api_gateway', action: 'Rate limit exceeded for Tenant A', status: 'Warn', statusColor: 'bg-yellow-100 text-yellow-800' },
    { id: '5', timestamp: '2026-03-04 08:30:00', user: 'system_cron', action: 'Automated Database Backup', status: 'Success', statusColor: 'bg-green-100 text-green-800' },
];

const LoggingAudit = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Logging & Audit Trail</h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All Logs &rarr;</button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User / Service</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mockLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.user}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.action}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.statusColor}`}>
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoggingAudit;
