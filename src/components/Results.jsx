// src/components/Results.jsx
export default function Results({ result }) {
  const formatPercent = (val) =>
    val !== undefined ? `${(val * 100).toFixed(0)}%` : "-";

  // Définition simple pour aider l'utilisateur
  const percentileDescription = {
    income_country:
      "Indique votre position dans la distribution des revenus en France. Ex : 70% signifie que vous gagnez plus que 70% des Français.",
    income_world:
      "Indique votre position dans la distribution des revenus dans le monde. Ex : 50% signifie que vous gagnez plus que la moitié des personnes sur Terre.",
    wealth_country:
      "Indique votre position dans la distribution du patrimoine en France. Ex : 30% signifie que vous possédez plus que 30% des Français.",
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Résultats</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Percentile revenu France */}
        <div className="p-4 bg-indigo-50 rounded-xl shadow-inner">
          <h3 className="text-indigo-700 font-semibold">Revenu (France)</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {formatPercent(result?.income_percentile_country)}
          </p>
          <p className="text-sm text-gray-500 mt-1">{percentileDescription.income_country}</p>
        </div>

        {/* Percentile revenu Monde */}
        <div className="p-4 bg-orange-50 rounded-xl shadow-inner">
          <h3 className="text-orange-700 font-semibold">Revenu (Monde)</h3>
          <p className="text-2xl font-bold text-orange-600">
            {formatPercent(result?.income_percentile_world)}
          </p>
          <p className="text-sm text-gray-500 mt-1">{percentileDescription.income_world}</p>
        </div>

        {/* Percentile patrimoine */}
        <div className="p-4 bg-green-50 rounded-xl shadow-inner">
          <h3 className="text-green-700 font-semibold">Patrimoine</h3>
          <p className="text-2xl font-bold text-green-600">
            {formatPercent(result?.wealth_percentile_country)}
          </p>
          <p className="text-sm text-gray-500 mt-1">{percentileDescription.wealth_country}</p>
        </div>

        {/* Classe sociale */}
        <div className="p-4 bg-gray-50 rounded-xl shadow-inner flex flex-col justify-center">
          <h3 className="text-gray-700 font-semibold mb-2">Classe sociale</h3>
          <span className="text-xl font-bold text-gray-800">
            {result?.class_country || "-"}
          </span>
          <p className="text-sm text-gray-500 mt-1">
            Basé sur votre revenu et patrimoine, cette catégorie reflète votre position sociale en France.
          </p>
        </div>
      </div>
    </div>
  );
}
