import validateForms from "./components/validate-forms.js";
import "./functions/burger.js";
import "./functions/fix-fullheight.js";
import { getHeaderHeight } from "./functions/header-height.js";
import Modal from "./functions/modal.js";
import Marquee3k from "marquee3000";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

Swiper.use([Navigation, Pagination]);
Marquee3k.init();
getHeaderHeight();
new Modal();

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
            ruleSelector: "[name='tel']",
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
                        const phone = createBidForm.querySelector("[name='tel']")?.inputmask.unmaskedvalue();
                        return phone.length === 10;
                    },
                    errorMessage: "Введите корректный телефон"
                }
            ]
        },
        {
            ruleSelector: "[name='company_name']",
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
            ruleSelector: "[name='tel']",
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
                        const phone = formBidForm.querySelector("[name='tel']")?.inputmask.unmaskedvalue();
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
}
