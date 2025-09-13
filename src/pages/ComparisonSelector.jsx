// src/components/ComparisonSelector.jsx
export default function ComparisonSelector({ countries, selected, setSelected }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Comparer avec un pays</h2>
      <select
        value={selected}
        onChange={e => setSelected(e.target.value)}
        className="w-full border rounded-lg p-2"
      >
        {countries.map((c, i) => (
          <option key={i} value={c.code}>{c.name}</option>
        ))}
      </select>
    </div>
  );
}
