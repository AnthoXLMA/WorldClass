// src/components/CountrySelector.jsx
import React from "react";

// src/components/CountrySelector.jsx
export default function CountrySelector({ country, setCountry }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-4 flex items-center space-x-4">
      <label className="font-semibold text-gray-700">Pays :</label>
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="border border-gray-300 rounded-lg p-2"
      >
        <option value="FR">France</option>
        <option value="World">Monde</option>
      </select>
    </div>
  );
}
