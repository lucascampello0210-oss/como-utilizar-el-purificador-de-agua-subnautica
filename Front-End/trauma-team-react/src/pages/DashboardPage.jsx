import BottomNav from "../components/BottomNav";

const quickActions = [
  { id: "prontuario",  label: "Prontuário",  img: "/public/Prontuario.png",   page: null },
  { id: "prescricao",  label: "Prescrição",  img: "/public/Prescrição.png",   page: "prescricao" },
  { id: "agendar",     label: "Agendar",     img: "/public/Agendar.png",      page: null },
  { id: "estoque",     label: "Estoque",     img: "/public/Estoque.png",      page: null },
];

export default function DashboardPage({ navigate }) {
  return (
    <div className="min-h-screen pb-20 bg-white dark:bg-slate-900 dark:text-white">
      {/* Header */}
      <header className="p-4 flex flex-col gap-4 bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        {/* Logo */}
        <div className="flex justify-center">
          <img src="/public/Logosubnautica.jpg" alt="Logo" className="h-12 object-contain" />
        </div>

        {/* Doctor card + stats */}
        <div className="flex flex-col gap-3">
          {/* Doctor card */}
          <div className="relative bg-gray-100 dark:bg-slate-700 max-w-xs w-full border border-gray-200 dark:border-slate-600 rounded-xl shadow-sm">
            <div className="flex items-center p-4 gap-3">
              <img className="w-12 h-12 rounded-full object-cover" src="/public/dr.png" alt="Dr. Renan Silva" />
              <div>
                <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Dr. Renan Silva</h5>
                <span className="text-sm text-blue-600 dark:text-blue-400">Médico Plantonista</span>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("pacientes")}
              className="bg-gray-100 dark:bg-slate-700 flex-1 border border-gray-200 dark:border-slate-600 rounded-xl shadow-sm hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex flex-col items-center p-3"
            >
              <img className="w-14 h-14 object-contain" src="/public/Prescrição.png" alt="Pacientes" />
              <h5 className="font-semibold text-gray-700 dark:text-gray-200 leading-6">Pacientes</h5>
              <p className="text-gray-600 dark:text-gray-300 font-bold text-xl">24</p>
            </button>
            <button className="bg-gray-100 dark:bg-slate-700 flex-1 border border-gray-200 dark:border-slate-600 rounded-xl shadow-sm hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex flex-col items-center p-3">
              <img className="w-14 h-14 object-contain" src="/public/Exames.png" alt="Exames" />
              <h5 className="font-semibold text-gray-700 dark:text-gray-200 leading-6">Exames</h5>
              <p className="text-gray-600 dark:text-gray-300 font-bold text-xl">12</p>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="p-4 flex flex-col gap-6">
        {/* Quick Actions */}
        <section>
          <h1 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Ações Rápidas</h1>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => action.page && navigate(action.page)}
                className="bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl shadow-sm hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex flex-col items-center p-4 gap-2"
              >
                <img src={action.img} alt={action.label} className="w-16 h-16 object-contain" />
                <h2 className="font-semibold text-sm text-gray-700 dark:text-gray-200">{action.label}</h2>
              </button>
            ))}
          </div>
        </section>

        {/* Patients today */}
        <section>
          <h1 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Pacientes Hoje</h1>
          <div className="flex items-center p-4 gap-4 bg-gray-100 dark:bg-slate-700 max-w-xs border border-gray-200 dark:border-slate-600 rounded-xl shadow-sm">
            <img className="w-12 h-12 rounded-full object-cover" src="/public/dr.png" alt="Maria Silva" />
            <div className="flex-1">
              <h5 className="font-semibold text-gray-800 dark:text-white">Maria Silva</h5>
            </div>
            <span className="text-sm text-green-600 bg-green-100 rounded-full px-3 py-1">Aguardando</span>
          </div>
        </section>

        {/* Return */}
        <section>
          <button
            type="button"
            onClick={() => navigate("login")}
            className="text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 hover:bg-gray-200 dark:hover:bg-slate-600 shadow-sm font-medium rounded-lg text-sm px-4 py-2.5 transition-colors"
          >
            Botão de retorno
          </button>
        </section>
      </main>

      <BottomNav navigate={navigate} active="dashboard" />
    </div>
  );
}
