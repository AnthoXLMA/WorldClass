// src/components/SimulationSliders.jsx
export default function SimulationSliders({ income, setIncome, wealth, setWealth }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Revenu simulé</h2>
        <input
          type="range"
          min="10000"
          max="120000"
          step="1000"
          value={income}
          onChange={e => setIncome(Number(e.target.value))}
          className="w-full h-3 bg-indigo-100 rounded-full accent-indigo-600 cursor-pointer"
        />
        <p className="mt-2 text-indigo-600 font-bold text-lg">{income} €</p>
      </div>
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Patrimoine simulé</h2>
        <input
          type="range"
          min="0"
          max="500000"
          step="1000"
          value={wealth}
          onChange={e => setWealth(Number(e.target.value))}
          className="w-full h-3 bg-indigo-100 rounded-full accent-indigo-600 cursor-pointer"
        />
        <p className="mt-2 text-indigo-600 font-bold text-lg">{wealth} €</p>
      </div>
    </div>
  );
}
