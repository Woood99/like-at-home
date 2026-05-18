import actionTg from "./components/actionTg.js";
import Api from "./components/api.js";
import { AudioVisualize } from "./components/audioVisualize.js";
import { cookieConsent } from "./components/cookie-consent.js";
import createValidateForms from "./components/createValidateForms.js";
import featuresTabs from "./components/featuresTabs.js";
import initParallax from "./components/initParallax.js";
import initSliders from "./components/initSliders.js";
import navDropdown from "./components/navDropdown.js";
import { setCurrentMonth } from "./components/setCurrentMonth.js";
import { virtualDispatcherCat } from "./components/virtualDispatcherCat.js";
import "./functions/burger.js";
import "./functions/dynamic-adapt.js";
import "./functions/fix-fullheight.js";
import { getHeaderHeight } from "./functions/header-height.js";
import Modal from "./functions/modal.js";
import spollers from "./functions/spollers.js";
import tabs from "./functions/tabs.js";
import Marquee3k from "marquee3000";

document.addEventListener("DOMContentLoaded", () => {
    spollers();
    tabs();
    featuresTabs();
    Marquee3k.init();
    getHeaderHeight();
    navDropdown();
    const modal = new Modal();
    if (modal) window.modal = modal;

    window.addEventListener("resize", () => {
        getHeaderHeight();
    });

    createValidateForms();
    actionTg();
    initParallax();
    initSliders();
    cookieConsent();

    document.querySelectorAll("[data-eye-animation]").forEach(element => {
        virtualDispatcherCat(element);
    });
    document.querySelectorAll("[data-current-month]").forEach(element => {
        setCurrentMonth(element);
    });
    document.querySelectorAll("[data-audio-src]").forEach(element => {
        const theme = element.dataset.audioTheme;
        const isVisualOnly = !!element.dataset.audioVisualOnly;

        const options = {
            playedColor: theme === "blue" ? "#3c46ff" : "#1B1D1F",
            buttonColor: theme === "blue" ? "#3c46ff" : "#1B1D1F",
            visualOnly: isVisualOnly
        };

        const player = new AudioVisualize(element, options);
        player.loadAudio(element.getAttribute("data-audio-src"));
        element.player = player;
    });
});
