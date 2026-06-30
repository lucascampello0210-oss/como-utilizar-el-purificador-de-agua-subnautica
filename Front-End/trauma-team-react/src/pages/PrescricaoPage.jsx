import { useState } from "react";
import BottomNav from "../components/BottomNav";
import { prescricaoApi } from "../services/api";
import { useApi, useMutation } from "../services/useApi";

export default function PrescricaoPage({ navigate }) {
  const [medicamento, setMedicamento] = useState("");
  const [dosagem,     setDosagem]     = useState("");
  const [frequencia,  setFrequencia]  = useState("");
  const [duracao,     setDuracao]     = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [feedback,    setFeedback]    = useState(null);

  // ── Histórico de prescrições do backend ──────────────────────────────────
  const { data: prescricoes, loading: loadingLista, refetch } = useApi(prescricaoApi.listar, []);

  // ── Mutation para salvar nova prescrição ─────────────────────────────────
  const { mutate: salvarPrescricao, loading: salvando } = useMutation(prescricaoApi.criar);

  const handleAdicionar = async () => {
    if (!medicamento.trim()) {
      setFeedback({ type: "error", msg: "Informe o nome do medicamento." });
      return;
    }

    try {
      await salvarPrescricao({
        medicamento,
        dosagem,
        frequencia,
        duracao,
        observacoes,
        // pacienteId pode ser passado via props/contexto quando tiver auth
      });

      setFeedback({ type: "success", msg: `${medicamento} adicionado à prescrição.` });

      // Limpa o formulário
      setMedicamento(""); setDosagem(""); setFrequencia("");
      setDuracao(""); setObservacoes("");

      refetch();
    } catch (err) {
      setFeedback({ type: "error", msg: err.message });
    }
  };

  const handleDeletar = async (id) => {
    try {
      await prescricaoApi.deletar(id);
      refetch();
    } catch {
      setFeedback({ type: "error", msg: "Não foi possível remover o medicamento." });
    }
  };

  const inputClass =
    "mt-1 block w-full border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder:text-gray-400";

  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-200";

  return (
    <div className="min-h-screen pb-20 bg-white dark:bg-slate-900 dark:text-white">
      {/* Header */}
      <header>
        <section className="bg-gray-200 dark:bg-slate-800 border-b border-gray-300 dark:border-slate-700">
          <div className="flex justify-between items-center p-4 sm:px-6 lg:px-8 lg:max-w-2xl lg:mx-auto">
            <button type="button" onClick={() => navigate("dashboard")} aria-label="Voltar">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Nova Prescrição</h1>
            <div className="w-6" />
          </div>
        </section>

        {/* Info do paciente */}
        <section className="p-6 sm:px-8 lg:px-8 lg:max-w-2xl lg:mx-auto">
          <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-slate-700 max-w-xs sm:max-w-sm border border-gray-200 dark:border-slate-600 rounded-xl">
            <img className="w-16 h-16 rounded-full object-cover" src="/public/dr.png" alt="Maria Silva" />
            <div>
              <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Maria Silva</h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">45 Anos</span>
            </div>
          </div>
        </section>
      </header>

      <main className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8 lg:max-w-2xl lg:mx-auto lg:w-full">
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

        {/* Medicamento */}
        <section>
          <label className={labelClass}>Nome do Medicamento</label>
          <input
            type="text"
            value={medicamento}
            onChange={(e) => setMedicamento(e.target.value)}
            className={inputClass}
            placeholder="Buscar medicamento..."
          />
        </section>

        {/* Dosagem + Frequência */}
        <section className="flex gap-4">
          <div className="flex-1">
            <label className={labelClass}>Dosagem</label>
            <input
              type="text"
              value={dosagem}
              onChange={(e) => setDosagem(e.target.value)}
              className={inputClass}
              placeholder="Ex: 500mg"
            />
          </div>
          <div className="flex-1">
            <label className={labelClass}>Frequência</label>
            <input
              type="text"
              value={frequencia}
              onChange={(e) => setFrequencia(e.target.value)}
              className={inputClass}
              placeholder="Ex: 3x ao dia"
            />
          </div>
        </section>

        {/* Duração */}
        <section>
          <label className={labelClass}>Duração</label>
          <input
            type="text"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
            className={inputClass}
            placeholder="Ex: 7 dias"
          />
        </section>

        {/* Observações */}
        <section>
          <label className={labelClass}>Observações</label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className={inputClass + " h-32 resize-none"}
            placeholder="Observações sobre o medicamento..."
          />
        </section>

        {/* Botão Adicionar */}
        <section>
          <button
            type="button"
            onClick={handleAdicionar}
            disabled={salvando}
            className="bg-green-500 hover:bg-green-700 disabled:opacity-60 text-white font-bold h-14 w-full rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {salvando ? (
              <>
                <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Salvando...
              </>
            ) : "+ Adicionar Medicamento"}
          </button>
        </section>

        {/* Lista de prescrições salvas */}
        <section className="mb-4">
          <label className={labelClass + " mb-2"}>Medicamentos Prescritos</label>

          {loadingLista ? (
            <div className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 min-h-[80px] bg-gray-50 dark:bg-slate-800 animate-pulse">
              <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
            </div>
          ) : !prescricoes || prescricoes.length === 0 ? (
            <div className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 min-h-[100px] bg-gray-50 dark:bg-slate-800 text-gray-400 text-sm">
              Ex: Amoxicilina 500mg — 3x ao dia — 7 dias
            </div>
          ) : (
            <ul className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 min-h-[100px] bg-gray-50 dark:bg-slate-800 flex flex-col gap-2">
              {prescricoes.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between gap-2 text-sm text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-slate-700 pb-2 last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <span className="font-medium">{item.medicamento}</span>
                    {item.dosagem    && <span className="text-gray-500 dark:text-gray-400"> {item.dosagem}</span>}
                    {item.frequencia && <span className="text-gray-500 dark:text-gray-400"> — {item.frequencia}</span>}
                    {item.duracao    && <span className="text-gray-500 dark:text-gray-400"> — {item.duracao}</span>}
                    {item.observacoes && (
                      <p className="text-xs text-gray-400 mt-0.5 italic">{item.observacoes}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeletar(item.id)}
                    className="text-red-400 hover:text-red-600 dark:hover:text-red-300 shrink-0 text-lg leading-none"
                    aria-label="Remover"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <BottomNav navigate={navigate} active="prescricao" />
    </div>
  );
}
