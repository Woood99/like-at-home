const featuresTabs = () => {
    const featuresTabs = document.querySelector("#data-features-tabs");
    if (!featuresTabs) return;

    const tabsBtns = featuresTabs.querySelectorAll("[data-features-tabs-btn]");
    const tabsTexts = featuresTabs.querySelectorAll("[data-features-tabs-text]");
    const tabsImages = featuresTabs.querySelectorAll("[data-features-tabs-image]");

    const onChangeTab = id => {
        tabsTexts.forEach(item => {
            if (id === +item.dataset.featuresTabsText) {
                item.classList.add("_active");
            } else {
                item.classList.remove("_active");
            }
        });
        tabsImages.forEach(item => {
            if (id === +item.dataset.featuresTabsImage) {
                item.classList.add("_active");
            } else {
                item.classList.remove("_active");
            }
        });
        tabsBtns.forEach(item => {
            if (id === +item.dataset.featuresTabsBtn) {
                item.classList.add("_active");
            } else {
                item.classList.remove("_active");
            }
        });
    };

    const init = () => {
        onChangeTab(1);
        tabsBtns.forEach(btn => {
            btn.addEventListener("click", e => {
                onChangeTab(+e.target.dataset.featuresTabsBtn);
            });
        });
    };

    init();
};

export default featuresTabs;
