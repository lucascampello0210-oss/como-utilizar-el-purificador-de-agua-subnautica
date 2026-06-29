import { useState } from "react";
import BottomNav from "../components/BottomNav";

const ESTOQUE_INICIAL = [
  {
    id: 1,
    nome: "Dipirona 500mg",
    lote: "DIP2024",
    quantidade: 750,
    total: 1000,
    nivel: "normal",
  },
  {
    id: 2,
    nome: "Paracetamol 750mg",
    lote: "PAR2024",
    quantidade: 150,
    total: 1000,
    nivel: "baixo",
  },
  {
    id: 3,
    nome: "Amoxicilina 500mg",
    lote: "AMO2024",
    quantidade: 20,
    total: 1000,
    nivel: "critico",
  },
];

const NIVEL_CONFIG = {
  normal: {
    badge: "bg-lime-200 text-lime-800",
    bar: "bg-gradient-to-r from-green-500 to-lime-500",
    label: "Normal",
  },
  baixo: {
    badge: "bg-yellow-200 text-yellow-800",
    bar: "bg-gradient-to-r from-yellow-500 to-orange-500",
    label: "Baixo",
  },
  critico: {
    badge: "bg-red-200 text-red-800",
    bar: "bg-gradient-to-r from-red-500 to-pink-500",
    label: "Crítico",
  },
};

const FILTROS = ["Todos", "Baixo", "Crítico"];

export default function EstoquePage({ navigate }) {
  const [busca, setBusca] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const [estoque] = useState(ESTOQUE_INICIAL);

  const filtrado = estoque.filter((item) => {
    const matchBusca = item.nome.toLowerCase().includes(busca.toLowerCase());
    const matchFiltro =
      filtroAtivo === "Todos" ||
      (filtroAtivo === "Baixo" && item.nivel === "baixo") ||
      (filtroAtivo === "Crítico" && item.nivel === "critico");
    return matchBusca && matchFiltro;
  });

  const totalItens = estoque.reduce((acc, i) => acc + i.quantidade, 0);
  const totalNormal = estoque
    .filter((i) => i.nivel === "normal")
    .reduce((acc, i) => acc + i.quantidade, 0);
  const totalCritico = estoque
    .filter((i) => i.nivel === "critico")
    .reduce((acc, i) => acc + i.quantidade, 0);

  return (
    <div className="min-h-screen pb-24 bg-white dark:bg-slate-900 dark:text-white">
      {/* Header */}
      <header>
        <section className="bg-gray-200 dark:bg-slate-800 border-b border-gray-300 dark:border-slate-700">
          <div className="flex justify-between items-center p-4">
            <button
              type="button"
              onClick={() => navigate("dashboard")}
              aria-label="Voltar"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
              Gestão de Estoque
            </h1>
            <div className="w-6" />
          </div>
        </section>
      </header>

      <main className="flex flex-col gap-5 p-4">
        {/* Busca */}
        <section>
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar Medicamento ou Material..."
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-2.5 text-sm bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </section>

        {/* Filtros */}
        <section className="flex gap-3">
          {FILTROS.map((filtro) => (
            <button
              key={filtro}
              type="button"
              onClick={() => setFiltroAtivo(filtro)}
              className={`font-semibold py-2 px-4 border rounded-lg text-sm transition-colors
                ${
                  filtroAtivo === filtro
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-blue-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 border-blue-400 dark:border-slate-600 hover:bg-blue-200 dark:hover:bg-slate-600"
                }`}
            >
              {filtro}
            </button>
          ))}
        </section>

        {/* Lista de itens */}
        <section>
          <h2 className="font-semibold text-gray-800 dark:text-white mb-3">
            Itens em Estoque
          </h2>
          <div className="flex flex-col gap-3">
            {filtrado.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">
                Nenhum item encontrado.
              </p>
            ) : (
              filtrado.map((item) => {
                const config = NIVEL_CONFIG[item.nivel];
                const porcentagem = Math.round((item.quantidade / item.total) * 100);

                return (
                  <div
                    key={item.id}
                    className="bg-blue-50 dark:bg-slate-700 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-blue-100 dark:border-slate-600"
                  >
                    <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                      {item.nome}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">Lote: {item.lote}</p>

                    <div className="mt-4">
                      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span>Quantidade</span>
                        <span
                          className={`font-bold w-10 h-10 rounded-xl flex items-center justify-center text-sm ${config.badge}`}
                        >
                          {item.quantidade}
                        </span>
                      </div>
                      <div className="w-full bg-gray-300 dark:bg-slate-600 rounded-full h-2">
                        <div
                          className={`${config.bar} h-2 rounded-full transition-all`}
                          style={{ width: `${porcentagem}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-400">{porcentagem}%</span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badge}`}
                        >
                          {config.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Resumo */}
        <section className="flex gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl border-2 border-blue-300 dark:border-blue-700 flex-1 flex flex-col items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400">Total</span>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {totalItens}
            </span>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl border-2 border-green-300 dark:border-green-700 flex-1 flex flex-col items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400">Normal</span>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {totalNormal}
            </span>
          </div>
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl border-2 border-red-300 dark:border-red-700 flex-1 flex flex-col items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400">Crítico</span>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {totalCritico}
            </span>
          </div>
        </section>

        {/* Nova evolução */}
        <section>
          <button
            type="button"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-5 rounded-lg h-14 w-full flex items-center justify-center gap-2 transition-colors"
          >
            <span className="text-lg">+</span>
            <span>Novo Item</span>
          </button>
        </section>
      </main>

      <BottomNav navigate={navigate} active="dashboard" />
    </div>
  );
}
