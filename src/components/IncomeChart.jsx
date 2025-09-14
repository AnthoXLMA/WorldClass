// src/components/IncomeChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from "recharts";

export default function IncomeChart({ dataFR, dataWorld, result, country }) {
  const chartData = country === "World" ? dataWorld : dataFR;

  if (!chartData?.length) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-6 text-center text-gray-400">
        Chargement des données...
      </div>
    );
  }

  // --- Interpolation Revenu ---
  const xPercentRaw = result?.income_percentile_country * 100;
  if (xPercentRaw == null) return null;

  const xPercent = Math.max(
    chartData[0].percentile,
    Math.min(xPercentRaw, chartData[chartData.length - 1].percentile)
  );

  let interpolatedY = chartData[0].income;
  if (xPercent <= chartData[0].percentile) interpolatedY = chartData[0].income;
  else if (xPercent >= chartData[chartData.length - 1].percentile)
    interpolatedY = chartData[chartData.length - 1].income;
  else {
    for (let i = 1; i < chartData.length; i++) {
      const prev = chartData[i - 1];
      const curr = chartData[i];
      if (xPercent >= prev.percentile && xPercent <= curr.percentile) {
        const ratio = (xPercent - prev.percentile) / (curr.percentile - prev.percentile);
        interpolatedY = prev.income + ratio * (curr.income - prev.income);
        break;
      }
    }
  }

  const countryNameMap = {
    FR: "France",
    US: "USA",
    IN: "Inde",
    BR: "Brésil",
    World: "Monde",
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700">
        Distribution des revenus ({countryNameMap[country] || country})
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="percentile" stroke="#a0aec0" />
          <YAxis stroke="#a0aec0" />
          <Tooltip
            formatter={(value) => `${value.toLocaleString()} €`}
            labelFormatter={(label) => `Percentile: ${label}%`}
          />

          <Line type="monotone" dataKey="income" stroke="#5a67d8" strokeWidth={3} />

          {result?.income_percentile_country && (
            <>
              <ReferenceDot
                x={xPercent}
                y={interpolatedY}
                r={6}
                fill="#FF5A5F"
                stroke="#FF5A5F"
                label={{
                  value: `Moi: ${interpolatedY.toLocaleString()} €`,
                  position: "top",
                  fill: "#FF5A5F",
                  fontWeight: "bold",
                }}
              />
              <ReferenceLine x={xPercent} stroke="#FF5A5F" strokeDasharray="3 3" />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
