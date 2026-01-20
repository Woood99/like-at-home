const navDropdown = () => {
    const container = document.querySelector(".header");
    if (!container) return;

    const items = container.querySelectorAll(".nav-dropdown");
    let hideTimer;
    let isTransitioning = false;

    items.forEach(item => {
        const link = item.querySelector(".nav-dropdown__link");

        link.addEventListener("mouseenter", () => {
            if (window.innerWidth <= 1326) return;

            clearTimeout(hideTimer);
            isTransitioning = false;
            removeActiveNav();

            if (!item.classList.contains("_active")) {
                item.classList.add("_active");
                toggleMask();
            }
        });

        item.addEventListener("mouseleave", e => {
            if (window.innerWidth <= 1326) return;

            const relatedTarget = e.relatedTarget;
            const subitemContainer = item.querySelector(".nav-dropdown__subitem-container._active");
            const subitemBridge = item.querySelector(".nav-dropdown__subitem-bridge");

            if (
                (subitemContainer && subitemContainer.contains(relatedTarget)) ||
                (subitemBridge && subitemBridge.contains(relatedTarget)) ||
                item.contains(relatedTarget)
            ) {
                return;
            }

            hideTimer = setTimeout(() => {
                if (!isTransitioning) {
                    removeActiveNav();
                    toggleMask();
                }
            }, 200);
        });

        const subitems = item.querySelectorAll(".nav-dropdown__subitem");
        subitems.forEach(subitem => {
            const subContainer = subitem.querySelector(".nav-dropdown__subitem-container");
            const bridge = subitem.querySelector(".nav-dropdown__subitem-bridge");

            subitem.addEventListener("mouseenter", () => {
                if (window.innerWidth <= 1326) return;

                clearTimeout(hideTimer);
                isTransitioning = false;

                item.querySelectorAll(".nav-dropdown__subitem._active").forEach(activeSubitem => {
                    if (activeSubitem !== subitem) {
                        activeSubitem.classList.remove("_active");
                    }
                });

                item.querySelectorAll(".nav-dropdown__subitem-container._active").forEach(activeContainer => {
                    if (activeContainer !== subContainer) {
                        activeContainer.classList.remove("_active");
                    }
                });

                subitem.classList.add("_active");

                if (subContainer) {
                    subContainer.classList.add("_active");
                }
            });

            subitem.addEventListener("mouseleave", e => {
                if (window.innerWidth <= 1326) return;

                const relatedTarget = e.relatedTarget;

                if ((subContainer && subContainer.contains(relatedTarget)) || (bridge && bridge.contains(relatedTarget))) {
                    return;
                }

                hideTimer = setTimeout(() => {
                    subitem.classList.remove("_active");

                    if (subContainer) {
                        subContainer.classList.remove("_active");
                    }
                }, 150);
            });

            if (subContainer) {
                subContainer.addEventListener("mouseenter", () => {
                    clearTimeout(hideTimer);

                    subitem.classList.add("_active");
                    subContainer.classList.add("_active");
                });

                subContainer.addEventListener("mouseleave", e => {
                    if (window.innerWidth <= 1326) return;

                    const relatedTarget = e.relatedTarget;

                    if (subitem.contains(relatedTarget) || (bridge && bridge.contains(relatedTarget))) {
                        return;
                    }

                    hideTimer = setTimeout(() => {
                        subitem.classList.remove("_active");
                        subContainer.classList.remove("_active");
                    }, 150);
                });
            }

            if (bridge) {
                bridge.addEventListener("mouseenter", () => {
                    clearTimeout(hideTimer);
                    isTransitioning = true;

                    subitem.classList.add("_active");
                    if (subContainer) {
                        subContainer.classList.add("_active");
                    }
                });

                bridge.addEventListener("mouseleave", e => {
                    const relatedTarget = e.relatedTarget;

                    if (subContainer && subContainer.contains(relatedTarget)) {
                        return;
                    }

                    if (subitem.contains(relatedTarget)) {
                        return;
                    }

                    hideTimer = setTimeout(() => {
                        if (subitem) {
                            subitem.classList.remove("_active");
                        }
                        if (subContainer) {
                            subContainer.classList.remove("_active");
                        }
                        isTransitioning = false;
                    }, 150);
                });
            }
        });
    });

    function toggleMask() {
        const activeItem = container.querySelector(".nav-dropdown._active");
        const body = document.body;
        activeItem ? body.classList.add("_nav-active-mask") : body.classList.remove("_nav-active-mask");
    }

    function removeActiveNav() {
        const activeItem = container.querySelector(".nav-dropdown._active");
        if (activeItem) {
            activeItem.classList.remove("_active");

            // Удаляем активные классы со всех подэлементов
            activeItem.querySelectorAll(".nav-dropdown__subitem._active").forEach(subitem => {
                subitem.classList.remove("_active");
            });

            // Удаляем активные классы со всех контейнеров
            activeItem.querySelectorAll(".nav-dropdown__subitem-container._active").forEach(container => {
                container.classList.remove("_active");
            });
        }
    }

    document.addEventListener("mouseover", e => {
        const isInDropdown = e.target.closest(".nav-dropdown");
        if (!isInDropdown) {
            clearTimeout(hideTimer);
            removeActiveNav();
            toggleMask();
        }
    });
};

export default navDropdown;
