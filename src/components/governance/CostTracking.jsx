import React, { useState, useEffect } from "react";
import { getLlmUsage } from "../../api/analyticsApi";

const CostTracking = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usageData, setUsageData] = useState(null);

    useEffect(() => {
        const fetchUsage = async () => {
            try {
                setLoading(true);
                const data = await getLlmUsage();
                setUsageData(data);
            } catch (err) {
                setError(err.message || "An error occurred fetching AI Governance stats");
            } finally {
                setLoading(false);
            }
        };

        fetchUsage();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center">
                    <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Cost Tracking & Allocation</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Real-time Data</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Cost Card */}
                <div className="bg-green-50 border border-green-100 rounded-xl p-5 hover:shadow-sm transition">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-white p-2 rounded-lg text-green-500 shadow-sm">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-green-800">Total Billed Cost</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 ml-11">
                        ${usageData?.total_cost?.toFixed(4) || "0.0000"}
                    </p>
                </div>

                {/* Prompt Tokens Card */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 hover:shadow-sm transition">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-white p-2 rounded-lg text-blue-500 shadow-sm">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-blue-800">Prompt Tokens</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 ml-11">
                        {usageData?.prompt_tokens?.toLocaleString() || 0}
                    </p>
                </div>

                {/* Completion Tokens Card */}
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 hover:shadow-sm transition">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-white p-2 rounded-lg text-purple-500 shadow-sm">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-purple-800">Completion Tokens</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 ml-11">
                        {usageData?.completion_tokens?.toLocaleString() || 0}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CostTracking;
