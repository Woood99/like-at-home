import Swiper from "swiper";

const sliderTabs = element => {
    if (!element) return;

    const swiperEl = element.querySelector("[data-slider-tabs-swiper]");
    const btnsContainer = element.querySelector("[data-tabs-container]");
    const btns = element.querySelectorAll("[data-slide]");

    if (!swiperEl || !btns.length || !btnsContainer) return;

    const activeLine = document.createElement("div");
    activeLine.className = "slider-tabs__active-line";
    btnsContainer.style.position = "relative";
    btnsContainer.appendChild(activeLine);

    const updateActiveLine = activeIndex => {
        const activeBtn = btns[activeIndex];
        if (!activeBtn) return;

        const containerRect = btnsContainer.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();

        const leftOffset = btnRect.left - containerRect.left;
        const btnWidth = btnRect.width;

        activeLine.style.transform = `translateX(${leftOffset}px)`;
        activeLine.style.width = `${btnWidth}px`;
    };

    const updateActiveTab = index => {
        btns.forEach((btn, i) => {
            const slideIndex = parseInt(btn.getAttribute("data-slide"), 10);
            if (slideIndex === index || i === index) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
        updateActiveLine(index);
    };

    const switchToSlide = index => {
        if (swiper && !swiper.destroyed && index >= 0 && index < swiper.slides.length) {
            swiper.slideTo(index, 300, false);
            updateActiveTab(index);
        }
    };

    const swiper = new Swiper(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 24,
        on: {
            init: function () {
                updateActiveTab(0);
            }
        }
    });

    if (swiper) {
        swiper.on("slideChange", function () {
            const currentIndex = swiper.activeIndex;
            updateActiveTab(currentIndex);
        });

        swiper.on("resize", function () {
            const currentIndex = swiper.activeIndex;
            updateActiveLine(currentIndex);
        });
    }

    btns.forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const slideIndex = parseInt(btn.getAttribute("data-slide"), 10);
            if (!isNaN(slideIndex)) {
                switchToSlide(slideIndex);
            }
        });
    });

    window.addEventListener("resize", () => {
        if (swiper && !swiper.destroyed) {
            const currentIndex = swiper.activeIndex;
            updateActiveLine(currentIndex);
        }
    });

    btnsContainer.addEventListener("scroll", () => {
        if (swiper && !swiper.destroyed) {
            const currentIndex = swiper.activeIndex;
            updateActiveLine(currentIndex);
        }
    });
};

export default sliderTabs;
