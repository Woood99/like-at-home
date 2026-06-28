const navDropdown = () => {
    const header = document.querySelector(".header");
    if (!header) return;
    const container = header.querySelector("[data-nav-dropdown]");
    if (!container) return;

    const items = container.querySelectorAll("[data-nav-dropdown-item]");
    items.forEach(item => {
        const link = item.querySelector(".nav-dropdown__link");
        link.addEventListener("mouseenter", () => {
            if (window.innerWidth <= 1296) return;
            removeActiveNav();
            if (!item.classList.contains("_active")) {
                item.classList.add("_active");
                toggleMask();
            }
        });
        item.addEventListener("mouseleave", e => {
            if (window.innerWidth <= 1296) return;
            removeActiveNav();
            toggleMask();
        });
    });

    function toggleMask() {
        const activeItem = header.querySelector(".nav-dropdown._active");
        const body = document.body;
        activeItem ? body.classList.add("_nav-active-mask") : body.classList.remove("_nav-active-mask");
    }

    function removeActiveNav() {
        const activeItem = header.querySelector(".nav-dropdown._active");
        if (activeItem) activeItem.classList.remove("_active");
    }
};

export default navDropdown;
