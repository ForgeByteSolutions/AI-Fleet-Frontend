import React from 'react';
import ExecutiveOverview from '../components/governance/ExecutiveOverview';
import LoggingAudit from '../components/governance/LoggingAudit';
import MonitoringMetrics from '../components/governance/MonitoringMetrics';
import CostTracking from '../components/governance/CostTracking';
import ComplianceSecurity from '../components/governance/ComplianceSecurity';
import ModelPerformance from '../components/governance/ModelPerformance';
import AlertsExplainability from '../components/governance/AlertsExplainability';

const AIGovernance = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Header */}
                <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">AI Governance & Observability</h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Control tower for AI reliability, compliance, and cost.
                        </p>
                    </div>
                    <div className="flex space-x-3 items-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 shadow-sm border border-green-200">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                            System Healthy
                        </span>
                        <span className="text-gray-400 text-xs font-medium bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                            Live Updates On
                        </span>
                    </div>
                </div>

                {/* Section 1: Executive Overview */}
                <section id="executive-overview">
                    <ExecutiveOverview />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Metrics & Logs */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Section 4: Cost Tracking (Real Data) */}
                        <section id="cost-tracking">
                            <CostTracking />
                        </section>

                        {/* Section 3: Monitoring & Metrics */}
                        <section id="monitoring-metrics">
                            <MonitoringMetrics />
                        </section>

                        {/* Section 2: Logging & Audit */}
                        <section id="logging-audit">
                            <LoggingAudit />
                        </section>

                        {/* Section 5: Compliance & Security */}
                        <section id="compliance-security">
                            <ComplianceSecurity />
                        </section>
                    </div>

                    {/* Right Column: Perf, Alerts */}
                    <div className="space-y-8">


                        {/* Section 6: Model Performance */}
                        <section id="model-performance">
                            <ModelPerformance />
                        </section>

                        {/* Section 7: Alerts */}
                        <section id="alerts">
                            <AlertsExplainability />
                        </section>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AIGovernance;
