import { useState, useMemo } from "react";
import BottomNav from "../components/BottomNav";
import { useApi } from "../services/useApi";
import { pacientesApi } from "../services/api";

// ─── Fallback mock enquanto o backend não retorna dados ───────────────────────
const MOCK_PATIENTS = [
  { id: 1, name: "Dr. Renan Silva",  role: "Médico Plantonista", status: "Aguardando" },
  { id: 2, name: "Maria Oliveira",   role: "Cardiologista",      status: "Atendido"   },
  { id: 3, name: "João Pereira",     role: "Clínico Geral",      status: "Em Espera"  },
  { id: 4, name: "Ana Costa",        role: "Neurologista",       status: "Liberado"   },
];

const STATUS_STYLES = {
  "Aguardando": "text-green-700 bg-green-100",
  "Atendido":   "text-blue-700  bg-blue-100",
  "Em Espera":  "text-yellow-700 bg-yellow-100",
  "Liberado":   "text-gray-600  bg-gray-200",
};

const FILTROS = ["Todos", "Aguardando", "Atendido", "Em Espera", "Liberado"];

// ─── Skeleton loader ─────────────────────────────────────────────────────────
function PatientSkeleton() {
  return (
    <div className="bg-gray-100 dark:bg-slate-700 w-full p-4 border border-gray-200 dark:border-slate-600 rounded-xl shadow-sm animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-slate-600" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-slate-500 rounded w-1/2" />
        </div>
        <div className="h-6 w-20 bg-gray-200 dark:bg-slate-500 rounded-full" />
      </div>
    </div>
  );
}

export default function PacientesPage({ navigate }) {
  const [search,     setSearch]     = useState("");
  const [filtroOpen, setFiltroOpen] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");

  // ── Busca os pacientes do backend; usa MOCK se a API falhar ──────────────
  const { data: apiData, loading, error } = useApi(pacientesApi.listar, []);
  const patients = apiData ?? MOCK_PATIENTS;

  // ── Filtragem local (nome + status) ───────────────────────────────────────
  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchFiltro =
        filtroAtivo === "Todos" || p.status === filtroAtivo;
      return matchSearch && matchFiltro;
    });
  }, [patients, search, filtroAtivo]);

  return (
    <div className="min-h-screen pb-20 bg-white dark:bg-slate-900 dark:text-white">
      {/* Header */}
      <header className="pb-4">
        <section className="bg-gray-200 dark:bg-slate-800 border-b border-gray-300 dark:border-slate-700">
          <div className="flex justify-between items-center p-4 sm:px-6 lg:px-8 lg:max-w-5xl lg:mx-auto">
            <button
              type="button"
              onClick={() => navigate("dashboard")}
              aria-label="Voltar"
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Meus Pacientes</h1>
            <div className="w-6" />
          </div>
        </section>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 lg:max-w-5xl lg:mx-auto lg:w-full flex flex-col gap-6">
        {/* Banner de erro de conexão */}
        {error && (
          <div className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg px-3 py-2">
            ⚠️ Não foi possível conectar ao servidor. Exibindo dados de demonstração.
          </div>
        )}

        {/* Search bar */}
        <section>
          <div className="flex shadow-sm rounded-lg overflow-hidden">
            {/* Filter dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setFiltroOpen((prev) => !prev)}
                className="inline-flex items-center shrink-0 z-10 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 hover:bg-gray-200 dark:hover:bg-slate-600 font-medium text-sm px-4 py-2.5 rounded-l-lg focus:outline-none transition-colors"
              >
                <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z" />
                </svg>
                {filtroAtivo === "Todos" ? "Filtros" : filtroAtivo}
                <svg className="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                </svg>
              </button>

              {filtroOpen && (
                <div className="absolute top-full left-0 z-20 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg w-44">
                  <ul className="p-2 text-sm text-gray-700 dark:text-gray-200 font-medium">
                    {FILTROS.map((f) => (
                      <li key={f}>
                        <button
                          type="button"
                          onClick={() => { setFiltroAtivo(f); setFiltroOpen(false); }}
                          className={`block w-full text-left p-2 rounded-md transition-colors ${
                            filtroAtivo === f
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                              : "hover:bg-gray-100 dark:hover:bg-slate-700"
                          }`}
                        >
                          {f}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-3 py-2.5 bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white text-sm focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 focus:outline-none"
              placeholder="Pesquisar Pacientes"
            />
            <button
              type="button"
              className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 border border-transparent font-medium text-sm px-4 py-2.5 rounded-r-lg focus:outline-none transition-colors"
              aria-label="Pesquisar"
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
            </button>
          </div>
        </section>

        {/* Chips de status ativos */}
        {filtroAtivo !== "Todos" && (
          <div className="flex items-center gap-2 -mt-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">Filtrando por:</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[filtroAtivo] ?? "bg-gray-100 text-gray-600"}`}>
              {filtroAtivo}
            </span>
            <button
              type="button"
              onClick={() => setFiltroAtivo("Todos")}
              className="text-xs text-blue-600 dark:text-blue-400 underline"
            >
              Limpar
            </button>
          </div>
        )}

        {/* Patient list */}
        <section>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Pacientes de Hoje
            {!loading && (
              <span className="ml-2 font-medium text-gray-700 dark:text-gray-300">
                ({filtered.length})
              </span>
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {loading ? (
              <>
                <PatientSkeleton />
                <PatientSkeleton />
                <PatientSkeleton />
              </>
            ) : filtered.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">
                Nenhum paciente encontrado{search ? ` para "${search}"` : ""}.
              </p>
            ) : (
              filtered.map((patient) => (
                <div
                  key={patient.id}
                  className="relative bg-gray-100 dark:bg-slate-700 w-full p-4 border border-gray-200 dark:border-slate-600 rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src="/public/dr.png"
                      alt={patient.name}
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-gray-800 dark:text-white truncate">{patient.name}</h5>
                      <span className="text-sm text-blue-600 dark:text-blue-400">{patient.role}</span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${STATUS_STYLES[patient.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {patient.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <BottomNav navigate={navigate} active="pacientes" />
    </div>
  );
}
