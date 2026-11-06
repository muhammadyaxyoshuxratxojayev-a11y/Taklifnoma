// ==========================================================================
// TO'Y TAKLIFNOMASI - ASOSIY ILOVA (APP.JS)
// ==========================================================================

let venueMapInstance = null;

// Sahifadagi barcha ma'lumotlarni WEDDING_CONFIG asosida chizish
function renderWeddingPage() {
  const c = WEDDING_CONFIG;
  if (!c) return;

  // 1. Monogramma va Ismlar
  setAllText(".dyn-monogram", c.couple.monogram);
  setAllText(".dyn-groom-name", c.couple.groom.name);
  setAllText(".dyn-bride-name", c.couple.bride.name);
  setAllText(".dyn-groom-initial", (c.couple.groom.name || "S")[0].toUpperCase());
  setAllText(".dyn-bride-initial", (c.couple.bride.name || "M")[0].toUpperCase());
  setAllText(".dyn-couple-title", `${c.couple.groom.name} & ${c.couple.bride.name}`);
  setAllText(".dyn-groom-parents", c.couple.groom.parents);
  setAllText(".dyn-bride-parents", c.couple.bride.parents);

  // 2. Sana va Vaqt
  setAllText(".dyn-date-full", `${c.event.displayDate}, ${c.event.displayDay}`);
  setAllText(".dyn-date-display", c.event.displayDate);
  setAllText(".dyn-day-display", c.event.displayDay);
  setAllText(".dyn-time-display", c.event.time);

  // 3. Shior va Taklif Matni
  setAllText(".dyn-quote-text", c.quote.text);
  setAllText(".dyn-quote-source", c.quote.source);
  setAllText(".dyn-bismillah", c.quote.bismillah);
  setAllText(".dyn-invitation-greeting", c.invitation.greeting);
  setAllText(".dyn-invitation-text", c.invitation.text);
  setAllText(".dyn-invitation-subtext", c.invitation.subtext);
  setAllText(".dyn-invitation-signature", c.invitation.signature);

  // 4. To'yxona va Manzil
  setAllText(".dyn-venue-name", c.venue.name);
  setAllText(".dyn-venue-hall", c.venue.hall);
  setAllText(".dyn-venue-address", c.venue.address);
  setAllText(".dyn-venue-landmark", c.venue.landmark);

  // Havolalar
  setAllHref(".dyn-yandex-link", c.venue.yandexMapUrl);
  setAllHref(".dyn-google-link", c.venue.googleMapUrl);
  setAllHref(".dyn-2gis-link", c.venue.twoGisUrl);

  // 5. Dress-Code Ranglarini chizish
  renderDressCode();

  // 6. To'y dasturi (Timeline)
  renderTimeline();

  // 7. Xaritani yangilash
  initOrUpdateMap();
}

function setAllText(selector, text) {
  if (text === undefined || text === null) return;
  document.querySelectorAll(selector).forEach(el => {
    el.textContent = text;
  });
}

function setAllHref(selector, href) {
  if (!href) return;
  document.querySelectorAll(selector).forEach(el => {
    el.setAttribute("href", href);
  });
}

// Dress-code ranglarini generatsiya qilish
function renderDressCode() {
  const container = document.getElementById("dress-code-colors-container");
  if (!container || !WEDDING_CONFIG.dressCode || !WEDDING_CONFIG.dressCode.colors) return;

  container.innerHTML = "";
  WEDDING_CONFIG.dressCode.colors.forEach(item => {
    const swatch = document.createElement("div");
    swatch.className = "color-swatch-item";
    swatch.innerHTML = `
      <div class="color-circle" style="background-color: ${item.hex};" title="${item.name}"></div>
      <span class="color-label">${item.name}</span>
    `;
    container.appendChild(swatch);
  });
}

// To'y dasturi (Timeline) render qilish
function renderTimeline() {
  const container = document.getElementById("timeline-list-container");
  if (!container || !WEDDING_CONFIG.timeline) return;

  const iconsMap = {
    coffee: "☕",
    heart: "💍",
    camera: "📸",
    music: "✨",
    cake: "🎂"
  };

  container.innerHTML = "";
  WEDDING_CONFIG.timeline.forEach(item => {
    const icon = iconsMap[item.icon] || "✨";
    const div = document.createElement("div");
    div.className = "timeline-item";
    div.innerHTML = `
      <div class="timeline-icon-box">${icon}</div>
      <div class="timeline-content">
        <div class="timeline-time">${item.time}</div>
        <h4 class="timeline-title">${item.title}</h4>
        <p class="timeline-desc">${item.description}</p>
      </div>
    `;
    container.appendChild(div);
  });
}

