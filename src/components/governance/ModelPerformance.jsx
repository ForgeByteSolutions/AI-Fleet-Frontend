import React from 'react';

const ModelPerformance = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Model Performance & Quality</h2>

            <div className="space-y-6">

                {/* RAG Context Relevance */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">RAG Context Relevance</span>
                        <span className="text-sm font-bold text-gray-900">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">How well retrieved documents match user query.</p>
                </div>

                {/* Hallucination Rate */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Hallucination / Factuality Warning Rate</span>
                        <span className="text-sm font-bold text-gray-900">1.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 flex flex-row-reverse">
                        <div className="bg-red-500 h-2 rounded-r-full" style={{ width: '1.2%' }}></div>
                        <div className="bg-green-500 h-2 rounded-l-full flex-grow"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Rate of responses flagged for potential fabrication.</p>
                </div>

                {/* User CSAT */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">User Satisfaction (Thumbs up/down)</span>
                        <span className="text-sm font-bold text-gray-900">4.8 / 5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Based on implicit and explicit feedback across platform.</p>
                </div>

            </div>
        </div>
    );
};

export default ModelPerformance;
