import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Menu } from "lucide-react";
import debounce from "lodash.debounce";

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
import CTAButton from "./pages/CTAButton";

function App() {
  const [income, setIncome] = useState(50000);
  const [wealth, setWealth] = useState(100000);
  const [user, setUser] = useState({
    avatar: "/default-avatar.png",
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    country: "France",
  });

  const [incomeFR, setIncomeFR] = useState([]);
  const [wealthFR, setWealthFR] = useState([]);
  const [incomeWorld, setIncomeWorld] = useState([]);
  const [wealthWorld, setWealthWorld] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [country, setCountry] = useState("FR");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Charger les distributions
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

  // Fonction de calcul percentile
  const fetchResult = async (incomeVal, wealthVal) => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ income: incomeVal, wealth: wealthVal }),
      });
      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // Debounced version pour recalcul automatique
  const debouncedFetchResult = useCallback(debounce(fetchResult, 300), []);

  // Recalcul automatique à chaque changement de slider
  useEffect(() => {
    debouncedFetchResult(income, wealth);
  }, [income, wealth, debouncedFetchResult]);

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

          <div className="p-6 space-y-6">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="space-y-6">
                    {/* Résumé rapide */}
                    {result && (
                      <div className={`rounded-2xl shadow-md p-4 text-center ${result.class_country === "Classe aisée" ? "bg-green-600 text-white" : result.class_country.includes("supérieure") ? "bg-blue-600 text-white" : result.class_country.includes("moyenne") ? "bg-yellow-500 text-white" : "bg-red-500 text-white"}`}>
                        <p className="text-lg">
                          Vous gagnez plus que{" "}
                          <span className="font-bold">
                            {Math.round(result.income_percentile_country * 100)}%
                          </span>{" "}
                          des Français.
                        </p>
                        <p className="text-sm opacity-90">
                          Classe sociale estimée :{" "}
                          <span className="font-semibold">{result.class_country}</span>
                        </p>
                      </div>
                    )}

                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <Sliders
                          income={income}
                          setIncome={setIncome}
                          wealth={wealth}
                          setWealth={setWealth}
                        />

                        <CTAButton
                          text={loading ? "⏳ Calcul en cours..." : "Recalculer"}
                          onClick={() => fetchResult(income, wealth)}
                        />

                        <Results result={result} />
                        <CountrySelector country={country} setCountry={setCountry} />
                      </div>

                      <div className="space-y-6">
                        <ComparisonChart
                          data1={incomeFR}
                          data2={incomeWorld}
                          label1="France"
                          label2="Monde"
                          userIncome={income}
                        />

                        <IncomeChart
                          dataFR={incomeFR}
                          dataWorld={incomeWorld}
                          result={result}
                          country={country}
                          highlightIncome={income}
                        />

                        <WealthChart
                          dataFR={wealthFR}
                          dataWorld={wealthWorld}
                          result={result}
                          country={country}
                          highlightWealth={wealth}
                        />
                      </div>
                    </div>

                    {/* Sticky CTA mobile */}
                    <div className="sm:hidden fixed bottom-4 right-4 z-50">
                      <CTAButton
                        text={loading ? "⏳ Calcul en cours..." : "Calculer"}
                        onClick={() => fetchResult(income, wealth)}
                      />
                    </div>
                  </div>
                }
              />
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
