/* ════════════════════════════════════════
   WEDDING INVITATION — SCRIPT.JS
   R. Anand Raj & P. Bhuvana | 24–25 May 2026
   ════════════════════════════════════════

   ╔══════════════════════════════════════╗
   ║   HOW TO ADD YOUR COUPLE PHOTO       ║
   ╠══════════════════════════════════════╣
   ║  Option A (easiest):                 ║
   ║    1. Name your photo: couple.jpg    ║
   ║    2. Put it in the same folder      ║
   ║       as index.html                  ║
   ║    3. Done! Auto-loads on open.      ║
   ║                                      ║
   ║  Option B (custom name):             ║
   ║    Change the line below:            ║
   ║    const COUPLE_PHOTO = '';          ║
   ║    → const COUPLE_PHOTO = 'myphoto.jpg';
   ╚══════════════════════════════════════╝

   ╔══════════════════════════════════════╗
   ║   HOW TO ADD WEDDING MUSIC           ║
   ╠══════════════════════════════════════╣
   ║  1. Download Tamil wedding BGM MP3   ║
   ║     (search "Tamil Nadaswaram BGM"   ║
   ║      or "Shehnai wedding music" on   ║
   ║      YouTube → convert to MP3)       ║
   ║                                      ║
   ║  2. Name it: wedding.mp3             ║
   ║  3. Put it in the same folder        ║
   ║  4. Click ▶ button on the page       ║
   ║                                      ║
   ║  Free sources:                       ║
   ║  • pixabay.com/music (search         ║
   ║    "indian wedding" or "shehnai")    ║
   ║  • zapsplat.com                      ║
   ╚══════════════════════════════════════╝
*/

