(function () {
    'use strict';

    const THEMES = [
        { id: 'theme-space',  label: 'Space'  },
        { id: 'theme-forest', label: 'Forest' },
        { id: 'theme-ocean',  label: 'Ocean'  },
    ];

    let currentTheme = localStorage.getItem('anoma-theme') || 'theme-space';

    function applyTheme(id) {
        THEMES.forEach(t => document.body.classList.remove(t.id));
        document.body.classList.add(id);
        currentTheme = id;
        localStorage.setItem('anoma-theme', id);
        document.querySelectorAll('.theme-btn').forEach(btn =>
            btn.classList.toggle('active', btn.dataset.theme === id));
    }

    function buildTopbar() {
        const bar = document.getElementById('themeBar');
        THEMES.forEach(t => {
            const btn = document.createElement('button');
            btn.className = 'theme-btn';
            btn.dataset.theme = t.id;
            btn.textContent = t.label;
            btn.setAttribute('aria-label', `${t.label} theme`);
            btn.addEventListener('click', () => applyTheme(t.id));
            bar.appendChild(btn);
        });
    }

    function initStars() {
        const el = document.getElementById('heroBg');
        if (!el) return;
        const W = window.innerWidth  * 1.8;
        const H = window.innerHeight * 1.8;
        const shadows = [];
        for (let i = 0; i < 200; i++) {
            const x = Math.floor(Math.random() * W);
            const y = Math.floor(Math.random() * H);
            const big   = Math.random() > 0.9;
            const blur  = big ? '1px' : '0px';
            const alpha = (0.2 + Math.random() * 0.75).toFixed(2);
            shadows.push(`${x}px ${y}px ${blur} 1px rgba(255,255,255,${alpha})`);
        }
        el.style.boxShadow = shadows.join(',');
    }

    function initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis();
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(t => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);

        gsap.to('#progressBar', {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0,
            },
        });

        initHero();
        initS2();
        initS3();
        initS4();
        initS5();
        initS6();
    }

    function initHero() {
        gsap.from('.hw', {
            y: 90, opacity: 0, duration: 1.1,
            stagger: 0.07,
            ease: 'power3.out',
        });
        gsap.from('.hero-label', {
            y: 20, opacity: 0, duration: 0.8, delay: 0.1, ease: 'power2.out',
        });
        gsap.from('.hero-sub', {
            y: 24, opacity: 0, duration: 0.8, delay: 0.5, ease: 'power2.out',
        });
        gsap.from('.scroll-cue', {
            opacity: 0, duration: 0.6, delay: 1.0, ease: 'power1.out',
        });

        gsap.to('.hero-content', {
            y: -80, opacity: 0,
            scrollTrigger: {
                trigger: '#s1',
                start: 'top top',
                end: 'bottom center',
                scrub: true,
            },
        });
    }

    function initS2() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#s2',
                pin: true,
                scrub: 1.6,
                start: 'top top',
                end: '+=250%',
            },
        });

        tl
            .from('#s2-cloud-l',  { x: '-15%', opacity: 0 }, 0)
            .from('#s2-cloud-r',  { x: '15%',  opacity: 0 }, 0)
            .to('#s2-cloud-l',    { x: '-22%' }, 0.3)
            .to('#s2-cloud-r',    { x: '22%'  }, 0.3)
            .from('#s2-mountains',{ yPercent: 18, opacity: 0 }, 0)
            .to('#s2-mountains',  { yPercent: 22 }, 0.5)
            .from('#s2-forest',   { scale: 1.18, transformOrigin: '50% 100%' }, 0)
            .from('#s2-rock',     { y: 60, opacity: 0 }, 0.05)
            .to('#s2-rock',       { y: -70 }, 0.5)
            .from('#s2-mage',     { y: 80, opacity: 0 }, 0.1)
            .to('#s2-mage',       { y: -130 }, 0.5)

            .from('#s2-ll1', { y: -500, rotation: -28 }, 0)
            .from('#s2-ll2', { y: -350, x: -80, rotation:  18 }, 0.08)
            .from('#s2-ll3', { y: -600, rotation: -10 }, 0.12)
            .from('#s2-ll4', { y: -280, x: -40, rotation:  22 }, 0.18)
            .from('#s2-rl1', { y: -500, rotation:  28 }, 0)
            .from('#s2-rl2', { y: -350, x: 80,  rotation: -18 }, 0.08)
            .from('#s2-rl3', { y: -600, rotation:  10 }, 0.12)
            .from('#s2-rl4', { y: -280, x: 40,  rotation: -22 }, 0.18)

            .from('#s2-text .s__heading', { y: 55, opacity: 0 }, 0.35)
            .from('#s2-text .s__para',    { y: 30, opacity: 0 }, 0.42);
    }

    function initS3() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#s3',
                pin: true,
                scrub: 1.6,
                start: 'top top',
                end: '+=250%',
            },
        });

        tl
            .from('#s3-cloud-l',  { x: '-20%', opacity: 0 }, 0)
            .from('#s3-cloud-r',  { x:  '20%', opacity: 0 }, 0)
            .from('#s3-cloud-l2', { x: '-10%', opacity: 0 }, 0.05)
            .to('#s3-cloud-l',    { x: '-10%' }, 0.6)
            .to('#s3-cloud-r',    { x:  '10%' }, 0.6)

            .from('#s3-forest',  { scale: 1.2, transformOrigin: '50% 100%', opacity: 0 }, 0)
            .from('#s3-forest2', { scale: 1.15, transformOrigin: '50% 100%', y: 40 }, 0.1)

            .from('#s3-tll0', { y: -600, x: -60, rotation: -30 }, 0)
            .from('#s3-tll1', { y: -400, x: -30, rotation:  20 }, 0.06)
            .from('#s3-tll2', { y: -700, rotation: -12 }, 0.1)
            .from('#s3-tll3', { y: -350, x: -80, rotation:  25 }, 0.14)
            .from('#s3-tll4', { y: -500, rotation: -8  }, 0.18)
            .from('#s3-trl1', { y: -600, x: 60,  rotation:  30 }, 0)
            .from('#s3-trl2', { y: -400, x: 30,  rotation: -20 }, 0.06)
            .from('#s3-trl3', { y: -700, rotation:  12 }, 0.1)

            .from('#s3-bll1', { y: 300, x: -50, opacity: 0 }, 0.2)
            .from('#s3-bll2', { y: 200, x: -30, opacity: 0 }, 0.25)
            .from('#s3-bll3', { y: 250, x: -20, opacity: 0 }, 0.3)
            .from('#s3-brl1', { y: 300, x: 50,  opacity: 0 }, 0.2)
            .from('#s3-brl2', { y: 250, x: 40,  opacity: 0 }, 0.22)
            .from('#s3-brl3', { y: 200, x: 30,  opacity: 0 }, 0.27)
            .from('#s3-brl4', { y: 180, x: 20,  opacity: 0 }, 0.32)
            .from('#s3-brl5', { y: 280, x: 35,  opacity: 0 }, 0.24)
            .from('#s3-brl6', { y: 150, x: 15,  opacity: 0 }, 0.36)
            .from('#s3-brl7', { y: 220, x: 25,  opacity: 0 }, 0.29)

            .from('#s3-text .s__heading', { y: 55, opacity: 0 }, 0.4)
            .from('#s3-text .s__para',    { y: 30, opacity: 0 }, 0.47);
    }

    function initS4() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#s4',
                pin: true,
                scrub: 1.6,
                start: 'top top',
                end: '+=250%',
            },
        });

        tl
            .from('#s4-outer', { scale: 0.82, transformOrigin: '50% 50%', opacity: 0 }, 0)
            .from('#s4-inner', { scale: 0.55, transformOrigin: '50% 50%', opacity: 0 }, 0.15)
            .to('#s4-inner',   { scale: 1.12, transformOrigin: '50% 50%' }, 0.7)
            .from('#s4-cl', { x: -200, opacity: 0 }, 0.2)
            .from('#s4-cr', { x:  200, opacity: 0 }, 0.2)
            .to('#s4-cl', { x: -20, y: -15 }, 0.7)
            .to('#s4-cr', { x:  20, y: -15 }, 0.7)

            .from('#s4-text .s__heading', { y: 55, opacity: 0 }, 0.4)
            .from('#s4-text .s__para',    { y: 30, opacity: 0 }, 0.47);
    }

    function initS5() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#s5',
                pin: true,
                scrub: 1.6,
                start: 'top top',
                end: '+=250%',
            },
        });

        tl
            .from('#s5-bg',     { opacity: 0, scale: 1.12, transformOrigin: '50% 50%' }, 0)
            .from('#s5-cliffs', { yPercent: 15, opacity: 0 }, 0.1)
            .from('#s5-fg',     { yPercent: 10, opacity: 0 }, 0.05)
            .to('#s5-fg',       { yPercent: -5 }, 0.8)
            .from('#s5-lcr', { x: -180, opacity: 0, rotation: -12 }, 0.2)
            .from('#s5-rcr', { x:  180, opacity: 0, rotation:  12 }, 0.2)
            .to('#s5-lcr', { x: -10, rotation: -4 }, 0.75)
            .to('#s5-rcr', { x:  10, rotation:  4 }, 0.75)
            .from('#s5-tcr',  { y: -180, opacity: 0 }, 0.3)
            .from('#s5-tree', { y: 100, opacity: 0 }, 0.25)

            .from('#s5-text .s__heading', { y: 55, opacity: 0 }, 0.4)
            .from('#s5-text .s__para',    { y: 30, opacity: 0 }, 0.47);
    }

    function initS6() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#s6',
                start: 'top 85%',
                end: 'center 40%',
                scrub: 1.2,
            },
        });

        tl
            .from('#s6-bg2',  { opacity: 0, scale: 1.15, transformOrigin: '50% 50%' }, 0)
            .from('#s6-bg1',  { opacity: 0, yPercent: 8 }, 0.05)
            .from('#s6-lcr',  { x: -160, opacity: 0 }, 0.2)
            .from('#s6-bcr',  { y: 120, opacity: 0 }, 0.25)
            .from('#s6-mage', { y: 100, opacity: 0 }, 0.15)
            .from('#s6-mage-glow', { opacity: 0, scale: 0.4, transformOrigin: '50% 100%' }, 0.3)

            .from('.cta-badge', { y: 30, opacity: 0 }, 0.45)
            .from('.cta-title', { y: 40, opacity: 0 }, 0.5)
            .from('.cta-sub',   { y: 25, opacity: 0 }, 0.55)
            .from('.cta-btn',   { y: 20, opacity: 0, scale: 0.95 }, 0.6);
    }

    function init() {
        applyTheme(currentTheme);
        buildTopbar();
        initStars();
        initGSAP();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
