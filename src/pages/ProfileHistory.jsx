// src/components/ProfileHistory.jsx
export default function ProfileHistory({ history }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Historique des modifications</h2>
      <ul className="space-y-2 text-gray-600">
        {history.map((item, index) => (
          <li key={index}>{item.date}: revenu {item.income}€, patrimoine {item.wealth}€</li>
        ))}
      </ul>
    </div>
  );
}
