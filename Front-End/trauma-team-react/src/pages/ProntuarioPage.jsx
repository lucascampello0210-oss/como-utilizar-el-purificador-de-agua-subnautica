import { useState } from "react";
import BottomNav from "../components/BottomNav";

const ABAS = ["Evolução", "Exames", "Receitas"];

const SINAIS_VITAIS = [
  {
    label: "Pressão",
    valor: "120/80 mmHg",
    bg: "bg-red-100 dark:bg-red-900/30",
    border: "border-red-300 dark:border-red-700",
  },
  {
    label: "FC",
    valor: "72 bpm",
    bg: "bg-purple-100 dark:bg-purple-900/30",
    border: "border-purple-300 dark:border-purple-700",
  },
  {
    label: "Temperatura",
    valor: "36,5°C",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    border: "border-blue-300 dark:border-blue-700",
  },
  {
    label: "SpO2",
    valor: "98%",
    bg: "bg-green-100 dark:bg-green-900/30",
    border: "border-green-300 dark:border-green-700",
  },
];

const EVOLUCOES_INICIAIS = [
  {
    id: 1,
    data: "20/05/2026 - 14:30",
    medico: "Dr. Renan",
    texto:
      "Paciente relata melhora do quadro febril. Mantém antibioticoterapia prescrita. Ausculta pulmonar sem alterações.",
  },
];

export default function ProntuarioPage({ navigate }) {
  const [abaAtiva, setAbaAtiva] = useState("Evolução");
  const [evolucoes, setEvolucoes] = useState(EVOLUCOES_INICIAIS);
  const [novaEvolucao, setNovaEvolucao] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);

  const handleAdicionarEvolucao = () => {
    if (!novaEvolucao.trim()) return;
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR") + " - " + agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    setEvolucoes((prev) => [
      {
        id: prev.length + 1,
        data: dataFormatada,
        medico: "Dr. Renan",
        texto: novaEvolucao,
      },
      ...prev,
    ]);
    setNovaEvolucao("");
    setMostrarForm(false);
  };

  return (
    <div className="min-h-screen pb-24 bg-white dark:bg-slate-900 dark:text-white">
      {/* Header */}
      <header>
        <section className="bg-gray-200 dark:bg-slate-800 border-b border-gray-300 dark:border-slate-700">
          <div className="flex justify-between items-center p-4 sm:px-6 lg:px-8 lg:max-w-4xl lg:mx-auto">
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
              Novo Prontuário
            </h1>
            <div className="w-6" />
          </div>
        </section>

        {/* Card do paciente */}
        <section className="p-4 sm:px-6 lg:px-8 lg:max-w-4xl lg:mx-auto">
          <div className="bg-blue-50 dark:bg-slate-700 border border-blue-300 dark:border-slate-600 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <img
                className="w-16 h-16 rounded-full object-cover"
                src="/public/dr.png"
                alt="Maria Silva"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  Maria Silva
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  CRM: 123456
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  45 anos · Feminino
                </p>
              </div>
            </div>

            <div className="flex gap-3 pl-1">
              {[
                { label: "Altura", valor: "1,65m" },
                { label: "Peso", valor: "68kg" },
                { label: "Tipo", valor: "O+" },
              ].map(({ label, valor }) => (
                <div
                  key={label}
                  className="bg-gray-200 dark:bg-slate-600 px-3 py-2 rounded-lg flex-1 text-center"
                >
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                    {label}
                  </p>
                  <p className="text-sm font-bold text-gray-800 dark:text-white mt-0.5">
                    {valor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Abas */}
        <section className="px-4 sm:px-6 lg:px-8 lg:max-w-4xl lg:mx-auto pb-2">
          <div className="flex gap-2">
            {ABAS.map((aba) => (
              <button
                key={aba}
                type="button"
                onClick={() => setAbaAtiva(aba)}
                className={`py-2 px-4 rounded-xl text-sm font-semibold transition-colors
                  ${
                    abaAtiva === aba
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600"
                  }`}
              >
                {aba}
              </button>
            ))}
          </div>
        </section>
      </header>

      <main className="flex flex-col gap-5 p-4 sm:px-6 lg:px-8 lg:max-w-4xl lg:mx-auto lg:w-full">
        {/* Conteúdo das abas */}
        {abaAtiva === "Evolução" && (
          <>
            {/* Últimas evoluções */}
            <section>
              <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
                Última Evolução
              </h2>
              <div className="flex flex-col gap-3">
                {evolucoes.map((ev) => (
                  <div
                    key={ev.id}
                    className="bg-gray-100 dark:bg-slate-700 p-4 rounded-xl border border-gray-200 dark:border-slate-600"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                        {ev.data}
                      </span>
                      <span className="text-sm text-blue-600 dark:text-blue-400">
                        {ev.medico}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {ev.texto}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Formulário nova evolução */}
            {mostrarForm && (
              <section className="flex flex-col gap-3">
                <textarea
                  value={novaEvolucao}
                  onChange={(e) => setNovaEvolucao(e.target.value)}
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 text-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-none h-32 resize-none"
                  placeholder="Descreva a evolução do paciente..."
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleAdicionarEvolucao}
                    className="flex-1 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors text-sm"
                  >
                    Salvar Evolução
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMostrarForm(false); setNovaEvolucao(""); }}
                    className="flex-1 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-bold py-3 rounded-lg transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </section>
            )}

            {!mostrarForm && (
              <button
                type="button"
                onClick={() => setMostrarForm(true)}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-5 rounded-lg h-14 w-full flex items-center justify-center gap-2 transition-colors"
              >
                <span className="text-lg">+</span>
                <span>Nova Evolução</span>
              </button>
            )}
          </>
        )}

        {abaAtiva === "Exames" && (
          <section className="text-center py-12 text-gray-400 text-sm">
            Nenhum exame registrado.
          </section>
        )}

        {abaAtiva === "Receitas" && (
          <section className="text-center py-12 text-gray-400 text-sm">
            Nenhuma receita registrada.
          </section>
        )}

        {/* Sinais Vitais */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
            Sinais Vitais
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
            {SINAIS_VITAIS.map(({ label, valor, bg, border }) => (
              <div
                key={label}
                className={`${bg} border-2 ${border} p-4 rounded-xl`}
              >
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  {label}
                </p>
                <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">
                  {valor}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav navigate={navigate} active="dashboard" />
    </div>
  );
}
