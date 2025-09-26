import "./functions/fix-fullheight.js";
import GraphModal from "graph-modal";
import Marquee3k from "marquee3000";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

Swiper.use([Navigation, Pagination]);
Marquee3k.init();
new GraphModal();

const swiperBannerEl = document.querySelector("#swiper-banner");
const ourSolutionsEl = document.querySelector("#our-solutions");

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
        slidesPerView: 4,
        spaceBetween: 24,
        navigation: {
            nextEl: ourSolutionsEl.querySelector("#our-solutions-next"),
            prevEl: ourSolutionsEl.querySelector("#our-solutions-prev")
        }
    });
}
