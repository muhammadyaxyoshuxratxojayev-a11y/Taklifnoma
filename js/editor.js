// ==========================================================================
// TO'Y TAKLIFNOMASI - MA'LUMOTLARNI TAHRIRLASH MODAL OYNASI (LIVE EDITOR)
// ==========================================================================

class WeddingEditor {
  constructor() {
    this.modal = document.getElementById("editor-modal");
    this.openBtn = document.getElementById("open-editor-btn");
    this.closeBtn = document.getElementById("close-editor-btn");
    this.form = document.getElementById("editor-form");
    this.exportBtn = document.getElementById("export-config-btn");
    this.resetBtn = document.getElementById("reset-config-btn");

    this.init();
  }

  init() {
    if (this.openBtn) {
      this.openBtn.addEventListener("click", () => this.openModal());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeModal());
    }

    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSave(e));
    }

    if (this.exportBtn) {
      this.exportBtn.addEventListener("click", () => this.exportConfigFile());
    }

    if (this.resetBtn) {
      this.resetBtn.addEventListener("click", () => this.resetDefaults());
    }
  }

  openModal() {
    if (!this.modal) return;
    this.populateForm();
    this.modal.classList.add("active");
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove("active");
  }

  populateForm() {
    const c = WEDDING_CONFIG;
    this.setVal("edit-groom-name", c.couple.groom.name);
    this.setVal("edit-bride-name", c.couple.bride.name);
    this.setVal("edit-monogram", c.couple.monogram);
    this.setVal("edit-parents", c.invitation.signature);
    
    // Sana (YYYY-MM-DDTHH:MM)
    if (c.event.date) {
      const dt = c.event.date.substring(0, 16);
      this.setVal("edit-wedding-date", dt);
    }

    this.setVal("edit-venue-name", c.venue.name);
    this.setVal("edit-venue-address", c.venue.address);
    this.setVal("edit-venue-landmark", c.venue.landmark);
    this.setVal("edit-yandex-map", c.venue.yandexMapUrl);
    this.setVal("edit-google-map", c.venue.googleMapUrl);

    if (c.rsvp.telegramBot) {
      this.setVal("edit-bot-token", c.rsvp.telegramBot.token || "");
      this.setVal("edit-chat-id", c.rsvp.telegramBot.chatId || "");
      const botCheck = document.getElementById("edit-bot-enabled");
      if (botCheck) botCheck.checked = !!c.rsvp.telegramBot.enabled;
    }
  }

  handleSave(e) {
    e.preventDefault();

    const groomName = this.getVal("edit-groom-name") || "Sardor";
    const brideName = this.getVal("edit-bride-name") || "Mohinur";
    const monogram = this.getVal("edit-monogram") || `${groomName[0]} & ${brideName[0]}`;
    const dateVal = this.getVal("edit-wedding-date") || "2026-11-25T18:00";
    const parents = this.getVal("edit-parents");

    const venueName = this.getVal("edit-venue-name");
    const venueAddress = this.getVal("edit-venue-address");
    const venueLandmark = this.getVal("edit-venue-landmark");
    const yandexMap = this.getVal("edit-yandex-map");
    const googleMap = this.getVal("edit-google-map");

    const botToken = this.getVal("edit-bot-token");
    const chatId = this.getVal("edit-chat-id");
    const botEnabled = document.getElementById("edit-bot-enabled")?.checked || false;

    // Sanani formatlash
    const dateObj = new Date(dateVal);
    const months = [
      "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
      "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
    ];
    const days = [
      "Yakshanba", "Dushanba", "Seshanba", "Chorshanba",
      "Payshanba", "Juma", "Shanba"
    ];

    const year = dateObj.getFullYear();
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const dayName = days[dateObj.getDay()];
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const mins = String(dateObj.getMinutes()).padStart(2, "0");

    // Config obyektini yangilash
    WEDDING_CONFIG.couple.groom.name = groomName;
    WEDDING_CONFIG.couple.bride.name = brideName;
    WEDDING_CONFIG.couple.monogram = monogram;
    WEDDING_CONFIG.couple.title = `${groomName} & ${brideName}`;

    if (parents) {
      WEDDING_CONFIG.invitation.signature = parents;
    }

    WEDDING_CONFIG.event.date = dateVal.length === 16 ? `${dateVal}:00` : dateVal;
    WEDDING_CONFIG.event.displayDate = `${day}-${month}, ${year}-yil`;
    WEDDING_CONFIG.event.displayDay = `${dayName} oqshomi`;
    WEDDING_CONFIG.event.time = `${hours}:${mins} da`;

    if (venueName) WEDDING_CONFIG.venue.name = venueName;
    if (venueAddress) WEDDING_CONFIG.venue.address = venueAddress;
    if (venueLandmark) WEDDING_CONFIG.venue.landmark = venueLandmark;
    if (yandexMap) WEDDING_CONFIG.venue.yandexMapUrl = yandexMap;
    if (googleMap) WEDDING_CONFIG.venue.googleMapUrl = googleMap;

    WEDDING_CONFIG.rsvp.telegramBot = {
      enabled: botEnabled,
      token: botToken,
      chatId: chatId
    };

    // LocalStorage ga yozish
    localStorage.setItem("wedding_config_custom", JSON.stringify(WEDDING_CONFIG));

    // Sahifani qayta chizish
    if (window.renderWeddingPage) {
      window.renderWeddingPage();
    }
    if (window.weddingCountdown) {
      window.weddingCountdown.restart();
    }

    this.closeModal();

    if (window.showToast) {
      window.showToast("Barcha ma'lumotlar muvaffaqiyatli saqlandi! ✨");
    } else if (window.weddingRSVP && window.weddingRSVP.showToast) {
      window.weddingRSVP.showToast("Barcha ma'lumotlar muvaffaqiyatli saqlandi! ✨");
    }
  }

  exportConfigFile() {
    const configStr = `// Yangilangan config.js fayli\nconst WEDDING_CONFIG = ${JSON.stringify(WEDDING_CONFIG, null, 2)};\n\nif (typeof module !== 'undefined') module.exports = WEDDING_CONFIG;`;
    const blob = new Blob([configStr], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "config.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.showToast) {
      window.showToast("config.js fayli yuklab olindi! js/config.js fayliga joylashtirishingiz mumkin.");
    } else if (window.weddingRSVP && window.weddingRSVP.showToast) {
      window.weddingRSVP.showToast("config.js fayli yuklab olindi! js/config.js fayliga joylashtirishingiz mumkin.");
    }
  }

  resetDefaults() {
    if (confirm("Haqiqatdan ham barcha sozlamalarni dastlabki holatga qaytarmoqchimisiz?")) {
      localStorage.removeItem("wedding_config_custom");
      window.location.reload();
    }
  }

  getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.value = val;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.weddingEditor = new WeddingEditor();
});
