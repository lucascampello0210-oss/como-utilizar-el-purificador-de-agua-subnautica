import { useState } from "react";

export default function LoginPage({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const resultado = await response.json();

      if (response.ok && resultado.success) {
        localStorage.setItem("usuarioLogado", resultado.user.email);
        alert(`Login efetuado com sucesso! Bem-vindo.`);
        navigate("dashboard");
      } else {
        alert("E-mail ou senha incorretos! Acesso negado.");
      }
    } catch (error) {
      console.error("Erro na conexão com a API:", error);
      alert("Não foi possível conectar ao servidor backend.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "bg-gray-100 border border-gray-300 text-gray-900 dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-400";

  const btnPrimaryClass =
    "text-white bg-gray-600 border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none w-full transition-colors";

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      {/* Header */}
      <header>
        <section className="bg-blue-500 dark:bg-slate-800 w-full h-40 sm:h-48 lg:h-56 flex justify-center items-center">
          <img src="/public/Traumalogo.png" alt="Trauma Team" className="w-52 sm:w-60 lg:w-64 h-auto object-contain" />
        </section>
      </header>

      {/* Body */}
      <main className="flex flex-col flex-1">
        <div className="flex flex-col p-8 sm:p-10 lg:p-12 gap-4 justify-center items-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">Bem-Vindo</h2>
          <p className="text-gray-500 dark:text-gray-400">Faça login para continuar</p>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center px-4 sm:px-6 lg:pb-12">
          {/* Login form */}
          <form onSubmit={handleLogin} className="w-full max-w-sm sm:max-w-md">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="nome@exemplo.com"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
                required
              />
            </div>
            <label className="flex items-center mb-5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-100 focus:ring-2 focus:ring-blue-400"
                required
              />
              <p className="ms-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                Eu aceito os{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  termos e condições
                </a>
                .
              </p>
            </label>
            <button type="submit" disabled={loading} className={btnPrimaryClass}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Register */}
          <button
            type="button"
            onClick={() => navigate("register")}
            className={btnPrimaryClass + " max-w-sm sm:max-w-md"}
          >
            Registrar-se
          </button>

          {/* Divider */}
          <div className="flex items-center w-full max-w-sm sm:max-w-md">
            <div className="flex-1 border-b border-gray-300 dark:border-slate-600" />
            <span className="mx-3 text-sm text-gray-400">ou</span>
            <div className="flex-1 border-b border-gray-300 dark:border-slate-600" />
          </div>

          {/* Google */}
          <button
            type="button"
            className="text-blue-600 bg-white border border-blue-500 hover:bg-blue-600 hover:text-white focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none w-full max-w-sm sm:max-w-md transition-colors dark:bg-slate-800 dark:text-blue-400 dark:border-blue-400"
          >
            Entrar com Google
          </button>
        </div>
      </main>
    </div>
  );
}
