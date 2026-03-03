import { useState } from "react";
import { buyVsReallocate, simulateProject } from "../api/decisionsApi";

const Decisions = () => {
  const [projectId, setProjectId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [simulateProjectId, setSimulateProjectId] = useState("");
  const [simulateResult, setSimulateResult] = useState(null);
  const [simulateError, setSimulateError] = useState("");
  const [simulateLoading, setSimulateLoading] = useState(false);

  const handleRunSimulation = async () => {
    if (!projectId.trim()) {
      setError("Please enter a Project ID");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await buyVsReallocate(projectId);
      setResult(data);
    } catch (err) {
      setError(err.message || "Simulation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRunSimulateProject = async () => {
    if (!simulateProjectId.trim()) {
      setSimulateError("Please enter a Project ID");
      return;
    }

    setSimulateLoading(true);
    setSimulateError("");
    setSimulateResult(null);

    try {
      const data = await simulateProject(simulateProjectId);
      setSimulateResult(data);
    } catch (err) {
      setSimulateError(err.message || "Simulation failed");
    } finally {
      setSimulateLoading(false);
    }
  };

  return (
    <div className="text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Decision Intelligence Simulator
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* BUY VS REALLOCATE FORM SECTION */}
        <div className="bg-gray-700 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Run Buy vs Reallocate Analysis
          </h2>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter Project ID (e.g., FP001)"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="flex-1 bg-gray-700 p-3 rounded-xl border-2 border-black outline-none focus:border-red-600 focus:ring-0"
            />

            <button
              onClick={handleRunSimulation}
              className="bg-primary px-6 py-2 rounded-xl hover:bg-red-700 transition whitespace-nowrap"
            >
              Run Simulation
            </button>
          </div>

          <div className="mt-4">
            {loading && (
              <div className="animate-pulse text-gray-400">
                AI analyzing project data...
              </div>
            )}

            {error && (
              <div className="text-red-500">{error}</div>
            )}

            {/* RESULTS SECTION */}
            {result && (
              <div className="grid grid-cols-2 gap-4 mt-6">

                {/* Recommendation Card */}
                <div className="bg-gray-700 p-4 rounded-xl shadow">
                  <h3 className="text-sm font-semibold mb-1 text-gray-400">
                    AI Recommendation
                  </h3>
                  <p className="text-lg text-primary font-bold">
                    {result.decision}
                  </p>
                </div>

                {/* Financial Impact */}
                <div className="bg-gray-700 p-4 rounded-xl shadow">
                  <h3 className="text-sm font-semibold mb-1 text-gray-400">
                    CAPEX Avoided
                  </h3>
                  <p className="text-lg text-green-400 font-bold">
                    ${result.estimated_capex_avoided?.toLocaleString()}
                  </p>
                </div>

                {/* Utilization Impact */}
                <div className="bg-gray-700 p-4 rounded-xl shadow">
                  <h3 className="text-sm font-semibold mb-1 text-gray-400">
                    Downtime Reduction
                  </h3>
                  <p className="text-lg font-bold">
                    {result.estimated_downtime_reduction}%
                  </p>
                </div>

                {/* Required Assets */}
                <div className="bg-gray-700 p-4 rounded-xl shadow">
                  <h3 className="text-sm font-semibold mb-1 text-gray-400">
                    Required Assets
                  </h3>
                  <p className="text-lg">
                    {result.required_assets}
                  </p>
                </div>

                {/* Available Idle Assets */}
                <div className="bg-gray-700 p-4 rounded-xl shadow">
                  <h3 className="text-sm font-semibold mb-1 text-gray-400">
                    Available Idle Assets
                  </h3>
                  <p className="text-lg">
                    {result.available_idle_assets}
                  </p>
                </div>

                {/* Summary Insight */}
                <div className="bg-gray-700 p-4 rounded-xl shadow col-span-2">
                  <h3 className="text-sm font-semibold mb-1 text-gray-400">
                    Utilization Insight
                  </h3>
                  <p className="text-sm">
                    {result.available_idle_assets >= result.required_assets
                      ? "Sufficient idle assets available. Reallocation preferred."
                      : "Insufficient idle assets. Mixed or Buy strategy recommended."}
                  </p>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* SIMULATE PROJECT FORM SECTION */}
        <div className="bg-gray-700 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Simulate Project
          </h2>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter Project ID (e.g., FP001)"
              value={simulateProjectId}
              onChange={(e) => setSimulateProjectId(e.target.value)}
              className="flex-1 bg-gray-700 p-3 rounded-xl border-2 border-black outline-none focus:border-red-600 focus:ring-0"
            />

            <button
              onClick={handleRunSimulateProject}
              className="bg-primary px-6 py-2 rounded-xl hover:bg-red-700 transition whitespace-nowrap"
            >
              Run Simulation
            </button>
          </div>

          <div className="mt-4">
            {simulateLoading && (
              <div className="animate-pulse text-gray-400">
                AI analyzing project data...
              </div>
            )}

            {simulateError && (
              <div className="text-red-500">{simulateError}</div>
            )}

            {/* RESULTS SECTION */}
            {simulateResult && (
              <div className="grid grid-cols-2 gap-4 mt-6">

                {/* Predicted Spike */}
                <div className="bg-gray-700 p-4 rounded-xl shadow col-span-2 md:col-span-1">
                  <h3 className="text-sm font-semibold mb-1 text-gray-400">
                    Predicted Utilization Spike
                  </h3>
                  <p className="text-lg text-primary font-bold">
                    {simulateResult.predicted_utilization_spike}%
                  </p>
                </div>

                {/* Bottleneck Regions */}
                <div className="bg-gray-700 p-4 rounded-xl shadow col-span-2 md:col-span-1">
                  <h3 className="text-sm font-semibold mb-1 text-gray-400">
                    Bottleneck Regions
                  </h3>
                  <p className="text-lg font-bold">
                    {simulateResult.bottleneck_regions?.length > 0
                      ? simulateResult.bottleneck_regions.join(", ")
                      : "None Detected"}
                  </p>
                </div>

                {/* Summary Insight */}
                <div className="bg-gray-700 p-4 rounded-xl shadow col-span-2">
                  <h3 className="text-sm font-semibold mb-1 text-gray-400">
                    Simulation Insight
                  </h3>
                  <p className="text-sm">
                    {simulateResult.predicted_utilization_spike > 80
                      ? "Warning: predicted utilization is extremely high. Proceed with caution or consider additional resource allocation."
                      : "Predicted utilization is within manageable thresholds."}
                  </p>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decisions;