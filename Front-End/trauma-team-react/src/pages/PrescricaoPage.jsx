import { useState } from "react";
import BottomNav from "../components/BottomNav";

export default function PrescricaoPage({ navigate }) {
  const [medicamento, setMedicamento] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [duracao, setDuracao] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [adicionados, setAdicionados] = useState([]);

  const handleAdicionar = () => {
    if (!medicamento.trim()) return;
    const item = `${medicamento} ${dosagem} - ${frequencia} - ${duracao}`;
    setAdicionados((prev) => [...prev, item]);
    setMedicamento("");
    setDosagem("");
    setFrequencia("");
    setDuracao("");
    setObservacoes("");
  };

  const inputClass =
    "mt-1 block w-full border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder:text-gray-400";

  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-200";

  return (
    <div className="min-h-screen pb-20 bg-white dark:bg-slate-900 dark:text-white">
      {/* Header */}
      <header>
        <section className="bg-gray-200 dark:bg-slate-800 border-b border-gray-300 dark:border-slate-700">
          <div className="flex justify-between items-center p-4">
            <button type="button" onClick={() => navigate("dashboard")} aria-label="Voltar">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Novo Prontuário</h1>
            <div className="w-6" />
          </div>
        </section>

        {/* Patient info */}
        <section className="p-6">
          <div className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-slate-700 max-w-xs border border-gray-200 dark:border-slate-600 rounded-xl">
            <img className="w-16 h-16 rounded-full object-cover" src="/public/dr.png" alt="Maria Silva" />
            <div>
              <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Maria Silva</h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">45 Anos</span>
            </div>
          </div>
        </section>
      </header>

      <main className="flex flex-col gap-4 px-4">
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

        {/* Adicionar */}
        <section>
          <button
            type="button"
            onClick={handleAdicionar}
            className="bg-green-500 hover:bg-green-700 text-white font-bold h-14 w-full rounded-lg transition-colors"
          >
            + Adicionar Medicamento
          </button>
        </section>

        {/* Medicamentos adicionados */}
        <section className="mb-4">
          <label className={labelClass + " mb-2"}>Medicamentos Adicionados</label>
          {adicionados.length === 0 ? (
            <div className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 min-h-[100px] bg-gray-50 dark:bg-slate-800 text-gray-400 text-sm">
              Ex: Amoxicilina 500mg — 3x ao dia — 7 dias
            </div>
          ) : (
            <ul className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 min-h-[100px] bg-gray-50 dark:bg-slate-800 flex flex-col gap-2">
              {adicionados.map((item, i) => (
                <li key={i} className="text-sm text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-slate-700 pb-1 last:border-0 last:pb-0">
                  {item}
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
