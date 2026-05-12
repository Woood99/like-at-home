const actionTg = () => {
    const actionTg = document.querySelector(".action-tg");
    if (actionTg) {
        const link = actionTg.querySelector(".action-tg-link");
        const btn = actionTg.querySelector(".action-tg-btn");
        if (!link || !btn) return;
        btn.addEventListener("click", () => {
            actionTg.classList.toggle("_active");
            btn.classList.toggle("_active");
        });
    }
};

export default actionTg;
