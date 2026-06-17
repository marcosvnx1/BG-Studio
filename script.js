/* =============================================
   Cibelle Gomes — PORTFOLIO JS
   Interactions, Animations & UI Logic
   ============================================= */

'use strict';

/* ---- PROJECT DATA ---- */
/*
  ╔══════════════════════════════════════════════════════════════╗
  ║  COMO ADICIONAR VÍDEO AOS PROJETOS                          ║
  ║                                                              ║
  ║  Adicione o campo "video" em qualquer projeto:              ║
  ║                                                              ║
  ║  YouTube:  video: 'https://www.youtube.com/watch?v=XXXXX'   ║
  ║  Vimeo:    video: 'https://vimeo.com/XXXXXXX'               ║
  ║  Arquivo:  video: 'videos/meu-video.mp4'                    ║
  ║                                                              ║
  ║  Se não tiver vídeo, deixe sem o campo (só a imagem aparece)║
  ╚══════════════════════════════════════════════════════════════╝
*/
const projects = [
  {
    title: 'Bloom Coffee Co.',
    cat: 'Branding',
    img: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=900&q=85',
    // video: 'https://www.youtube.com/watch?v=SEU_ID_AQUI',  ← descomente e cole o link
    desc: 'Identidade visual completa para uma cafeteria artesanal com conceito floral e elegante. O projeto envolveu criação de logotipo, paleta cromática, tipografia, papelaria e guia de marca. A proposta une romantismo e sofisticação para posicionar a marca no segmento premium.',
    tags: ['Logotipo', 'Brand Guide', 'Papelaria', 'Embalagem'],
  },
  {
    title: 'Luna Studio',
    cat: 'Identidade Visual',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=85',
    // video: 'https://www.youtube.com/watch?v=SEU_ID_AQUI',
    desc: 'Marca minimalista e sofisticada para estúdio de fotografia feminino. O conceito foi construído em torno da lua e feminilidade, trazendo delicadeza sem perder autoridade. Incluiu marca, paleta, tipografia e aplicações digitais e físicas.',
    tags: ['Marca', 'Tipografia', 'Aplicações', 'Feminino'],
  },
  {
    title: 'Rosé Beauty Pack',
    cat: 'Social Media',
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=85',
    // video: 'https://www.youtube.com/watch?v=SEU_ID_AQUI',
    desc: 'Pack completo de stories e postagens para feed do Instagram de uma marca de beleza premium. Criação de templates editáveis, guia de uso e diretrizes de estilo visual para manutenção da identidade digital da marca nas redes sociais.',
    tags: ['Instagram', 'Stories', 'Feed', 'Templates'],
  },
  {
    title: 'Aniversário',
    cat: 'Motion Design',
    img: 'imagens/iconCat.png',
    video: 'videos/Aniversário 1 ano.mp4',
    desc: 'Animação de intro com partículas luminosas e efeito neon para canal no YouTube. Produzida no After Effects com partículas 3D, sincronização musical e exportação em múltiplos formatos. Entrega inclui versão com e sem som.',
    tags: ['After Effects', 'Partículas', 'YouTube', 'Loop'],
  },
  {
    title: 'Atelier Blanc',
    cat: 'Branding',
    img: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=900&q=85',
    // video: 'https://www.youtube.com/watch?v=SEU_ID_AQUI',
    desc: 'Branding de alto padrão para ateliê de moda de luxo com linguagem francesa e chique. A identidade visual utiliza tipografia serifada, paleta neutra e dourada, transmitindo exclusividade e requinte. Projeto premiado internamente pelo cliente.',
    tags: ['Luxo', 'Moda', 'Papelaria', 'Alta Costura'],
  },
  {
    title: 'Fada Madrinha Festas',
    cat: 'Social Media',
    img: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=900&q=85',
    // video: 'https://www.youtube.com/watch?v=SEU_ID_AQUI',
    desc: 'Gestão visual completa do Instagram para empresa de eventos e festas personalizadas. Criação mensal de conteúdo, calendário editorial e identidade visual das postagens. Resultado: crescimento de 300% no alcance orgânico em 6 meses.',
    tags: ['Gestão', 'Conteúdo', 'Eventos', 'Instagram'],
  },
];

/* ---- GALLERY IMAGES ---- */
const galleryImages = [
  'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=900&q=85',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=85',
  'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=900&q=85',
  'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=900&q=85',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=85',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85',
];

let currentLightboxIndex = 0;

/* ================================================
   UTILITIES
   ================================================ */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function lockScroll() { document.body.style.overflow = 'hidden'; }
function unlockScroll() { document.body.style.overflow = ''; }

/* ================================================
   NAV — SCROLL EFFECT & HAMBURGER
   ================================================ */
