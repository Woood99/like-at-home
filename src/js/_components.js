import Api from "./components/api.js";
import featuresTabs from "./components/featuresTabs.js";
import validateForms from "./components/validate-forms.js";
import "./functions/burger.js";
import "./functions/dynamic-adapt.js";
import "./functions/fix-fullheight.js";
import { getHeaderHeight } from "./functions/header-height.js";
import Modal from "./functions/modal.js";
import spollers from "./functions/spollers.js";
import tabs from "./functions/tabs.js";
import Marquee3k from "marquee3000";
import SimpleParallax from "simple-parallax-js/vanilla";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

Swiper.use([Navigation, Pagination]);

document.addEventListener("DOMContentLoaded", () => {
    spollers();
    tabs();
    featuresTabs();
    Marquee3k.init();
    getHeaderHeight();
    const modal = new Modal();
    if (modal) window.modal = modal;

    window.addEventListener("resize", () => {
        getHeaderHeight();
    });

    const swiperBannerEl = document.querySelector("#swiper-banner");
    const ourSolutionsEl = document.querySelector("#our-solutions");
    const featuresEl = document.querySelector("#features-block");

    if (swiperBannerEl) {
        new Swiper(swiperBannerEl, {
            slidesPerView: 1,
            spaceBetween: 8,
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

    const createBidForm = document.querySelector("#create-bid-form");
    const formBidForm = document.querySelector("#form-bid");

    if (createBidForm) {
        validateForms(createBidForm, [
            {
                ruleSelector: "[name='name']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    }
                ]
            },
            {
                ruleSelector: "[name='email']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    },
                    {
                        rule: "email",
                        errorMessage: "Введите корректный email"
                    }
                ]
            },
            {
                ruleSelector: "[name='phone']",
                tel: true,
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    },
                    {
                        rule: "function",
                        validator: function () {
                            const phone = createBidForm.querySelector("[name='phone']")?.inputmask.unmaskedvalue();
                            return phone.length === 10;
                        },
                        errorMessage: "Введите корректный телефон"
                    }
                ]
            },
            {
                ruleSelector: "[name='company']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    }
                ]
            },
            {
                ruleSelector: "[name='agreement']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    }
                ]
            }
        ]);

        createBidForm.addEventListener("submit", e => {
            if (e.target.classList.contains("is-valid")) {
                console.log("submit");
                const formData = new FormData(e.target);
                const resp = new Api().sendRequest(formData);
                resp.then(isSuccess => {
                    console.log(isSuccess);
                    if (isSuccess) {
                        window.modal.animation = "fadeInUp";
                        window.modal.speed = 350;
                        window.modal._nextContainer = document.querySelector(`[data-graph-target="success-bid"]`);
                        window.modal.open();
                    }
                });
            }
        });
    }

    if (formBidForm) {
        validateForms(formBidForm, [
            {
                ruleSelector: "[name='name']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    }
                ]
            },
            {
                ruleSelector: "[name='email']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    },
                    {
                        rule: "email",
                        errorMessage: "Введите корректный email"
                    }
                ]
            },
            {
                ruleSelector: "[name='phone']",
                tel: true,
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    },
                    {
                        rule: "function",
                        validator: function () {
                            const phone = formBidForm.querySelector("[name='phone']")?.inputmask.unmaskedvalue();
                            return phone.length === 10;
                        },
                        errorMessage: "Введите корректный телефон"
                    }
                ]
            },
            {
                ruleSelector: "[name='agreement']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    }
                ]
            }
        ]);

        formBidForm.addEventListener("submit", e => {
            if (e.target.classList.contains("is-valid")) {
                console.log("submit");
                const formData = new FormData(e.target);
                const resp = new Api().sendRequest(formData);
                resp.then(isSuccess => {
                    console.log(isSuccess);
                    if (isSuccess) {
                        window.modal.animation = "fadeInUp";
                        window.modal.speed = 350;
                        window.modal._nextContainer = document.querySelector(`[data-graph-target="success-bid"]`);
                        window.modal.open();
                    }
                });
            }
        });
    }

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

    const images = document.querySelectorAll("[data-simple-parallax]");
    new SimpleParallax(images, {
        orientation: "up",
        scale: 1.5,
        overflow: true,
        customWrapper: ".parallax-wrapper"
    });

    // if (isDesktop()) {
    //     document.querySelectorAll(".banner-parallax").forEach(item => {
    //         new Parallax(item, parallaxOnBodyConfig);
    //     });

    //     document.querySelectorAll(".cloud-pass-service-parallax").forEach(item => {
    //         new Parallax(item, parallaxOnBodyConfig);
    //     });
    // }
});
