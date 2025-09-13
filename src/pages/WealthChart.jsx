// src/pages/WealthChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
  Scatter,
} from "recharts";

export default function WealthChart({ dataFR, dataWorld, result, country }) {
  const chartData = country === "World" ? dataWorld : dataFR;

  if (!chartData?.length) return null;

  // --- Interpolation Patrimoine ---
  const xPercentRaw = result?.income_percentile_country * 100 || 0;
  const xPercent = Math.max(
    chartData[0].percentile,
    Math.min(xPercentRaw, chartData[chartData.length - 1].percentile)
  );


  let interpolatedY = chartData[0].wealth; // utiliser wealth
  for (let i = 1; i < chartData.length; i++) {
    const prev = chartData[i - 1];
    const curr = chartData[i];
    if (xPercent >= prev.percentile && xPercent <= curr.percentile) {
      const ratio = (xPercent - prev.percentile) / (curr.percentile - prev.percentile);
      interpolatedY = prev.wealth + ratio * (curr.wealth - prev.wealth);
      break;
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700">
        Distribution du patrimoine ({country === "FR" ? "France" : "Monde"})
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="percentile" />
          <YAxis />
          <Line type="monotone" dataKey="wealth" stroke="#3B82F6" />
          <Tooltip />

          <Scatter data={[{ percentile: xPercent, wealth: interpolatedY }]} fill="#3B82F6">
            <ReferenceDot
              x={xPercent}
              y={interpolatedY}
              r={6}
              fill="#3B82F6"
              stroke="#3B82F6"
              label={{ value: "Moi", position: "top", fill: "#3B82F6", fontWeight: "bold" }}
            />
          </Scatter>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
