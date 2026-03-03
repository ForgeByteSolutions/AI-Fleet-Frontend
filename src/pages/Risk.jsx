import { useEffect, useState } from "react";
import { getRiskAnalysis } from "../api/riskApi";

const Risk = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // table state
  const [filterLevel, setFilterLevel] = useState("");
  const [search, setSearch] = useState("");
  const [sortDir, setSortDir] = useState("desc"); // descending by default
  const [showAll, setShowAll] = useState(false);
  const [showCards, setShowCards] = useState(false); // toggle card grid

  useEffect(() => {
    const fetchRisk = async () => {
      try {
        const result = await getRiskAnalysis();
        setData(result.data);
      } catch (err) {
        setError("Failed to fetch risk analysis");
      } finally {
        setLoading(false);
      }
    };

    fetchRisk();
  }, []);

  if (loading) return <div className="text-white">Loading risk data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const totalAssets = data.length;
  const highRisk = data.filter(item => item.risk_rank === "High").length;
  const mediumRisk = data.filter(item => item.risk_rank === "Medium").length;
  const lowRisk = data.filter(item => item.risk_rank === "Low").length;

  // derived table data
  const tableData = data
    .filter(item =>
      !filterLevel || item.risk_rank === filterLevel
    )
    .filter(item =>
      item.asset_id.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortDir === "asc"
        ? a.risk_score - b.risk_score
        : b.risk_score - a.risk_score
    );

  const visibleRows = showAll ? tableData : tableData.slice(0, 10);

  return (
    <div>
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-600">Total Risk Assets</h3>
          <p className="text-2xl font-bold text-black">{totalAssets}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-600">High Risk</h3>
          <p className="text-2xl font-bold text-red-500">{highRisk}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-600">Medium Risk</h3>
          <p className="text-2xl font-bold text-yellow-500">{mediumRisk}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-600">Low Risk</h3>
          <p className="text-2xl font-bold text-green-500">{lowRisk}</p>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">High Risk Assets</h1>

      {/* table controls */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex space-x-2 mb-2 md:mb-0">
          <input
            type="text"
            placeholder="Search asset"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={filterLevel}
            onChange={e => setFilterLevel(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Levels</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
        >
          Sort Risk Score {sortDir === "asc" ? "↑" : "↓"}
        </button>
      </div>

      {/* table */}
      <div className="overflow-auto mb-4">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Asset</th>
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
              >
                Risk Score {sortDir === "asc" ? "↑" : "↓"}
              </th>
              <th className="px-4 py-2 border">Age (Years)</th>
              <th className="px-4 py-2 border">Failure Count</th>
              <th className="px-4 py-2 border">Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map(item => (
              <tr key={item.asset_id} className="text-center">
                <td className="px-4 py-2 border">{item.asset_id}</td>
                <td className="px-4 py-2 border">{item.risk_score}</td>
                <td className="px-4 py-2 border">{item.risk_features.age_years.toFixed(1)}</td>
                <td className="px-4 py-2 border">{item.risk_features.failure_count}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`font-bold ${
                      item.risk_rank === "High"
                        ? "text-red-500"
                        : item.risk_rank === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.risk_rank}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mb-6 space-x-4">
        <button
          className="text-blue-500 underline"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All"}
        </button>
        <button
          className="text-blue-500 underline"
          onClick={() => setShowCards(!showCards)}
        >
          {showCards ? "Hide Cards" : "Cards"}
        </button>
      </div>

      {showCards && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map(item => (
            <div
              key={item.asset_id}
              className="bg-white p-6 rounded-lg border border-gray-200"
            >
            <h2 className="text-lg font-semibold text-red-500">
              Asset: {item.asset_id}
            </h2>

            <p className="text-gray-400 mt-2">
              Risk Score:{" "}
              <span className="text-black font-bold">
                {item.risk_score}
              </span>
            </p>

            <p className="text-gray-400">
              Age (Years):{" "}
              <span className="text-black font-bold">
                {item.risk_features.age_years.toFixed(1)}
              </span>
            </p>

            <p className="text-gray-400">
              Failure Count:{" "}
              <span className="text-black font-bold">
                {item.risk_features.failure_count}
              </span>
            </p>

            <p className="mt-3">
              Risk Level:{" "}
              <span
                className={`font-bold ${
                  item.risk_rank === "High"
                    ? "text-red-500"
                    : item.risk_rank === "Medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {item.risk_rank}
              </span>
            </p>

            <p className="mt-2 text-gray-400">
              Recommendation:{" "}
              <span className="text-black">
                {item.recommendations}
              </span>
            </p>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default Risk;