// Interaktiv Leaflet xaritasi (Oltin marker bilan)
function initOrUpdateMap() {
  const mapEl = document.getElementById("venue-map");
  if (!mapEl || typeof L === "undefined") return;

  const lat = WEDDING_CONFIG.venue.coordinates.lat || 41.3524;
  const lng = WEDDING_CONFIG.venue.coordinates.lng || 69.2885;

  if (!venueMapInstance) {
    venueMapInstance = L.map("venue-map", {
      center: [lat, lng],
      zoom: 15,
      scrollWheelZoom: false
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CartoDB</a>',
      maxZoom: 19
    }).addTo(venueMapInstance);

    const goldIcon = L.divIcon({
      className: "custom-gold-marker",
      html: `
        <div style="
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #BF953F, #FCF6BA, #AA771C);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 2px solid #FFF;
          box-shadow: 0 4px 14px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <span style="transform: rotate(45deg); font-size: 16px;">💍</span>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    L.marker([lat, lng], { icon: goldIcon })
      .addTo(venueMapInstance)
      .bindPopup(`<b>${WEDDING_CONFIG.venue.name}</b><br>${WEDDING_CONFIG.venue.address}`)
      .openPopup();
  } else {
    venueMapInstance.setView([lat, lng], 15);
  }
}

// Konvertni ochish (Envelope opening sequence)
function initEnvelopeOpening() {
  const overlay = document.getElementById("envelope-overlay");
  const wrapper = document.querySelector(".envelope-wrapper");
  const openBtn = document.getElementById("envelope-open-btn");
  const waxSeal = document.getElementById("wax-seal-btn");
  const envelopeBox = document.getElementById("envelope-box");

  if (!overlay || !openBtn) return;

  const handleOpen = () => {
    if (overlay.classList.contains("opening-active")) return;
    overlay.classList.add("opening-active");

    // 1. Muhr sinishi, qopqoq ochilishi va xat ko'tarilishi animatsiyasi
    if (wrapper) wrapper.classList.add("unfolding");
    if (waxSeal) waxSeal.style.animation = "sealCrack 0.75s forwards";

    // 2. Musiqani mayin ishga tushirish
    if (window.weddingAudio) {
      window.weddingAudio.play();
    }

    // 3. Konvert va xat ochilishidan so'ng silliq asosiy sahifaga o'tish
    setTimeout(() => {
      overlay.classList.add("opened");
      document.body.style.overflow = "auto";

      // Xarita o'lchamini to'g'irlash
      if (venueMapInstance) {
        setTimeout(() => venueMapInstance.invalidateSize(), 300);
      }
    }, 1150);
  };

  openBtn.addEventListener("click", handleOpen);
  if (waxSeal) waxSeal.addEventListener("click", handleOpen);
  if (envelopeBox) envelopeBox.addEventListener("click", handleOpen);
}

// Google Calendar va iCal (.ics) yaratish
function initCalendarActions() {
  const gcalBtn = document.getElementById("btn-add-google-calendar");
  const icsBtn = document.getElementById("btn-download-ics");

  if (gcalBtn) {
    gcalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const c = WEDDING_CONFIG;
      const targetDate = new Date(c.event.date);
      
      const formatTime = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
      const start = formatTime(targetDate);
      const end = formatTime(new Date(targetDate.getTime() + 5 * 60 * 60 * 1000)); // +5 soat

      const title = encodeURIComponent(`${c.couple.groom.name} & ${c.couple.bride.name} Nikoh To'yi`);
      const details = encodeURIComponent(`${c.invitation.text}\n\nManzil: ${c.venue.name}, ${c.venue.address}`);
      const location = encodeURIComponent(`${c.venue.name}, ${c.venue.address}`);

      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
      window.open(url, "_blank");
    });
  }

  if (icsBtn) {
    icsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      downloadIcsFile();
    });
  }
}

function downloadIcsFile() {
  const c = WEDDING_CONFIG;
  const targetDate = new Date(c.event.date);
  const formatTime = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const start = formatTime(targetDate);
  const end = formatTime(new Date(targetDate.getTime() + 5 * 60 * 60 * 1000));

  const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ToyTaklifnomasi//UZ
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${c.couple.groom.name} & ${c.couple.bride.name} Nikoh To'yi
DESCRIPTION:${c.invitation.text.replace(/\n/g, " ")}
LOCATION:${c.venue.name}, ${c.venue.address}
DTSTART:${start}
DTEND:${end}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Taklifnoma-${c.couple.groom.name}-${c.couple.bride.name}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function showToast(msg) {
  let toast = document.getElementById("site-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "site-toast";
    toast.className = "toast-notification";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3800);
}
window.showToast = showToast;
window.weddingRSVP = { showToast };

// Ulashish (Telegram, WhatsApp, Havolani nusxalash)
function initShareActions() {
  const btnShareTelegram = document.getElementById("btn-share-telegram");
  const btnShareWhatsapp = document.getElementById("btn-share-whatsapp");
  const btnCopyLink = document.getElementById("btn-copy-link");

  const currentUrl = window.location.href;
  const shareText = `${WEDDING_CONFIG.couple.groom.name} & ${WEDDING_CONFIG.couple.bride.name} nikoh to'yiga taklif etamiz! 💍`;

  if (btnShareTelegram) {
    btnShareTelegram.addEventListener("click", (e) => {
      e.preventDefault();
      const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
      window.open(tgUrl, "_blank");
    });
  }

  if (btnShareWhatsapp) {
    btnShareWhatsapp.addEventListener("click", (e) => {
      e.preventDefault();
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + "\n" + currentUrl)}`;
      window.open(waUrl, "_blank");
    });
  }

  if (btnCopyLink) {
    btnCopyLink.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(currentUrl);
        showToast("Havola nusxalandi! Yaqinlaringizga yuborishingiz mumkin! 📋");
      } catch (err) {
        prompt("Taklifnoma havolasi:", currentUrl);
      }
    });
  }
}

// Global render funksiyasini eksport qilish (Editor foydalanishi uchun)
window.renderWeddingPage = renderWeddingPage;

// Dastur boshlanishi
document.addEventListener("DOMContentLoaded", () => {
  renderWeddingPage();
  initEnvelopeOpening();
  initCalendarActions();
  initShareActions();
});
