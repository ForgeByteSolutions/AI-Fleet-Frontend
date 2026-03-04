import React from 'react';

const MonitoringMetrics = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Monitoring & Metrics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* API Latency */}
                <div className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 font-medium text-sm">Average API Latency</span>
                        <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded">Healthy</span>
                    </div>
                    <div className="flex items-end space-x-2">
                        <span className="text-3xl font-bold text-gray-900">245</span>
                        <span className="text-gray-500 mb-1">ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                </div>

                {/* Token Generation Speed */}
                <div className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 font-medium text-sm">Generation Speed</span>
                        <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-1 rounded">Optimal</span>
                    </div>
                    <div className="flex items-end space-x-2">
                        <span className="text-3xl font-bold text-gray-900">82</span>
                        <span className="text-gray-500 mb-1">tokens/sec</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                </div>

                {/* Concurrent Users */}
                <div className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 font-medium text-sm">Concurrent Streams</span>
                        <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-1 rounded">High Load</span>
                    </div>
                    <div className="flex items-end space-x-2">
                        <span className="text-3xl font-bold text-gray-900">142</span>
                        <span className="text-gray-500 mb-1">active</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                        <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MonitoringMetrics;
