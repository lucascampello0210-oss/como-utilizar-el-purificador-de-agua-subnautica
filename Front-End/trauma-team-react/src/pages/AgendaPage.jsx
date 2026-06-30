import { useState } from "react";
import BottomNav from "../components/BottomNav";
import { agendaApi } from "../services/api";
import { useApi, useMutation } from "../services/useApi";

const TIPOS_EXAME = ["Sangue", "Imagem", "Raio-X", "Outros"];

export default function AgendaPage({ navigate }) {
  const [paciente,        setPaciente]        = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState(null);
  const [exameEspecifico, setExameEspecifico] = useState("");
  const [data,            setData]            = useState("");
  const [hora,            setHora]            = useState("");
  const [prioridade,      setPrioridade]      = useState(null);
  const [observacoes,     setObservacoes]     = useState("");
  const [feedback,        setFeedback]        = useState(null); // { type: 'success'|'error', msg }

  // ── Lista de agendamentos já criados ─────────────────────────────────────
  const { data: agendamentos, loading: loadingLista, refetch } = useApi(agendaApi.listar, []);

  // ── Mutation para criar novo agendamento ─────────────────────────────────
  const { mutate: criarAgendamento, loading: salvando } = useMutation(agendaApi.criar);

  const handleAgendar = async () => {
    if (!paciente.trim() || !tipoSelecionado || !data || !prioridade) {
      setFeedback({ type: "error", msg: "Preencha: Paciente, Tipo de Exame, Data e Prioridade." });
      return;
    }

    try {
      await criarAgendamento({
        paciente,
        tipoExame:       tipoSelecionado,
        exameEspecifico,
        data,
        hora,
        prioridade,
        observacoes,
      });

      setFeedback({ type: "success", msg: `Exame agendado para ${paciente} em ${data}${hora ? " às " + hora : ""}.` });

      // Limpa o formulário
      setPaciente(""); setTipoSelecionado(null); setExameEspecifico("");
      setData(""); setHora(""); setPrioridade(null); setObservacoes("");

      refetch(); // Atualiza lista
    } catch (err) {
      setFeedback({ type: "error", msg: err.message });
    }
  };

  const inputClass =
    "mt-1 block w-full border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder:text-gray-400";

  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wide";

  return (
    <div className="min-h-screen pb-24 bg-white dark:bg-slate-900 dark:text-white">
      {/* Header */}
      <header>
        <section className="bg-gray-200 dark:bg-slate-800 border-b border-gray-300 dark:border-slate-700">
          <div className="flex justify-between items-center p-4 sm:px-6 lg:px-8 lg:max-w-2xl lg:mx-auto">
            <button type="button" onClick={() => navigate("dashboard")} aria-label="Voltar">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Agendar Exame</h1>
            <div className="w-6" />
          </div>
        </section>
      </header>

      <main className="flex flex-col gap-5 p-4 sm:px-6 lg:px-8 lg:max-w-2xl lg:mx-auto lg:w-full">
        {/* Feedback banner */}
        {feedback && (
          <div
            className={`text-sm rounded-lg px-4 py-3 border ${
              feedback.type === "success"
                ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-700 dark:text-green-400"
                : "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400"
            }`}
          >
            {feedback.type === "success" ? "✓ " : "⚠ "}{feedback.msg}
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="ml-2 underline text-xs"
            >
              Fechar
            </button>
          </div>
        )}

        {/* Paciente */}
        <section>
          <label className={labelClass}>Paciente</label>
          <input
            type="text"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            className={inputClass}
            placeholder="Nome do paciente"
          />
        </section>

        {/* Tipo de Exame */}
        <section>
          <h2 className={labelClass + " mb-3"}>Tipo de Exame</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TIPOS_EXAME.map((tipo) => (
              <button
                key={tipo}
                type="button"
                onClick={() => setTipoSelecionado(tipo)}
                className={`h-14 w-full rounded-xl font-semibold text-sm border-2 transition-colors
                  ${tipoSelecionado === tipo
                    ? "bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-slate-600 hover:bg-gray-200 dark:hover:bg-slate-600"
                  }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </section>

        {/* Exame específico */}
        <section>
          <label className={labelClass}>Exame Específico</label>
          <input
            type="text"
            value={exameEspecifico}
            onChange={(e) => setExameEspecifico(e.target.value)}
            className={inputClass}
            placeholder="Ex: Hemograma Completo"
          />
        </section>

        {/* Data e Hora */}
        <section>
          <label className={labelClass + " mb-1"}>Data e Hora</label>
          <div className="flex gap-3">
            <input type="date" value={data} onChange={(e) => setData(e.target.value)} className={inputClass} />
            <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} className={inputClass} />
          </div>
        </section>

        {/* Prioridade */}
        <section>
          <h2 className={labelClass + " mb-3"}>Prioridade</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "Normal",  active: "bg-green-500 text-white border-green-500", idle: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-400 hover:bg-green-200" },
              { value: "Urgente", active: "bg-yellow-500 text-white border-yellow-500", idle: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-400 hover:bg-yellow-200" },
            ].map(({ value, active, idle }) => (
              <button
                key={value}
                type="button"
                onClick={() => setPrioridade(value)}
                className={`h-12 w-full rounded-xl font-semibold text-sm border-2 transition-colors ${prioridade === value ? active : idle}`}
              >
                {value}
              </button>
            ))}
          </div>
        </section>

        {/* Observações */}
        <section>
          <label className={labelClass}>Observações</label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className={inputClass + " h-28 resize-none"}
            placeholder="Observações sobre o exame..."
          />
        </section>

        {/* Botão Agendar */}
        <section>
          <button
            type="button"
            onClick={handleAgendar}
            disabled={salvando}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold h-14 w-full rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            {salvando ? (
              <>
                <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Agendando...
              </>
            ) : "Agendar Exame"}
          </button>
        </section>

        {/* Lista de agendamentos do dia */}
        {agendamentos && agendamentos.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide mb-3">
              Agendamentos Recentes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
              {agendamentos.slice(0, 5).map((ag) => (
                <div
                  key={ag.id}
                  className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-3 flex justify-between items-start gap-2"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{ag.paciente}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{ag.tipoExame}{ag.exameEspecifico ? ` · ${ag.exameEspecifico}` : ""}</p>
                    <p className="text-xs text-gray-400">{ag.data}{ag.hora ? " às " + ag.hora : ""}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                    ag.prioridade === "Urgente"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  }`}>
                    {ag.prioridade}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {loadingLista && (
          <div className="text-xs text-center text-gray-400 animate-pulse">Carregando agendamentos...</div>
        )}
      </main>

      <BottomNav navigate={navigate} active="dashboard" />
    </div>
  );
}
