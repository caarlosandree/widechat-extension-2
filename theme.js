document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById('themeToggle');
    const label = document.getElementById('themeLabel');
    const body = document.body;

    const updateThemeIcon = () => {
        if (toggle.checked) {
            label.textContent = "🌙";
        } else {
            label.textContent = "☀️";
        }
    };

    // Carregar tema salvo
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark");
        toggle.checked = true;
    }

    updateThemeIcon(); // Define o ícone inicial

    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
        updateThemeIcon(); // Atualiza o ícone ao mudar o tema
    });

    // ✨ Animação de entrada para os cards ✨
    document.querySelectorAll(".card").forEach((card, i) => {
        setTimeout(() => {
            card.classList.add("visible");
        }, 100 * i);
    });
});