import { useState } from "react";
import BottomNav from "../components/BottomNav";

const TIPOS_EXAME = ["Sangue", "Imagem", "Raio-X", "Outros"];

export default function AgendaPage({ navigate }) {
  const [paciente, setPaciente] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState(null);
  const [exameEspecifico, setExameEspecifico] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [prioridade, setPrioridade] = useState(null);
  const [observacoes, setObservacoes] = useState("");

  const handleAgendar = () => {
    if (!paciente.trim() || !tipoSelecionado || !data || !prioridade) {
      alert("Preencha os campos obrigatórios: Paciente, Tipo de Exame, Data e Prioridade.");
      return;
    }
    alert(`Exame agendado com sucesso!\nPaciente: ${paciente}\nTipo: ${tipoSelecionado}\nData: ${data} às ${hora}`);
  };

  const inputClass =
    "mt-1 block w-full border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder:text-gray-400";

  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wide";

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
              Agendar Exame
            </h1>
            <div className="w-6" />
          </div>
        </section>
      </header>

      <main className="flex flex-col gap-5 p-4">
        {/* Paciente */}
        <section>
          <label className={labelClass}>Paciente</label>
          <input
            type="text"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            className={inputClass}
            placeholder="Selecione o paciente"
          />
        </section>

        {/* Tipo de Exame */}
        <section>
          <h2 className={labelClass + " mb-3"}>Tipo de Exame</h2>
          <div className="grid grid-cols-2 gap-3">
            {TIPOS_EXAME.map((tipo) => (
              <button
                key={tipo}
                type="button"
                onClick={() => setTipoSelecionado(tipo)}
                className={`h-14 w-full rounded-xl font-semibold text-sm border-2 transition-colors
                  ${
                    tipoSelecionado === tipo
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
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className={inputClass}
            />
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className={inputClass}
            />
          </div>
        </section>

        {/* Prioridade */}
        <section>
          <h2 className={labelClass + " mb-3"}>Prioridade</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPrioridade("Normal")}
              className={`h-12 w-full rounded-xl font-semibold text-sm border-2 transition-colors
                ${
                  prioridade === "Normal"
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
                }`}
            >
              Normal
            </button>
            <button
              type="button"
              onClick={() => setPrioridade("Urgente")}
              className={`h-12 w-full rounded-xl font-semibold text-sm border-2 transition-colors
                ${
                  prioridade === "Urgente"
                    ? "bg-yellow-500 text-white border-yellow-500"
                    : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50"
                }`}
            >
              Urgente
            </button>
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 w-full rounded-xl transition-colors shadow-sm"
          >
            Agendar Exame
          </button>
        </section>
      </main>

      <BottomNav navigate={navigate} active="dashboard" />
    </div>
  );
}
