// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { Home, User, BarChart2, Globe, TrendingUp, Info } from "lucide-react";

const menuItems = [
  { name: "Accueil", icon: Home, path: "/" },
  { name: "Mon Profil", icon: User, path: "/profil" },
  { name: "Mes Résultats", icon: BarChart2, path: "/" },
  { name: "Comparaisons", icon: Globe, path: "/comparisons" },
  { name: "Simulations", icon: TrendingUp, path: "/simulations" },
  { name: "À propos", icon: Info, path: "/about" },
];

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const renderButton = ({ name, icon: Icon, path }) => (
    <Link key={name} to={path}>
      <button
        onClick={() => setOpen(false)}
        className={`flex items-center w-full px-4 py-2 text-left rounded-xl transition ${
          location.pathname === path
            ? "bg-indigo-600 text-white"
            : "text-gray-700 hover:bg-indigo-50"
        }`}
      >
        <Icon className="w-5 h-5 mr-3" />
        {name}
      </button>
    </Link>
  );

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="hidden sm:flex w-64 bg-white shadow-xl flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-indigo-600">🌍 WorldClass</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map(renderButton)}
        </nav>
        <div className="p-4 border-t text-sm text-gray-500">© 2025 WorldClass</div>
      </aside>

      {/* Sidebar mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform sm:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-indigo-600">🌍 WorldClass</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">{menuItems.map(renderButton)}</nav>
        <div className="p-4 border-t text-sm text-gray-500">© 2025 WorldClass</div>
      </aside>
    </>
  );
}
