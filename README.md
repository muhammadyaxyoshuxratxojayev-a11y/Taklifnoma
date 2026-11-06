# 💍 Oltin Nikoh To'yi Taklifnomasi (Wedding Invitation Website)

Nafis, zamonaviy va interaktiv **Nikoh to'yi taklifnomasi sayti**. Ushbu loyiha maxsus o'zbek to'ylari an'analari va zamonaviy xalqaro standartlarga moslab ishlab chiqilgan.

---

## ✨ Asosiy Imkoniyatlar va Qulayliklar

1. ✉️ **Interaktiv Mumli Muhrli Konvert (Envelope Opening):**
   - Sayt ochilganda mehmonga nafis oltin muhrli konvert taqdim etiladi.
   - Muhr yoki "Taklifnomani ochish" tugmasi bosilganda konvert ochilib, romantik musiqa sadolari ostida taklifnoma varaqasi namoyon bo'ladi.
2. 🌸 **Jonli Atirgul Yaproqlari va Oltin Zarralar:**
   - HTML5 Canvas asosida sekin yog'iluvchi atirgul yaproqlari va porloq oltin chang effekti (60 FPS, batareyani tejaydi).
3. 🎵 **Musiqa Pleyeri va Web Audio Sintizator:**
   - Saytda suzib turuvchi plastinka/musiqa tugmasi.
   - Internet bo'lmagan taqdirda ham avtomatik mayin arfa/pianino kuyi (Pachelbel Canon in D akkordlari) yangraydi.
4. ⏳ **Ortga Hisoblash Taymeri (Countdown):**
   - To'y boshlanishigacha qolgan kun, soat, daqiqa va soniyalarni real vaqt rejimida ko'rsatadi.
5. 📜 **Qur'on Oyati / Shior va Samimiy Tilaklar:**
   - Bismillahir Rohmanir Rohiym xattotligi, Rum surasi 21-oyati va samimiy o'zbekcha taklif matni.
6. 👥 **Kelin va Kuyov bilan Tanishuv:**
   - Akvarel uslubidagi nafis fotosurat, ota-onalarning ismi-sharifi.
7. 📅 **To'y Dasturi (Kun tartibi / Timeline):**
   - Nahor oshi (07:00), Fotiha va ZAGS, Mehmonlarni kutib olish, Visol oqshomi va To'y torti.
