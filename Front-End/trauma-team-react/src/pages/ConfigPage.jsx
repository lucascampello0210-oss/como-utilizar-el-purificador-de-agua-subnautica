import { useState } from "react";
import { useTheme } from "../App";
import BottomNav from "../components/BottomNav";

export default function ConfigPage({ navigate }) {
  const { dark, setDark } = useTheme();

  const [notifications, setNotifications] = useState({
    estoque: false,
    exame: false,
    plantao: false,
  });

  const toggleNotification = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  const btnClass =
    "block w-full text-left text-gray-800 dark:text-white bg-blue-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:bg-blue-200 dark:hover:bg-slate-600 focus:ring-2 focus:ring-blue-300 font-medium text-sm px-4 py-4 focus:outline-none transition-colors";

  const sectionTitle = "text-base font-semibold text-gray-800 dark:text-white mb-3";

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
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Configurações</h1>
            <div className="w-6" />
          </div>
        </section>
      </header>

      <main className="flex flex-col gap-6 p-6 sm:px-8 lg:px-10 lg:max-w-2xl lg:mx-auto lg:w-full">
        {/* Doctor card */}
        <section>
          <div className="relative bg-blue-100 dark:bg-slate-700 max-w-xs w-full sm:max-w-sm border border-gray-200 dark:border-slate-600 rounded-xl shadow-sm">
            <div className="flex items-center p-4 gap-3">
              <img className="w-12 h-12 rounded-full object-cover" src="/public/dr.png" alt="Dr. Renan Silva" />
              <div>
                <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Dr. Renan Silva</h5>
                <span className="text-sm text-blue-600 dark:text-blue-400">Médico Plantonista</span>
              </div>
            </div>
          </div>
        </section>

        {/* Conta */}
        <section>
          <h2 className={sectionTitle}>Conta</h2>
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 divide-y divide-gray-200 dark:divide-slate-700">
            <button type="button" className={btnClass}>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clipRule="evenodd" />
                </svg>
                <strong>Profile</strong>
              </div>
            </button>
            <button type="button" className={btnClass}>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clipRule="evenodd" />
                </svg>
                <strong>Settings</strong>
              </div>
            </button>
            <button type="button" className={btnClass}>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z" clipRule="evenodd" />
                </svg>
                <strong>Messages</strong>
              </div>
            </button>
          </div>
        </section>

        {/* Notificações */}
        <section>
          <h2 className={sectionTitle}>Notificações</h2>
          <div className="flex flex-col gap-3">
            {[
              { key: "estoque", label: "Alerta de Estoque Crítico" },
              { key: "exame",   label: "Novos Resultados de Exames" },
              { key: "plantao", label: "Lembretes de Plantão" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={notifications[key]}
                  onChange={() => toggleNotification(key)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-200">{label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Segurança */}
        <section>
          <h2 className={sectionTitle}>Segurança</h2>
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 divide-y divide-gray-200 dark:divide-slate-700">
            {["Alterar Senha", "Ativar Autenticação de Dois Fatores", "Gerenciar Dispositivos Conectados"].map((label) => (
              <button key={label} type="button" className={btnClass}>{label}</button>
            ))}
          </div>
        </section>

        {/* Sistema */}
        <section>
          <h2 className={sectionTitle}>Sistema</h2>
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 divide-y divide-gray-200 dark:divide-slate-700">
            <button type="button" className={btnClass}>Verificar Atualizações</button>
            <button type="button" className={btnClass}>Gerenciar Integrações</button>

            {/* Dark mode toggle */}
            <button
              type="button"
              onClick={() => setDark((prev) => !prev)}
              className={btnClass}
            >
              <div className="flex items-center justify-between">
                <span>{dark ? "☀️ Modo Claro" : "🌙 Modo Escuro"}</span>
                <div className={`w-10 h-5 rounded-full transition-colors ${dark ? "bg-blue-600" : "bg-gray-300"} relative`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${dark ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => navigate("login")}
              className={btnClass + " text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40"}
            >
              Sair
            </button>
          </div>
        </section>
      </main>

      <BottomNav navigate={navigate} active="config" />
    </div>
  );
}