const nav = $('#nav');
const hamburger = $('#hamburger');
const navLinks = $('#navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  $('#backToTop').classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('mobile-open');
  hamburger.setAttribute('aria-expanded', open);
  if (open) lockScroll(); else unlockScroll();
});

navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav__link')) {
    navLinks.classList.remove('mobile-open');
    unlockScroll();
  }
});

/* ================================================
   SCROLL REVEAL — INTERSECTION OBSERVER
   ================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for grid children
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function initReveal() {
  $$('.reveal').forEach((el, i) => {
    // For grid cards, stagger within their parent
    const parent = el.closest('.portfolio__grid, .videos__grid, .galeria__grid, .clientes__grid');
    if (parent) {
      const siblings = Array.from(parent.querySelectorAll('.reveal'));
      el.dataset.delay = siblings.indexOf(el) * 80;
    }
    revealObserver.observe(el);
  });
}

/* ================================================
   PORTFOLIO FILTERS
   ================================================ */
function initFilters() {
  const filterBtns = $$('.filter-btn');
  const cards = $$('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach((card, i) => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.classList.remove('hidden');
          card.style.animationDelay = `${i * 60}ms`;
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = '';
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ================================================
   PROJECT MODAL — com suporte a vídeo
   ================================================ */

/* Converte qualquer link do YouTube/Vimeo em URL de embed */
function getEmbedUrl(url) {
  if (!url) return null;

  // YouTube: watch?v=ID  ou  youtu.be/ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;

  // Vimeo: vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;

  // Arquivo local / outro — usa <video> direto
  return url;
}

function isEmbedUrl(url) {
  return url && (url.includes('youtube.com/embed') || url.includes('player.vimeo.com'));
}

function initProjectModal() {
  const modal = $('#projectModal');
  const backdrop = $('#modalBackdrop');
  const closeBtn = $('#modalClose');
  const cards = $$('.project-card');
  const imgWrap = modal.querySelector('.modal__img-wrap');

  function openModal(projectIdx) {
    const p = projects[projectIdx];
    if (!p) return;

    $('#modalCat').textContent = p.cat;
    $('#modalTitle').textContent = p.title;
    $('#modalDesc').textContent = p.desc;
    $('#modalMeta').innerHTML = p.tags.map(t => `<span class="modal__tag">${t}</span>`).join('');

    // Limpa o conteúdo de mídia anterior
    imgWrap.innerHTML = '';

    if (p.video) {
      const embedUrl = getEmbedUrl(p.video);

      if (isEmbedUrl(embedUrl)) {
        // YouTube / Vimeo → iframe
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.className = 'modal__video-embed';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        imgWrap.appendChild(iframe);
      } else {
        // Arquivo local → <video>
        const video = document.createElement('video');
        video.className = 'modal__video-local';
        video.controls = true;
        video.autoplay = false;
        video.poster = p.img;
        video.innerHTML = `<source src="${embedUrl}" type="video/mp4">`;
        imgWrap.appendChild(video);
      }
      imgWrap.classList.add('has-video');
    } else {
      // Sem vídeo → mostra imagem normalmente
      const img = document.createElement('img');
      img.src = p.img;
      img.alt = p.title;
      img.className = 'modal__img';
      imgWrap.appendChild(img);
      imgWrap.classList.remove('has-video');
    }

    modal.classList.add('open');
    lockScroll();
  }

  function closeModal() {
    modal.classList.remove('open');
    unlockScroll();
    // Para o vídeo ao fechar
    imgWrap.innerHTML = '';
    imgWrap.classList.remove('has-video');
  }

  cards.forEach(card => {
    card.addEventListener('click', () => openModal(parseInt(card.dataset.project)));
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(parseInt(card.dataset.project)); }
    });
  });

  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* ================================================
   LIGHTBOX GALLERY
   ================================================ */
function initLightbox() {
  const lightbox = $('#lightbox');
  const backdrop = $('#lightboxBackdrop');
  const closeBtn = $('#lightboxClose');
  const prevBtn = $('#lightboxPrev');
  const nextBtn = $('#lightboxNext');
  const img = $('#lightboxImg');
  const items = $$('.galeria__item');

  function openLightbox(index) {
    currentLightboxIndex = index;
    img.src = galleryImages[index];
    img.alt = `Galeria ${index + 1}`;
    lightbox.classList.add('open');
    lockScroll();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    unlockScroll();
    img.src = '';
  }

  function navigate(dir) {
    currentLightboxIndex = (currentLightboxIndex + dir + galleryImages.length) % galleryImages.length;
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = galleryImages[currentLightboxIndex];
      img.style.opacity = '1';
    }, 150);
    img.style.transition = 'opacity .15s ease';
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openLightbox(i);
    });
  });

  backdrop.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  }, { passive: true });
}

/* ================================================
   VIDEO SECTION — FEATURED & MODAL
   ================================================ */
