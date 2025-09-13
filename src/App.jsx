// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Menu } from "lucide-react";

// Layout & UI
import Sidebar from "./components/Sidebar";
import CountrySelector from "./components/CountrySelector";

// Pages & Composants
import Sliders from "./components/Sliders";
import Results from "./components/Results";
import IncomeChart from "./components/IncomeChart";
import WealthChart from "./pages/WealthChart";
import ProfileCard from "./pages/ProfileCard";
import ComparisonChart from "./pages/ComparisonChart";
import SimulationResults from "./pages/SimulationResults";
import AboutText from "./pages/AboutText";

function App() {
  // --- États utilisateur ---
  const [income, setIncome] = useState(50000);
  const [wealth, setWealth] = useState(100000);
  const [user, setUser] = useState({
    avatar: "/default-avatar.png",
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    country: "France",
  });

  // --- Données API (séparées revenus / patrimoine) ---
  const [incomeFR, setIncomeFR] = useState([]);
  const [wealthFR, setWealthFR] = useState([]);
  const [incomeWorld, setIncomeWorld] = useState([]);
  const [wealthWorld, setWealthWorld] = useState([]);

  // --- États UI ---
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [country, setCountry] = useState("FR");
  const [result, setResult] = useState(null);

  // Charger les distributions au montage
  useEffect(() => {
  fetch("http://127.0.0.1:8000/distributions/FR")
    .then(res => res.json())
    .then(fr => {
      setIncomeFR(fr.income);
      setWealthFR(fr.wealth);
    });

  fetch("http://127.0.0.1:8000/distributions/World")
    .then(res => res.json())
    .then(world => {
      setIncomeWorld(world.income);
      setWealthWorld(world.wealth);
    });
}, []);


  // Recalculer résultats quand sliders changent
  useEffect(() => {
    fetch("http://127.0.0.1:8000/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ income, wealth }),
    })
      .then((res) => res.json())
      .then((json) => setResult(json))
      .catch(console.error);
  }, [income, wealth]);

  return (
    <Router>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Overlay mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-20 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Contenu principal */}
        <main className="flex-1 flex flex-col overflow-auto">
          {/* Topbar mobile */}
          <header className="flex items-center justify-between p-4 sm:hidden bg-white shadow-md">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Menu className="w-6 h-6 text-indigo-600" />
            </button>
            <h1 className="text-xl font-bold text-indigo-600">Atlas Social</h1>
            <div />
          </header>

          {/* Routes */}
          <div className="p-6 space-y-6">
            <Routes>
              {/* Accueil */}
              <Route
                path="/"
                element={
                  <div className="space-y-6">
                    <Sliders
                      income={income}
                      setIncome={setIncome}
                      wealth={wealth}
                      setWealth={setWealth}
                    />
                    <Results result={result} />
                    <CountrySelector country={country} setCountry={setCountry} />

                    {/* Graphiques séparés */}
                    <IncomeChart
                      dataFR={incomeFR}
                      dataWorld={incomeWorld}
                      result={result}
                      country={country}
                    />

                    <WealthChart
                      dataFR={wealthFR}
                      dataWorld={wealthWorld}
                      result={result}
                      country={country}
                    />
                  </div>
                }
              />
              {/* Autres pages */}
              <Route path="/profil" element={<ProfileCard user={user} />} />
              <Route path="/comparisons" element={<ComparisonChart />} />
              <Route path="/simulations" element={<SimulationResults />} />
              <Route path="/about" element={<AboutText />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
