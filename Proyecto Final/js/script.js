const botones = [
    { button: document.getElementById("bHTML"), panel: document.getElementById("infHTML") },
    { button: document.getElementById("bCSS"), panel: document.getElementById("infCSS") },
    { button: document.getElementById("bJS"), panel: document.getElementById("infJS") }
].filter(({ button, panel }) => button && panel);

const bloqueFinal = document.getElementById("luego");
let activados = 0;

const moverHasta = (element, offset = 80, align = "start") => {
    if (!element) return;

    setTimeout(() => {
        const rect = element.getBoundingClientRect();
        const top = rect.top + window.scrollY - offset;

        window.scrollTo({
            top,
            behavior: "smooth"
        });
    }, 150);
};

const mostrarBloqueFinal = () => {
    if (!bloqueFinal) return;

    if (activados >= 3 && !bloqueFinal.classList.contains("visible")) {
        bloqueFinal.classList.add("visible");
        bloqueFinal.classList.add(
            "animate-fade-in",
            "animate-duration-1000",
            "animate-delay-2000"
        );
    }
};

botones.forEach(({ button, panel }) => {
    button.addEventListener("click", () => {
        if (panel.classList.contains("active")) return;

        panel.classList.add("active");
        button.disabled = true;
        button.style.opacity = "0.9";
        button.style.cursor = "default";
        activados += 1;

        moverHasta(panel);

        if (activados >= 3) {
            mostrarBloqueFinal();
        }
    });
});
