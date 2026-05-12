import { isDesktop } from "../functions/isDesktop.js";
import SimpleParallax from "simple-parallax-js/vanilla";

const initParallax = () => {
    const images = document.querySelectorAll("[data-simple-parallax]");
    if (images?.length) {
        new SimpleParallax(images, {
            orientation: "up",
            scale: 1.25,
            delay: 0,
            overflow: true,
            customWrapper: ".parallax-wrapper"
        });
    }

    if (isDesktop()) {
        const imagesPhones = document.querySelectorAll("[data-simple-parallax-phone]");
        imagesPhones.forEach(item => {
            const orientation = item.dataset.simpleParallaxPhoneOrientation;
            new SimpleParallax(item, {
                orientation: orientation,
                scale: 1.3,
                delay: 0,
                overflow: true,
                customWrapper: ".parallax-wrapper"
            });
        });
    }
};

export default initParallax;
