(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduceMotion = reduceMQ.matches;

  /* ---------- Nav --------------------------------------------------------- */
  const nav = $("[data-nav]");
  const toggle = $("[data-nav-toggle]");
  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  $$("#nav-menu a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
  });

  const navLinks = $$("#nav-menu ul a");
  const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        if (a.getAttribute("href") === "#" + entry.target.id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------- Reveal on scroll -------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  const observeReveals = (root = document) => {
    $$("[data-reveal]", root).forEach((el) => {
      const siblings = el.parentElement ? $$(":scope > [data-reveal]", el.parentElement) : [];
      el.style.setProperty("--i", Math.max(0, siblings.indexOf(el)) % 6);
      revealObserver.observe(el);
    });
  };
  observeReveals();

  /* ---------- Hero video -------------------------------------------------- */
  const video = $("[data-hero-video]");
  const motionBtn = $("[data-motion-toggle]");
  const motionLabel = motionBtn && $(".hero__motion-label", motionBtn);
  const saveData = navigator.connection && navigator.connection.saveData;
  let userPaused = false;
  let heroVisible = true;
  let videoLoaded = false;

  const loadVideo = () => {
    if (videoLoaded) return;
    $$("source[data-src]", video).forEach((s) => { s.src = s.dataset.src; });
    video.load();
    videoLoaded = true;
  };
  const playVideo = () => {
    if (reduceMotion || saveData || userPaused || !heroVisible) return;
    loadVideo();
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  };
  video.addEventListener("playing", () => video.classList.add("is-playing"));
  const syncMotionButton = () => {
    if (!motionBtn) return;
    motionBtn.hidden = reduceMotion || saveData;
    motionBtn.setAttribute("aria-pressed", String(userPaused));
    motionLabel.textContent = userPaused ? "Play background" : "Pause background";
  };
  if (motionBtn) {
    motionBtn.addEventListener("click", () => {
      userPaused = !userPaused;
      if (userPaused) video.pause(); else playVideo();
      syncMotionButton();
    });
  }
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    if (heroVisible) playVideo(); else video.pause();
  }).observe($(".hero"));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) video.pause(); else playVideo();
  });
  syncMotionButton();

  /* ---------- Parallax (transform-only, rAF batched) ---------------------- */
  const heroLayers = $$("[data-hero-depth]").map((el) => ({ el, depth: parseFloat(el.dataset.heroDepth) }));
  const heroFade = $("[data-hero-fade]");
  const hero = $(".hero");
  let parallaxEls = [];
  const collectParallax = () => {
    parallaxEls = $$("[data-parallax]").map((el) => ({ el, speed: parseFloat(el.dataset.parallax), visible: false }));
    parallaxEls.forEach((item) => visibilityObserver.observe(item.el));
  };
  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const item = parallaxEls.find((p) => p.el === entry.target);
      if (item) item.visible = entry.isIntersecting;
    });
    requestTick();
  }, { rootMargin: "20% 0px" });

  let ticking = false;
  const requestTick = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };
  const update = () => {
    ticking = false;
    if (reduceMotion) return;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const scale = window.innerWidth < 720 ? 0.6 : 1;

    nav.classList.toggle("is-scrolled", y > 24);

    const heroH = hero.offsetHeight;
    if (y < heroH * 1.1) {
      heroLayers.forEach(({ el, depth }) => {
        el.style.transform = `translate3d(0, ${(y * depth * scale).toFixed(1)}px, 0)`;
      });
      if (heroFade) heroFade.style.opacity = String(Math.max(0, 1 - y / (heroH * 0.7)).toFixed(3));
    }

    parallaxEls.forEach(({ el, speed, visible }) => {
      if (!visible) return;
      const r = el.parentElement.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - vh / 2) * -speed * scale;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
  };
  const clearParallax = () => {
    heroLayers.forEach(({ el }) => { el.style.transform = ""; });
    parallaxEls.forEach(({ el }) => { el.style.transform = ""; });
    if (heroFade) heroFade.style.opacity = "";
  };

  window.addEventListener("scroll", () => {
    if (reduceMotion) nav.classList.toggle("is-scrolled", window.scrollY > 24);
    else requestTick();
  }, { passive: true });
  window.addEventListener("resize", requestTick, { passive: true });

  reduceMQ.addEventListener("change", (e) => {
    reduceMotion = e.matches;
    if (reduceMotion) { video.pause(); clearParallax(); } else { playVideo(); requestTick(); }
    syncMotionButton();
  });

  /* ---------- Posts gallery ----------------------------------------------- */
  const POSTS = window.POSTS || [];
  const PROFILE_FEED = "https://www.linkedin.com/in/evansiii/recent-activity/all/";
  const CAT_LABEL = { award: "Award", research: "Research", project: "Project", career: "Career", community: "Community", cert: "Certification" };
  const grid = $("[data-posts]");
  const status = $("[data-posts-status]");
  const lightbox = $("[data-lightbox]");
  let currentList = [];
  let currentIndex = 0;
  let lastTrigger = null;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  if (grid && POSTS.length) {
    grid.innerHTML = POSTS.map((p, i) => `
      <li class="post-card" data-reveal data-index="${i}">
        <button type="button" class="post-card__btn" aria-haspopup="dialog" aria-label="Open post: ${esc(p.title)}">
          <span class="post-card__shot">
            <img src="assets/posts/post-${p.img}-thumb.webp" width="339" height="452" loading="lazy" decoding="async"
                 alt="Screenshot of Evans's LinkedIn post: ${esc(p.title)}">
          </span>
          <span class="post-card__body">
            <span class="post-card__cat">${p.cats.map((c) => CAT_LABEL[c]).join(" · ")}</span>
            <span class="post-card__title">${esc(p.title)}</span>
            <span class="post-card__summary">${esc(p.summary)}</span>
          </span>
        </button>
      </li>`).join("");

    const cards = $$(".post-card", grid);
    const applyFilter = (filter) => {
      currentList = [];
      cards.forEach((card) => {
        const p = POSTS[+card.dataset.index];
        const show = filter === "all" || (filter === "featured" ? p.featured : p.cats.includes(filter));
        card.classList.toggle("is-hidden", !show);
        if (show) { currentList.push(+card.dataset.index); card.classList.add("is-visible"); }
      });
      status.textContent = `Showing ${currentList.length} post${currentList.length === 1 ? "" : "s"}.`;
    };
    $$("[data-filter]").forEach((btn) => btn.addEventListener("click", () => {
      $$("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      applyFilter(btn.dataset.filter);
    }));
    applyFilter("featured");
    observeReveals(grid);

    cards.forEach((card) => {
      $(".post-card__btn", card).addEventListener("click", (e) => {
        lastTrigger = e.currentTarget;
        openPost(currentList.indexOf(+card.dataset.index));
      });
    });
  }

  const shot = lightbox && $(".lightbox__shot", lightbox);
  const renderPost = () => {
    const p = POSTS[currentList[currentIndex]];
    const img = $("[data-lb-img]", lightbox);
    img.src = `assets/posts/post-${p.img}.webp`;
    img.width = p.w; img.height = p.h;
    img.alt = `Full screenshot of Evans's LinkedIn post: ${p.title}`;
    $("[data-lb-title]", lightbox).textContent = p.title;
    $("[data-lb-quote]", lightbox).textContent = `“${p.excerpt}”`;
    $("[data-lb-summary]", lightbox).textContent = p.summary;
    $("[data-lb-count]", lightbox).textContent = `${currentIndex + 1} / ${currentList.length}`;
    const links = [`<a class="link" href="${esc(p.url || PROFILE_FEED)}" rel="noopener" target="_blank">View on LinkedIn <span aria-hidden="true">↗</span></a>`];
    if (p.extra) links.push(`<a class="link" href="${esc(p.extra.href)}" rel="noopener" target="_blank">${esc(p.extra.label)} <span aria-hidden="true">↗</span></a>`);
    $("[data-lb-links]", lightbox).innerHTML = links.join("");
    shot.scrollTop = 0;
    const multi = currentList.length > 1;
    $("[data-lb-prev]", lightbox).disabled = !multi;
    $("[data-lb-next]", lightbox).disabled = !multi;
  };
  const openPost = (i) => {
    currentIndex = Math.max(0, i);
    renderPost();
    if (!lightbox.open) lightbox.showModal();
  };
  const step = (d) => {
    currentIndex = (currentIndex + d + currentList.length) % currentList.length;
    renderPost();
  };
  if (lightbox) {
    $("[data-lb-prev]", lightbox).addEventListener("click", () => step(-1));
    $("[data-lb-next]", lightbox).addEventListener("click", () => step(1));
    $("[data-lb-close]", lightbox).addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });
    lightbox.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    });
    lightbox.addEventListener("close", () => { if (lastTrigger) lastTrigger.focus(); });
  }

  /* ---------- Init -------------------------------------------------------- */
  collectParallax();
  const year = $("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
  nav.classList.toggle("is-scrolled", window.scrollY > 24);
  playVideo();
  requestTick();
})();
