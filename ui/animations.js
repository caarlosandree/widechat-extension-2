export function setupCardAnimations() {
    document.querySelectorAll(".card").forEach((card, i) => {
        setTimeout(() => {
            card.classList.add("visible");
        }, 100 * i);
    });
}