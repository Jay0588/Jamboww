"use strict";

window.addEventListener("DOMContentLoaded", () => {

  /* ================================================================
     LOADER — disabled. Remove style="display:none" from #loader to re-enable.
     ================================================================ */

  /* ================================================================
     TRANSLATE — single toggle EN ↔ Kiswahili
     Shows the language you'll switch TO on the button
     ================================================================ */
  const translateToggle = document.querySelector("[data-translate-toggle]");
  const translateTarget = document.querySelector("[data-translate-target]");
  // Read persisted language — default EN
  let currentLang = "en";
  try { currentLang = localStorage.getItem("jww-lang") || "en"; } catch(e) {}
  // Set button label immediately before DOM swap runs
  if (translateTarget) translateTarget.textContent = currentLang === "sw" ? "ENGLISH" : "SWAHILI";

  const SW = {
    "nav-home":"Nyumbani","nav-hardware":"Vifaa","nav-projects":"Miradi",
    "nav-services":"Huduma","nav-contact":"Mawasiliano","nav-cta":"Pata Bei",
    "h01-label":"Tangu 1984 · Kongowea, Mombasa",
    "h01-h2":"Inatengenezwa kwa mkono.<br><em>Inajengwa kudumu.</em>",
    "h01-p":"Tumekuwa tukitengeneza samani, kuweka jikoni, na kuuza vifaa kutoka karakana yetu ya Kongowea tangu 1984. Mahali pamoja, timu moja, bili moja.",
    "h01-btn1":"Pata Bei Bure","h01-btn2":"Tembelea Vifaa",
    "h01-stat1":"Miaka ya Biashara","h01-stat2":"Usafirishaji wa Bure",
    "h01-stat3":"CNC Inapatikana","h01-stat4":"Biashara ya Familia",
    "h02-label":"Vifaa","h02-h2":"Mbao na Bidhaa",
    "h02-p":"Tuna mbao laini na ngumu, MDF, plywood ya bahari, na zaidi — zinapatikana jumla au rejareja.",
    "h02-btn1":"Tazama Vifaa","h02-btn2":"Omba Bei ya Mbao",
    "h02-badge":"Jumla na Rejareja · Mbao Laini · Mbao Ngumu · MDF · Plywood ya Bahari",
    "h03-label":"Eneo la CNC","h03-h2":"Ukataji wa CNC kwa Usahihi",
    "h03-p":"Una muundo unaohitaji ukataji wa usahihi? Tunakata paneli za mbao, ishara, na vipande vya samani kulingana na mahitaji yako.",
    "h03-btn1":"Pata Bei ya CNC","h03-btn2":"Ona Huduma Zote",
    "h03-badge":"Paneli · Ishara · Vipande vya Samani · Uchongaji · Maumbo Maalum",
    "h04-label":"Eneo la Rangi","h04-h2":"Uchanganyaji wa Rangi kwa Kompyuta",
    "h04-p":"Tuna Sika, Crown Paints, Plascon, Basco, na zaidi. Lete rangi yoyote — mashine yetu itachanganya sehemu hiyo.",
    "h04-btn1":"Tazama Rangi","h04-btn2":"Uliza Kuhusu Uchanganyaji",
    "h04-badge":"Sika · Crown Paints · Plascon · Basco · Rangi Yoyote Inachanganywa Hapa",
    "h05-label":"Useremala","h05-h2":"Kuweka Jikoni na Makabati",
    "h05-p":"Tunapima, tunajenga, na tuweka majiko, makabati, meza za ofisi, na vionyesho.",
    "h05-btn1":"Pata Bei ya Kuweka","h05-btn2":"Ona Huduma Zote",
    "h05-badge":"Majiko · Makabati · Meza za Ofisi · Kaunta za Duka · Vionyesho",
    "h06-label":"Ziara za Tovuti","h06-h2":"Tunakuja Kwako",
    "h06-p":"Hujui unachohitaji au gharama? Tupigie simu na tutakuja kwenye eneo lako, tupima, na tukupe bei ya wazi — bila malipo.",
    "h06-btn1":"Weka Ziara ya Tovuti","h06-btn2":"Piga Simu +254 733 474 216",
    "h06-badge":"Ziara ya Tovuti Bure · Kupima na Bei · Mombasa na Nchi Yote",
    "brands-h2":"Bidhaa tunazohifadhi na kusambaza.",
    "brands-sub":"Hizi ndizo bidhaa utakazozipata kwenye rafu zetu. Zote ni za kweli.",
    "why-label":"Kwa Nini Jambo Wood Works","why-h2":"Miaka 40 ya kazi ya kweli.",
    "why1-h3":"Biashara ya Familia Tangu 1984",
    "why1-p":"Tulianzishwa mwaka 1984 na familia ya Jambo. Wateja wengi wetu wanarudia.",
    "why2-h3":"Vifaa Vizuri","why2-p":"Tunatumia mbao na vifaa vinavyofaa kwa kila kazi. Hakuna njia za mkato.",
    "why3-h3":"Utaridhika au Tunarudi","why3-p":"Kama kuna tatizo, tunarudi kulirekebisha. Hakuna mabishano.",
    "why4-h3":"Bei ya Haki","why4-p":"Tunakupa bei wazi kabla hatujaanza. Hakuna mshangao mwishoni.",
    "about-label":"Kuhusu Sisi","about-h2":"Useremala na vifaa,<br>vilivyofanywa vizuri.",
    "about-p1":"Jambo Wood Works Ltd imekuwa ikifanya kazi tangu 1984. Tunafanya aina zote za useremala — milango, madirisha, makabati, majiko, samani za ofisi — pamoja na duka la jumla na rejareja la vifaa.",
    "about-p2":"Tuna karakana kamili ya mbao na duka lenye mbao, rangi, vigae, vifaa vya bomba, kemikali za ujenzi, na zaidi.",
    "about-p3":"Tupate kwenye <strong>Barabara Kuu ya Nyali / Barabara ya Fidel Odinga, Kongowea, Mombasa</strong> — kabla ya mlango wa Soko la Kongowea.",
    "about-badge-span":"Miaka ya Kongowea",
    "proj-label":"Kazi Yetu","proj-h2":"Baadhi ya tulichojenga.",
    "proj-sub":"Miradi michache ya hivi karibuni kote Mombasa na Kenya.",
    "proj-view-all":"Ona miradi yote","proj-cta-btn":"Ona Miradi Yote",
    "contact-label":"Wasiliana Nasi","contact-h2":"Tuambie unachohitaji.<br>Tutakupa bei.",
    "contact-p":"Jaza fomu na tutawasiliana nawe ndani ya masaa 24.",
    "form-name-lbl":"Jina Kamili","form-phone-lbl":"Nambari ya Simu",
    "form-email-lbl":"Anwani ya Barua Pepe","form-svc-lbl":"Unahitaji nini?",
    "form-msg-lbl":"Tuambie kuhusu mradi wako","form-submit-txt":"Tuma Ombi",
    "form-note-txt":"Tutajibu ndani ya masaa 24. Maelezo yako yanabaki siri.",
    "form-success-txt":"Ujumbe umepokelewa. Tutawasiliana nawe ndani ya masaa 24.",
    "form-error-txt":"Kuna hitilafu. Piga simu moja kwa moja +254 733 474 216.",
    "footer-brand-p":"Tumekuwa tukifanya useremala na kuuza vifaa Kongowea, Mombasa tangu 1984.",
    "footer-copyright":"© 2026 Jambo Wood Works Ltd. Haki zote zimehifadhiwa.",
    "footer-location":"Kongowea, Mombasa, Kenya",

    // ── Hardware page ─────────────────────────────────────────────
    "hw-label":        "Duka la Vifaa",
    "hw-h1":           "Tunachohifadhi.",
    "hw-hero-p":       "Jumla na rejareja — mbao, rangi, gundi, bomba, vigae, kemikali za ujenzi na zaidi. Ingia au uulize kwa simu.",
    "hw-cat-label":    "Aina za Bidhaa",
    "hw-cat-h2":       "Kila kitu kwa kazi.",
    "hw-note":         "Hatuna duka la mtandaoni — bei, hesabu ya bidhaa, na upatikanaji hubadilika kila siku. Tupigie simu au uje.",
    "hw-brands-label": "Brand Tunazohifadhi",
    "hw-cta-h2":       "Hujui unachohitaji?",
    "hw-cta-p":        "Tupigie simu au uje — timu yetu itakusaidia kupata vifaa sahihi na kukata ukubwa unaohitajika.",

    // ── Projects page ─────────────────────────────────────────────
    "pr-label":   "Kazi Zilizochaguliwa",
    "pr-h1":      "Tulichojenga.",
    "pr-hero-p":  "Majiko, makabati, vifaa vya duka, kazi ya CNC, samani za ofisi na zaidi — kote Mombasa na Kenya tangu 1984.",
    "pr-cta-h2":  "Una mradi akilini?",
    "pr-cta-p":   "Tutumia vipimo vyako au maelezo mafupi na tutakupa bei ndani ya masaa 24.",

    // ── About page ────────────────────────────────────────────────
    "ab-label":        "Kuhusu Sisi",
    "ab-h1":           "Biashara ya familia.<br>Miaka 40 ndani.",
    "ab-hero-p":       "Tulianzishwa mwaka 1984, bado Kongowea, bado familia ile ile. Tunafanya useremala, usambazaji wa vifaa, ukataji wa CNC, na upakaji rangi chini ya paa moja.",
    "ab-story-label":  "Hadithi Yetu",
    "ab-story-h2":     "Useremala na vifaa,<br>vilivyofanywa vizuri.",
    "ab-svc-label":    "Tunachofanya",
    "ab-svc-h2":       "Huduma chini ya paa moja.",
    "ab-cta-h2":       "Uko tayari kufanya kazi pamoja?",
    "ab-cta-p":        "Tupigie simu, WhatsApp, au uje dukani. Tuko wazi Jumatatu hadi Jumamosi, saa mbili asubuhi hadi saa kumi na mbili jioni.",

    // ── Contact page ──────────────────────────────────────────────
    "co-label":    "Wasiliana Nasi",
    "co-h1":       "Tuambie unachohitaji.",
    "co-hero-p":   "Tunajibu ndani ya masaa 24. Au piga simu tu — tunapatikana Jumatatu hadi Jumamosi, saa 2 asubuhi hadi saa 12 jioni.",
    "co-form-h3":  "Tuma Ombi",
    "co-form-sub": "Jaza fomu na tutawasiliana nawe ndani ya masaa 24.",
  };

  const storeOriginals = () => {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      if (!el.dataset.en) el.dataset.en = el.innerHTML;
    });
  };

  const applyLang = (lang) => {
    storeOriginals();
    const map = lang === "sw" ? SW : null;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      el.innerHTML = map ? (map[key] ?? el.dataset.en) : (el.dataset.en ?? el.innerHTML);
    });
    if (translateTarget) translateTarget.textContent = lang === "sw" ? "ENGLISH" : "SWAHILI";
    currentLang = lang;
    document.documentElement.lang = lang === "sw" ? "sw" : "en";
    translateToggle?.setAttribute("aria-label", lang === "sw" ? "Switch to English" : "Translate to Swahili");
    // Persist across pages
    try { localStorage.setItem("jww-lang", lang); } catch(e) {}
  };

  // Auto-apply saved language on every page load
  try {
    const saved = localStorage.getItem("jww-lang");
    if (saved && saved !== "en") applyLang(saved);
  } catch(e) {}

  translateToggle?.addEventListener("click", () => {
    applyLang(currentLang === "en" ? "sw" : "en");
  });

  /* ================================================================
     HEADER scroll / hide
     ================================================================ */
  const header       = document.querySelector("[data-header]");
  const scrollTopBtn = document.querySelector("[data-scroll-top]");
  let lastY = 0;

  const updateHeader = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 30);
    if (y > lastY + 8 && y > 300) header?.classList.add("is-hidden");
    else if (y < lastY - 4 || y < 300) header?.classList.remove("is-hidden");
    scrollTopBtn?.classList.toggle("is-visible", y > 500);
    lastY = y;
  };
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ================================================================
     MOBILE MENU
     ================================================================ */
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  menuToggle?.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  mobileMenu?.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      document.body.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  });

  scrollTopBtn?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  /* ================================================================
     ACTIVE NAV HIGHLIGHT
     ================================================================ */
  const sections = document.querySelectorAll("section[id]");
  const navLinks  = document.querySelectorAll(".desktop-nav a");

  const highlightNav = () => {
    let cur = "home";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    navLinks.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === `#${cur}`)
    );
  };
  window.addEventListener("scroll", highlightNav, { passive: true });
  highlightNav();

  /* ================================================================
     FADE-IN ON SCROLL
     ================================================================ */
  const fadeTargets = document.querySelectorAll(
    ".why-card, .about-copy, .about-image-stack, .cta-copy, .cta-actions, .proj-card, .review-card"
  );
  const styleEl = document.createElement("style");
  styleEl.textContent =
    ".fade-ready{opacity:0;transform:translateY(24px);transition:opacity .55s ease,transform .55s ease}" +
    ".fade-ready.is-visible{opacity:1;transform:none}";
  document.head.appendChild(styleEl);
  fadeTargets.forEach((el, i) => {
    el.classList.add("fade-ready");
    el.style.transitionDelay = `${(i % 5) * 0.07}s`;
  });
  const fadeObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  fadeTargets.forEach((el) => fadeObs.observe(el));

  /* ================================================================
     MARQUEE — always running
     ================================================================ */
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".marquee-row").forEach((row) => {
    const track = row.querySelector(".marquee-track");
    if (!track) return;
    if (prefersReduced) track.style.animation = "none";
  });

  /* ================================================================
     WORKSHOP SLIDESHOW
     ================================================================ */
  (function initSlideshow() {
    const wsSection         = document.querySelector("[data-workshop]");
    const wsSlides          = Array.from(document.querySelectorAll(".ws-slide"));
    const wsThumbs          = Array.from(document.querySelectorAll(".ws-dot"));
    const wsPrev            = document.querySelector("[data-ws-prev]");
    const wsNext            = document.querySelector("[data-ws-next]");
    const wsProgress        = document.querySelector("[data-ws-progress]");
    const wsThumbsContainer = document.querySelector("[data-ws-thumbs]");

    if (!wsSlides.length) return; // safe — inside IIFE, won't kill outer scope

    let current = 0, progTimer = null, progPaused = false,
        progStart = null, progElapsed = 0;
    const DURATION = 6000;

    const scrollThumbIntoView = (_idx) => { /* dots — no scroll needed */ };

    const goTo = (idx) => {
      const prev = current;
      current = ((idx % wsSlides.length) + wsSlides.length) % wsSlides.length;
      if (prev === current) return;
      wsSlides[prev].classList.add("is-leaving");
      wsSlides[prev].classList.remove("is-active");
      wsThumbs[prev]?.classList.remove("is-active");
      requestAnimationFrame(() => {
        wsSlides[current].classList.add("is-active");
        wsThumbs[current]?.classList.add("is-active");
        scrollThumbIntoView(current);
      });
      const leaving = wsSlides[prev];
      const onEnd = () => {
        leaving.classList.remove("is-leaving");
        leaving.removeEventListener("transitionend", onEnd);
      };
      leaving.addEventListener("transitionend", onEnd);
      resetProgress();
    };

    const tick = (now) => {
      if (progPaused) return;
      const elapsed = now - progStart;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      if (wsProgress) wsProgress.style.width = pct + "%";
      if (elapsed >= DURATION) {
        goTo(current + 1);
      } else {
        progTimer = requestAnimationFrame(tick);
      }
    };

    const startProgress = () => {
      progStart = performance.now() - progElapsed;
      progPaused = false;
      progTimer = requestAnimationFrame(tick);
    };
    const pauseProgress = () => {
      if (progPaused) return;
      progPaused = true;
      progElapsed = performance.now() - progStart;
      cancelAnimationFrame(progTimer);
    };
    const resumeProgress = () => {
      if (!progPaused) return;
      progPaused = false;
      startProgress();
    };
    const resetProgress = () => {
      cancelAnimationFrame(progTimer);
      progElapsed = 0;
      progPaused = false;
      if (wsProgress) wsProgress.style.width = "0%";
      startProgress();
    };

    wsPrev?.addEventListener("click", () => goTo(current - 1));
    wsNext?.addEventListener("click", () => goTo(current + 1));
    wsThumbs.forEach((t, i) => t.addEventListener("click", () => goTo(i)));

    document.addEventListener("keydown", (e) => {
      if (!wsSection) return;
      const rect = wsSection.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(current + 1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(current - 1); }
    });

    let touchStartX = null, touchStartY = null;
    wsSection?.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    wsSection?.addEventListener("touchend", (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      touchStartX = touchStartY = null;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        dx < 0 ? goTo(current + 1) : goTo(current - 1);
      }
    }, { passive: true });

    document.addEventListener("visibilitychange", () => {
      document.hidden ? pauseProgress() : resumeProgress();
    });

    startProgress();
  })();

  /* ================================================================
     CONTACT FORM
     ================================================================ */
  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    const submitBtn      = contactForm.querySelector(".form-submit");
    const successMsg     = contactForm.querySelector(".form-success");
    const errorMsg       = contactForm.querySelector(".form-error");
    const requiredFields = contactForm.querySelectorAll("[required]");

    const setInvalid = (el, bad) => el.classList.toggle("is-invalid", bad);
    const validate = () => {
      let ok = true;
      requiredFields.forEach((el) => {
        const empty = !el.value.trim();
        setInvalid(el, empty);
        if (empty) ok = false;
      });
      return ok;
    };
    requiredFields.forEach((el) => el.addEventListener("input", () => setInvalid(el, false)));

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validate()) return;
      submitBtn.disabled = true;
      submitBtn.classList.add("is-loading");
      successMsg.hidden = errorMsg.hidden = true;
      try {
        const res = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          contactForm.reset();
          successMsg.hidden = false;
          successMsg.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } else {
          errorMsg.hidden = false;
        }
      } catch {
        errorMsg.hidden = false;
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove("is-loading");
      }
    });
  }

});
