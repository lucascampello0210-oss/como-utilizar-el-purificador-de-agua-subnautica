# Trauma Team — React

Frontend migrado de HTML/JS puro para React + Vite + Tailwind CSS.

## Estrutura do projeto

```
trauma-team-react/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx              ← Ponto de entrada
    ├── App.jsx               ← Roteador hash-based + ThemeContext (modo escuro)
    ├── index.css             ← Tailwind + Google Fonts
    ├── components/
    │   └── BottomNav.jsx     ← Barra de navegação inferior (compartilhada)
    └── pages/
        ├── LoginPage.jsx     ← Login com fetch para NestJS
        ├── RegisterPage.jsx  ← Registro com fetch para NestJS
        ├── DashboardPage.jsx ← Dashboard principal
        ├── PacientesPage.jsx ← Lista de pacientes com busca e filtros
        ├── PrescricaoPage.jsx← Formulário de prescrição (adicionar medicamentos)
        └── ConfigPage.jsx    ← Configurações + toggle modo escuro
```

## Como rodar

```bash
# 1. Instale as dependências
npm install

# 2. Coloque suas imagens em /public  (Traumalogo.png, dr.png, etc.)

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

## Roteamento

A navegação é feita via **hash** (`#login`, `#dashboard`, etc.) — sem react-router-dom,
funciona em qualquer servidor estático e mantém o comportamento dos `<a href="pagina.html">` originais.

## Modo Escuro

O toggle de modo escuro na página de Configurações salva a preferência em `localStorage`,
exatamente como o `theme.js` original, mas integrado ao React via `ThemeContext`.

## Backend (NestJS)

As rotas de API continuam as mesmas:
- `POST http://localhost:3000/users/login` → Login
- `POST http://localhost:3000/users`       → Registro
