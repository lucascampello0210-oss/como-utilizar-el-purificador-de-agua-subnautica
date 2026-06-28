import { useState } from "react";

export default function RegisterPage({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem! Por favor, verifique.");
      return;
    }

    setLoading(true);
    const dadosUsuario = {
      name: email.split("@")[0],
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosUsuario),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("login");
      } else {
        alert("Erro ao cadastrar. Verifique se este e-mail já está em uso.");
      }
    } catch (error) {
      console.error("Erro na conexão:", error);
      alert("Não foi possível falar com o servidor backend.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "bg-gray-100 border border-gray-300 text-gray-900 dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400";

  const btnClass =
    "text-white bg-gray-600 border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none w-full transition-colors";

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      {/* Header */}
      <header>
        <section className="bg-blue-500 dark:bg-slate-800 w-full h-40 flex justify-center items-center">
          <img src="/public/Traumalogo.png" alt="Trauma Team" className="w-52 h-auto object-contain" />
        </section>
      </header>

      <main className="flex flex-col flex-1">
        <div className="flex flex-col p-8 gap-4 justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Registro</h2>
          <p className="text-gray-500 dark:text-gray-400">Preencha os campos para criar uma conta</p>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center px-4">
          <form onSubmit={handleRegister} className="w-full max-w-sm flex flex-col gap-2">
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                Confirmar Senha
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
                required
              />
            </div>
            <label className="flex items-center mb-4 cursor-pointer select-none">
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
            <button type="submit" disabled={loading} className={btnClass}>
              {loading ? "Registrando..." : "Registrar"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate("login")}
            className={btnClass + " max-w-sm"}
          >
            Voltar
          </button>
        </div>
      </main>
    </div>
  );
}
