// src/components/QuickStats.jsx
export default function QuickStats({ result }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-3xl shadow-lg p-4 text-center">
        <h3 className="text-gray-500">Percentile Revenu FR</h3>
        <p className="text-indigo-600 font-bold text-xl">
          {result?.income_percentile_country ? (result.income_percentile_country * 100).toFixed(0) : "-"}%
        </p>
      </div>
      <div className="bg-white rounded-3xl shadow-lg p-4 text-center">
        <h3 className="text-gray-500">Percentile Revenu Monde</h3>
        <p className="text-orange-500 font-bold text-xl">
          {result?.income_percentile_world ? (result.income_percentile_world * 100).toFixed(0) : "-"}%
        </p>
      </div>
      <div className="bg-white rounded-3xl shadow-lg p-4 text-center">
        <h3 className="text-gray-500">Classe sociale</h3>
        <p className="text-green-500 font-bold text-xl">{result?.class_country || "-"}</p>
      </div>
    </div>
  );
}
