export class AudioVisualize {
    static players = [];

    constructor(container, options = {}) {
        this.options = {
            barWidth: 3,
            barSpacing: 3,
            radius: 2,
            playedColor: "#1B1D1F",
            unplayedColor: "#D8D8D8",
            buttonSize: 50,
            buttonColor: "#1B1D1F",
            iconColor: "#FFFFFF",
            height: 34,
            ...options
        };

        this.container = typeof container === "string" ? document.querySelector(container) : container;

        if (!this.container) {
            throw new Error("Container not found");
        }

        this.createDOM();

        this.canvas = this.container.querySelector(".wd-waveform-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.playButton = this.container.querySelector(".wd-play-button");

        this.waveformData = [];
        this.processedData = [];
        this.barCount = 0;
        this.progress = 0;
        this.audio = null;
        this.isPlaying = false;
        this.duration = 0;
        this.updateInterval = null;

        this.init();

        AudioVisualize.players.push(this);
    }

    createDOM() {
        this.container.innerHTML = "";
        this.container.className += " wd-waveform-container";

        const wrapper = document.createElement("div");
        wrapper.className = "wd-waveform-wrapper";

        const button = document.createElement("div");
        button.className = "wd-play-button";
        button.style.width = `${this.options.buttonSize}px`;
        button.style.height = `${this.options.buttonSize}px`;
        button.style.backgroundColor = this.options.buttonColor;
        button.innerHTML = `
            <svg viewBox="0 0 24 24" style="width: 24px; height: 24px;">
                <path d="M8 5v14l11-7z" fill="${this.options.iconColor}"/>
            </svg>
        `;

        const waveformContainer = document.createElement("div");
        waveformContainer.className = "wd-waveform-inner";

        const canvas = document.createElement("canvas");
        canvas.className = "wd-waveform-canvas";
        canvas.style.width = "100%";
        canvas.style.height = `${this.options.height}px`;

        waveformContainer.appendChild(canvas);
        wrapper.appendChild(button);
        wrapper.appendChild(waveformContainer);
        this.container.appendChild(wrapper);

        this.injectStyles();
    }

    injectStyles() {
        if (document.getElementById("wd-waveform-styles")) return;

        const styles = document.createElement("style");
        styles.id = "wd-waveform-styles";
        styles.textContent = `
            .wd-waveform-container {
                width: 100%;
            }
            
            .wd-waveform-wrapper {
                display: flex;
                align-items: center;
                gap: 18px;
                width: 100%;
            }
            
            .wd-play-button {
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s;
                flex-shrink: 0;
            }
            
            .wd-play-button:hover {
                transform: scale(1.05);
                opacity: 0.9;
            }
            
            .wd-play-button:active {
                transform: scale(0.95);
            }
            
            .wd-waveform-inner {
                flex: 1;
                cursor: pointer;
            }
            
            .wd-waveform-canvas {
                display: block;
                width: 100%;
            }
        `;

        document.head.appendChild(styles);
    }

    init() {
        this.setupCanvas();
        window.addEventListener("resize", () => this.setupCanvas());
        this.initEvents();
    }

    setupCanvas() {
        const container = this.canvas.parentElement;
        const width = container.clientWidth;
        this.canvas.width = width;
        this.canvas.height = this.options.height;

        this.barCount = Math.floor(width / (this.options.barWidth + this.options.barSpacing));

        if (this.waveformData.length === 0) {
            this.generateMockWaveform();
        } else {
            this.processedData = this.normalizeWaveform(this.waveformData);
        }

        this.draw();
    }

    generateMockWaveform() {
        if (!this.barCount) return;

        this.waveformData = [];
        for (let i = 0; i < this.barCount; i++) {
            let amplitude;
            if (i < this.barCount * 0.2) {
                amplitude = 0.15 + Math.random() * 0.2;
            } else if (i > this.barCount * 0.8) {
                amplitude = 0.15 + Math.random() * 0.15;
            } else {
                amplitude = 0.3 + Math.random() * 0.6;
            }
            this.waveformData.push(amplitude);
        }
        this.processedData = this.normalizeWaveform(this.waveformData);
        this.draw();
    }

    initEvents() {
        this.playButton.addEventListener("click", e => {
            e.stopPropagation();
            this.toggle();
        });

        this.canvas.addEventListener("click", e => {
            if (!this.duration) return;

            const rect = this.canvas.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const newTime = percent * this.duration;

            if (this.audio && !isNaN(newTime) && newTime >= 0 && newTime <= this.duration) {
                this.audio.currentTime = newTime;
                this.updateProgress();
            }
        });
    }

    normalizeWaveform(data) {
        if (!data.length) return [];

        let max = Math.max(...data, 0.01);

        return data.map(val => {
            let norm = val / max;
            norm = Math.pow(norm, 0.7);
            return Math.min(0.9, Math.max(0.15, norm));
        });
    }

    loadWaveformFromAudio(channelData) {
        if (!this.barCount) return;

        const samplesPerBar = Math.floor(channelData.length / this.barCount);

        this.waveformData = [];

        for (let i = 0; i < this.barCount; i++) {
            let sum = 0;
            const start = i * samplesPerBar;
            const end = Math.min(start + samplesPerBar, channelData.length);

            for (let j = start; j < end; j++) {
                sum += Math.abs(channelData[j]);
            }

            let amplitude = sum / samplesPerBar;
            amplitude = Math.pow(amplitude * 2.5, 0.8);
            amplitude = Math.min(amplitude, 0.9);
            amplitude = Math.max(amplitude, 0.12);

            this.waveformData.push(amplitude);
        }

        this.processedData = this.normalizeWaveform(this.waveformData);
        this.draw();
    }

    draw() {
        if (!this.canvas || !this.ctx) return;

        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerY = height / 2;
        const maxBarHeight = height - 8;

        this.ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < this.processedData.length; i++) {
            const value = this.processedData[i];
            const barHeight = Math.max(2, value * maxBarHeight);

            const x = i * (this.options.barWidth + this.options.barSpacing);
            const y = centerY - barHeight / 2;

            const barProgress = i / this.processedData.length;
            const isPlayed = barProgress <= this.progress;

            if (isPlayed) {
                this.ctx.fillStyle = this.options.playedColor;
            } else {
                const opacity = 0.7 + value * 0.3;
                this.ctx.fillStyle = `rgba(216, 216, 216, ${opacity})`;
            }

            this.roundedRect(x, y, this.options.barWidth, barHeight, this.options.radius);
            this.ctx.fill();
        }
    }

    roundedRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }

    updateProgress() {
        if (!this.audio || !this.duration) return;

        const current = this.audio.currentTime;
        const percent = current / this.duration;

        this.progress = Math.min(1, Math.max(0, percent));
        this.draw();

        if (this.onProgress) {
            this.onProgress(percent, current, this.duration);
        }
    }

    startProgressUpdate() {
        if (this.updateInterval) clearInterval(this.updateInterval);
        this.updateInterval = setInterval(() => this.updateProgress(), 50);
    }

    stopProgressUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    updateButtonIcon() {
        const svg = this.playButton.querySelector("svg");
        if (this.isPlaying) {
            svg.innerHTML = `
                <rect x="6" y="5" width="3" height="14" rx="1" fill="${this.options.iconColor}"/>
                <rect x="15" y="5" width="3" height="14" rx="1" fill="${this.options.iconColor}"/>
            `;
        } else {
            svg.innerHTML = `<path d="M8 5v14l11-7z" fill="${this.options.iconColor}"/>`;
        }
    }

    setupAudioEvents() {
        if (!this.audio) return;

        this.audio.addEventListener("timeupdate", () => this.updateProgress());
        this.audio.addEventListener("ended", () => {
            this.isPlaying = false;
            this.stopProgressUpdate();
            this.updateButtonIcon();

            setTimeout(() => {
                if (!this.isPlaying) {
                    this.progress = 0;
                    this.draw();
                }
            }, 500);

            if (this.onEnded) this.onEnded();
        });
        this.audio.addEventListener("loadedmetadata", () => {
            this.duration = this.audio.duration;
        });
    }

    async loadAudio(audioPathOrFile) {
        this.stop();

        if (typeof audioPathOrFile === "string") {
            this.audio = new Audio(audioPathOrFile);

            await new Promise(resolve => {
                this.audio.addEventListener("loadedmetadata", resolve, { once: true });
            });

            this.duration = this.audio.duration;

            try {
                const response = await fetch(audioPathOrFile);
                const arrayBuffer = await response.arrayBuffer();
                const audioContext = new AudioContext();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

                const channelData = audioBuffer.getChannelData(0);
                this.loadWaveformFromAudio(channelData);

                await audioContext.close();
            } catch (error) {
                console.warn("Cannot analyze audio (CORS), using mock waveform");
                this.generateMockWaveform();
            }

            this.setupAudioEvents();

            if (this.onLoad) {
                this.onLoad(this.duration);
            }

            return;
        }

        if (audioPathOrFile instanceof File) {
            const arrayBuffer = await audioPathOrFile.arrayBuffer();
            const audioContext = new AudioContext();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            this.duration = audioBuffer.duration;
            const channelData = audioBuffer.getChannelData(0);
            this.loadWaveformFromAudio(channelData);

            const url = URL.createObjectURL(audioPathOrFile);
            this.audio = new Audio(url);

            await audioContext.close();
            this.setupAudioEvents();

            if (this.onLoad) {
                this.onLoad(this.duration);
            }
        }
    }

    async play() {
        if (!this.audio) return;

        AudioVisualize.players.forEach(player => {
            if (player !== this && player.isPlaying) {
                console.log("Pausing other player");
                player.pause();
            }
        });

        try {
            await this.audio.play();
            this.isPlaying = true;
            this.startProgressUpdate();
            this.updateButtonIcon();
            if (this.onPlay) this.onPlay();
        } catch (error) {
            console.error("Play error:", error);
            if (this.onError) this.onError(error);
        }
    }

    pause() {
        if (this.audio && this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            this.stopProgressUpdate();
            this.updateButtonIcon();
            if (this.onPause) this.onPause();
        }
    }

    stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.isPlaying = false;
            this.stopProgressUpdate();
            this.progress = 0;
            this.draw();
            this.updateButtonIcon();
            if (this.onStop) this.onStop();
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    setProgress(percent) {
        if (!this.audio || !this.duration) return;
        const newTime = percent * this.duration;
        this.audio.currentTime = newTime;
        this.updateProgress();
    }

    destroy() {
        const index = AudioVisualize.players.indexOf(this);
        if (index > -1) {
            AudioVisualize.players.splice(index, 1);
        }

        this.stop();
        if (this.audio) {
            this.audio.src = "";
            this.audio = null;
        }
        window.removeEventListener("resize", () => this.setupCanvas());
        this.container.innerHTML = "";
    }

    getCurrentTime() {
        return this.audio ? this.audio.currentTime : 0;
    }

    getDuration() {
        return this.duration;
    }

    isPlayingAudio() {
        return this.isPlaying;
    }
}

// example
// <div id='waveform1'></div>
// const player1 = new AudioVisualize("#waveform1");
// player1.loadAudio("./audio-example.mp3");
