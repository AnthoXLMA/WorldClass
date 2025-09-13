// src/components/Sliders.jsx
export default function Sliders({ income, setIncome, wealth, setWealth }) {
  return (
    <div className="space-y-6">
      {/* Revenu */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-1">Revenu annuel</h2>
        <p className="text-gray-500 mb-3 text-sm">
          Le revenu annuel correspond à l'ensemble de vos revenus avant impôts.
          Cela permet de situer votre position par rapport aux autres personnes en France et dans le monde.
        </p>
        <input
          type="range"
          min="10000"
          max="120000"
          step="1000"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="w-full h-3 bg-indigo-100 rounded-full accent-indigo-600 cursor-pointer"
        />
        <input
          type="number"
          min="10000"
          max="120000"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="mt-2 w-full p-2 border rounded-lg"
        />
        <p className="mt-2 text-indigo-600 font-bold text-lg">{income} €</p>
      </div>

      {/* Patrimoine */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-1">Patrimoine</h2>
        <p className="text-gray-500 mb-3 text-sm">
          Le patrimoine représente l'ensemble de vos biens et économies.
          Il permet de comprendre votre richesse globale et votre position par rapport aux autres.
        </p>
        <input
          type="range"
          min="0"
          max="500000"
          step="1000"
          value={wealth}
          onChange={(e) => setWealth(Number(e.target.value))}
          className="w-full h-3 bg-indigo-100 rounded-full accent-indigo-600 cursor-pointer"
        />
        <input
          type="number"
          min="0"
          max="500000"
          value={wealth}
          onChange={(e) => setWealth(Number(e.target.value))}
          className="mt-2 w-full p-2 border rounded-lg"
        />
        <p className="mt-2 text-indigo-600 font-bold text-lg">{wealth} €</p>
      </div>
    </div>
  );
}

