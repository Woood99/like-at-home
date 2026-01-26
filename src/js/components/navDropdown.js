const navDropdown = () => {
    const container = document.querySelector(".header");
    if (!container) return;
    console.log(container);

    const items = container.querySelectorAll(".nav-dropdown");
    items.forEach(item => {
        const link = item.querySelector(".nav-dropdown__link");
        link.addEventListener("mouseenter", () => {
            if (window.innerWidth <= 1326) return;
            removeActiveNav();
            if (!item.classList.contains("_active")) {
                item.classList.add("_active");
                toggleMask();
            }
        });
        item.addEventListener("mouseleave", e => {
            if (window.innerWidth <= 1326) return;
            removeActiveNav();
            toggleMask();
        });
    });
    function toggleMask() {
        const activeItem = container.querySelector(".nav-dropdown._active");
        const body = document.body;
        activeItem ? body.classList.add("_nav-active-mask") : body.classList.remove("_nav-active-mask");
    }

    function removeActiveNav() {
        const activeItem = container.querySelector(".nav-dropdown._active");
        if (activeItem) activeItem.classList.remove("_active");
    }
};

export default navDropdown;
