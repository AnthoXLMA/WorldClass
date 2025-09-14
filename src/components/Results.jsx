export default function Results({ result }) {
  const formatPercent = (val) =>
    val !== undefined ? `${(val * 100).toFixed(0)}%` : "-";

  const explainPercent = (val, scope = "personnes") => {
    if (val === undefined) return "-";
    const pct = (val * 100).toFixed(0);
    return `Vous êtes au ${pct}ᵉ percentile → vous gagnez plus que ${pct}% des ${scope}.`;
  };

  const classColor = (cls) => {
    if (!cls) return "bg-gray-100 text-gray-800";
    if (cls.includes("aisée")) return "bg-green-100 text-green-800";
    if (cls.includes("supérieure")) return "bg-blue-100 text-blue-800";
    if (cls.includes("moyenne")) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Résultats détaillés</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-50 rounded-xl shadow-inner">
          <h3 className="text-indigo-700 font-semibold">Revenu (France)</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {formatPercent(result?.income_percentile_country)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {explainPercent(result?.income_percentile_country, "Français")}
          </p>
        </div>

        <div className="p-4 bg-orange-50 rounded-xl shadow-inner">
          <h3 className="text-orange-700 font-semibold">Revenu (Monde)</h3>
          <p className="text-2xl font-bold text-orange-600">
            {formatPercent(result?.income_percentile_world)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {explainPercent(result?.income_percentile_world, "habitants du monde")}
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-xl shadow-inner">
          <h3 className="text-green-700 font-semibold">Patrimoine</h3>
          <p className="text-2xl font-bold text-green-600">
            {formatPercent(result?.wealth_percentile_country)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {explainPercent(result?.wealth_percentile_country, "Français (patrimoine)")}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl shadow-inner flex flex-col justify-center">
          <h3 className="text-gray-700 font-semibold mb-2">Classe sociale</h3>
          <span className={`inline-block px-3 py-1 rounded-full w-fit font-semibold ${classColor(result?.class_country)}`}>
            {result?.class_country || "-"}
          </span>
          <p className="text-sm text-gray-600 mt-2">
            Basé sur vos revenus et patrimoine, cette catégorie reflète votre position sociale en France.
          </p>
        </div>
      </div>
    </div>
  );
}
