// src/components/QuickStats.jsx
export default function QuickStats({ result }) {
  // Helpers
  const formatPercentile = (val) => {
    if (!val && val !== 0) return null;
    const pct = Math.round(val * 100);
    return {
      pct,
      text: `Vous gagnez plus que ${pct} % des personnes`,
    };
  };

  const incomeFR = formatPercentile(result?.income_percentile_country);
  const incomeWorld = formatPercentile(result?.income_percentile_world);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Revenu FR */}
      <div className="bg-white rounded-3xl shadow-lg p-4 text-center">
        <h3 className="text-gray-500">Revenu en France</h3>
        {incomeFR ? (
          <>
            <p className="text-indigo-600 font-bold text-xl">{incomeFR.pct}%</p>
            <p className="text-sm text-gray-600 mt-1">{incomeFR.text} en France</p>
          </>
        ) : (
          <p className="text-gray-400">-</p>
        )}
      </div>

      {/* Revenu Monde */}
      <div className="bg-white rounded-3xl shadow-lg p-4 text-center">
        <h3 className="text-gray-500">Revenu Monde</h3>
        {incomeWorld ? (
          <>
            <p className="text-orange-500 font-bold text-xl">{incomeWorld.pct}%</p>
            <p className="text-sm text-gray-600 mt-1">{incomeWorld.text} dans le monde</p>
          </>
        ) : (
          <p className="text-gray-400">-</p>
        )}
      </div>

      {/* Classe sociale */}
      <div className="bg-white rounded-3xl shadow-lg p-4 text-center">
        <h3 className="text-gray-500">Classe sociale</h3>
        {result?.class_country ? (
          <>
            <p className="text-green-500 font-bold text-xl">{result.class_country}</p>
            <p className="text-sm text-gray-600 mt-1">
              Basé sur votre revenu et patrimoine en {result?.country || "France"}.
            </p>
          </>
        ) : (
          <p className="text-gray-400">-</p>
        )}
      </div>
    </div>
  );
}
