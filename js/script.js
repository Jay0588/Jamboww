const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const preloader = document.querySelector("[data-preloader]");

const closeMobileNav = () => {
  header?.classList.remove("open");
  navToggle?.setAttribute("aria-expanded", "false");
  nav?.querySelectorAll(".nav-dropdown.open").forEach(dropdown => dropdown.classList.remove("open"));
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
};

if (nav && !nav.querySelector("[data-drawer-close]")) {
  nav.insertAdjacentHTML("afterbegin", `<button class="drawer-close" type="button" data-drawer-close aria-label="Close menu"><span>Close</span></button>`);
}

if (preloader) {
  const hasSeenLoader = sessionStorage.getItem("jambo-preloader-seen") === "true";
  if (hasSeenLoader) {
    preloader.remove();
  } else {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("done");
        sessionStorage.setItem("jambo-preloader-seen", "true");
      }, 3000);
    });
    setTimeout(() => {
      preloader.classList.add("done");
      sessionStorage.setItem("jambo-preloader-seen", "true");
    }, 4500);
  }
}

const setHeader = () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 28);
};
setHeader();
window.addEventListener("scroll", setHeader, { passive: true });

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = !header.classList.contains("open");
    if (isOpen) {
      header.classList.add("open");
      navToggle.setAttribute("aria-expanded", "true");
    } else {
      closeMobileNav();
    }
  });
}
if (nav) {
  nav.addEventListener("click", event => {
    if (event.target.closest("[data-drawer-close]")) {
      closeMobileNav();
      return;
    }
    const trigger = event.target.closest(".dropdown-trigger");
    if (trigger && window.innerWidth <= 980) {
      event.preventDefault();
      trigger.closest(".nav-dropdown")?.classList.toggle("open");
      return;
    }
    if (event.target.matches(".dropdown-menu a") || (event.target.matches("a") && !event.target.closest(".nav-dropdown"))) {
      closeMobileNav();
    }
  });
}
window.addEventListener("keydown", event => {
  if (event.key === "Escape" && header?.classList.contains("open")) {
    closeMobileNav();
  }
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
  revealObserver.observe(el);
});

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const node = entry.target;
    const target = Number(node.dataset.count || 0);
    const duration = 1200;
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = Math.round(target * eased).toLocaleString() + (target < 100 ? "+" : "+");
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(node);
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach(el => countObserver.observe(el));

const parallax = document.querySelector("[data-parallax] .hero-media img");
if (parallax) {
  window.addEventListener("scroll", () => {
    const shift = Math.min(window.scrollY * 0.12, 62);
    parallax.style.transform = `scale(1.08) translate3d(0, ${shift}px, 0)`;
  }, { passive: true });
}

[
  [".intro-split", "motion-mask"],
  [".about-band", "motion-door"],
  [".service-preview", "motion-wipe"],
  [".project-feature", "motion-depth"],
  [".why", "split-reveal"],
  [".process", "motion-draw"],
  [".testimonials", "motion-quote"],
  [".cta-band", "motion-wipe"],
  [".workshop-collage", "motion-door"]
].forEach(([selector, className]) => {
  document.querySelectorAll(selector).forEach(section => {
    section.classList.add(className);
    revealObserver.observe(section);
  });
});

document.querySelectorAll(".service-tile, .service-row, .gallery-cat").forEach((item, index) => {
  item.classList.add("motion-sample");
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
  revealObserver.observe(item);
});

document.querySelectorAll(".project-card").forEach((item, index) => {
  item.classList.add("motion-depth");
  item.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
  revealObserver.observe(item);
});

document.querySelectorAll(".about-images, .feature-grid, .why-image, .workshop-collage img, .service-tile img, .service-row img").forEach(item => {
  item.classList.add("image-stage");
  revealObserver.observe(item);
});

document.querySelectorAll(".intro-copy, .about-text, .feature-copy, .why-list, .story-lead, .story-copy, .contact-details").forEach(item => {
  item.classList.add("text-stage");
  revealObserver.observe(item);
});

const parallaxItems = [...document.querySelectorAll(".page-hero > img, .about-images img, .feature-grid img, .why-image img")];
let ticking = false;
const updateParallaxLayers = () => {
  if (window.innerWidth <= 980) {
    parallaxItems.forEach(item => {
      item.style.transform = "";
    });
    ticking = false;
    return;
  }
  const viewport = window.innerHeight;
  parallaxItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > viewport) return;
    const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
    const depth = index % 2 === 0 ? -22 : 18;
    item.style.transform = `translate3d(0, ${progress * depth}px, 0) scale(1.01)`;
  });
  ticking = false;
};
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateParallaxLayers);
    ticking = true;
  }
}, { passive: true });
window.addEventListener("resize", updateParallaxLayers);
updateParallaxLayers();