8. 📍 **To'yxona va Interaktiv Xarita:**
   - Leaflet interaktiv xaritasi (oltin to'y uzuklari markeri bilan).
   - **Yandex Go (Yandex Taxi)** orqali 1 bosishda to'yxonaga taksi chaqirish tugmasi.
   - **Google Maps** va **2GIS** xaritalarida ochish tugmalari.
9. 👗 **Dress-Code (Kiyim uslubi):**
   - Oqshom liboslari uchun tavsiya etilgan ranglar palitrasi (Oltin, Shampan, Sut rang, Pastel pushti, Qora/To'q ko'k).
10. 🗓️ **Taqvimga Qo'shish (Add to Calendar):**
    - Google Calendar ga qo'shish yoki Apple / Outlook / Telefon taqvimi uchun `.ics` faylini yuklab olish.
11. ✈️ **Ulashish (Share):**
    - Telegram, WhatsApp yoki havola nusxalash orqali barcha yaqinlarga 1 soniyada jo'natish.
12. ⚙️ **Sayt Ichidagi Jonli Tahrirlash Paneli (Live Editor):**
    - Kod yozmasdan, saytning o'zidagi ⚙️ tugmasini bosib, ismlarni, sanani, to'yxonani o'zgartirish va darhol natijani ko'rish imkoniyati!

---

## 🚀 Qanday Ishga Tushiriladi?

Hech qanday o'rnatish (`npm` yoki `node`) talab qilinmaydi!

1. Papka ichidagi `index.html` faylini istalgan brauzerda (Chrome, Edge, Safari, Firefox) ikki marta bosing.
2. Sayt darhol to'liq ishlaydi!

---

## ✏️ Ma'lumotlarni Qanday O'zgartirish Mumkin?

Ikkita juda oson usul bor:

### 1-usul: Saytning o'zida (Brauzerda)
1. Saytni oching va o'ng yuqori burchakdagi **⚙️ (Sozlamalar)** tugmasini bosing.
2. O'z ismlaringiz, to'y sanasi va to'yxonangizni kiriting.
3. **"Saqlash va Yangilash ✨"** tugmasini bosing — sayt darhol siz kiritgan ma'lumotlar bilan yangilanadi!
4. Xohlasangiz **"📥 config.js yuklash"** tugmasini bosib, tayyor konfiguratsiya faylini yuklab olib, `js/config.js` ga almashtirishingiz mumkin.

### 2-usul: `js/config.js` fayli orqali
Matn muharririda (VS Code, Notepad va h.k.) `js/config.js` faylini oching va qiymatlarni o'zgartiring:

```javascript
const WEDDING_CONFIG = {
  couple: {
    groom: { name: "Sardor", fullName: "Sardorbek", parents: "Alisher va Dilnoza o'g'li" },
    bride: { name: "Mohinur", fullName: "Mohinurbonu", parents: "Jamshid va Nilufar qizi" },
    monogram: "S & M"
  },
  event: {
    date: "2026-11-25T18:00:00",
    displayDate: "25-Noyabr, 2026-yil",
    displayDay: "Chorshanba oqshomi",
    time: "18:00 da"
  },
  venue: {
    name: "'Versal' Tantanalar Saroyi",
    address: "Toshkent shahri, Yunusobod tumani...",
    landmark: "Mo'ljal: 'Shahriston' metro bekati yaqinida"
  }
  // ...
};
```

---

## 🤖 Telegram Botga RSVP Xabarlarini Qanday Ulash Mumkin?

Mehmonlar "Ishtirokni tasdiqlash" tugmasini bosganda sizning Telegramingizga xabar borishi uchun:

1. Telegramda [@BotFather](https://t.me/BotFather) ga kiring va `/newbot` buyrug'i orqali yangi bot oching. Bot tokenini oling (masalan: `123456789:AAH...`).
2. Telegramda [@userinfobot](https://t.me/userinfobot) ga kiring va o'z `Id` (Chat ID) raqamingizni bilib oling (masalan: `987654321`).
3. Saytdagi ⚙️ sozlamalar oynasida yoki `js/config.js` da:
   ```javascript
   telegramBot: {
     enabled: true,
     token: "SIZNING_BOT_TOKENINGIZ",
     chatId: "SIZNING_CHAT_IDINGIZ"
   }
   ```
4. Bo'ldi! Har bir mehmon anketani to'ldirishi bilanoq sizga Telegramda chiroyli formatlangan xabar keladi.

---

## 🌐 Saytni Internetga (Bepul) Qanday Joylashtirish Mumkin?

Ushbu sayt statik bo'lgani sababli uni 1 daqiqada istalgan joyga bepul joylashtirishingiz mumkin:

1. **Vercel / Netlify:**
   - [vercel.com](https://vercel.com) yoki [netlify.com](https://netlify.com) saytiga kiring.
   - Ushbu papkani shunchaki sichqoncha bilan platformaga tashlang (Drag & Drop).
   - Sizga bir necha soniyada tayyor havola (masalan: `sardor-mohinur.vercel.app`) beriladi!

2. **GitHub Pages:**
   - Repository ochib, fayllarni yuklang va Settings -> Pages bo'limidan faollashtiring.

3. **Telegram WebApp:**
   - Vercel orqali olingan havolani Telegram bot menyusiga ulab, Telegram ichida ochiladigan qulay WebApp qilishingiz ham mumkin!

---

## 📂 Fayllar Tuzilishi

```
taklifnoma site/
│
├── index.html                 # Asosiy HTML sahifa
├── README.md                  # Qo'llanma va hujjatlar
│
├── css/
│   ├── style.css              # Nafis to'y uslubi (Gold & Luxury dizayn)
│   └── animations.css         # Mayin animatsiyalar (muhr, konvert, zarralar)
│
├── js/
│   ├── config.js              # Barcha sozlamalar (ismlar, sanalar, manzil)
│   ├── audio.js               # Musiqa pleyeri va Web Audio sintizator
│   ├── petals.js              # Atirgul yaproqlari kanvasi
│   ├── countdown.js           # Ortga hisoblash taymeri
│   ├── rsvp.js                # Ishtirokni tasdiqlash va tabriklar devori
│   ├── editor.js              # Jonli tahrirlash (Live Editor) modali
│   └── app.js                 # Asosiy ilova va xarita integratsiyasi
│
└── assets/
    ├── images/
    │   ├── luxury-wedding-hero.jpg # Nafis to'y foni
    │   ├── groom-bride.jpg         # Kelin va kuyov portreti
    │   └── wedding-rings.jpg       # Oltin nikoh uzuklari
    ├── audio/                      # O'zingizning mp3 faylingizni shu yerga qo'yishingiz mumkin
    └── fonts/
```

Baxtli va unutilmas to'y tilaymiz! 🕊️💍✨
