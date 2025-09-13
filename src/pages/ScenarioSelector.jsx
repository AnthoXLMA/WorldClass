// src/components/ScenarioSelector.jsx
export default function ScenarioSelector({ scenarios, setScenario }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Choisir un scénario</h2>
      <select
        onChange={e => setScenario(e.target.value)}
        className="w-full border rounded-lg p-2"
      >
        {scenarios.map((s, i) => (
          <option key={i} value={s.name}>{s.name}</option>
        ))}
      </select>
    </div>
  );
}
