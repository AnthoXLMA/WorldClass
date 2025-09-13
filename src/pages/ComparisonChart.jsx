// src/components/ComparisonChart.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ComparisonChart({ data1, data2, label1, label2 }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Comparaison de revenus</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data1}>
          <XAxis dataKey="percentile" stroke="#a0aec0"/>
          <YAxis stroke="#a0aec0"/>
          <Tooltip contentStyle={{ backgroundColor: "#f7fafc", borderRadius: 12 }}/>
          <Line type="monotone" dataKey="income" data={data1} stroke="#5a67d8" strokeWidth={3} name={label1} />
          <Line type="monotone" dataKey="income" data={data2} stroke="#f6ad55" strokeWidth={3} strokeDasharray="5 5" name={label2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
