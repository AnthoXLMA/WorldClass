export default function Stats({ stats }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg space-y-2">
      <h2 className="text-lg font-semibold text-gray-700">Statistiques</h2>
      <p>Gini : {stats.gini}</p>
      <p>PIB / habitant : {stats.gdp_per_capita} €</p>
      <p>Revenu médian : {stats.median_income} €</p>
      <p>Revenu moyen : {stats.mean_income} €</p>
      <p>Patrimoine médian : {stats.median_wealth} €</p>
      <p>Patrimoine moyen : {stats.mean_wealth} €</p>
    </div>
  );
}