function initVideos() {
  const featuredPlayBtn = $('#featuredPlayBtn');
  const featuredVideo = $('#featuredVideo');
  const featuredOverlay = $('#featuredOverlay');

  // Featured video play button
  featuredPlayBtn.addEventListener('click', () => {
    featuredOverlay.classList.add('hidden');
    featuredVideo.play();
  });

  featuredVideo.addEventListener('pause', () => {
    if (featuredVideo.ended || featuredVideo.paused) {
      featuredOverlay.classList.remove('hidden');
    }
  });

  // Video cards → open modal
  const videoModal = $('#videoModal');
  const videoModalBackdrop = $('#videoModalBackdrop');
  const videoModalClose = $('#videoModalClose');
  const videoModalPlayer = $('#videoModalPlayer');
  const videoCards = $$('.video-card');

  function openVideoModal(src, poster) {
    const source = videoModalPlayer.querySelector('source');
    source.src = src;
    videoModalPlayer.poster = poster || '';
    videoModalPlayer.load();
    videoModal.classList.add('open');
    lockScroll();
    setTimeout(() => videoModalPlayer.play(), 300);
  }

  function openVideoModal(src, poster) {
  const source = videoModalPlayer.querySelector("source");

  videoModalPlayer.pause();

  source.src = src;
  videoModalPlayer.poster = poster || "";

  videoModalPlayer.load();

  videoModal.classList.add("open");
  lockScroll();

  videoModalPlayer.play().catch(() => {});
}

function closeVideoModal() {
  videoModalPlayer.pause();

  // limpa o SOURCE certo
  const source = videoModalPlayer.querySelector("source");
  source.src = "";

  videoModalPlayer.load();

  videoModal.classList.remove("open");
  unlockScroll();
}

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      openVideoModal(
        card.dataset.videoSrc,
        card.dataset.poster
      );
    });
  });

  videoModalBackdrop.addEventListener('click', closeVideoModal);
  videoModalClose.addEventListener('click', closeVideoModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('open')) closeVideoModal();
  });
}

/* ================================================
   BACK TO TOP
   ================================================ */
function initBackToTop() {
  $('#backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ================================================
   SMOOTH ANCHOR SCROLL (for all internal links)
   ================================================ */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = $(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ================================================
   HERO PARALLAX (subtle)
   ================================================ */
function initParallax() {
  const hero = $('.hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      const petals = $$('.petal');
      petals.forEach((p, i) => {
        p.style.transform = `translateY(${y * (0.05 + i * 0.02)}px)`;
      });
    }
  }, { passive: true });
}

/* ================================================
   CURSOR GLOW (desktop only)
   ================================================ */
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 320px; height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(232,165,152,.12) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
    transition: transform .1s ease;
    transform: translate(-50%, -50%);
    top: 0; left: 0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

/* ================================================
   STATS COUNTER ANIMATION
   ================================================ */
function animateCounter(el, target) {
  let current = 0;
  const step = Math.ceil(target / 50);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = (el.dataset.prefix || '') + current + (el.dataset.suffix || '+');
    if (current >= target) clearInterval(timer);
  }, 30);
}

function initCounters() {
  const statsSection = $('.hero__stats');
  if (!statsSection) return;

  const nums = $$('.stat__num');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      nums.forEach(num => {
        const text = num.textContent;
        const match = text.match(/\d+/);
        if (match) {
          const target = parseInt(match[0]);
          num.dataset.prefix = text.includes('+') ? '+' : '';
          animateCounter(num, target);
        }
      });
    }
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

/* ================================================
   ACTIVE NAV LINK ON SCROLL
   ================================================ */
function initActiveNav() {
  const sections = $$('section[id]');
  const links = $$('.nav__link:not(.nav__link--cta)');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.id;

      if (scrollY >= top && scrollY < top + height) {
        links.forEach(link => {
          link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { passive: true });
}

/* ================================================
   HOVER TILT on PROJECT CARDS (desktop)
   ================================================ */
function initCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  $$('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ================================================
   IMAGE LAZY LOADING
   ================================================ */
function initLazyImages() {
  if (!('IntersectionObserver' in window)) return;

  const imgs = $$('img[loading="lazy"]');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });

  imgs.forEach(img => imgObserver.observe(img));
}

/* ================================================
   INIT ALL
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initFilters();
  initProjectModal();
  initLightbox();
  initVideos();
  initBackToTop();
  initSmoothScroll();
  initParallax();
  initCursorGlow();
  initCounters();
  initActiveNav();
  initCardTilt();
  initLazyImages();

  document.getElementById('navMobileClose').addEventListener('click', () => {
  navLinks.classList.remove('mobile-open');
  unlockScroll();
});

  // Small stagger on initial hero elements
  $$('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 120);
  });
});