document.querySelectorAll(".service-tile, .gallery-cat, .project-card, .value-block").forEach(card => {
  card.addEventListener("pointermove", event => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `translateY(-5px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const filters = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll("[data-category]");
filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    projects.forEach(project => {
      project.classList.toggle("hidden", filter !== "all" && project.dataset.category !== filter);
    });
  });
});

const categoryGallery = document.querySelector(".category-gallery[data-category-title]");
if (categoryGallery) {
  const title = categoryGallery.dataset.categoryTitle;
  categoryGallery.innerHTML = `
    <div class="section-head reveal visible">
      <div>
        <p class="eyebrow">Jambo Wood Works Gallery</p>
        <h2>${title}</h2>
      </div>
      <a class="button ghost" href="gallery.html">All Gallery Pages</a>
    </div>
    <div class="empty-gallery reveal visible">
      <p>${title} gallery photos have been left out for now.</p>
    </div>
  `;
}

const socialLinks = {
  whatsapp: "https://wa.me/message/P3MMDNBS5KIHO1",
  linkedin: "https://www.linkedin.com/in/jambo-wood-works-ltd-514b782a/",
  instagram: "https://www.instagram.com/jambowoodworksltd/",
  facebook: "https://www.facebook.com/jambowoodworkslimited1984"
};

const icons = {
  whatsapp: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.34 4.95L2 22l5.29-1.39a9.86 9.86 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.51 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.14.82.84-3.06-.2-.31a8.2 8.2 0 1 1 6.99 3.87Zm4.49-6.14c-.25-.12-1.45-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.25-.63.79-.77.95-.14.16-.28.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.28.37-.42.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.47-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.02 0 1.18.87 2.33.99 2.49.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28Z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S.02 4.88.02 3.5 1.14 1 2.5 1s2.48 1.12 2.48 2.5ZM.32 8h4.36v14H.32V8Zm7.1 0h4.18v1.91h.06c.58-1.1 2-2.26 4.12-2.26 4.41 0 5.22 2.9 5.22 6.67V22h-4.35v-6.8c0-1.62-.03-3.7-2.26-3.7-2.26 0-2.6 1.76-2.6 3.58V22H7.42V8Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.25c-1.24 0-1.63.77-1.63 1.57v1.88h2.77l-.44 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06Z"/></svg>`
};

document.querySelectorAll(".footer").forEach((footer) => {
  footer.classList.remove("simple");
  const isContactPage = window.location.pathname.endsWith("contact.html");
  footer.innerHTML = `
    <div class="footer-brand">
      <img class="footer-logo" src="assets/jambo/jambo-04.png" alt="Jambo Wood Works handshake mark">
      <h2>Jambo Wood Works Ltd</h2>
      <p>Custom woodworking, CNC routing, doors, furniture, hardware, timber, and installation services from Mombasa.</p>
      <div class="socials" aria-label="Social links">
        <a href="${socialLinks.whatsapp}" target="_blank" rel="noreferrer" aria-label="WhatsApp">${icons.whatsapp}</a>
        <a href="${socialLinks.linkedin}" target="_blank" rel="noreferrer" aria-label="LinkedIn">${icons.linkedin}</a>
        <a href="${socialLinks.instagram}" target="_blank" rel="noreferrer" aria-label="Instagram">${icons.instagram}</a>
        <a href="${socialLinks.facebook}" target="_blank" rel="noreferrer" aria-label="Facebook">${icons.facebook}</a>
      </div>
    </div>
    <div>
      <h3>Pages</h3>
      <a href="index.html">Home</a><a href="about.html">About</a><a href="gallery.html">Gallery</a><a href="services.html">Services</a><a href="contact.html">Contact</a>
    </div>
    <div>
      <h3>Gallery</h3>
      <a href="cnc-2d.html">CNC 2D</a><a href="cnc-3d.html">CNC 3D</a><a href="glass-doors.html">Glass Doors</a><a href="lamu-doors.html">Lamu Doors</a><a href="other-doors.html">Other Doors</a><a href="panel-doors.html">Panel Doors</a><a href="other-wood-work.html">Other Wood Work</a>
    </div>
    <div>
      <h3>Contact</h3>
      <p>Main Nyali Road, along Fidel Odinga Road, just before Kongowea Market, Mombasa, Kenya.</p>
      <a href="tel:+254733474216">+254 (0) 733 474 216</a>
      <a href="tel:+254717633022">+254 (0) 717 633 022</a>
      <a href="mailto:jamboww.ltd@gmail.com">jamboww.ltd@gmail.com</a>
    </div>
    ${isContactPage ? "" : `<div class="footer-map">
      <iframe title="Jambo Wood Works map" src="https://www.google.com/maps?q=Jambo%20Wood%20Works%20Ltd%20Main%20Nyali%20Road%20Fidel%20Odinga%20Road%20Kongowea%20Mombasa%20Kenya&output=embed" loading="lazy"></iframe>
    </div>`}
    <p class="copyright">&copy; 2026 Jambo Wood Works Ltd. All rights reserved.</p>
  `;
});

const lightbox = document.querySelector("[data-lightbox]");
if (lightbox) {
  const lightboxImage = lightbox.querySelector("img");
  document.querySelectorAll("[data-gallery] img").forEach(image => {
    image.addEventListener("click", () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
  };
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox || event.target.matches("[data-lightbox-close]")) closeLightbox();
  });
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLightbox();
  });
}

const form = document.querySelector("[data-form]");
if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    status.textContent = "Thank you. Your inquiry is ready for the workshop team to review.";
    form.reset();
  });
}
