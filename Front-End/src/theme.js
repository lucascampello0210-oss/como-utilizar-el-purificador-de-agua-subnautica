const htmlElement = document.documentElement;

// 1. Aplica o tema assim que a página carrega (Evita que a página pisque branca)
if (localStorage.getItem('theme') === 'dark') {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark');
}

// 2. Configura o botão (Executa apenas se o botão existir na página atual)
document.addEventListener('DOMContentLoaded', () => {
    const btnDarkMode = document.getElementById('btn-dark-mode');
    
    if (btnDarkMode) {
        btnDarkMode.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            
            if (htmlElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
