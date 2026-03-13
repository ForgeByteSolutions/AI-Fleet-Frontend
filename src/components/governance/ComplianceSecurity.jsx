import React from 'react';

const ComplianceSecurity = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Compliance & Security Guardrails</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* PII Redaction */}
                <div className="flex items-start p-4 border border-gray-100 rounded-xl bg-gray-50">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-lg mt-1">
                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm font-bold text-gray-900">PII Redaction Filter</h3>
                        <p className="text-xs text-gray-500 mt-1">Intercepting SSN, Emails, Cards</p>
                        <div className="mt-2 text-sm font-medium text-green-600">Active - 100% Coverage</div>
                    </div>
                </div>

                {/* Prompt Injection */}
                <div className="flex items-start p-4 border border-gray-100 rounded-xl bg-gray-50">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-lg mt-1">
                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm font-bold text-gray-900">Prompt Injection Shield</h3>
                        <p className="text-xs text-gray-500 mt-1">Blocking malicious prompt attempts</p>
                        <div className="mt-2 text-sm font-medium text-green-600">Active - 42 Blocked Today</div>
                    </div>
                </div>

                {/* Data Residency */}
                <div className="flex items-start p-4 border border-gray-100 rounded-xl bg-gray-50">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg mt-1">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm font-bold text-gray-900">Data Residency</h3>
                        <p className="text-xs text-gray-500 mt-1">Enforcing geographic processing</p>
                        <div className="mt-2 text-sm font-medium text-blue-600">US-East Only</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ComplianceSecurity;
