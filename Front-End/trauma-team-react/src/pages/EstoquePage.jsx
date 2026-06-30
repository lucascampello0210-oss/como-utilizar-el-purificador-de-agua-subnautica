import { useState } from "react";
import BottomNav from "../components/BottomNav";
import { estoqueApi } from "../services/api";
import { useApi, useMutation } from "../services/useApi";

const NIVEL_CONFIG = {
  normal:  { badge: "bg-lime-200 text-lime-800",    bar: "bg-gradient-to-r from-green-500 to-lime-500",   label: "Normal"   },
  baixo:   { badge: "bg-yellow-200 text-yellow-800", bar: "bg-gradient-to-r from-yellow-500 to-orange-500", label: "Baixo"    },
  critico: { badge: "bg-red-200 text-red-800",       bar: "bg-gradient-to-r from-red-500 to-pink-500",    label: "Crítico"  },
};

const FILTROS = ["Todos", "Baixo", "Crítico"];

// ─── Modal para adicionar novo item ──────────────────────────────────────────
function NovoItemModal({ onClose, onSalvar, salvando }) {
  const [nome,       setNome]       = useState("");
  const [lote,       setLote]       = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [total,      setTotal]      = useState("1000");

  const nivel = () => {
    const q = Number(quantidade);
    const t = Number(total) || 1000;
    if (q / t < 0.05) return "critico";
    if (q / t < 0.30) return "baixo";
    return "normal";
  };

  const handleSalvar = () => {
    if (!nome.trim() || !quantidade) return;
    onSalvar({ nome, lote, quantidade: Number(quantidade), total: Number(total), nivel: nivel() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-800 w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-5 flex flex-col gap-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">Novo Item de Estoque</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">✕</button>
        </div>

        {[
          { label: "Nome / Medicamento", value: nome,       set: setNome,       placeholder: "Ex: Dipirona 500mg" },
          { label: "Lote",               value: lote,       set: setLote,       placeholder: "Ex: DIP2025"        },
          { label: "Quantidade atual",   value: quantidade, set: setQuantidade, placeholder: "Ex: 500", type: "number" },
          { label: "Capacidade total",   value: total,      set: setTotal,      placeholder: "Ex: 1000", type: "number" },
        ].map(({ label, value, set, placeholder, type = "text" }) => (
          <div key={label}>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1 uppercase tracking-wide">{label}</label>
            <input
              type={type}
              value={value}
              onChange={(e) => set(e.target.value)}
              placeholder={placeholder}
              className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-2 text-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleSalvar}
          disabled={salvando || !nome.trim() || !quantidade}
          className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-bold h-12 w-full rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {salvando ? (
            <>
              <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Salvando...
            </>
          ) : "Salvar Item"}
        </button>
      </div>
    </div>
  );
}

export default function EstoquePage({ navigate }) {
  const [busca,      setBusca]      = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [feedback,    setFeedback]    = useState(null);

  const { data: estoque, loading, error, refetch } = useApi(estoqueApi.listar, []);
  const { mutate: criarItem, loading: salvando }   = useMutation(estoqueApi.criar);

  const lista = estoque ?? [];

  const filtrado = lista.filter((item) => {
    const matchBusca  = item.nome.toLowerCase().includes(busca.toLowerCase());
    const matchFiltro =
      filtroAtivo === "Todos" ||
      (filtroAtivo === "Baixo"    && item.nivel === "baixo")   ||
      (filtroAtivo === "Crítico"  && item.nivel === "critico");
    return matchBusca && matchFiltro;
  });

  const totalItens  = lista.reduce((acc, i) => acc + i.quantidade, 0);
  const totalNormal = lista.filter((i) => i.nivel === "normal") .reduce((acc, i) => acc + i.quantidade, 0);
  const totalCritico = lista.filter((i) => i.nivel === "critico").reduce((acc, i) => acc + i.quantidade, 0);

  const handleSalvarItem = async (payload) => {
    try {
      await criarItem(payload);
      setModalAberto(false);
      setFeedback({ type: "success", msg: `"${payload.nome}" adicionado ao estoque.` });
      refetch();
    } catch (err) {
      setFeedback({ type: "error", msg: err.message });
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-white dark:bg-slate-900 dark:text-white">
      {/* Header */}
      <header>
        <section className="bg-gray-200 dark:bg-slate-800 border-b border-gray-300 dark:border-slate-700">
          <div className="flex justify-between items-center p-4 sm:px-6 lg:px-8 lg:max-w-5xl lg:mx-auto">
            <button type="button" onClick={() => navigate("dashboard")} aria-label="Voltar">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Gestão de Estoque</h1>
            <div className="w-6" />
          </div>
        </section>
      </header>

      <main className="flex flex-col gap-5 p-4 sm:px-6 lg:px-8 lg:max-w-5xl lg:mx-auto lg:w-full">
        {/* Feedback */}
        {feedback && (
          <div className={`text-sm rounded-lg px-4 py-3 border ${
            feedback.type === "success"
              ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-700 dark:text-green-400"
              : "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400"
          }`}>
            {feedback.type === "success" ? "✓ " : "⚠ "}{feedback.msg}
            <button type="button" onClick={() => setFeedback(null)} className="ml-2 underline text-xs">Fechar</button>
          </div>
        )}

        {error && (
          <div className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg px-3 py-2">
            ⚠️ Não foi possível conectar ao servidor.
          </div>
        )}

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
                ${filtroAtivo === filtro
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-blue-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 border-blue-400 dark:border-slate-600 hover:bg-blue-200 dark:hover:bg-slate-600"
                }`}
            >
              {filtro}
            </button>
          ))}
        </section>

        {/* Lista */}
        <section>
          <h2 className="font-semibold text-gray-800 dark:text-white mb-3">
            Itens em Estoque
            {!loading && <span className="ml-2 text-sm font-normal text-gray-400">({filtrado.length})</span>}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {loading ? (
              [1, 2, 3].map((n) => (
                <div key={n} className="bg-blue-50 dark:bg-slate-700 p-5 rounded-xl animate-pulse">
                  <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-2/3 mb-2" />
                  <div className="h-3 bg-gray-200 dark:bg-slate-500 rounded w-1/3 mb-4" />
                  <div className="h-2 bg-gray-300 dark:bg-slate-600 rounded-full w-full" />
                </div>
              ))
            ) : filtrado.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">Nenhum item encontrado.</p>
            ) : (
              filtrado.map((item) => {
                const config      = NIVEL_CONFIG[item.nivel] ?? NIVEL_CONFIG.normal;
                const porcentagem = Math.min(100, Math.round((item.quantidade / item.total) * 100));

                return (
                  <div
                    key={item.id}
                    className="bg-blue-50 dark:bg-slate-700 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-blue-100 dark:border-slate-600"
                  >
                    <h3 className="text-base font-semibold text-gray-800 dark:text-white">{item.nome}</h3>
                    {item.lote && <p className="text-sm text-gray-400 mt-1">Lote: {item.lote}</p>}

                    <div className="mt-4">
                      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span>Quantidade</span>
                        <span className={`font-bold w-10 h-10 rounded-xl flex items-center justify-center text-sm ${config.badge}`}>
                          {item.quantidade}
                        </span>
                      </div>
                      <div className="w-full bg-gray-300 dark:bg-slate-600 rounded-full h-2">
                        <div className={`${config.bar} h-2 rounded-full transition-all`} style={{ width: `${porcentagem}%` }} />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-400">{porcentagem}%</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badge}`}>{config.label}</span>
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
          {[
            { label: "Total",   value: totalItens,   color: "blue"  },
            { label: "Normal",  value: totalNormal,  color: "green" },
            { label: "Crítico", value: totalCritico, color: "red"   },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className={`bg-${color}-100 dark:bg-${color}-900/30 p-3 rounded-xl border-2 border-${color}-300 dark:border-${color}-700 flex-1 flex flex-col items-center`}
            >
              <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
              <span className="text-xl font-bold text-gray-800 dark:text-white">{value}</span>
            </div>
          ))}
        </section>

        {/* Botão novo item */}
        <section>
          <button
            type="button"
            onClick={() => setModalAberto(true)}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-5 rounded-lg h-14 w-full flex items-center justify-center gap-2 transition-colors"
          >
            <span className="text-lg">+</span>
            <span>Novo Item</span>
          </button>
        </section>
      </main>

      {/* Modal */}
      {modalAberto && (
        <NovoItemModal
          onClose={() => setModalAberto(false)}
          onSalvar={handleSalvarItem}
          salvando={salvando}
        />
      )}

      <BottomNav navigate={navigate} active="dashboard" />
    </div>
  );
}
