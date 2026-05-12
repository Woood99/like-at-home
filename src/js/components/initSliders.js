import sliderTabs from "./sliderTabs.js";
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

Swiper.use([Navigation, Pagination, Autoplay]);

const initSliders = () => {
    const swiperBannerEl = document.querySelector("#swiper-banner");
    const ourSolutionsEl = document.querySelector("#our-solutions");
    const featuresEl = document.querySelector("#features-block");
    const navDropdownSliders = document.querySelectorAll(".nav-dropdown-slider");

    if (swiperBannerEl) {
        new Swiper(swiperBannerEl, {
            slidesPerView: 1,
            spaceBetween: 8,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: "#swiper-banner-pagination",
                clickable: true
            }
        });
    }

    if (ourSolutionsEl) {
        new Swiper(ourSolutionsEl.querySelector("#swiper-solutions"), {
            slidesPerView: 1,
            spaceBetween: 24,
            navigation: {
                nextEl: ourSolutionsEl.querySelector("#our-solutions-next"),
                prevEl: ourSolutionsEl.querySelector("#our-solutions-prev")
            },
            breakpoints: {
                499: {
                    slidesPerView: 2
                },
                820: {
                    slidesPerView: 3
                },
                1201: {
                    slidesPerView: 4
                }
            }
        });
    }

    if (featuresEl) {
        new Swiper(featuresEl.querySelector("#features-block-swiper"), {
            slidesPerView: 1,
            spaceBetween: 8,
            navigation: {
                nextEl: featuresEl.querySelector("#features-block-next"),
                prevEl: featuresEl.querySelector("#features-block-prev")
            },

            on: {
                init: function () {
                    updateActiveImage(this.activeIndex);
                },
                slideChange: function () {
                    updateActiveImage(this.activeIndex);
                }
            }
        });

        function updateActiveImage(activeIndex) {
            const images = Array.from(featuresEl.querySelectorAll("[data-features-image]"));
            if (images.length === 0) return;

            images.forEach(img => {
                img.style.opacity = "0";
            });

            const activeImage = images.find(img => +img.dataset.featuresImage === activeIndex);
            if (activeImage) {
                activeImage.style.opacity = "1";
            }
        }
    }

    if (!!navDropdownSliders.length) {
        navDropdownSliders.forEach(item => {
            new Swiper(item, {
                slidesPerView: 1,
                spaceBetween: 8,
                pagination: {
                    el: ".nav-dropdown-slider-pagination",
                    clickable: true
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }
            });
        });
    }

    document.querySelectorAll("[data-slider-tabs]").forEach(element => sliderTabs(element));
};

export default initSliders;
