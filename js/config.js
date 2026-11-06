// ==========================================================================
// TO'Y TAKLIFNOMASI - ASOSIY SOZLAMALAR (CONFIG)
// Barcha ma'lumotlarni shu yerdan o'zingizga moslab o'zgartirishingiz mumkin!
// ==========================================================================

const WEDDING_CONFIG = {
  // Kelin va Kuyov ma'lumotlari
  couple: {
    groom: {
      name: "Sardor",
      fullName: "Sardorbek",
      parents: "Alisher va Dilnoza o'g'li",
      avatar: "assets/images/groom.png"
    },
    bride: {
      name: "Mohinur",
      fullName: "Mohinurbonu",
      parents: "Jamshid va Nilufar qizi",
      avatar: "assets/images/bride.png"
    },
    monogram: "S & M",
    title: "Sardor & Mohinur",
    hashtag: "#SardorMohinur2026"
  },

  // To'y sanasi va vaqti (YYYY-MM-DDTHH:MM:SS formatida)
  event: {
    // 2026-yil 25-Noyabr soat 18:00
    date: "2026-11-25T18:00:00",
    displayDate: "25-Noyabr, 2026-yil",
    displayDay: "Chorshanba oqshomi",
    time: "18:00 da",
    year: "2026",
    month: "Noyabr",
    day: "25"
  },

  // Shior, Qur'on oyati yoki samimiy she'r
  quote: {
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    text: "«Va Uning alomatlaridan biri — sizlar sokinlik topishingiz uchun sizlarga o'z turingizdan juftlar yaratishi va orangizda muhabbat hamda mehr-shafqat paydo qilganidir.»",
    source: "Rum surasi, 21-oyat"
  },

  // Asosiy taklifnoma matni
  invitation: {
    greeting: "Hurmatli va aziz mehmonimiz!",
    text: "Sizni hayotimizning eng quvonchli, unutilmas va shukuhli kunida — farzandlarimizning baxt to'yi munosabati bilan yoziladigan qutlug' dasturxonimizga lutfan taklif etamiz.",
    subtext: "Sizning tashrifingiz va samimiy duolaringiz ushbu quvonchli kunga yanada fayz va ko'rk bag'ishlaydi.",
    signature: "Hurmat bilan: Aliyevlar va Karimova oilalari"
  },

  // To'y dasturi (Kun tartibi / Timeline)
  timeline: [
    {
      time: "07:00 - 09:30",
      title: "Nahor oshi",
      description: "Qadrli mehmonlarimiz uchun fayzli to'y oshi dasturxoni yoziladi.",
      icon: "coffee"
    },
    {
      time: "16:30 - 17:30",
      title: "Fotiha va ZAGS marosimi",
      description: "Kelin va kuyovning qonuniy nikoh qayd etish tantanasi.",
      icon: "heart"
    },
    {
      time: "18:00 - 18:30",
      title: "Mehmonlarni kutib olish",
      description: "Jonli orkestr musiqasi va esdalik foto zonalari.",
      icon: "camera"
    },
    {
      time: "18:30 - 22:30",
      title: "Tantanali to'y bazmi",
      description: "Visol oqshomi, musiqiy dastur, tantanali raqslar va to'y torti marosimi.",
      icon: "music"
    }
  ],

  // To'yxona va lokatsiya ma'lumotlari
  venue: {
    name: "'Versal' Tantanalar Saroyi",
    hall: "Zarafshon zali",
    city: "Toshkent shahri",
    address: "Yunusobod tumani, Amir Temur shoh ko'chasi, 120-uy",
    landmark: "Mo'ljal: 'Shahriston' metro bekati ro'parasida",
    coordinates: {
      lat: 41.3524,
      lng: 69.2885
    },
    yandexMapUrl: "https://yandex.uz/maps/?text=Versal+tantanalar+saroyi+Toshkent",
    googleMapUrl: "https://maps.google.com/?q=Versal+Toshkent",
    twoGisUrl: "https://2gis.uz/tashkent"
  },

  // Kiyim uslubi (Dress-code)
  dressCode: {
    enabled: true,
    title: "Dress-Code tavsiyasi",
    subtitle: "Kechamiz yanada nafis va chiroyli suratlar bilan esda qolishi uchun quyidagi ranglardagi oqshom liboslarini kiyishni taklif etamiz:",
    colors: [
      { name: "Oltin & Shampan", hex: "#D4AF37", lightHex: "#F7E7CE" },
      { name: "Sut rang (Ivory)", hex: "#FDFBF7", lightHex: "#F3EDE2" },
      { name: "Pastel Pushti", hex: "#E8B4B8", lightHex: "#F5E6E8" },
      { name: "Klassik Qora / To'q ko'k", hex: "#1A2530", lightHex: "#2C3E50" }
    ],
    note: "Qat'iy majburiyat emas, faqat samimiy istak!"
  },

  // Ishtirokni tasdiqlash (RSVP) sozlamalari
  rsvp: {
    deadline: "2026-11-20",
    deadlineFormatted: "20-Noyabrgacha",
    // Agar Telegram botingiz bo'lsa, quyidagi ma'lumotlarni kiriting.
    // Xabarlar to'g'ridan-to'g'ri sizning Telegramingizga keladi!
    telegramBot: {
      enabled: false, // Botni ulash uchun 'true' qiling
      token: "",      // BotFather bergan token: masalan "123456789:ABCDefgh..."
      chatId: ""      // Sizning telegram ID: masalan "987654321"
    },
    directTelegramUsername: "wedding_admin", // Havola orqali yuborish uchun @username
    phoneGroom: "+998 (90) 123-45-67",
    phoneBride: "+998 (97) 765-43-21"
  },

  // Musiqa sozlamalari
  music: {
    title: "To'y valsi & Romantik kuy",
    autoplay: true, // Sahifa ochilganda yoki konvert bosilganda
    audioSrc: "https://cdn.pixabay.com/download/audio/2022/11/06/audio_031f0cf871.mp3?filename=romantic-wedding-love-126284.mp3",
    // Zaxira sintizator melodiyasi: agar internet yoki audio bo'lmasa Web Audio ishlaydi!
    useSynthFallback: true
  },

  // Kalendarga qo'shish ma'lumotlari
  calendar: {
    title: "Sardor & Mohinur Nikoh To'yi",
    description: "Sardor va Mohinurning unutilmas to'y bazmi. 'Versal' tantanalar saroyi.",
    location: "'Versal' Tantanalar Saroyi, Toshkent shahri",
    startTime: "20261125T130000Z", // UTC vaqti (18:00 Toshkent = 13:00 UTC)
    endTime: "20261125T180000Z"
  }
};

// O'zgarishlar brauzer xotirasida (localStorage) saqlangan bo'lsa, yuklab olamiz
(function loadSavedConfig() {
  try {
    const saved = localStorage.getItem("wedding_config_custom");
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(WEDDING_CONFIG, parsed);
    }
  } catch (e) {
    console.warn("Config yuklashda xatolik:", e);
  }
})();
