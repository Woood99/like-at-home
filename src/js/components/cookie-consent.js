export const cookieConsent = () => {
    const cookieElement = document.getElementById("cookieConsent");
    const acceptButton = document.getElementById("acceptCookiesBtn");

    if (!cookieElement || !acceptButton) return;

    const COOKIE_ACCEPT_NAME = "cookieAccept";

    function handleCookieAccept() {
        localStorage.setItem(COOKIE_ACCEPT_NAME, "true");
        checkCookieConsent();
    }

    function checkCookieConsent() {
        const alreadyAccepted = localStorage.getItem(COOKIE_ACCEPT_NAME);
        cookieElement.style.display = alreadyAccepted === "true" ? "none" : "block";
    }

    checkCookieConsent();
    acceptButton.addEventListener("click", handleCookieAccept);
};
