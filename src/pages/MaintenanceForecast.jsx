import { useEffect, useState } from "react";
import { getMaintenanceForecast } from "../api/riskApi";

const MaintenanceForecast = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // search & pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const result = await getMaintenanceForecast();
        setData(result.data);
      } catch (err) {
        setError("Failed to fetch maintenance forecast");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  if (loading) {
    return <div className="text-white">Loading forecast...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const totalAssets = data.length;
  const highProbability = data.filter(
    (item) => item.breakdown_probability_30_days === "High"
  ).length;

  const lowProbability = data.filter(
    (item) => item.breakdown_probability_30_days === "Low"
  ).length;

  // filtered data based on search
  const filtered = data.filter((item) =>
    item.asset_id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleData = showAll ? filtered : filtered.slice(0, 10);

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-600">Total Assets</h3>
          <p className="text-2xl font-bold text-black">
            {totalAssets}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-600">High Breakdown Risk</h3>
          <p className="text-2xl font-bold text-red-500">
            {highProbability}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-600">Low Breakdown Risk</h3>
          <p className="text-2xl font-bold text-green-500">
            {lowProbability}
          </p>
        </div>

      </div>

      <h1 className="text-2xl font-bold mb-6">
        Maintenance Forecast
      </h1>

      {/* search bar and view controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <input
          type="text"
          placeholder="Search by asset"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2 md:mb-0 px-3 py-2 border rounded w-full md:w-1/3"
        />
        {filtered.length > 10 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-blue-600 hover:underline"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      {/* Data table replacing card layout */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 border text-left">Asset</th>
              <th className="px-4 py-2 border text-left">Next Maintenance</th>
              <th className="px-4 py-2 border text-left">
                Breakdown Probability (30 days)
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item) => (
              <tr key={item.asset_id} className="text-center">
                <td className="px-4 py-2 border text-left">
                  {item.asset_id}
                </td>
                <td className="px-4 py-2 border text-left">
                  {item.estimated_next_maintenance_date}
                </td>
                <td className="px-4 py-2 border">
                  <span
                    className={`font-bold ${
                      item.breakdown_probability_30_days === "High"
                        ? "text-red-500"
                        : item.breakdown_probability_30_days === "Medium"
                        ? "text-orange-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.breakdown_probability_30_days}
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

export default MaintenanceForecast;