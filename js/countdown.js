// ==========================================================================
// TO'Y TAKLIFNOMASI - ORTGA HISOBLASH TAYMERI (COUNTDOWN)
// ==========================================================================

class WeddingCountdown {
  constructor() {
    this.daysEl = document.getElementById("cd-days");
    this.hoursEl = document.getElementById("cd-hours");
    this.minutesEl = document.getElementById("cd-minutes");
    this.secondsEl = document.getElementById("cd-seconds");
    this.titleEl = document.getElementById("countdown-status-title");

    this.timerId = null;
    this.init();
  }

  init() {
    this.update();
    this.timerId = setInterval(() => this.update(), 1000);
  }

  update() {
    if (!WEDDING_CONFIG.event || !WEDDING_CONFIG.event.date) return;

    const targetDate = new Date(WEDDING_CONFIG.event.date).getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (this.daysEl) this.daysEl.textContent = "00";
      if (this.hoursEl) this.hoursEl.textContent = "00";
      if (this.minutesEl) this.minutesEl.textContent = "00";
      if (this.secondsEl) this.secondsEl.textContent = "00";
      if (this.titleEl) this.titleEl.textContent = "Bugun to'yimiz kuni! Xush kelibsiz!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (this.daysEl) this.daysEl.textContent = String(days).padStart(2, "0");
    if (this.hoursEl) this.hoursEl.textContent = String(hours).padStart(2, "0");
    if (this.minutesEl) this.minutesEl.textContent = String(minutes).padStart(2, "0");
    if (this.secondsEl) this.secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  restart() {
    this.update();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.weddingCountdown = new WeddingCountdown();
});
