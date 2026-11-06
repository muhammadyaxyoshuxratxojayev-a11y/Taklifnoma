// ==========================================================================
// TO'Y TAKLIFNOMASI - ROMANTIK MUSIQA PLEYERI
// ==========================================================================

class WeddingAudioPlayer {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.synthContext = null;
    this.synthInterval = null;
    this.btn = document.getElementById("music-toggle-btn");
    this.isMuted = false;

    this.init();
  }

  init() {
    if (!this.btn) return;

    this.btn.addEventListener("click", () => {
      this.togglePlay();
    });

    // Audio elementini yaratish
    this.audio = new Audio();
    this.audio.preload = "auto";
    this.audio.loop = true;
    this.audio.volume = 0.65;

    if (WEDDING_CONFIG.music && WEDDING_CONFIG.music.audioSrc) {
      this.audio.src = WEDDING_CONFIG.music.audioSrc;
    }

    this.audio.addEventListener("playing", () => {
      this.isPlaying = true;
      this.btn.classList.add("playing");
      this.btn.setAttribute("title", "Musiqani to'xtatish");
    });

    this.audio.addEventListener("pause", () => {
      this.isPlaying = false;
      this.btn.classList.remove("playing");
      this.btn.setAttribute("title", "Musiqani qo'yish");
    });

    this.audio.addEventListener("error", (e) => {
      console.warn("Audio yuklanmadi, romantik Web Audio sintizator ishga tushiriladi.", e);
      if (WEDDING_CONFIG.music.useSynthFallback && !this.synthInterval && this.isPlaying) {
        this.startRomanticHarpSynth();
      }
    });
  }

  play() {
    if (this.isPlaying) return;

    // Avval audio faylni sinab ko'ramiz
    if (this.audio && this.audio.src) {
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.btn.classList.add("playing");
      }).catch((err) => {
        console.log("Audio autoplay bloklandi yoki fayl mavjud emas:", err);
        // Agar audio fayl o'ynamasa, Web Audio API yordamida nafis kuy chalish
        if (WEDDING_CONFIG.music.useSynthFallback) {
          this.startRomanticHarpSynth();
        }
      });
    } else if (WEDDING_CONFIG.music.useSynthFallback) {
      this.startRomanticHarpSynth();
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.stopRomanticHarpSynth();
    this.isPlaying = false;
    this.btn.classList.remove("playing");
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  // Internet bo'lmaganda yoki fayl yuklanmaganda ham mayin romantik kuy chaluvchi Web Audio API
  startRomanticHarpSynth() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!this.synthContext) {
        this.synthContext = new AudioContext();
      }
      if (this.synthContext.state === "suspended") {
        this.synthContext.resume();
      }

      this.isPlaying = true;
      this.btn.classList.add("playing");

      // Canon in D / Romantik to'y akkordlari notalari (Gertsda)
      // D - A - Bm - F#m - G - D - G - A
      const chords = [
        [293.66, 369.99, 440.00, 587.33], // D maj (D4, F#4, A4, D5)
        [220.00, 329.63, 440.00, 554.37], // A maj (A3, E4, A4, C#5)
        [246.94, 293.66, 369.99, 493.88], // B min (B3, D4, F#4, B4)
        [185.00, 277.18, 369.99, 554.37], // F# min (F#3, C#4, F#4, C#5)
        [196.00, 246.94, 293.66, 392.00], // G maj (G3, B3, D4, G4)
        [293.66, 369.99, 440.00, 587.33], // D maj (D4, F#4, A4, D5)
        [196.00, 246.94, 293.66, 392.00], // G maj (G3, B3, D4, G4)
        [220.00, 277.18, 329.63, 440.00]  // A maj (A3, C#4, E4, A4)
      ];

      let chordIdx = 0;
      let noteStep = 0;

      const playNextNote = () => {
        if (!this.isPlaying || !this.synthContext) return;
        const currentChord = chords[chordIdx];
        const freq = currentChord[noteStep % currentChord.length];

        const osc = this.synthContext.createOscillator();
        const gain = this.synthContext.createGain();

        // Arfa / Mayin pianino tovushini taqlid qilish
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.synthContext.currentTime);

        // Mayin atak va so'nish
        gain.gain.setValueAtTime(0.001, this.synthContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, this.synthContext.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.synthContext.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(this.synthContext.destination);

        osc.start();
        osc.stop(this.synthContext.currentTime + 1.8);

        noteStep++;
        if (noteStep >= currentChord.length) {
          noteStep = 0;
          chordIdx = (chordIdx + 1) % chords.length;
        }
      };

      if (this.synthInterval) clearInterval(this.synthInterval);
      this.synthInterval = setInterval(playNextNote, 550);
      playNextNote();
    } catch (e) {
      console.warn("Synth xatolik:", e);
    }
  }

  stopRomanticHarpSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

window.weddingAudio = null;
document.addEventListener("DOMContentLoaded", () => {
  window.weddingAudio = new WeddingAudioPlayer();
});
