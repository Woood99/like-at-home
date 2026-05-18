export const virtualDispatcherCat = container => {
    if (!container) return;

    const leftEye = container.querySelector(".eye-left .eye-svg");
    const rightEye = container.querySelector(".eye-right .eye-svg");

    function blinkBoth() {
        return new Promise(resolve => {
            if (leftEye.classList.contains("blink")) {
                resolve();
                return;
            }
            leftEye.classList.add("blink");
            rightEye.classList.add("blink");
            setTimeout(() => {
                leftEye.classList.remove("blink");
                rightEye.classList.remove("blink");
                resolve();
            }, 350);
        });
    }

    async function doubleBlink() {
        await blinkBoth();
        await new Promise(r => setTimeout(r, 200));
        await blinkBoth();
    }

    async function startBlinkCycle() {
        await new Promise(r => setTimeout(r, 500));
        await doubleBlink();
        setInterval(async () => {
            await doubleBlink();
        }, 3000);
    }

    startBlinkCycle();
};
