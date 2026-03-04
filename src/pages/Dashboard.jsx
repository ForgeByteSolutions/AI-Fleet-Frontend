import { useEffect, useState } from "react";
import {
  getUtilization,
  getIdleAssets,
  getDowntime,
  getRevenueImpact,
  getUtilizationForecast,
} from "../api/analyticsApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState({
    utilization: [],
    idleAssets: [],
    downtime: [],
    revenueImpact: [],
    forecast: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [
          utilizationData,
          idleAssetsData,
          downtimeData,
          revenueData,
          forecastData,
        ] = await Promise.all([
          getUtilization(),
          getIdleAssets(),
          getDowntime(),
          getRevenueImpact(),
          getUtilizationForecast(),
        ]);

        setData({
          utilization: utilizationData || [],
          idleAssets: idleAssetsData || [],
          downtime: downtimeData || [],
          revenueImpact: revenueData || [],
          forecast: forecastData || [],
        });
      } catch (err) {
        setError("Failed to fetch analytics: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div className="text-white p-8">Loading analytics...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  const totalAssets = data.utilization.length;

  const avgUtilization =
    totalAssets > 0
      ? data.utilization.reduce((acc, item) => acc + item.utilization_percentage, 0) /
      totalAssets
      : 0;

  const totalIdleCount = data.idleAssets.filter((item) => item.status === "underutilized").length;
  const highRiskAssets = data.utilization.filter((item) => item.utilization_percentage < 20).length;

  const totalDowntimeHours = data.downtime.reduce((acc, curr) => acc + curr.total_downtime_hours, 0);
  const totalRepairCost = data.downtime.reduce((acc, curr) => acc + curr.estimated_repair_cost, 0);

  const totalRevenueLost = data.revenueImpact.reduce((acc, curr) => acc + curr.total_downtime_loss, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Overview Dashboard</h1>

      {/* KPI SUMMARIES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
          <h3 className="text-gray-600 font-semibold mb-2">Total Assets</h3>
          <p className="text-3xl font-bold text-black">{totalAssets}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
          <h3 className="text-gray-600 font-semibold mb-2">Avg Utilization</h3>
          <p className="text-3xl font-bold text-yellow-500">
            {avgUtilization.toFixed(1)}%
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg flex justify-between">
          <div>
            <h3 className="text-gray-400 font-semibold mb-2">Idle Assets</h3>
            <p className="text-3xl font-bold text-orange-400">{totalIdleCount}</p>
          </div>
          <div className="border-l border-gray-800 pl-4">
            <h3 className="text-gray-400 font-semibold mb-2">High Risk</h3>
            <p className="text-3xl font-bold text-red-500">{highRiskAssets}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
          <h3 className="text-gray-600 font-semibold mb-2">Downtime Impact</h3>
          <p className="text-xl font-bold text-red-500">
            -${totalRevenueLost.toLocaleString()} <span className="text-sm font-normal text-gray-500">Revenue</span>
          </p>
          <p className="text-xl font-bold text-orange-400">
            -${totalRepairCost.toLocaleString()} <span className="text-sm font-normal text-gray-500">Repair</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* CHART SECTION */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-black">Utilization Forecast (Q2)</h2>
          <div className="h-72 w-full text-xs" style={{ minHeight: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.forecast}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="month" stroke="#9ca3af" tickMargin={10} />
                <YAxis stroke="#9ca3af" domain={['dataMin - 10', 'dataMax + 10']} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '12px', color: '#000' }}
                  itemStyle={{ color: '#ef4444', fontWeight: 'bold' }}
                />
                <Line
                  type="monotone"
                  dataKey="projected_utilization_percentage"
                  name="Projected Utilization (%)"
                  stroke="#ef4444"
                  strokeWidth={4}
                  dot={{ r: 5, fill: '#ef4444', strokeWidth: 2, stroke: '#ffffff' }}
                  activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* COMBINED ASSET DETAILS LIST */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg flex flex-col h-full max-h-[416px]">
          <h2 className="text-xl font-semibold mb-4 text-black">Current Fleet Overview</h2>
          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {data.utilization.map((item) => {
              const isIdle = data.idleAssets.some(idle => idle.asset_id === item.asset_id && idle.status === "underutilized");
              const downtime = data.downtime.find(d => d.asset_id === item.asset_id);
              const impact = data.revenueImpact.find(r => r.asset_id === item.asset_id);

              return (
                <div key={item.asset_id} className="bg-gray-800 p-5 rounded-xl border border-gray-800 flex justify-between items-center transition-all hover:border-gray-600">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-bold text-lg text-white">{item.asset_id}</p>
                      {isIdle && (
                        <span className="bg-red-900/30 text-red-500 border border-red-500/50 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Idle
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">
                      {item.total_hours_used} <span className="text-gray-500 text-xs">hrs used</span> | {item.total_idle_hours} <span className="text-gray-500 text-xs">hrs idle</span>
                    </p>
                    {(downtime || impact) && (
                      <p className="text-xs font-semibold text-red-400 mt-1">
                        {downtime ? `${downtime.total_downtime_hours} hrs down` : ''}
                        {impact ? ` • -$${impact.total_downtime_loss.toLocaleString()} lost` : ''}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={`text-3xl font-bold ${item.utilization_percentage >= 50 ? 'text-green-500' : 'text-orange-500'}`}>
                      {item.utilization_percentage}<span className="text-lg text-gray-500">%</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
