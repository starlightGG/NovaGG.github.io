(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);

  const el = {
    bg:        $('game-bg'),
    headerImg: $('game-header'),
    edition:   $('gameedition'),
    title:     $('gametitle'),
    version:   $('gameversion'),
    icon:      $('gameicon'),
    play:      $('playbutton'),
    dropdn:    $('dropdn'),
    drop:      $('drop'),
    arrow:     $('dropdownuparrow'),
    mainBtn:   $('mainbutton'),
    errorBox:  $('naerror'),
  };

  const SVG = 'xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdownIcon"';
  const ARROW_DOWN = `<svg ${SVG}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>`;
  const ARROW_UP   = `<svg ${SVG}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 15l6 -6l6 6" /></svg>`;

  /* ============================================================
     1. Auto-build game option markup from data-* attributes
     ============================================================ */
  document.querySelectorAll('#dropdn [data-game]').forEach((opt) => {
    if (opt.firstElementChild) return;   // user supplied custom markup → leave it
    const d = opt.dataset;
    opt.innerHTML = `
      <div class="dropdownOption">
        <div class="centeredIcon">
          <img src="${d.icon || ''}" style="width: 2.5vw;" alt="">
        </div>
        <div class="dropdownOptionText">
          <p class="bolded">${d.title || ''}</p>
          <p>${d.version || ''}</p>
        </div>
      </div>`;
  });

  /* ============================================================
     2. Error toast (fixed clearTimeout bug)
     ============================================================ */
  let startTimer, hideTimer;
  window.errorNA = function () {
    if (!el.errorBox) return;
    clearTimeout(startTimer);
    clearTimeout(hideTimer);
    el.errorBox.classList.remove('zoom-out');
    el.errorBox.style.display = 'block';
    startTimer = setTimeout(() => el.errorBox.classList.add('zoom-out'), 3000);
    hideTimer = setTimeout(() => {
      el.errorBox.classList.remove('zoom-out');
      el.errorBox.style.display = 'none';
    }, 3200);
  };

  /* ============================================================
     3. Dropdown open / close
     ============================================================ */
  function openDropdown() {
    if (!el.dropdn) return;
    el.dropdn.style.visibility = 'visible';
    if (el.arrow) el.arrow.innerHTML = ARROW_UP;
  }
  function closeDropdown() {
    if (!el.dropdn) return;
    el.dropdn.style.visibility = 'hidden';
    if (el.arrow) el.arrow.innerHTML = ARROW_DOWN;
  }
  const toggleDropdown = () =>
    el.dropdn.style.visibility === 'visible' ? closeDropdown() : openDropdown();

  if (el.drop) el.drop.addEventListener('click', toggleDropdown);

  /* ============================================================
     4. Select a game (called from dropdown click / edition init)
     ============================================================ */
  function selectGame(opt) {
    const d = opt.dataset;
    if (el.title)   el.title.textContent   = d.title   || '';
    if (el.version) el.version.textContent = d.version || '';
    if (el.icon)    el.icon.src            = d.icon    || '';
    if (el.play)    el.play.href           = d.href    || '#';
    closeDropdown();
  }

  /* delegated click → works even if you add options later */
  if (el.dropdn) {
    el.dropdn.addEventListener('click', (e) => {
      const opt = e.target.closest('[data-game]');
      if (opt) selectGame(opt);
    });
  }

  /* ============================================================
     5. Select an edition
     ============================================================ */
  function selectEdition(tab) {
    const d = tab.dataset;
    const edition = d.edition;

    /* --- tab styling --- */
    document.querySelectorAll('.sidebarOptions[data-edition]').forEach((t) => {
      t.style.fontWeight = '';
      t.style.borderLeft = '';
    });
    tab.style.fontWeight = '700';
    tab.style.borderLeft = '#008542 solid 0.4vw';

    /* --- hero art + label --- */
    if (el.bg && d.bg)               el.bg.style.backgroundImage = `url(${d.bg})`;
    if (el.headerImg && d.headerImg) el.headerImg.src            = d.headerImg;
    if (el.edition && d.label)       el.edition.innerHTML        = d.label;

    /* --- sub-page tab visibility (Play / Mods / FAQ / …) --- */
    document.querySelectorAll('.gameTabs li[data-editions]').forEach((h) => {
      const list = (h.dataset.editions || '').split(/\s+/);
      h.style.display = list.includes(edition) ? 'block' : 'none';
    });

    /* --- game option visibility + find default --- */
    let firstVisible = null;
    let defaultOption = null;
    document.querySelectorAll('#dropdn [data-game]').forEach((opt) => {
      const list = (opt.dataset.editions || '').split(/\s+/);
      const visible = list.includes(edition);
      opt.style.display = visible ? 'flex' : 'none';
      if (visible) {
        if (!firstVisible) firstVisible = opt;
        if (d.default && opt.dataset.game === d.default) defaultOption = opt;
      }
    });

    /* --- original resetDefault() --- */
    if (el.drop) el.drop.style.display = 'flex';
    if (el.mainBtn) {
      el.mainBtn.classList.remove('playButton2');
      el.mainBtn.classList.add('playButton');
    }

    /* --- pick game --- */
    const target = defaultOption || firstVisible;
    if (target) selectGame(target);

    closeDropdown();
  }

  document.querySelectorAll('.sidebarOptions[data-edition]').forEach((tab) => {
    tab.addEventListener('click', () => selectEdition(tab));
  });

  /* ============================================================
     6. Scroll lock (unchanged from original)
     ============================================================ */
  function preventMotion(event) {
    window.scrollTo(0, 0);
    event.preventDefault();
    event.stopPropagation();
  }
  window.addEventListener('scroll', preventMotion, false);
  window.addEventListener('touchmove', preventMotion, false);

  /* ============================================================
     7. Initial state = the tab marked data-initial="true"
     ============================================================ */
  const initialTab =
    document.querySelector('.sidebarOptions[data-edition][data-initial]') ||
    document.querySelector('.sidebarOptions[data-edition]');
  if (initialTab) selectEdition(initialTab);
})();
