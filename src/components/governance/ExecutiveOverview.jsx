import React from 'react';

const ExecutiveOverview = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Executive Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Requests Card */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 border border-indigo-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-indigo-800">Total API Requests</h3>
                        <span className="p-2 bg-indigo-100 rounded-lg">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">428.5K</p>
                    <div className="mt-2 flex items-center text-sm">
                        <span className="text-green-600 font-medium flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            12.5%
                        </span>
                        <span className="text-gray-500 ml-2">vs last month</span>
                    </div>
                </div>

                {/* System Uptime Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-green-800">System Uptime</h3>
                        <span className="p-2 bg-green-100 rounded-lg">
                            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">99.98%</p>
                    <div className="mt-2 flex items-center text-sm">
                        <span className="text-gray-500">Above 99.9% SLA target</span>
                    </div>
                </div>

                {/* Global Success Rate Card */}
                <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-5 border border-purple-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-purple-800">Success Rate</h3>
                        <span className="p-2 bg-purple-100 rounded-lg">
                            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">98.2%</p>
                    <div className="mt-2 flex items-center text-sm">
                        <span className="text-green-600 font-medium flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            0.8%
                        </span>
                        <span className="text-gray-500 ml-2">vs last week</span>
                    </div>
                </div>

                {/* Blocked Requests */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 border border-orange-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-orange-800">Blocked Requests</h3>
                        <span className="p-2 bg-orange-100 rounded-lg">
                            <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">1,245</p>
                    <div className="mt-2 flex items-center text-sm">
                        <span className="text-red-500 font-medium flex items-center">
                            Policy Violations
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExecutiveOverview;
