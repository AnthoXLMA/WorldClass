// src/components/SimulationResults.jsx
export default function SimulationResults({ result }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 space-y-2">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Résultats de la simulation</h2>
      <p>Percentile revenu: {result?.income_percentile_country ? (result.income_percentile_country*100).toFixed(0) : "-"}%</p>
      <p>Percentile patrimoine: {result?.wealth_percentile_country ? (result.wealth_percentile_country*100).toFixed(0) : "-"}%</p>
      <p>Classe sociale: <b>{result?.class_country || "-"}</b></p>
    </div>
  );
}
