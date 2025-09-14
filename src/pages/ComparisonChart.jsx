// src/components/ComparisonChart.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ComparisonChart({ data1 = [], data2 = [], label1 = "Série 1", label2 = "Série 2" }) {
  // --- Fusionner les datasets par percentile ---
  const mergedData = data1.map((d, i) => ({
    percentile: d.percentile,
    series1: d.income,
    series2: data2[i]?.income ?? 0,
  }));

  if (!mergedData.length) return null;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Comparaison de revenus</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mergedData}>
          <XAxis dataKey="percentile" stroke="#a0aec0" />
          <YAxis stroke="#a0aec0" />
          <Tooltip contentStyle={{ backgroundColor: "#f7fafc", borderRadius: 12 }} />

          {/* Ligne de la première série */}
          <Line type="monotone" dataKey="series1" stroke="#5a67d8" strokeWidth={3} name={label1} />

          {/* Ligne de la deuxième série */}
          <Line type="monotone" dataKey="series2" stroke="#f6ad55" strokeWidth={3} strokeDasharray="5 5" name={label2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
