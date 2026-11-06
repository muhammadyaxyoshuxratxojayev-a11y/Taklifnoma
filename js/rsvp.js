// ==========================================================================
// TO'Y TAKLIFNOMASI - RSVP VA TABRIKLAR BOSHQARUVI
// ==========================================================================

class WeddingRSVP {
  constructor() {
    this.form = document.getElementById("rsvp-form");
    this.wishesList = document.getElementById("wishes-list");
    this.init();
  }

  init() {
    this.loadSavedWishes();

    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("rsvp-name").value.trim();
    const phone = document.getElementById("rsvp-phone").value.trim();
    const attendanceEl = document.querySelector('input[name="attendance"]:checked');
    const attendance = attendanceEl ? attendanceEl.value : "Albatta boraman";
    const ceremony = document.getElementById("rsvp-ceremony").value;
    const guestsCount = document.getElementById("rsvp-guests").value;
    const wish = document.getElementById("rsvp-wish").value.trim();

    if (!name) {
      this.showToast("Iltimos, ismingizni kiriting!");
      return;
    }

    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = "<span>Yuborilmoqda...</span>";
    submitBtn.disabled = true;

    const rsvpData = {
      name,
      phone,
      attendance,
      ceremony,
      guestsCount,
      wish,
      timestamp: new Date().toISOString()
    };

    // 1. LocalStorage ga saqlash
    this.saveToStorage(rsvpData);

    // 2. Tabriklar devoriga qo'shish (agar tilak yozilgan bo'lsa)
    if (wish) {
      this.addWishToWall(name, wish, "Hozirgina");
    }

    // 3. Telegram botga yuborish (agar configda sozlangan bo'lsa)
    let sentToBot = false;
    if (
      WEDDING_CONFIG.rsvp.telegramBot &&
      WEDDING_CONFIG.rsvp.telegramBot.enabled &&
      WEDDING_CONFIG.rsvp.telegramBot.token &&
      WEDDING_CONFIG.rsvp.telegramBot.chatId
    ) {
      sentToBot = await this.sendToTelegramBot(rsvpData);
    }

    // 4. Muvaffaqiyat xabari va tozalash
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
    this.form.reset();

    const msg = attendance === "Albatta boraman"
      ? "Katta rahmat! Sizning tashrifingizni orziqib kutamiz! 💐"
      : "Rahmat, ma'lumot qabul qilindi. Sizga doimo eng ezgu tilaklar! 🕊️";
    
    this.showToast(msg);

    // Agar bot ulanmagan bo'lsa, Telegram orqali yuborish taklifini ko'rsatish
    if (!sentToBot && WEDDING_CONFIG.rsvp.directTelegramUsername) {
      setTimeout(() => {
        this.promptTelegramDirectShare(rsvpData);
      }, 1200);
    }
  }

  saveToStorage(data) {
    try {
      const saved = JSON.parse(localStorage.getItem("wedding_rsvps") || "[]");
      saved.unshift(data);
      localStorage.setItem("wedding_rsvps", JSON.stringify(saved));
    } catch (err) {
      console.warn("Storage error:", err);
    }
  }

  async sendToTelegramBot(data) {
    try {
      const { token, chatId } = WEDDING_CONFIG.rsvp.telegramBot;
      const text = 
        `🎉 <b>Yangi to'y mehmoni qayd etildi!</b>\n\n` +
        `👤 <b>Ism:</b> ${data.name}\n` +
        `📞 <b>Telefon:</b> ${data.phone || "Kiritilmagan"}\n` +
        `✨ <b>Holati:</b> ${data.attendance}\n` +
        `📅 <b>Marosim:</b> ${data.ceremony}\n` +
        `👥 <b>Mehmonlar soni:</b> ${data.guestsCount}\n` +
        `💬 <b>Tilak:</b> ${data.wish || "Tilak yozilmadi"}\n` +
        `⏰ <i>${new Date().toLocaleString("uz-UZ")}</i>`;

      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML"
        })
      });
      return res.ok;
    } catch (e) {
      console.warn("Telegram botga yuborishda xatolik:", e);
      return false;
    }
  }

  promptTelegramDirectShare(data) {
    const text = encodeURIComponent(
      `Assalomu alaykum! To'yga taklifnoma bo'yicha javobim:\n\n` +
      `👤 Ism: ${data.name}\n` +
      `✨ Holat: ${data.attendance}\n` +
      `📅 Marosim: ${data.ceremony}\n` +
      `👥 Mehmonlar: ${data.guestsCount}\n` +
      (data.wish ? `💬 Tilak: ${data.wish}\n` : "")
    );

    const shareUrl = `https://t.me/${WEDDING_CONFIG.rsvp.directTelegramUsername}?text=${text}`;
    
    // Foydalanuvchiga qulaylik uchun bildirishnoma
    const toast = document.createElement("div");
    toast.className = "toast-notification show";
    toast.innerHTML = `
      <span>Xabarni to'g'ridan-to'g'ri Telegram orqali yuborasizmi?</span>
      <a href="${shareUrl}" target="_blank" style="color: #F7E7CE; font-weight: 700; text-decoration: underline; margin-left: 8px;">Ha, yuborish</a>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 6000);
  }

  loadSavedWishes() {
    if (!this.wishesList) return;

    // Boshlang'ich samimiy tabriklar namunalari
    const defaultWishes = [
      {
        name: "Akmal va Ziyoda",
        date: "2 soat oldin",
        text: "Ilohim qo'sha qaringlar! Xonadoningizdan quvonch, fayz va qut-baraka hech qachon arimasin!"
      },
      {
        name: "Jasur do'stingiz",
        date: "Kecha",
        text: "Baxtingizga ko'z tegmasin, aziz do'stim! Dunyodagi barcha ezguliklarni tilayman!"
      },
      {
        name: "Guli xola",
        date: "3 kun oldin",
        text: "Kelin-kuyovga ikki dunyo saodatini tilaymiz. Bir-biringizni doimo e'zozlab, hurmat qilib yashanglar!"
      }
    ];

    try {
      const stored = JSON.parse(localStorage.getItem("wedding_rsvps") || "[]");
      const userWishes = stored
        .filter(item => item.wish && item.wish.trim().length > 0)
        .map(item => ({
          name: item.name,
          date: "Yaqinda",
          text: item.wish
        }));

      const allWishes = [...userWishes, ...defaultWishes];
      this.wishesList.innerHTML = "";
      allWishes.forEach(w => this.addWishToWall(w.name, w.text, w.date));
    } catch (e) {
      console.warn("Wishes yuklashda xatolik:", e);
    }
  }

  addWishToWall(name, text, dateStr) {
    if (!this.wishesList) return;

    const item = document.createElement("div");
    item.className = "wish-item animate-fade-in-up";
    item.innerHTML = `
      <div class="wish-header">
        <span class="wish-author">${this.escapeHtml(name)}</span>
        <span class="wish-date">${dateStr || "Hozirgina"}</span>
      </div>
      <p class="wish-text">${this.escapeHtml(text)}</p>
    `;

    this.wishesList.prepend(item);
  }

  showToast(msg) {
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

  escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.weddingRSVP = new WeddingRSVP();
});
