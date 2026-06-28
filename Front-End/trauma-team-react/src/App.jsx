import { useState, useEffect, createContext, useContext } from "react";

// ─── Dark Mode Context ────────────────────────────────────────────────────────
export const ThemeContext = createContext(null);

export function useTheme() {
  return useContext(ThemeContext);
}

// ─── Simple Router ────────────────────────────────────────────────────────────
// Lightweight hash-based router so the app works without react-router-dom
function useHashRouter() {
  const [page, setPage] = useState(() => window.location.hash.replace("#", "") || "login");

  useEffect(() => {
    const onHashChange = () => setPage(window.location.hash.replace("#", "") || "login");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (to) => { window.location.hash = to; };
  return { page, navigate };
}

// ─── Pages ────────────────────────────────────────────────────────────────────
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PacientesPage from "./pages/PacientesPage";
import PrescricaoPage from "./pages/PrescricaoPage";
import ConfigPage from "./pages/ConfigPage";

export default function App() {
  const { page, navigate } = useHashRouter();
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  // Sync dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const renderPage = () => {
    switch (page) {
      case "login":      return <LoginPage    navigate={navigate} />;
      case "register":   return <RegisterPage navigate={navigate} />;
      case "dashboard":  return <DashboardPage navigate={navigate} />;
      case "pacientes":  return <PacientesPage navigate={navigate} />;
      case "prescricao": return <PrescricaoPage navigate={navigate} />;
      case "config":     return <ConfigPage   navigate={navigate} />;
      default:           return <LoginPage    navigate={navigate} />;
    }
  };

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div className="bg-white text-black dark:bg-slate-900 dark:text-white transition-colors duration-300 min-h-screen">
        {renderPage()}
      </div>
    </ThemeContext.Provider>
  );
}