(function () {
  "use strict";

  /* ── CONFIGURATION ─────────────────────
     Set your photo filename here.
     Leave as '' to use default 'couple.jpg'
  ──────────────────────────────────────── */
  const COUPLE_PHOTO = '';  // e.g. 'anand_bhuvana.jpg'

  /* ════════════════════════════════════════
     1. DOOR OPENING + HERO REVEAL
  ════════════════════════════════════════ */
  function initDoor() {
    var doorLeft    = document.querySelector('.door-left');
    var doorRight   = document.querySelector('.door-right');
    var doorHeart   = document.querySelector('.door-heart');
    var heroContent = document.getElementById('heroContent');

    setTimeout(function () {
      if (doorLeft)  doorLeft.classList.add('open');
      if (doorRight) doorRight.classList.add('open');
    }, 700);

    setTimeout(function () {
      if (doorHeart)   doorHeart.classList.add('hidden');
      if (heroContent) heroContent.classList.add('visible');
      spawnPetals();
    }, 2100);
  }

  /* ════════════════════════════════════════
     2. PETAL ANIMATION
  ════════════════════════════════════════ */
  function spawnPetals() {
    var layer = document.getElementById('petalLayer');
    if (!layer) return;
    var symbols = ['🌸', '🌹', '✿', '❀', '🌺', '✦'];
    for (var i = 0; i < 24; i++) {
      (function (idx) {
        setTimeout(function () {
          var el = document.createElement('span');
          el.classList.add('petal');
          el.textContent = symbols[idx % symbols.length];
          el.style.left = (Math.random() * 100) + 'vw';
          el.style.fontSize = (0.7 + Math.random() * 1.1) + 'rem';
          el.style.animationDuration = (5 + Math.random() * 7) + 's';
          layer.appendChild(el);
          el.addEventListener('animationend', function () { el.remove(); });
        }, idx * 300);
      })(i);
    }
  }

  /* ════════════════════════════════════════
     3. DUAL COUNTDOWN (Reception + Muhurtham)
  ════════════════════════════════════════ */
  function initCountdowns() {
    // Reception: 24 May 2026 18:00 IST (UTC+5:30)
    var reception  = new Date('2026-05-24T18:00:00+05:30').getTime();
    // Muhurtham: 25 May 2026 09:00 IST
    var muhurtham  = new Date('2026-05-25T09:00:00+05:30').getTime();

    function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

    function updateCountdown(target, ids) {
      var diff = target - Date.now();
      if (diff <= 0) {
        ids.forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.textContent = '00';
        });
        return;
      }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      var vals = [pad(d), pad(h), pad(m), pad(s)];
      ids.forEach(function (id, i) {
        var el = document.getElementById(id);
        if (el) el.textContent = vals[i];
      });
    }

    function tick() {
      updateCountdown(reception, ['r-days','r-hours','r-mins','r-secs']);
      updateCountdown(muhurtham, ['m-days','m-hours','m-mins','m-secs']);
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ════════════════════════════════════════
     4. COUNTDOWN TAB SWITCHER
  ════════════════════════════════════════ */
  function initCountdownTabs() {
    var tabs = document.querySelectorAll('.cd-tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var target = tab.getAttribute('data-tab');
        document.querySelectorAll('.cd-panel').forEach(function (panel) {
          panel.classList.add('hidden');
        });
        var el = document.getElementById('panel-' + target);
        if (el) el.classList.remove('hidden');
      });
    });
  }

  /* ════════════════════════════════════════
     5. SCROLL REVEAL (scratch cards + timeline)
  ════════════════════════════════════════ */
  function initScrollReveal() {
    var opts = { threshold: 0.2 };

    // Date scratch reveal
    var scratches = document.querySelectorAll('.scratch-overlay');
    var scratchObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          setTimeout(function () { el.classList.add('revealed'); }, 350);
          scratchObs.unobserve(el);
        }
      });
    }, opts);
    scratches.forEach(function (el, i) {
      el.style.transitionDelay = (i * 0.2) + 's';
      scratchObs.observe(el);
    });

    // Timeline items
    var tlItems = document.querySelectorAll('.timeline-item[data-aos]');
    var tlObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          tlObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    tlItems.forEach(function (el, i) {
      el.style.transitionDelay = (i * 0.2) + 's';
      tlObs.observe(el);
    });
  }

  /* ════════════════════════════════════════
     6. COUPLE PHOTO LOADER
  ════════════════════════════════════════ */
  function initPhoto() {
    var photoSrc = COUPLE_PHOTO || 'couple.jpg';
    var img = document.getElementById('coupleRealPhoto');
    var placeholder = document.getElementById('couplePlaceholder');
    if (!img) return;

    var test = new Image();
    test.onload = function () {
      img.src = photoSrc;
      img.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
    };
    test.onerror = function () {
      // Photo not found — keep placeholder visible
    };
    test.src = photoSrc;
  }

  /* ════════════════════════════════════════
     7. MUSIC — AUTO PLAY ON LOOP
        No button. Starts as soon as user
        touches/clicks anywhere (browser policy).
  ════════════════════════════════════════ */
  function initMusic() {
    var audio = document.getElementById('bgMusic');
    if (!audio) return;

    function tryPlay() {
      audio.volume = 0.45;
      audio.play().catch(function () { /* browser blocked — retry on next interaction */ });
    }

    // Try immediately (works if browser allows autoplay)
    tryPlay();

    // Fallback: play on very first user interaction anywhere on page
    var played = false;
    function onInteract() {
      if (played) return;
      played = true;
      tryPlay();
      document.removeEventListener('click',      onInteract);
      document.removeEventListener('touchstart', onInteract);
      document.removeEventListener('scroll',     onInteract);
      document.removeEventListener('keydown',    onInteract);
    }
    document.addEventListener('click',      onInteract, { passive: true });
    document.addEventListener('touchstart', onInteract, { passive: true });
    document.addEventListener('scroll',     onInteract, { passive: true });
    document.addEventListener('keydown',    onInteract, { passive: true });
  }

  /* ════════════════════════════════════════
     8. HERO PARALLAX
  ════════════════════════════════════════ */
  function initParallax() {
    var heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var y = window.scrollY;
          heroContent.style.transform = 'translateY(' + (y * 0.22) + 'px)';
          heroContent.style.opacity   = Math.max(0, 1 - y / 480);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ════════════════════════════════════════
     9. RSVP FORM
  ════════════════════════════════════════ */
  function initForm() {

  var form = document.getElementById('rsvpForm');

  if (!form) return;

  form.addEventListener('submit', function (e) {

    e.preventDefault();

    var name =
      document.getElementById('rsvp-name').value.trim();

    var email =
      document.getElementById('rsvp-email').value.trim();

    var attending =
      form.querySelector('input[name="attending"]:checked');

    var message =
      document.getElementById('rsvp-msg').value.trim();

    if (!name) {
      alert('Please enter your name.');
      return;
    }

    if (!email || !email.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }

    if (!attending) {
      alert('Please let us know if you can attend!');
      return;
    }

    var attendText =
      attending.value === 'yes'
      ? 'Yes, we’ll celebrate together 🥂'
      : 'Sending blessings and love 🤍';

    var whatsappMessage =
`✨ Wedding Wishes ✨

👤 Name: ${name}

📧 Email: ${email}

💍 Response:
${attendText}

💌 Wishes:
${message}`;

    var phoneNumber = '918189970609';

    var whatsappURL =
`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, '_blank');

  });

}

  /* ════════════════════════════════════════
     INIT ALL
  ════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', function () {
    initDoor();
    initCountdowns();
    initCountdownTabs();
    initScrollReveal();
    initPhoto();
    initMusic();
    initParallax();
    initForm();
  });

})();
