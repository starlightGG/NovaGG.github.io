(function () {
  // Run previous instance's cleanup (restores any inline dark-mode styles etc.)
  if (window.__novaCleanup) {
    try { window.__novaCleanup(); } catch (e) {}
  }

  // Clean up any existing host or page-level styles
  ['novascriptin-host', 'nova-fdark', 'novascriptin-global'].forEach(function (i) {
    var e = document.getElementById(i);
    if (e) e.remove();
  });
  document.documentElement.classList.remove('n-inv');
  document.body.contentEditable = 'false';

  // Create isolated Shadow DOM host
  var host = document.createElement('div');
  host.id = 'novascriptin-host';
  host.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;z-index:2147483647;pointer-events:none;';
  document.documentElement.appendChild(host);
  var shadow = host.attachShadow({ mode: 'open' });

  // Global page styles (only for page-level effects like Reverse Contrast)
  var gCss = document.createElement('style');
  gCss.id = 'novascriptin-global';
  gCss.textContent = 'html.n-inv{filter:invert(1) hue-rotate(180deg);transition:filter .4s}html.n-inv img,html.n-inv video,html.n-inv canvas,html.n-inv #novascriptin-host{filter:invert(1) hue-rotate(180deg)}';
  document.head.appendChild(gCss);

  var fdark = document.createElement('style');
  fdark.id = 'nova-fdark';
  document.head.appendChild(fdark);

  var el = function (t, p, c) {
    var n = document.createElement(t);
    if (p)
      Object.keys(p).forEach(function (k) {
        if (k === 'c') n.className = p[k];
        else if (k === 't') n.textContent = p[k];
        else if (k.indexOf('data-') === 0) n.setAttribute(k, p[k]);
        else n[k] = p[k];
      });
    if (c)
      c.forEach(function (x) {
        if (x) n.appendChild(x);
      });
    return n;
  };

  var card = function (h, d, id, did, extraElements) {
    var controlGroup = [el('input', { type: 'checkbox', id: id }), el('span', { c: 'nova-sl' })];
    var topChildren = [
      el('div', 0, [el('h4', { t: h }), el('p', { id: did || '', t: d })]),
      el('label', { c: 'nova-sw' }, controlGroup)
    ];
    var innerCardChildren = [el('div', { c: 'nova-ctop' }, topChildren)];
    if (extraElements) {
      innerCardChildren.push(el('div', { c: 'nova-extra', style: 'margin-top:10px;' }, extraElements));
    }
    return el('div', { c: 'nova-card' }, innerCardChildren);
  };

  // Scoped Shadow DOM styles with safely escaped inner single quotes for SVGs
  var css = el('style', {
    id: 'novascriptin-css',
    t: ':host{all:initial;font-family:sans-serif}@keyframes nPop{0%{opacity:0}100%{opacity:1}}@keyframes nFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}@keyframes nSpin{to{transform:rotate(360deg)}}.nova-box{pointer-events:auto;--bg:#e0e5ec;--txt:#3182ce;--sub:#718096;--s1:rgba(163,177,198,.7);--s2:rgba(255,255,255,.85);--ac:#3182ce;background:var(--bg);color:var(--txt);font-family:sans-serif;user-select:none;box-sizing:border-box;transition:background .35s,color .35s,box-shadow .35s;line-height:normal;letter-spacing:normal;text-transform:none}.nova-box *{box-sizing:border-box;font-family:inherit}.nova-box.dark{--bg:#1e2229;--txt:#b794f4;--sub:#a0aec0;--s1:rgba(11,13,16,.85);--s2:rgba(46,52,64,.6);--ac:#b794f4}#nova-ldr{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;z-index:1000000;transition:opacity .4s}#nova-spin{width:46px;height:46px;border-radius:50%;border:4px solid var(--s1);border-top-color:var(--ac);animation:nSpin .8s linear infinite}#novascriptin-hub{position:fixed;width:50vw;height:50vh;min-width:260px;min-height:220px;border-radius:22px;box-shadow:9px 9px 18px var(--s1),-9px -9px 18px var(--s2);z-index:999999;padding:20px;display:none;flex-direction:column;animation:nPop .3s ease forwards}.nova-hdr{display:flex;justify-content:space-between;align-items:center;cursor:grab;padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid rgba(150,150,150,.2);flex-shrink:0}.nova-hdr:active{cursor:grabbing}.nova-ttl{font-weight:800;font-size:17px}.nova-hbtns{display:flex;gap:8px;align-items:center}.nova-cls,.nova-min{width:26px;height:26px;border-radius:50%;border:none;background:var(--bg);box-shadow:4px 4px 8px var(--s1),-4px -4px 8px var(--s2);font-weight:700;cursor:pointer;transition:transform .2s;display:flex;align-items:center;justify-content:center;padding:0}.nova-cls{color:#e53e3e}.nova-min{color:var(--ac);font-size:16px;line-height:1}.nova-cls:hover,.nova-min:hover{transform:scale(1.1)}#nova-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);padding:10px 18px;border-radius:14px;box-shadow:6px 6px 12px var(--s1),-6px -6px 12px var(--s2);font-size:13px;font-weight:700;z-index:1000001;opacity:0;pointer-events:none;transition:opacity .3s}.nova-tabs{display:flex;gap:8px;margin-bottom:18px;flex-shrink:0}.nova-tbtn{flex:1;padding:9px 6px;border:none;border-radius:12px;background:var(--bg);box-shadow:5px 5px 10px var(--s1),-5px -5px 10px var(--s2);font-weight:600;font-size:13px;color:var(--sub);cursor:pointer;transition:.25s}.nova-tbtn.active{box-shadow:inset 4px 4px 8px var(--s1),inset -4px -4px 8px var(--s2);color:var(--ac)}.nova-body{flex:1;overflow-y:auto;overflow-x:hidden;padding-right:2px}.nova-body::-webkit-scrollbar{width:4px}.nova-body::-webkit-scrollbar-thumb{background:var(--sub);border-radius:4px}.nova-sec{display:none}.nova-sec.active{display:block;animation:nFade .3s ease forwards}.nova-card{padding:14px 16px;margin-bottom:14px;border-radius:15px;background:var(--bg);box-shadow:5px 5px 10px var(--s1),-5px -5px 10px var(--s2);transition:transform .25s}.nova-card:hover{transform:translateY(-2px)}.nova-ctop{display:flex;justify-content:space-between;align-items:center;gap:10px}.nova-card h4{margin:0 0 3px;font-size:14.5px;font-weight:700}.nova-card p{margin:0;font-size:11.5px;color:var(--sub)}.nova-grid{display:flex;gap:10px}.nova-col{flex:1}.nova-col label{display:block;font-size:11px;font-weight:600;margin-bottom:5px;color:var(--sub)}.nova-sw{position:relative;display:inline-block;width:48px;height:26px;flex-shrink:0}.nova-sw input{opacity:0;width:0;height:0;margin:0}.nova-sl{position:absolute;cursor:pointer;inset:0;background:var(--bg);border-radius:26px;box-shadow:inset 3px 3px 6px var(--s1),inset -3px -3px 6px var(--s2);transition:.3s}.nova-sl:before{position:absolute;content:"";height:18px;width:18px;left:4px;bottom:4px;background:var(--sub);border-radius:50%;transition:.35s cubic-bezier(.68,-.55,.265,1.55)}input:checked+.nova-sl:before{transform:translateX(22px);background:var(--ac)}.nova-in,.nova-kbtn,.nova-select{width:100%;padding:8px 10px;border:none;border-radius:10px;background:var(--bg);box-shadow:inset 3px 3px 6px var(--s1),inset -3px -3px 6px var(--s2);color:var(--txt);font-size:12.5px;outline:none;box-sizing:border-box}.nova-kbtn{box-shadow:3px 3px 6px var(--s1),-3px -3px 6px var(--s2);cursor:pointer;font-weight:600;text-align:center;transition:background 0.2s, color 0.2s}.nova-kbtn:active{box-shadow:inset 2px 2px 4px var(--s1),inset -2px -2px 4px var(--s2)}.nova-kbtn.recording{background:var(--ac);color:var(--bg);box-shadow:inset 3px 3px 6px var(--s1),inset -3px -3px 6px var(--s2)}#nova-res{position:absolute;right:6px;bottom:6px;width:16px;height:16px;cursor:nwse-resize;border-right:3px solid var(--sub);border-bottom:3px solid var(--sub);border-bottom-right-radius:6px;opacity:.7;z-index:10}#nova-res:hover{opacity:1;border-color:var(--ac)}#nova-ovl{position:fixed;top:20px;right:20px;padding:10px 16px;border-radius:14px;box-shadow:6px 6px 12px var(--s1),-6px -6px 12px var(--s2);font-family:monospace;font-size:13px;font-weight:700;z-index:999998;display:none;align-items:center;gap:10px;cursor:grab;animation:nPop .3s ease forwards}#nova-ac-ovl{position:fixed;top:90px;right:20px;width:265px;padding:16px;border-radius:18px;box-shadow:7px 7px 14px var(--s1),-7px -7px 14px var(--s2);z-index:999999;display:none;animation:nPop .3s ease forwards}#nova-ai-ovl{position:fixed;bottom:20px;right:20px;width:320px;height:430px;border-radius:20px;box-shadow:8px 8px 16px var(--s1),-8px -8px 16px var(--s2);z-index:999999;display:none;flex-direction:column;padding:16px;animation:nPop .3s ease forwards}.ai-chat-area{flex:1;overflow-y:auto;margin-bottom:10px;padding-right:2px;display:flex;flex-direction:column;gap:8px}.ai-msg{max-width:85%;padding:8px 12px;border-radius:12px;font-size:12.5px;word-break:break-word;user-select:text}.ai-msg.user{align-self:flex-end;background:var(--ac);color:var(--bg)}.ai-msg.bot{align-self:flex-start;background:var(--s1);color:var(--txt);border:1px solid rgba(150,150,150,0.1)}.ai-msg.system{align-self:center;font-size:11px;color:var(--sub);background:transparent;text-align:center}.ai-controls{display:flex;flex-direction:column;gap:6px;margin-bottom:10px;flex-shrink:0}.ai-input-wrap{display:flex;gap:6px;flex-shrink:0}.ai-input-wrap input{flex:1}',
  });
  css.textContent +=
    '.nova-rng{width:100%;accent-color:var(--ac);margin:0;cursor:pointer}' +
    '.nova-ta{width:100%;padding:8px 10px;border:none;border-radius:10px;background:var(--bg);box-shadow:inset 3px 3px 6px var(--s1),inset -3px -3px 6px var(--s2);color:var(--txt);font-size:12px;font-family:monospace;outline:none;resize:vertical;box-sizing:border-box;user-select:text}' +
    '#nova-clk{position:fixed;top:70px;left:20px;padding:10px 16px;border-radius:14px;box-shadow:6px 6px 12px var(--s1),-6px -6px 12px var(--s2);font-family:monospace;font-size:15px;font-weight:700;z-index:999998;display:none;cursor:grab;animation:nPop .3s ease forwards}' +
    '#nova-note{position:fixed;bottom:20px;left:20px;width:260px;height:220px;border-radius:18px;box-shadow:7px 7px 14px var(--s1),-7px -7px 14px var(--s2);z-index:999999;display:none;flex-direction:column;padding:14px;animation:nPop .3s ease forwards}' +
    '#nova-note textarea{flex:1;resize:none;font-family:sans-serif}' +
    '#nova-xh{position:fixed;left:50%;top:50%;width:0;height:0;z-index:999990;display:none;pointer-events:none}' +
    '.nova-pop{position:fixed;width:250px;max-height:80vh;overflow-y:auto;padding:16px;border-radius:18px;box-shadow:7px 7px 14px var(--s1),-7px -7px 14px var(--s2);z-index:1000000;display:none;animation:nPop .3s ease forwards}' +
    '.nova-clr{width:100%;height:30px;border:none;border-radius:8px;background:transparent;padding:0;cursor:pointer}' +
    '.nova-chk{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:var(--sub);margin-bottom:10px;cursor:pointer}' +
    '.nova-chk input{accent-color:var(--ac);margin:0}.nova-hint{font-size:11px;color:var(--sub);margin:0 0 10px}' +
    '.nova-hdr,#nova-ovl,#nova-clk,#nova-res,.nova-fab,#nova-tgt{touch-action:none}.nova-sw{-webkit-touch-callout:none}' +
    '.nova-fab{position:fixed;width:48px;height:48px;border-radius:50%;box-shadow:5px 5px 10px var(--s1),-5px -5px 10px var(--s2);display:none;align-items:center;justify-content:center;font-size:11px;font-weight:800;z-index:999997;cursor:pointer;-webkit-tap-highlight-color:transparent}' +
    '.nova-fab.on{background:var(--ac);color:var(--bg)}' +
    '#nova-tgt{position:fixed;width:44px;height:44px;border-radius:50%;border:2px dashed #e53e3e;background:rgba(229,62,62,.15);z-index:999996;display:none;pointer-events:auto}' +
    '#nova-tgt:after{content:"";position:absolute;left:50%;top:50%;width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:50%;background:#e53e3e}' +
    '@media (pointer:coarse){#nova-res{width:30px;height:30px}.nova-in,.nova-ta,.nova-select{font-size:16px}.nova-cls,.nova-min{width:34px;height:34px}}' +
    '@media (max-width:640px){#novascriptin-hub{width:min(92vw,380px);height:62vh}#nova-ai-ovl{width:min(92vw,320px);height:min(60vh,430px)}#nova-ac-ovl{width:min(70vw,265px)}.nova-pop{width:min(86vw,260px)}}';
  shadow.appendChild(css);

  var toast = el('div', { id: 'nova-toast', c: 'nova-box dark' });
  shadow.appendChild(toast);

  var ldr = el('div', { id: 'nova-ldr', c: 'nova-box dark' }, [
    el('div', { id: 'nova-spin' }),
    el('div', { style: 'font-weight:800;font-size:18px', t: 'Loading NovaScriptin...' }),
  ]);
  shadow.appendChild(ldr);

  var hdr = el('div', { c: 'nova-hdr' }, [
    el('span', { c: 'nova-ttl', t: 'NovaScriptin' }),
    el('div', { c: 'nova-hbtns' }, [
      el('button', { id: 'nova-min', c: 'nova-min', t: '-' }),
      el('button', { id: 'nova-cls', c: 'nova-cls', t: 'X' }),
    ]),
  ]);

  var tabs = el('div', { c: 'nova-tabs' }, [
    el('button', { c: 'nova-tbtn active', 'data-tab': 'scripts', t: 'Scripts' }),
    el('button', { c: 'nova-tbtn', 'data-tab': 'page', t: 'Page' }),
    el('button', { c: 'nova-tbtn', 'data-tab': 'settings', t: 'Settings' }),
  ]);

  // Reactive state management tracking keys and assignments independently
  var st = {
    ac: 0,
    ms: 100,
    acKey: 'Backquote', // AutoClicker operational execution toggle keybind
    acHideKey: 'Digit3',   // Toggle visibility on AutoClicker macro options screen
    hubKey: 'Digit1',      // Toggle framework main control dashboard visibility
    aiKey: 'Digit2',       // Interactive dynamic panel chatbot assistant toggle keybind
    currentRecording: null, // Tracks which functional element is binding a key
    id: 0,
    x: 0,
    y: 0,
    st: 0,
    rid: 0,
    pid: 0,
    hid: 0,
    tid: 0,
    sid: 0,
    cid: 0,
    groqKey: '',
  };

  // ----- Saved settings (localStorage of the site Nova runs on) -----
  var SETKEY = 'novascriptin:settings';
  var KEY_NAMES = ['acKey', 'acHideKey', 'hubKey', 'aiKey'];
  var XS_K = ['color', 'style', 'size', 'thick', 'gap', 'op', 'outline'];
  var CC_K = ['style', 'color', 'size', 'op', 'smooth', 'press', 'hide', 'emoji'];
  var TS_K = ['text', 'speed', 'rate', 'notice', 'fix', 'enter'];
  var savedSet = (function () {
    try { return JSON.parse(window.localStorage.getItem(SETKEY)) || {}; } catch (e) { return {}; }
  })();
  var mergeSaved = function (target, src, keys) {
    if (!src || typeof src !== 'object') return;
    keys.forEach(function (k) { if (typeof src[k] === typeof target[k]) target[k] = src[k]; });
  };
  var pickKeys = function (src, keys) {
    var o = {};
    keys.forEach(function (k) { o[k] = src[k]; });
    return o;
  };
  if (savedSet.keys) KEY_NAMES.forEach(function (k) { if (typeof savedSet.keys[k] === 'string') st[k] = savedSet.keys[k]; });
  var saveT = 0;
  var saveNow = function () {
    clearTimeout(saveT);
    try {
      window.localStorage.setItem(SETKEY, JSON.stringify({
        keys: pickKeys(st, KEY_NAMES),
        dark: !!$('tg-dark').checked,
        tb: !!$('tg-tb').checked,
        xs: pickKeys(xs, XS_K),
        cc: pickKeys(cc, CC_K),
        ts: pickKeys(ts, TS_K),
        tog: {
          st: !!$('tg-st').checked,
          clk: !!$('tg-clk').checked,
          note: !!$('tg-note').checked,
          cur: !!$('tg-cur').checked
        },
        noteText: noteTa.value
      }));
    } catch (e) {}
  };
  var saveSettings = function () {
    clearTimeout(saveT);
    saveT = setTimeout(saveNow, 300);
  };

  // Readable names for stored key codes / mouse buttons
  var bindLabel = function (b) {
    if (!b) return 'DISABLED';
    var m = { ShiftLeft: 'LShift', ShiftRight: 'RShift', ControlLeft: 'LCtrl', ControlRight: 'RCtrl', AltLeft: 'LAlt', AltRight: 'RAlt', MetaLeft: 'LMeta', MetaRight: 'RMeta', Backquote: '`', Minus: '-', Equal: '=', BracketLeft: '[', BracketRight: ']', Backslash: '\\', Semicolon: ';', Quote: "'", Comma: ',', Period: '.', Slash: '/', Mouse1: 'Mouse Middle', Mouse2: 'Mouse Right', Mouse3: 'Mouse Back', Mouse4: 'Mouse Forward' };
    if (m[b]) return m[b];
    var k = /^Key([A-Z])$/.exec(b) || /^Digit(\d)$/.exec(b);
    if (k) return k[1];
    var n = /^Numpad(.+)$/.exec(b);
    if (n) return 'Num ' + n[1];
    return b;
  };

  // Keybind buttons (shown in each script's settings popup)
  var btnAcKey = el('button', { c: 'nova-kbtn', t: bindLabel(st.acKey) });
  var btnAcHideKey = el('button', { c: 'nova-kbtn', t: bindLabel(st.acHideKey) });
  var btnHubKey = el('button', { c: 'nova-kbtn', t: bindLabel(st.hubKey) });
  var btnAiKey = el('button', { c: 'nova-kbtn', t: bindLabel(st.aiKey) });

  var sTab = el('div', { id: 'tab-scripts', c: 'nova-sec active' }, [
    card('AutoClicker', 'Toggle overlay dashboard panel', 'tg-ac', 'ac-lbl'),
    card('Stats Overlay', 'Draggable FPS & Google Ping | Saved on this site', 'tg-st'),
    card('Groq Chatbot', 'AI Companion Overlay Panel', 'tg-ai'),
    card('Auto Scroller', 'Scrolls the page down for you (speed below)', 'tg-scroll', '', [
      el('input', { type: 'range', id: 'rg-scroll', c: 'nova-rng', min: '1', max: '30', value: '3' }),
    ]),
    card('Clock', 'Draggable live clock overlay | Saved on this site', 'tg-clk'),
    card('Scratchpad', 'Draggable notepad overlay | Saved on this site', 'tg-note'),
    card('Crosshair', 'Screen-center crosshair | Right-click switch for settings', 'tg-xh'),
    card('Fake Typer', 'Types text with human mistakes | Right-click switch for settings', 'tg-ty'),
    card('Custom Cursor', 'Replace your mouse cursor (computer only) | Right-click switch for settings | Saved on this site', 'tg-cur'),
    card('Timer', 'Countdown that beeps when done | Saved on this site', 'tg-tmr', 'tmr-lbl'),
    card('Screen Time', 'Tracks time spent on this site | Saved on this site', 'tg-scr', 'scr-lbl', [
      el('button', { id: 'btn-scrreset', c: 'nova-kbtn', t: 'Reset screen time' }),
    ]),
  ]);

  var pTab = el('div', { id: 'tab-page', c: 'nova-sec' }, [
    card('Edit Page', 'Click text on site to edit', 'tg-edit'),
    card('Smart Dark Mode', 'Only recolors elements that actually have a background', 'tg-fdark'),
    card('Reverse Contrast', 'Invert page colors', 'tg-inv'),
    card('Ad Blocker', 'Hides ads, blocks ad requests, skips YouTube ads', 'tg-ab', 'ab-lbl'),
    card('Block Popups', 'Stops pages opening new windows/tabs', 'tg-pop'),
    card('Unlock Copy & Right-Click', 'Re-enables selecting, copying, pasting, context menu', 'tg-unl'),
    card('Show Passwords', 'Reveal password fields as plain text', 'tg-pw'),
    card('Remove Elements', 'Tap/click anything to delete it (page is locked while on, scrolling still works)', 'tg-rm', '', [
      el('button', { id: 'btn-rmundo', c: 'nova-kbtn', t: 'Undo last remove' }),
    ]),
    card('Highlight Links', 'Outline every link on the page', 'tg-hl'),
    card('Page Zoom', 'Zoom the page content (slider below)', 'tg-zoom', '', [
      el('input', { type: 'range', id: 'rg-zoom', c: 'nova-rng', min: '50', max: '200', value: '100' }),
    ]),
    card('Custom CSS', 'Inject your own CSS into the page', 'tg-css', '', [
      el('textarea', { id: 'ta-css', c: 'nova-ta', rows: 4, placeholder: 'body { font-family: monospace; }' }),
    ]),
  ]);

  var stTab = el('div', { id: 'tab-settings', c: 'nova-sec' }, [
    card('Dark Mode', 'Switch neumorphic theme', 'tg-dark'),
    card('Transparent Buttons', 'Floating buttons are see-through (on) or solid (off)', 'tg-tb'),
  ]);

  var bodyWrap = el('div', { c: 'nova-body' }, [sTab, pTab, stTab]);
  var res = el('div', { id: 'nova-res' });
  var hub = el(
    'div',
    { id: 'novascriptin-hub', c: 'nova-box dark' },
    [hdr, el('div', { c: 'nova-main' }, [tabs, bodyWrap]), res]
  );
  shadow.appendChild(hub);

  // AutoClicker Panel Setup
  var acStatE = el('span', {
      id: 'ac-stat',
      style: 'font-size:11px;color:#e53e3e;font-weight:800',
      t: 'OFF',
    }),
    acHdr = el('div', { c: 'nova-hdr' }, [
      el('span', { c: 'nova-ttl', style: 'font-size:14.5px', t: 'AutoClicker' }),
      acStatE,
    ]);

  var acBody = el('div', { c: 'nova-grid' }, [
    el('div', { c: 'nova-col' }, [
      el('label', { t: 'Interval (ms)' }),
      el('input', { type: 'number', id: 'in-ms', c: 'nova-in', value: '100', min: '10' }),
    ])
  ]);

  var acOvl = el('div', { id: 'nova-ac-ovl', c: 'nova-box dark' }, [
    acHdr,
    acBody,
    el('p', { style: 'margin:10px 0 0;font-size:11px;color:var(--sub)', t: "Note: doesn't work inside iframes from other sites." }),
  ]);
  shadow.appendChild(acOvl);

  // Performance Elements Setup
  var fpsE = el('span', { id: 'n-fps', t: 'FPS: --' }),
    pngE = el('span', { id: 'n-ping', t: 'Ping: -- ms' }),
    ovl = el('div', { id: 'nova-ovl', c: 'nova-box dark' }, [
      fpsE,
      el('span', { t: '|' }),
      pngE,
    ]);
  shadow.appendChild(ovl);

  // Chatbot Assistant Layout Setup
  var aiHdr = el('div', { c: 'nova-hdr' }, [el('span', { c: 'nova-ttl', style: 'font-size:14.5px', t: 'Groq Chatbot' })]);
  var aiModelSelect = el('select', { id: 'sel-ai-model', c: 'nova-select' }, [el('option', { value: 'loading', t: 'Fetching models...' })]);
  var aiChatArea = el('div', { c: 'ai-chat-area' });
  var aiInput = el('input', { type: 'text', c: 'nova-in', placeholder: 'Ask AI...' });
  var aiSendBtn = el('button', { c: 'nova-kbtn', style: 'width:65px', t: 'Send' });
  var aiControls = el('div', { c: 'ai-controls' }, [aiModelSelect]);
  var aiInputWrap = el('div', { c: 'ai-input-wrap' }, [aiInput, aiSendBtn]);
  var aiOvl = el('div', { id: 'nova-ai-ovl', c: 'nova-box dark' }, [aiHdr, aiControls, aiChatArea, aiInputWrap]);
  shadow.appendChild(aiOvl);

  // Clock / Scratchpad / Crosshair overlays
  var clk = el('div', { id: 'nova-clk', c: 'nova-box dark', t: '--:--:--' });
  shadow.appendChild(clk);

  var noteHdr = el('div', { c: 'nova-hdr' }, [el('span', { c: 'nova-ttl', style: 'font-size:14.5px', t: 'Scratchpad' })]);
  var noteTa = el('textarea', { c: 'nova-ta', placeholder: 'Type notes here...' });
  var noteOvl = el('div', { id: 'nova-note', c: 'nova-box dark' }, [noteHdr, noteTa]);
  shadow.appendChild(noteOvl);

  var xh = el('div', { id: 'nova-xh' });
  shadow.appendChild(xh);

  // Query helper inside Shadow DOM
  var $ = function (id) {
    return shadow.getElementById(id);
  };

  $('tg-dark').checked = true;
  $('tg-tb').checked = true;
  if (savedSet.tb === false) $('tg-tb').checked = false;

  setTimeout(function () {
    ldr.style.opacity = '0';
    hub.style.display = 'flex';
    hub.style.left = Math.max(10, (window.innerWidth - hub.offsetWidth) / 2) + 'px';
    hub.style.top = Math.max(10, (window.innerHeight - hub.offsetHeight) / 2) + 'px';
    setTimeout(function () {
      ldr.remove();
    }, 400);
  }, 750);

  // Every permanent document/window listener goes through gOn so destroying the UI can remove them all
  var destroyed = 0;
  var globalL = [];
  var gOn = function (t, type, fn, o) {
    t.addEventListener(type, fn, o);
    globalL.push([t, type, fn, o]);
  };

  var isTouch = !!(window.matchMedia && window.matchMedia('(pointer:coarse)').matches);
  var tgt = null, acFab = null, syncFabs = null, syncHubGhost = null;

  gOn(document, 'mousemove', function (e) {
    st.x = e.clientX;
    st.y = e.clientY;
    if (e.target !== host) { st.px = e.clientX; st.py = e.clientY; }
  });

  var showToast = function (msg) {
    clearTimeout(st.tid);
    toast.textContent = msg;
    toast.style.opacity = '1';
    st.tid = setTimeout(function () {
      toast.style.opacity = '0';
    }, 3000);
  };

  // Helper handling active record updates on elements
  var setupKeybindButton = function(btn, stateKey, fallbackLabel) {
    btn.onclick = function(e) {
      e.stopPropagation();
      if (st.currentRecording === btn) {
        // Double click/press active slot to clear and completely disable the layout parameter
        st[stateKey] = '';
        btn.textContent = 'DISABLED';
        btn.classList.remove('recording');
        st.currentRecording = null;
        showToast(fallbackLabel + ' keybind unassigned and completely disabled.');
        upd();
        saveSettings();
        return;
      }
      if (st.currentRecording) {
        st.currentRecording.classList.remove('recording');
      }
      st.currentRecording = btn;
      btn.classList.add('recording');
      btn.textContent = 'PRESS KEY / MOUSE';
      showToast('Press any key (LShift, RShift too) or a mouse button (middle, right, back, forward). Click the button again to disable.');
    };
  };

  setupKeybindButton(btnAcKey, 'acKey', 'AutoClicker');
  setupKeybindButton(btnAcHideKey, 'acHideKey', 'AutoClicker Panel');
  setupKeybindButton(btnHubKey, 'hubKey', 'Hub Window');
  setupKeybindButton(btnAiKey, 'aiKey', 'Chatbot Panel');

  var rz = 0, rx = 0, ry = 0, rw = 0, rh = 0;
  res.onpointerdown = function (e) {
    e.preventDefault();
    e.stopPropagation();
    rz = 1;
    rx = e.clientX;
    ry = e.clientY;
    rw = hub.offsetWidth;
    rh = hub.offsetHeight;
    hub.style.transition = 'none';
  };
  gOn(document, 'pointermove', function (e) {
    if (rz) {
      var hl = parseFloat(hub.style.left) || 0, ht = parseFloat(hub.style.top) || 0;
      hub.style.width = Math.max(340, Math.min(window.innerWidth - hl, rw + (e.clientX - rx))) + 'px';
      hub.style.height = Math.max(260, Math.min(window.innerHeight - ht, rh + (e.clientY - ry))) + 'px';
    }
  });
  gOn(document, 'pointerup', function () {
    if (rz) {
      rz = 0;
      hub.style.transition = '';
    }
  });

  var dragBoxes = [];
  var clampBox = function (box) {
    if (!box.style.left || box.offsetWidth === 0) return;
    var l = parseFloat(box.style.left) || 0, t = parseFloat(box.style.top) || 0;
    box.style.left = Math.max(0, Math.min(window.innerWidth - box.offsetWidth, l)) + 'px';
    box.style.top = Math.max(0, Math.min(window.innerHeight - box.offsetHeight, t)) + 'px';
  };
  var onResize = function () { dragBoxes.forEach(clampBox); };
  gOn(window, 'resize', onResize);

  var drag = function (box, h) {
    var d = 0, ox = 0, oy = 0;
    dragBoxes.push(box);
    h.onpointerdown = function (e) {
      if (e.target.closest('button,input,select,textarea,#nova-res,.ai-chat-area')) return;
      d = 1;
      var r = box.getBoundingClientRect();
      box.style.transition = 'none';
      box.style.right = 'auto';
      box.style.bottom = 'auto';
      box.style.left = r.left + 'px';
      box.style.top = r.top + 'px';
      ox = e.clientX - r.left;
      oy = e.clientY - r.top;
    };
    gOn(document, 'pointermove', function (e) {
      if (d) {
        // keep the whole box on screen
        box.style.left = Math.max(0, Math.min(window.innerWidth - box.offsetWidth, e.clientX - ox)) + 'px';
        box.style.top = Math.max(0, Math.min(window.innerHeight - box.offsetHeight, e.clientY - oy)) + 'px';
      }
    });
    gOn(document, 'pointerup', function () {
      if (d) {
        d = 0;
        box.style.transition = '';
      }
    });
  };
  drag(hub, hdr);
  drag(ovl, ovl);
  drag(acOvl, acHdr);
  drag(aiOvl, aiHdr);
  drag(clk, clk);
  drag(noteOvl, noteHdr);

  hub.querySelectorAll('.nova-tbtn').forEach(function (b) {
    b.onclick = function () {
      hub.querySelectorAll('.nova-tbtn,.nova-sec').forEach(function (x) {
        x.classList.remove('active');
      });
      b.classList.add('active');
      $('tab-' + b.dataset.tab).classList.add('active');
    };
  });

  var tgAc = $('tg-ac'),
    inMs = $('in-ms'),
    lbl = $('ac-lbl');

  var upd = function () {
    lbl.textContent = 'Toggle overlay dashboard panel' + (isTouch ? ' | Drag the red target, tap CLICK' : ' | Key: ' + (st.acKey ? bindLabel(st.acKey) : 'NONE')) + ' | No iframe support';
    if (syncHubGhost) syncHubGhost();
  };
  upd();

  var stop = function () {
    clearInterval(st.id);
    st.id = 0;
  };

  var getDeepTargetData = function (x, y) {
    var currentDoc = document;
    var el = currentDoc.elementFromPoint(x, y);
    var targetWin = window;
    var cross = false;

    while (el && el.tagName === 'IFRAME') {
      var rect = el.getBoundingClientRect();
      var fsx = el.offsetWidth ? rect.width / el.offsetWidth : 1;
      var fsy = el.offsetHeight ? rect.height / el.offsetHeight : 1;
      var nx = (x - rect.left) / fsx - el.clientLeft;
      var ny = (y - rect.top) / fsy - el.clientTop;
      x = nx; // from here on x/y are relative to this iframe
      y = ny;

      var nextDoc = null, nextWin = null;
      try {
        nextDoc = el.contentDocument || el.contentWindow.document;
        nextWin = el.contentWindow;
      } catch (err) {
        nextDoc = null;
      }
      if (!nextDoc) { cross = true; break; } // other-site (or sandboxed) iframe: the browser hides its inside

      var innerEl = nextDoc.elementFromPoint(x, y);
      if (!innerEl || innerEl === el) break;

      el = innerEl;
      currentDoc = nextDoc;
      targetWin = nextWin;
    }
    return { element: el, doc: currentDoc, win: targetWin, cx: x, cy: y, frame: !!(el && el.tagName === 'IFRAME'), cross: cross };
  };

  // Other-site iframes can't be clicked into (browser security), so just say so
  var warnFrame = function () {
    var now = Date.now();
    if (now - (st.frameWarn || 0) < 6000) return;
    st.frameWarn = now;
    showToast("AutoClicker doesn't work inside iframes from other sites (browser limit).");
  };

  var start = function () {
    stop();
    st.id = setInterval(function () {
      var px = st.x, py = st.y;
      if (isTouch && tgt) {
        var tr = tgt.getBoundingClientRect();
        px = tr.left + tr.width / 2;
        py = tr.top + tr.height / 2;
        tgt.style.pointerEvents = 'none'; // so elementFromPoint sees the page under it
      }
      var rootEl = document.elementFromPoint(px, py);
      var blocked = rootEl === host || (rootEl && host.contains(rootEl));
      var data = blocked ? null : getDeepTargetData(px, py);
      if (isTouch && tgt) tgt.style.pointerEvents = 'auto';
      if (blocked) return;

      if (data && data.cross) {
        warnFrame();
        return;
      }
      if (data && data.element) {
        try {
          var evtProps = {
            bubbles: true,
            cancelable: true,
            view: data.win,
            clientX: data.cx,
            clientY: data.cy,
          };

          var mDown = new data.win.MouseEvent('mousedown', evtProps);
          var mUp = new data.win.MouseEvent('mouseup', evtProps);
          var clickEvt = new data.win.MouseEvent('click', evtProps);

          if (isTouch && data.win.PointerEvent) {
            data.element.dispatchEvent(new data.win.PointerEvent('pointerdown', evtProps));
            data.element.dispatchEvent(new data.win.PointerEvent('pointerup', evtProps));
          }
          data.element.dispatchEvent(mDown);
          data.element.dispatchEvent(mUp);
          data.element.dispatchEvent(clickEvt);

          if (typeof data.element.click === 'function') {
            data.element.click();
          }
        } catch (e) {
          data.element.click();
        }
      }
    }, st.ms);
  };

  var setAc = function (v) {
    if (destroyed && v) return;
    st.ac = v;
    acStatE.textContent = v ? 'ON' : 'OFF';
    acStatE.style.color = v ? '#48bb78' : '#e53e3e';
    if (acFab) acFab.classList.toggle('on', !!v);
    if (v) start();
    else stop();
  };

  tgAc.onchange = function (e) {
    acOvl.style.display = e.target.checked ? 'block' : 'none';
    if (!e.target.checked && st.ac) {
      setAc(0);
    }
  };
  inMs.onchange = function (e) {
    st.ms = Math.max(10, parseInt(e.target.value, 10) || 100);
    e.target.value = st.ms;
    if (st.ac) start();
  };

  $('nova-min').onclick = function () {
    hub.style.display = 'none';
    if (isTouch) {
      showToast('Tap the HUB button to reopen');
    } else if (st.hubKey) {
      showToast('Press ' + bindLabel(st.hubKey) + ' to unhide display dashboard');
    } else {
      showToast('Click the hub button to reopen');
    }
  };

  var appendAiMsg = function (text, type) {
    var m = el('div', { c: 'ai-msg ' + type, t: text });
    aiChatArea.appendChild(m);
    aiChatArea.scrollTop = aiChatArea.scrollHeight;
  };

  var populateModelsDropdown = function (modelsList) {
    aiModelSelect.innerHTML = '';
    var textModels = [];

    if (modelsList && modelsList.length > 0) {
      modelsList.forEach(function (model) {
        if (model.id) {
          var id = model.id.toLowerCase();
          // Precise Text Filter: pruning out speech-to-text, text-to-speech, audio or image models
          if (id.indexOf('whisper') === -1 &&
              id.indexOf('audio') === -1 &&
              id.indexOf('vision') === -1 &&
              id.indexOf('orpheus') === -1 &&
              id.indexOf('guard') === -1) {
            textModels.push(model.id);
          }
        }
      });
    }

    if (textModels.length === 0) {
      textModels.push('llama-3.3-70b-versatile');
    }

    textModels.forEach(function (modelId) {
      aiModelSelect.appendChild(el('option', { value: modelId, t: modelId }));
    });
  };

  var fetchGroqModelsList = function () {
    fetch('https://api.groq.com/openai/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + st.groqKey,
        'Content-Type': 'application/json'
      }
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data && data.data) {
        populateModelsDropdown(data.data);
      } else {
        populateModelsDropdown([]);
      }
    })
    .catch(function () {
      populateModelsDropdown([]);
    });
  };

  var fetchGroqToken = function () {
    appendAiMsg('Fetching token from NovaGG...', 'system');
    fetch('https://starlightgg.github.io/NovaGG.github.io/txt/token.txt', { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (raw) {
        // Split by newline, strip whitespace, and keep only valid-length lines
        var validLines = raw
          .split(/[\r\n]+/)
          .map(function (line) { return line.replace(/\s+/g, ''); })
          .filter(function (entry) { return entry.length > 10; });

        if (validLines.length === 0) {
          throw new Error('No valid token lines found');
        }

        // Pick a random line from the valid entries
        var randomIndex = Math.floor(Math.random() * validLines.length);
        var chosenLine = validLines[randomIndex];

        var decoded = atob(chosenLine);
        st.groqKey = 'gsk_' + decoded;
        appendAiMsg('Groq token successfully decoded! (Key ' + (randomIndex + 1) + ' of ' + validLines.length + ')', 'system');
        fetchGroqModelsList();
      })
      .catch(function () {
        appendAiMsg('Error downloading or decoding token via server requests.', 'system');
      });
  };


  $('tg-ai').onchange = function (e) {
    if (e.target.checked) {
      aiOvl.style.display = 'flex';
      if (!st.groqKey) {
        fetchGroqToken();
      }
    } else {
      aiOvl.style.display = 'none';
    }
  };

  var handleAiSend = function () {
    var query = aiInput.value.trim();
    if (!query) return;
    aiInput.value = '';

    appendAiMsg(query, 'user');

    if (!st.groqKey) {
      appendAiMsg('API Token error. Retrying load assignment...', 'system');
      fetchGroqToken();
      return;
    }

    var chosenModel = aiModelSelect.value;
    if (chosenModel === 'loading') {
      chosenModel = 'llama-3.3-70b-versatile';
    }

    appendAiMsg('Thinking...', 'bot');
    var trackingBotMsg = aiChatArea.lastChild;

    fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + st.groqKey
      },
      body: JSON.stringify({
        model: chosenModel,
        messages: [{ role: 'user', content: query }],
        temperature: 0.7
      })
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.choices && data.choices[0] && data.choices[0].message) {
        trackingBotMsg.textContent = data.choices[0].message.content;
      } else if (data.error && data.error.message) {
        trackingBotMsg.textContent = 'Groq Error: ' + data.error.message;
      } else {
        trackingBotMsg.textContent = 'Malformed response pattern. Try checking key constraints.';
      }
      aiChatArea.scrollTop = aiChatArea.scrollHeight;
    })
    .catch(function () {
      trackingBotMsg.textContent = 'Network execution failure while connecting to Groq client.';
    });
  };

  aiSendBtn.onclick = handleAiSend;
  aiInput.onkeydown = function (e) {
    if (e.key === 'Enter') {
      e.stopPropagation();
      handleAiSend();
    }
  };

  var KEYS = [
    { k: 'acKey', btn: btnAcKey, label: 'AutoClicker' },
    { k: 'acHideKey', btn: btnAcHideKey, label: 'AutoClicker panel' },
    { k: 'hubKey', btn: btnHubKey, label: 'Hub window' },
    { k: 'aiKey', btn: btnAiKey, label: 'Chatbot panel' },
  ];

  // Called when a key / mouse button is pressed while a keybind button is waiting
  var setBinding = function (code) {
    var rec = st.currentRecording;
    var item = KEYS.filter(function (i) { return i.btn === rec; })[0];
    if (!item) return;
    for (var i = 0; i < KEYS.length; i++) {
      if (KEYS[i] !== item && st[KEYS[i].k] === code) {
        showToast('Key conflict! That button is currently bound elsewhere.');
        return;
      }
    }
    st[item.k] = code;
    item.btn.textContent = bindLabel(code);
    rec.classList.remove('recording');
    st.currentRecording = null;
    if (item.k === 'acKey') upd();
    if (item.k === 'hubKey' && syncHubGhost) syncHubGhost();
    showToast('Successfully bound action to ' + bindLabel(code));
    saveSettings();
  };

  // Which keybind does this key code / mouse button belong to?
  var bindHit = function (code) {
    for (var i = 0; i < KEYS.length; i++) if (st[KEYS[i].k] && st[KEYS[i].k] === code) return KEYS[i].k;
    return null;
  };

  var fireBind = function (which) {
    if (which === 'acKey') {
      if (tgAc.checked) setAc(!st.ac);
      else showToast('Turn on AutoClicker in Scripts first.');
    } else if (which === 'acHideKey') {
      if (tgAc.checked) acOvl.style.display = acOvl.style.display === 'none' ? 'block' : 'none';
      else showToast('Turn on AutoClicker in Scripts first.');
    } else if (which === 'hubKey') {
      hub.style.display = hub.style.display === 'none' ? 'flex' : 'none';
    } else if (which === 'aiKey') {
      if ($('tg-ai').checked) aiOvl.style.display = aiOvl.style.display === 'none' ? 'flex' : 'none';
      else showToast('Enable the Groq Chatbot switch inside Scripts panel first.');
    }
  };

  var typingInPage = function () {
    var a = document.activeElement;
    return !!(a && (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.isContentEditable));
  };

  gOn(document, 'keydown', function (e) {
    if (destroyed) return;
    if (!e.isTrusted) return; // ignore fake typer's synthetic key events
    if (st.currentRecording) { // waiting to bind: uses the physical key (so LShift / RShift are different)
      e.preventDefault();
      e.stopPropagation();
      setBinding(e.code);
      return;
    }
    if (shadow.activeElement && (shadow.activeElement.tagName === 'INPUT' || shadow.activeElement.tagName === 'SELECT' || shadow.activeElement.tagName === 'TEXTAREA')) return;
    if (e.repeat || typingInPage() || document.body.contentEditable === 'true') return;
    var which = bindHit(e.code);
    if (which) fireBind(which);
  });

  // Mouse buttons (middle / right / back / forward; left click can't be bound)
  gOn(document, 'mousedown', function (e) {
    if (destroyed || !e.isTrusted) return;
    if (st.currentRecording) {
      if (e.button === 0) return; // left click is for pressing the UI
      e.preventDefault();
      e.stopPropagation();
      st.ctxUntil = Date.now() + 600;
      setBinding('Mouse' + e.button);
      return;
    }
    if (e.button === 0 || e.target === host) return;
    var which = bindHit('Mouse' + e.button);
    if (which) {
      e.preventDefault();
      fireBind(which);
    }
  }, true);
  gOn(document, 'mouseup', function (e) {
    if (destroyed || !e.isTrusted || e.button === 0 || e.target === host) return;
    if (bindHit('Mouse' + e.button)) e.preventDefault(); // stops back/forward navigation
  }, true);
  gOn(document, 'contextmenu', function (e) {
    if (destroyed) return;
    if (st.currentRecording || Date.now() < (st.ctxUntil || 0) || (e.target !== host && bindHit('Mouse2'))) e.preventDefault();
  }, true);

  var fc = 0, lt = performance.now();
  var loop = function (n) {
    if (!st.st) return;
    fc++;
    if (n - lt >= 1000) {
      fpsE.textContent = 'FPS: ' + fc;
      fc = 0;
      lt = n;
    }
    st.rid = requestAnimationFrame(loop);
  };

  var ping = function() {
    if (!st.st) return;
    var t = performance.now();
    fetch('https://google.com', { mode: 'no-cors', cache: 'no-store' })
      .then(function () {
        pngE.textContent = 'Ping: ' + Math.round(performance.now() - t) + ' ms';
      })
      .catch(function () {
        pngE.textContent = 'Ping: Err';
      });
  };

  $('tg-st').onchange = function (e) {
    st.st = e.target.checked;
    if (st.st) {
      ovl.style.display = 'flex';
      fc = 0;
      lt = performance.now();
      st.rid = requestAnimationFrame(loop);
      ping();
      st.pid = setInterval(ping, 2000);
    } else {
      ovl.style.display = 'none';
      cancelAnimationFrame(st.rid);
      clearInterval(st.pid);
    }
  };

  $('tg-edit').onchange = function (e) {
    document.body.contentEditable = e.target.checked ? 'true' : 'false';
  };

  // ───────────────────────── Smart Dark Mode ─────────────────────────
  // Reads each element's real computed colors. Only elements that actually
  // have a visible light background get darkened; transparent ones are left
  // alone (they show whatever is behind them). Dark text gets lightened,
  // light borders get darkened. Elements with background images/gradients
  // are left untouched. Every change is saved so it can be fully undone.
  var dm = { on: 0, saved: new Map(), imgBg: new WeakMap(), obs: null };
  var DM_SKIP = { SCRIPT: 1, STYLE: 1, LINK: 1, META: 1, HEAD: 1, TITLE: 1, NOSCRIPT: 1, IMG: 1, VIDEO: 1, CANVAS: 1, PICTURE: 1, IFRAME: 1, SOURCE: 1, BR: 1 };

  var parseC = function (s) {
    var m = /rgba?\(([^)]+)\)/.exec(s || '');
    if (!m) return null;
    var p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
    if (p.length < 3 || p.some(isNaN)) return null;
    var a = p.length > 3 ? p[3] : 1;
    if (a > 1) a = a / 100;
    return { r: p[0], g: p[1], b: p[2], a: a };
  };
  var lum = function (c) {
    return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255;
  };
  var toHsl = function (c) {
    var r = c.r / 255, g = c.g / 255, b = c.b / 255;
    var mx = Math.max(r, g, b), mn = Math.min(r, g, b), h = 0, s = 0, l = (mx + mn) / 2, d = mx - mn;
    if (d) {
      s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h /= 6;
    }
    return { h: h, s: s, l: l };
  };
  var hueCh = function (p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  var fromHsl = function (h, s, l, a) {
    var r, g, b;
    if (!s) {
      r = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
      r = hueCh(p, q, h + 1 / 3);
      g = hueCh(p, q, h);
      b = hueCh(p, q, h - 1 / 3);
    }
    return 'rgba(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ',' + a + ')';
  };
  var dmBg = function (c) { var h = toHsl(c); return fromHsl(h.h, Math.min(h.s * 0.8, 0.6), 0.07 + (1 - h.l) * 0.2, c.a); };
  var dmTx = function (c) { var h = toHsl(c); return fromHsl(h.h, Math.min(h.s, 0.9), 0.62 + (1 - h.l) * 0.33, c.a); };
  var dmBd = function (c) { var h = toHsl(c); return fromHsl(h.h, h.s * 0.6, 0.16 + (1 - h.l) * 0.2, c.a); };

  var dmSkip = function (e) {
    return DM_SKIP[e.tagName] || e.namespaceURI !== 'http://www.w3.org/1999/xhtml' || e === host;
  };

  var dmCompute = function (e) {
    var cs = getComputedStyle(e), out = [];
    var par = e.parentElement;
    var img = cs.backgroundImage !== 'none' && /url|gradient/.test(cs.backgroundImage);
    var ib = img || (par && dm.imgBg.get(par)) || false;
    dm.imgBg.set(e, ib);

    var bg = parseC(cs.backgroundColor);
    if (!img && bg && bg.a > 0.05 && lum(bg) > 0.45) out.push(['background-color', dmBg(bg)]);

    if (!ib) {
      var tc = parseC(cs.color);
      if (tc && tc.a > 0.05 && lum(tc) < 0.55) out.push(['color', dmTx(tc)]);
    }

    var bw = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderRightWidth) + parseFloat(cs.borderBottomWidth) + parseFloat(cs.borderLeftWidth);
    if (bw > 0) {
      var bc = parseC(cs.borderTopColor);
      if (bc && bc.a > 0.05 && lum(bc) > 0.5) out.push(['border-color', dmBd(bc)]);
    }
    return out;
  };

  var dmApply = function (e, props) {
    var s = dm.saved.get(e);
    if (!s) { s = {}; dm.saved.set(e, s); }
    props.forEach(function (pv) {
      if (!(pv[0] in s)) s[pv[0]] = [e.style.getPropertyValue(pv[0]), e.style.getPropertyPriority(pv[0])];
      e.style.setProperty(pv[0], pv[1], 'important');
    });
  };

  var dmRevert = function (e) {
    var s = dm.saved.get(e);
    if (!s) return;
    Object.keys(s).forEach(function (p) {
      if (s[p][0]) e.style.setProperty(p, s[p][0], s[p][1]);
      else e.style.removeProperty(p);
    });
    dm.saved.delete(e);
  };

  // Process elements in small batches (reads first, then writes) so big pages don't freeze
  var dmRun = function (list) {
    var i = 0;
    (function step() {
      if (!dm.on) return;
      var end = Math.min(i + 250, list.length), jobs = [];
      for (; i < end; i++) {
        var e = list[i];
        if (!e.isConnected || dmSkip(e)) continue;
        var o = dmCompute(e);
        if (o.length) jobs.push([e, o]);
      }
      jobs.forEach(function (j) { dmApply(j[0], j[1]); });
      if (i < list.length) setTimeout(step, 0);
    })();
  };

  var dmStart = function () {
    dmStop();
    dm.on = 1;
    fdark.textContent = 'html{color-scheme:dark !important}';

    var html = document.documentElement, body = document.body;
    var hb = parseC(getComputedStyle(html).backgroundColor);
    var bb = parseC(getComputedStyle(body).backgroundColor);
    // Nothing paints a background at all -> give the canvas a dark one
    if ((!hb || hb.a < 0.05) && (!bb || bb.a < 0.05)) dmApply(html, [['background-color', '#121418']]);

    var list = [html, body].concat(Array.prototype.slice.call(body.querySelectorAll('*')));
    dmRun(list);

    dm.obs = new MutationObserver(function (ms) {
      var add = [];
      ms.forEach(function (m) {
        if (m.type === 'childList') {
          m.addedNodes.forEach(function (n) {
            if (n.nodeType === 1 && n !== host) {
              add.push(n);
              n.querySelectorAll('*').forEach(function (c) { add.push(c); });
            }
          });
        } else if (m.type === 'attributes') {
          dmRevert(m.target); // class changed: recompute from the element's new natural style
          add.push(m.target);
        }
      });
      if (add.length) dmRun(add);
    });
    dm.obs.observe(body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  };

  var dmStop = function () {
    dm.on = 0;
    if (dm.obs) { dm.obs.disconnect(); dm.obs = null; }
    Array.from(dm.saved.keys()).forEach(dmRevert);
    dm.imgBg = new WeakMap();
    fdark.textContent = '';
  };

  $('tg-fdark').onchange = function (e) {
    if (e.target.checked) dmStart();
    else dmStop();
  };

  $('tg-inv').onchange = function (e) {
    document.documentElement.classList.toggle('n-inv', e.target.checked);
  };

  // ───────────────────────── Extra page tools ─────────────────────────
  var feat = {};

  // Unlock Copy & Right-Click
  var unl = {
    ev: ['contextmenu', 'copy', 'cut', 'paste', 'selectstart', 'dragstart'],
    fn: function (e) { if (e.target === host) return; e.stopImmediatePropagation(); },
    style: null
  };
  feat.unl = function (on) {
    unl.ev.forEach(function (x) {
      document.removeEventListener(x, unl.fn, true);
      if (on) document.addEventListener(x, unl.fn, true);
    });
    if (unl.style) { unl.style.remove(); unl.style = null; }
    if (on) {
      unl.style = document.createElement('style');
      unl.style.textContent = '*{-webkit-user-select:text !important;user-select:text !important}';
      document.head.appendChild(unl.style);
    }
  };

  // Show Passwords
  var pw = { list: [], iv: 0 };
  var pwScan = function () {
    document.querySelectorAll('input[type="password"]').forEach(function (i) {
      pw.list.push(i);
      i.type = 'text';
    });
  };
  feat.pw = function (on) {
    clearInterval(pw.iv);
    if (on) {
      pwScan();
      pw.iv = setInterval(pwScan, 1500);
    } else {
      pw.list.forEach(function (i) { i.type = 'password'; });
      pw.list = [];
    }
  };

  // Remove Elements: a transparent overlay catches your taps, so it works on phones,
  // ignores the page's own touch handlers, and can hit iframes too.
  css.textContent +=
    '#nova-rmov{position:fixed;left:0;top:0;right:0;bottom:0;z-index:999980;display:none;pointer-events:auto;touch-action:pan-x pan-y;background:transparent}' +
    '#nova-rmbox{position:fixed;display:none;border:2px solid #e53e3e;background:rgba(229,62,62,.18);z-index:999981;pointer-events:none;box-sizing:border-box}' +
    '#nova-cur{position:fixed;left:0;top:0;width:0;height:0;z-index:1000005;pointer-events:none;display:none}';
  var rmOv = el('div', { id: 'nova-rmov' });
  var rmBox = el('div', { id: 'nova-rmbox' });
  shadow.appendChild(rmOv);
  shadow.appendChild(rmBox);
  var rm = { t: null, isDown: 0, x: 0, y: 0, stack: [] };
  rm.look = function (x, y) {
    rmOv.style.pointerEvents = 'none'; // look through the overlay
    var t = document.elementFromPoint(x, y);
    rmOv.style.pointerEvents = '';
    if (!t || t === host || host.contains(t) || t === document.body || t === document.documentElement) return null;
    return t;
  };
  rm.show = function (t) {
    rm.t = t;
    if (!t) { rmBox.style.display = 'none'; return; }
    var r = t.getBoundingClientRect();
    rmBox.style.display = 'block';
    rmBox.style.left = r.left + 'px';
    rmBox.style.top = r.top + 'px';
    rmBox.style.width = r.width + 'px';
    rmBox.style.height = r.height + 'px';
  };
  rmOv.onpointerdown = function (e) {
    rm.isDown = 1;
    rm.x = e.clientX;
    rm.y = e.clientY;
    rm.show(rm.look(e.clientX, e.clientY));
  };
  rmOv.onpointermove = function (e) {
    if (rm.isDown) {
      if (Math.abs(e.clientX - rm.x) + Math.abs(e.clientY - rm.y) > 12) { rm.isDown = 0; rm.show(null); } // scrolling, not a tap
      return;
    }
    if (e.pointerType === 'mouse') rm.show(rm.look(e.clientX, e.clientY)); // desktop hover highlight
  };
  rmOv.onpointerup = function () {
    if (!rm.isDown) return;
    rm.isDown = 0;
    var t = rm.t;
    rm.show(null);
    if (t && t.isConnected) {
      rm.stack.push({ n: t, p: t.parentNode, s: t.nextSibling });
      t.remove();
      showToast('Removed. Use "Undo last remove" in its card to bring it back.');
    }
  };
  rmOv.onpointercancel = function () { rm.isDown = 0; rm.show(null); };
  rm.undo = function () {
    var s = rm.stack.pop();
    if (!s) { showToast('Nothing to undo.'); return; }
    try { s.p.insertBefore(s.n, s.s && s.s.parentNode === s.p ? s.s : null); } catch (e) { try { s.p.appendChild(s.n); } catch (e2) {} }
    showToast('Restored.');
  };
  $('btn-rmundo').onclick = rm.undo;
  feat.rm = function (on) {
    rmOv.style.display = on ? 'block' : 'none';
    if (!on) { rm.isDown = 0; rm.show(null); }
  };

  // ───────────────────────── Ad Blocker ─────────────────────────
  var AD_DOM = ['doubleclick.net', 'googlesyndication.com', 'googleadservices.com', 'adservice.google.', 'amazon-adsystem.com', 'adnxs.com', 'taboola.com', 'outbrain.com', 'criteo.com', 'criteo.net', 'rubiconproject.com', 'pubmatic.com', 'openx.net', 'moatads.com', 'adsrvr.org', 'media.net', 'popads.net', 'popcash.net', 'propellerads.com', 'exoclick.com', 'juicyads.com', 'adsterra.com', 'revcontent.com', 'mgid.com', '2mdn.net', 'serving-sys.com', 'smartadserver.com', 'advertising.com', 'adform.net', 'casalemedia.com', 'bidswitch.net', 'yieldmo.com', 'adcolony.com', 'ads.pubmatic.com', 'zedo.com', 'adroll.com', 'quantserve.com', 'scorecardresearch.com', 'hotjar.com', 'trafficjunky.net', 'clickadu.com', 'hilltopads.net', 'onclickads.net', 'ad-maven.com', 'admaven.com', 'monetag.com', 'richpush.co', 'pushwoosh.com'];
  var AD_SEL = [
    'ins.adsbygoogle', '.adsbygoogle', '[id^="google_ads_"]', '[id^="div-gpt-ad"]', '[id^="gpt-ad"]', 'iframe[id^="google_ads_iframe"]',
    'iframe[src*="doubleclick.net"]', 'iframe[src*="googlesyndication.com"]', 'iframe[src*="adnxs.com"]', 'iframe[src*="amazon-adsystem.com"]',
    'iframe[src*="taboola.com"]', 'iframe[src*="outbrain.com"]', 'iframe[src*="criteo."]', 'iframe[src*="adsterra"]', 'iframe[src*="exoclick"]',
    'iframe[src*="popads"]', 'iframe[src*="mgid.com"]', 'iframe[src*="revcontent"]',
    'a[href*="doubleclick.net/"]', 'a[href*="googleadservices.com"]', 'a[href*="adsterra"]',
    '[data-ad-slot]', '[data-ad-client]', '[data-google-query-id]',
    '.ad-container', '.ad-banner', '.ad-slot', '.ad-wrapper', '.ad-box', '.ad-unit', '.ad-placeholder', '.ad_wrapper', '.advert', '.advertisement', '.advertising',
    '.banner-ad', '.top-ad', '.sidebar-ad', '.sticky-ad', '.adsbox', '[id*="advertisement"]', '[class*="advertisement"]', '[aria-label="Advertisement"]', '[aria-label="advertisement"]',
    '.taboola', '[id^="taboola-"]', '.trc_rbox_container', '.OUTBRAIN', '[id^="outbrain"]', '.ob-widget', '.mgid', '[id^="mgid"]', 'amp-ad', 'amp-embed'
  ].join(',');
  var ab = { blocked: 0, pops: 0, style: null, iv: 0, yiv: 0, undo: [] };
  var abLbl = $('ab-lbl');
  var abDefault = abLbl.textContent;
  var adHit = function (u) {
    try { u = String(u && u.url ? u.url : u); } catch (e) { return false; }
    for (var i = 0; i < AD_DOM.length; i++) if (u.indexOf(AD_DOM[i]) > -1) return true;
    return false;
  };
  var AD_LIST = AD_SEL.split(',');
  var isYT = /(^|\.)youtube\.com$/.test(location.hostname);
  var YT_LIST = ['#masthead-ad', '#player-ads', '.video-ads', '.ytp-ad-overlay-container', '.ytp-ad-image-overlay', '.ytp-ad-text-overlay',
    'ytd-ad-slot-renderer', 'ytd-in-feed-ad-layout-renderer', 'ytd-promoted-sparkles-web-renderer', 'ytd-promoted-video-renderer', 'ytd-display-ad-renderer',
    'ytd-banner-promo-renderer', 'ytd-statement-banner-renderer', 'ytd-companion-slot-renderer', 'ytd-player-legacy-desktop-watch-ads-renderer',
    'ytd-action-companion-ad-renderer', 'ytd-ads-engagement-panel-content-renderer', 'ytm-promoted-sparkles-web-renderer', 'ytm-promoted-video-renderer',
    'ytm-companion-ad-renderer', 'ytm-companion-slot', 'ytm-ad-slot-renderer'];
  var yt = { act: 0, muted: false, rate: 1, skipped: 0 };
  var abList = function () { return AD_LIST.concat(isYT ? YT_LIST : []); };

  var abStatus = function () {
    var n = 0;
    try { n = document.querySelectorAll(abList().join(',')).length; } catch (e) {}
    abLbl.textContent = 'ON' + (isYT ? ' (YouTube mode) | Video ads skipped: ' + yt.skipped : '') + ' | Hidden: ' + n + ' | Blocked requests: ' + ab.blocked + ' | Popups: ' + ab.pops;
  };

  var ytReset = function () {
    if (!yt.act) return;
    yt.act = 0;
    var v = document.querySelector('video');
    if (v) { try { v.muted = yt.muted; v.playbackRate = yt.rate; } catch (e) {} }
  };

  // YouTube: skip/close ad UI, fast-forward video ads, dismiss the "ad blockers" popup
  var ytTick = function () {
    try {
      var enf = document.querySelectorAll('ytd-enforcement-message-view-model');
      if (enf.length) {
        enf.forEach(function (n) { (n.closest('tp-yt-paper-dialog') || n).remove(); });
        var bd = document.querySelector('tp-yt-iron-overlay-backdrop');
        if (bd) bd.remove();
        var pv = document.querySelector('video');
        if (pv && pv.paused) pv.play();
      }
      var skip = document.querySelector('.ytp-skip-ad-button, .ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-ad-skip-button-container button');
      if (skip) skip.click();
      var cl = document.querySelector('.ytp-ad-overlay-close-button');
      if (cl) cl.click();

      var pl = document.querySelector('.html5-video-player.ad-showing, #movie_player.ad-showing');
      var v = document.querySelector('video.html5-main-video') || document.querySelector('video');
      if (pl && v) {
        if (!yt.act) { yt.act = 1; yt.muted = v.muted; yt.rate = v.playbackRate; yt.skipped++; }
        v.muted = true;
        v.playbackRate = 16;
        if (isFinite(v.duration) && v.duration > 0 && v.currentTime < v.duration - 0.2) v.currentTime = v.duration - 0.1;
      } else {
        ytReset();
      }
    } catch (e) {}
  };

  feat.ab = function (on) {
    // undo previous patches
    ab.undo.forEach(function (f) { try { f(); } catch (e) {} });
    ab.undo = [];
    clearInterval(ab.iv);
    clearInterval(ab.yiv);
    ab.iv = 0;
    ab.yiv = 0;
    if (ab.style) { ab.style.remove(); ab.style = null; }
    ytReset();
    abLbl.textContent = abDefault;
    if (!on) return;

    // instant feedback so the card text always changes
    abLbl.textContent = 'ON' + (isYT ? ' (YouTube mode)' : '') + ' | starting...';

    // 1) hide ad elements (one rule per selector so one bad selector can't break the rest)
    try {
      ab.style = document.createElement('style');
      ab.style.id = 'nova-adblock';
      ab.style.textContent = abList().map(function (s) { return s + '{display:none !important}'; }).join('');
      document.head.appendChild(ab.style);
    } catch (e) {}

    // 2) block requests to ad domains made after this point (skipped on YouTube: it detects this and its ads don't come from those domains anyway)
    if (!isYT) {
      try {
        var of = window.fetch;
        window.fetch = function (u) {
          if (adHit(u)) { ab.blocked++; return Promise.reject(new TypeError('Blocked by NovaScriptin')); }
          return of.apply(this, arguments);
        };
        ab.undo.push(function () { window.fetch = of; });
      } catch (e) {}

      try {
        var ox = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function (m, u) {
          if (adHit(u)) { ab.blocked++; arguments[1] = 'data:,'; }
          return ox.apply(this, arguments);
        };
        ab.undo.push(function () { XMLHttpRequest.prototype.open = ox; });
      } catch (e) {}

      [HTMLScriptElement.prototype, HTMLIFrameElement.prototype, HTMLImageElement.prototype].forEach(function (proto) {
        try {
          var d = Object.getOwnPropertyDescriptor(proto, 'src');
          if (!d || !d.set) return;
          Object.defineProperty(proto, 'src', {
            configurable: true,
            enumerable: d.enumerable,
            get: d.get,
            set: function (v) {
              if (adHit(v)) { ab.blocked++; return; }
              d.set.call(this, v);
            }
          });
          ab.undo.push(function () { Object.defineProperty(proto, 'src', d); });
        } catch (e) {}
      });

      try {
        var osa = Element.prototype.setAttribute;
        Element.prototype.setAttribute = function (n, v) {
          if (n === 'src' && /^(SCRIPT|IFRAME|IMG)$/.test(this.tagName) && adHit(v)) { ab.blocked++; return; }
          return osa.apply(this, arguments);
        };
        ab.undo.push(function () { Element.prototype.setAttribute = osa; });
      } catch (e) {}
    }

    abStatus();
    ab.iv = setInterval(abStatus, 1500);
    if (isYT) {
      ytTick();
      ab.yiv = setInterval(ytTick, 250);
    }
  };

  // Block Popups
  var oOpen = null;
  feat.pop = function (on) {
    if (oOpen) { window.open = oOpen; oOpen = null; }
    if (on) {
      oOpen = window.open;
      window.open = function () {
        ab.pops++;
        showToast('Blocked a popup');
        return null;
      };
    }
  };

  // Highlight Links
  var hlStyle = null;
  feat.hl = function (on) {
    if (hlStyle) { hlStyle.remove(); hlStyle = null; }
    if (on) {
      hlStyle = document.createElement('style');
      hlStyle.textContent = 'a{outline:2px dashed #f6ad55 !important;outline-offset:2px !important}';
      document.head.appendChild(hlStyle);
    }
  };

  // Page Zoom
  feat.zoom = function (on) {
    document.body.style.zoom = on ? $('rg-zoom').value / 100 : '';
  };

  // Custom CSS
  var ccss = null;
  feat.css = function (on) {
    if (ccss) { ccss.remove(); ccss = null; }
    if (on) {
      ccss = document.createElement('style');
      ccss.id = 'nova-custom-css';
      ccss.textContent = $('ta-css').value;
      document.head.appendChild(ccss);
    }
  };

  // Auto Scroller
  feat.scroll = function (on) {
    clearInterval(st.sid);
    st.sid = 0;
    if (on) {
      st.sid = setInterval(function () {
        window.scrollBy(0, parseInt($('rg-scroll').value, 10) || 3);
      }, 16);
    }
  };

  // Clock
  var tick = function () {
    clk.textContent = new Date().toLocaleTimeString();
  };
  feat.clk = function (on) {
    clearInterval(st.cid);
    st.cid = 0;
    clk.style.display = on ? 'block' : 'none';
    if (on) {
      tick();
      st.cid = setInterval(tick, 1000);
    }
  };

  // Scratchpad / Crosshair
  feat.note = function (on) { noteOvl.style.display = on ? 'flex' : 'none'; };
  // ───────────────────────── Crosshair (customizable) ─────────────────────────
  var xs = { color: '#48bb78', style: 'cross', size: 10, thick: 2, gap: 4, op: 100, outline: true };
  mergeSaved(xs, savedSet.xs, XS_K);

  var drawXh = function () {
      var s = xs.size, t = xs.thick, g = xs.gap, c = xs.color, stl = xs.style;
    
      xh.replaceChildren();
    
      var wrap = document.createElement('div');
      wrap.style.cssText = 'position:absolute;left:0;top:0;overflow:visible;opacity:' + (xs.op / 100) + ';';
      if (xs.outline) {
        wrap.style.filter = 'drop-shadow(0 0 1px #000) drop-shadow(0 0 1px #000)';
      }
    
      var addRect = function (x, y, w, h, rot) {
        var d = document.createElement('div');
        d.style.cssText = 'position:absolute;left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;background:' + c + ';box-sizing:content-box;';
        if (rot) d.style.transform = 'rotate(' + rot + 'deg)';
        wrap.appendChild(d);
      };
    
      if (stl === 'cross' || stl === 'crossdot' || stl === 'tshape') {
        addRect(-(g + s), -t / 2, s, t); // Left
        addRect(g, -t / 2, s, t);        // Right
        addRect(-t / 2, g, t, s);        // Bottom
        if (stl !== 'tshape') {
          addRect(-t / 2, -(g + s), t, s); // Top
        }
      }
    
      if (stl === 'x') {
        var dist = (g + s / 2) * 0.7071;
        addRect(dist - s / 2, dist - t / 2, s, t, 45);
        addRect(dist - s / 2, -dist - t / 2, s, t, -45);
        addRect(-dist - s / 2, dist - t / 2, s, t, -45);
        addRect(-dist - s / 2, -dist - t / 2, s, t, 45);
      }
    
      if (stl === 'circle' || stl === 'circledot') {
        var ring = document.createElement('div');
        ring.style.cssText = 'position:absolute;left:0;top:0;transform:translate(-50%,-50%);width:' + (s * 2) + 'px;height:' + (s * 2) + 'px;border:' + t + 'px solid ' + c + ';border-radius:50%;box-sizing:content-box;';
        wrap.appendChild(ring);
      }
    
      if (stl === 'dot' || stl === 'crossdot' || stl === 'circledot') {
        var dot = document.createElement('div');
        var d = (stl === 'dot' ? Math.max(s / 4, t) : Math.max(t, 1.5)) * 2;
        dot.style.cssText = 'position:absolute;left:0;top:0;transform:translate(-50%,-50%);width:' + d + 'px;height:' + d + 'px;background:' + c + ';border-radius:50%;box-sizing:content-box;';
        wrap.appendChild(dot);
      }
    
      xh.appendChild(wrap);
    };
  drawXh();

  feat.xh = function (on) {
    xh.style.display = on ? 'block' : 'none';
    if (on) drawXh();
  };

  // ───────────────────────── Fake Typer ─────────────────────────
  var ts = { text: 'Hello! This is a test of the fake typer.', speed: 120, rate: 6, notice: 2, fix: true, enter: false };
  mergeSaved(ts, savedSet.ts, TS_K);
  var ty = { run: 0, t: 0 };
  var lastEdit = null;

  var isEdit = function (n) {
    if (!n || n === host || n.nodeType !== 1) return false;
    if (n.tagName === 'TEXTAREA') return !n.disabled && !n.readOnly;
    if (n.tagName === 'INPUT') return /^(text|search|email|url|tel|password|number)?$/i.test(n.type) && !n.disabled && !n.readOnly;
    return !!n.isContentEditable;
  };
  var onFocusIn = function (e) { if (isEdit(e.target)) lastEdit = e.target; };
  document.addEventListener('focusin', onFocusIn, true);
  if (isEdit(document.activeElement)) lastEdit = document.activeElement;
  feat._focus = function () { document.removeEventListener('focusin', onFocusIn, true); };

  var KB = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  var near = function (ch) {
    var lo = ch.toLowerCase(), r = -1, c = -1;
    KB.forEach(function (row, i) { var k = row.indexOf(lo); if (k > -1) { r = i; c = k; } });
    if (r < 0) return ch;
    var cand = [];
    for (var dr = -1; dr <= 1; dr++)
      for (var dc = -1; dc <= 1; dc++) {
        if (!dr && !dc) continue;
        var row = KB[r + dr];
        if (row && row[c + dc]) cand.push(row[c + dc]);
      }
    var n = cand[Math.floor(Math.random() * cand.length)];
    return ch === lo ? n : n.toUpperCase();
  };

  ty.fire = function (t, type, key) {
    try { t.dispatchEvent(new KeyboardEvent(type, { key: key, bubbles: true, cancelable: true })); } catch (e) {}
  };
  ty.setVal = function (t, v) {
    var proto = t.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    var d = Object.getOwnPropertyDescriptor(proto, 'value');
    if (d && d.set) d.set.call(t, v); else t.value = v;
    t.dispatchEvent(new Event('input', { bubbles: true }));
  };
  ty.put = function (t, ch) {
    if (document.activeElement !== t) t.focus();
    ty.fire(t, 'keydown', ch);
    var ok = false;
    try { ok = document.execCommand('insertText', false, ch); } catch (e) {}
    if (!ok && 'value' in t) ty.setVal(t, t.value + ch);
    ty.fire(t, 'keyup', ch);
  };
  ty.back = function (t) {
    if (document.activeElement !== t) t.focus();
    ty.fire(t, 'keydown', 'Backspace');
    var ok = false;
    try { ok = document.execCommand('delete'); } catch (e) {}
    if (!ok && 'value' in t) ty.setVal(t, t.value.slice(0, -1));
    ty.fire(t, 'keyup', 'Backspace');
  };
  ty.enter = function (t) {
    if (t.tagName === 'TEXTAREA' || t.isContentEditable) { ty.put(t, '\n'); return; }
    ['keydown', 'keypress', 'keyup'].forEach(function (type) {
      try { t.dispatchEvent(new KeyboardEvent(type, { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true })); } catch (e) {}
    });
  };
  ty.stop = function () {
    clearTimeout(ty.t);
    ty.run = 0;
  };
  ty.finish = function (msg) {
    ty.stop();
    $('tg-ty').checked = false;
    if (msg) showToast(msg);
  };

  ty.start = function () {
    ty.stop();
    var t = isEdit(document.activeElement) ? document.activeElement : lastEdit;
    if (!t || !t.isConnected) {
      $('tg-ty').checked = false;
      showToast('Click a text field on the page first, then turn Fake Typer on.');
      return;
    }
    var text = ts.text;
    if (!text) { $('tg-ty').checked = false; showToast('Set some text first (right-click the switch).'); return; }

    t.focus();
    try {
      if (t.isContentEditable && !('value' in t)) {
        var sel = window.getSelection(), rg = document.createRange();
        rg.selectNodeContents(t);
        rg.collapse(false);
        sel.removeAllRanges();
        sel.addRange(rg);
      } else if ('value' in t) {
        t.setSelectionRange(t.value.length, t.value.length);
      }
    } catch (e) {}

    ty.run = 1;
    var i = 0, back = 0, rewind = 0, notice = 0, erasing = false, skip = false;
    var jitter = function (ms) { return Math.max(10, ms * (0.6 + Math.random() * 0.8)); };
    var next = function (ms) { ty.t = setTimeout(step, ms); };

    var step = function () {
      if (!ty.run) return;
      if (!t.isConnected) { ty.finish('Fake Typer: field disappeared.'); return; }

      // Erasing a mistake
      if (erasing) {
        if (back > 0) {
          ty.back(t);
          back--;
          next(jitter(ts.speed * 0.6));
        } else {
          i -= rewind;
          rewind = 0;
          erasing = false;
          skip = true;
          next(jitter(ts.speed * 2));
        }
        return;
      }

      // Reached the end
      if (i >= text.length) {
        if (back > 0) { erasing = true; next(jitter(ts.speed * 4)); return; }
        if (ts.enter) ty.enter(t);
        ty.finish('Fake Typer done.');
        return;
      }

      var ch = text[i];

      // Still typing before noticing the mistake
      if (back > 0) {
        ty.put(t, ch);
        i++; back++; rewind++; notice--;
        if (notice <= 0) { erasing = true; next(jitter(ts.speed * 3)); }
        else next(jitter(ts.speed));
        return;
      }

      // Roll for a new mistake
      if (!skip && ts.rate > 0 && /[a-z]/i.test(ch) && Math.random() * 100 < ts.rate) {
        var r = Math.random();
        var canSwap = i + 1 < text.length && /[a-z]/i.test(text[i + 1]) && text[i + 1] !== ch;
        var nb = 0, rw = 0;
        if (r < 0.65 || (r >= 0.85 && !canSwap)) {          // wrong neighbouring key
          ty.put(t, near(ch)); i++; nb = 1; rw = 1;
        } else if (r < 0.85) {                              // doubled letter
          ty.put(t, ch); ty.put(t, ch); i++; nb = 1; rw = 0;
        } else {                                            // swapped letters
          ty.put(t, text[i + 1]); ty.put(t, ch); i += 2; nb = 2; rw = 2;
        }
        if (ts.fix) {
          back = nb; rewind = rw;
          notice = Math.floor(Math.random() * (ts.notice + 1));
          if (notice <= 0) { erasing = true; next(jitter(ts.speed * 3)); }
          else next(jitter(ts.speed));
        } else {
          next(jitter(ts.speed));
        }
        return;
      }

      // Normal character
      ty.put(t, ch);
      i++;
      skip = false;
      var d = ts.speed;
      if (ch === ' ' || /[.,!?;:]/.test(ch)) d *= 1.5;
      if (Math.random() < 0.03) d += ts.speed * 4; // occasional human hesitation
      next(jitter(d));
    };

    next(250);
  };

  feat.ty = function (on) {
    if (on) ty.start();
    else ty.stop();
  };

  // ───────────────────────── Right-click settings popups ─────────────────────────
  var mkPop = function (title) {
    var x = el('button', { c: 'nova-cls', t: 'X' });
    var h = el('div', { c: 'nova-hdr' }, [el('span', { c: 'nova-ttl', style: 'font-size:14.5px', t: title }), x]);
    var body = el('div');
    var p = el('div', { c: 'nova-box nova-pop dark' }, [h, body]);
    x.onclick = function () { p.style.display = 'none'; };
    shadow.appendChild(p);
    drag(p, h);
    return { p: p, body: body };
  };
  var openPop = function (o, e) {
    var p = o.p;
    p.style.display = 'block';
    p.style.right = 'auto';
    p.style.bottom = 'auto';
    p.style.left = Math.max(10, Math.min(e.clientX + 12, window.innerWidth - p.offsetWidth - 10)) + 'px';
    p.style.top = Math.max(10, Math.min(e.clientY - 10, window.innerHeight - p.offsetHeight - 10)) + 'px';
  };
  var pSlider = function (name, min, max, val, unit, cb) {
    var l = el('label', { t: name + ': ' + val + unit });
    var i = el('input', { type: 'range', c: 'nova-rng', min: String(min), max: String(max), value: String(val) });
    i.oninput = function () {
      var v = +i.value;
      l.textContent = name + ': ' + v + unit;
      cb(v);
      saveSettings();
    };
    return el('div', { c: 'nova-col', style: 'margin-bottom:10px' }, [l, i]);
  };
  var pCheck = function (name, val, cb) {
    var i = el('input', { type: 'checkbox' });
    i.checked = val;
    i.onchange = function () { cb(i.checked); saveSettings(); };
    return el('label', { c: 'nova-chk' }, [i, el('span', { t: name })]);
  };
  var stopKeys = function (n) {
    n.onkeydown = function (e) { e.stopPropagation(); };
    n.onkeyup = function (e) { e.stopPropagation(); };
  };

  // Crosshair settings
  var xsPop = mkPop('Crosshair Settings');
  var xsColor = el('input', { type: 'color', c: 'nova-clr', value: xs.color });
  xsColor.oninput = function () { xs.color = xsColor.value; drawXh(); saveSettings(); };
  var xsStyle = el('select', { c: 'nova-select' }, [
    el('option', { value: 'cross', t: 'Cross' }),
    el('option', { value: 'crossdot', t: 'Cross + Dot' }),
    el('option', { value: 'tshape', t: 'T-Shape' }),
    el('option', { value: 'x', t: 'X' }),
    el('option', { value: 'dot', t: 'Dot' }),
    el('option', { value: 'circle', t: 'Circle' }),
    el('option', { value: 'circledot', t: 'Circle + Dot' }),
  ]);
  xsStyle.value = xs.style;
  xsStyle.onchange = function () { xs.style = xsStyle.value; drawXh(); saveSettings(); };
  [
    el('div', { c: 'nova-col', style: 'margin-bottom:10px' }, [el('label', { t: 'Color' }), xsColor]),
    el('div', { c: 'nova-col', style: 'margin-bottom:10px' }, [el('label', { t: 'Style' }), xsStyle]),
    pSlider('Size', 2, 40, xs.size, 'px', function (v) { xs.size = v; drawXh(); }),
    pSlider('Thickness', 1, 8, xs.thick, 'px', function (v) { xs.thick = v; drawXh(); }),
    pSlider('Gap', 0, 20, xs.gap, 'px', function (v) { xs.gap = v; drawXh(); }),
    pSlider('Opacity', 20, 100, xs.op, '%', function (v) { xs.op = v; drawXh(); }),
    pCheck('Dark outline', xs.outline, function (v) { xs.outline = v; drawXh(); }),
  ].forEach(function (n) { xsPop.body.appendChild(n); });

  // Fake typer settings
  var tsPop = mkPop('Fake Typer Settings');
  var tsText = el('textarea', { c: 'nova-ta', rows: 4, value: ts.text, placeholder: 'Text to type...' });
  tsText.oninput = function () { ts.text = tsText.value; saveSettings(); };
  stopKeys(tsText);
  [
    el('p', { c: 'nova-hint', t: 'Click a text field on the page, then switch Fake Typer on.' }),
    el('div', { c: 'nova-col', style: 'margin-bottom:10px' }, [el('label', { t: 'Text to type' }), tsText]),
    pSlider('Speed', 20, 400, ts.speed, ' ms/char', function (v) { ts.speed = v; }),
    pSlider('Mistakes', 0, 30, ts.rate, '%', function (v) { ts.rate = v; }),
    pSlider('Notice after up to', 0, 4, ts.notice, ' chars', function (v) { ts.notice = v; }),
    pCheck('Fix mistakes (backspace)', ts.fix, function (v) { ts.fix = v; }),
    pCheck('Press Enter when done', ts.enter, function (v) { ts.enter = v; }),
  ].forEach(function (n) { tsPop.body.appendChild(n); });

  // ───────────────────────── Custom Cursor (computer only) ─────────────────────────
  var cc = { style: 'ringdot', color: '#ffffff', size: 26, op: 100, smooth: 25, press: true, hide: true, emoji: '🎯', x: 0, y: 0, down: 0, raf: 0, on: 0 };
  mergeSaved(cc, savedSet.cc, CC_K);
  var curEl = el('div', { id: 'nova-cur' });
  shadow.appendChild(curEl);
  var curPageStyle = null, curShadowStyle = null;
  var escT = function (t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };

  var drawCur = function () {
      var s = cc.size, c = cc.color, stl = cc.style;
    
      curEl.replaceChildren();
    
      var wrap = document.createElement('div');
      wrap.style.cssText = 'position:absolute;left:0;top:0;overflow:visible;opacity:' + (cc.op / 100) + ';filter:drop-shadow(0 0 1px rgba(0,0,0,.6));';
    
      var addCircle = function (d, fill, stroke) {
        var el = document.createElement('div');
        el.style.cssText = 'position:absolute;left:0;top:0;transform:translate(-50%,-50%);width:' + d + 'px;height:' + d + 'px;border-radius:50%;box-sizing:content-box;' +
          (fill ? 'background:' + fill + ';' : '') +
          (stroke ? 'border:' + stroke + ';' : '');
        wrap.appendChild(el);
      };
    
      if (stl === 'dot') {
        addCircle(Math.max(3, s / 4) * 2, c, null);
      } else if (stl === 'ring' || stl === 'ringdot') {
        addCircle(s, null, '2px solid ' + c);
        if (stl === 'ringdot') {
          addCircle(5, c, null);
        }
      } else if (stl === 'cross') {
        var hLine = document.createElement('div');
        hLine.style.cssText = 'position:absolute;left:0;top:0;transform:translate(-50%,-50%);width:' + s + 'px;height:2px;background:' + c + ';';
        var vLine = document.createElement('div');
        vLine.style.cssText = 'position:absolute;left:0;top:0;transform:translate(-50%,-50%);width:2px;height:' + s + 'px;background:' + c + ';';
        wrap.appendChild(hLine);
        wrap.appendChild(vLine);
      } else if (stl === 'arrow') {
        var arrow = document.createElement('div');
        arrow.style.cssText = 'position:absolute;left:0;top:0;width:' + s + 'px;height:' + s + 'px;background:' + c + ';clip-path:polygon(0% 0%, 0% 85%, 20% 66%, 34% 100%, 50% 93%, 36% 60%, 64% 60%);';
        wrap.appendChild(arrow);
      } else if (stl === 'emoji') {
        var txt = document.createElement('div');
        txt.style.cssText = 'position:absolute;left:0;top:0;transform:translate(-50%,-50%);font-size:' + s + 'px;line-height:1;user-select:none;';
        txt.textContent = cc.emoji || '🎯';
        wrap.appendChild(txt);
      }
    
      curEl.appendChild(wrap);
    };
  drawCur();

  var curHide = function (hide) {
    if (curPageStyle) { curPageStyle.remove(); curPageStyle = null; }
    if (curShadowStyle) { curShadowStyle.remove(); curShadowStyle = null; }
    if (!hide) return;
    curPageStyle = document.createElement('style');
    curPageStyle.textContent = 'html,html *{cursor:none !important}';
    document.head.appendChild(curPageStyle);
    curShadowStyle = document.createElement('style');
    curShadowStyle.textContent = '*{cursor:none !important}';
    shadow.appendChild(curShadowStyle);
  };

  var curLoop = function () {
    if (!cc.on) return;
    var k = 1 - (cc.smooth / 100) * 0.92;
    cc.x += (st.x - cc.x) * k;
    cc.y += (st.y - cc.y) * k;
    curEl.style.transform = 'translate(' + cc.x + 'px,' + cc.y + 'px) scale(' + (cc.down && cc.press ? 0.7 : 1) + ')';
    cc.raf = requestAnimationFrame(curLoop);
  };
  cc.dn = function () { cc.down = 1; };
  cc.upf = function () { cc.down = 0; };
  cc.lv = function () { curEl.style.display = 'none'; };
  cc.en = function () { if (cc.on) curEl.style.display = 'block'; };

  feat.cur = function (on) {
    cc.on = 0;
    cancelAnimationFrame(cc.raf);
    document.removeEventListener('mousedown', cc.dn, true);
    document.removeEventListener('mouseup', cc.upf, true);
    document.documentElement.removeEventListener('mouseleave', cc.lv);
    document.documentElement.removeEventListener('mouseenter', cc.en);
    curHide(false);
    curEl.style.display = 'none';
    if (!on) return;
    if (isTouch) {
      $('tg-cur').checked = false;
      showToast('Custom Cursor only works on computer.');
      return;
    }
    cc.on = 1;
    cc.x = st.x;
    cc.y = st.y;
    drawCur();
    curEl.style.display = 'block';
    document.addEventListener('mousedown', cc.dn, true);
    document.addEventListener('mouseup', cc.upf, true);
    document.documentElement.addEventListener('mouseleave', cc.lv);
    document.documentElement.addEventListener('mouseenter', cc.en);
    curHide(cc.hide);
    curLoop();
  };

  var curPop = mkPop('Cursor Settings');
  var curColor = el('input', { type: 'color', c: 'nova-clr', value: cc.color });
  curColor.oninput = function () { cc.color = curColor.value; drawCur(); saveSettings(); };
  var curStyle = el('select', { c: 'nova-select' }, [
    el('option', { value: 'ringdot', t: 'Ring + Dot' }),
    el('option', { value: 'ring', t: 'Ring' }),
    el('option', { value: 'dot', t: 'Dot' }),
    el('option', { value: 'cross', t: 'Cross' }),
    el('option', { value: 'arrow', t: 'Arrow' }),
    el('option', { value: 'emoji', t: 'Emoji' }),
  ]);
  curStyle.value = cc.style;
  curStyle.onchange = function () { cc.style = curStyle.value; drawCur(); saveSettings(); };
  var curEmoji = el('input', { type: 'text', c: 'nova-in', value: cc.emoji, maxLength: 8, placeholder: 'Emoji / character' });
  curEmoji.oninput = function () { cc.emoji = curEmoji.value; drawCur(); saveSettings(); };
  stopKeys(curEmoji);
  [
    el('div', { c: 'nova-col', style: 'margin-bottom:10px' }, [el('label', { t: 'Style' }), curStyle]),
    el('div', { c: 'nova-col', style: 'margin-bottom:10px' }, [el('label', { t: 'Color' }), curColor]),
    el('div', { c: 'nova-col', style: 'margin-bottom:10px' }, [el('label', { t: 'Emoji (for Emoji style)' }), curEmoji]),
    pSlider('Size', 8, 64, cc.size, 'px', function (v) { cc.size = v; drawCur(); }),
    pSlider('Opacity', 20, 100, cc.op, '%', function (v) { cc.op = v; drawCur(); }),
    pSlider('Smoothing', 0, 90, cc.smooth, '%', function (v) { cc.smooth = v; }),
    pCheck('Shrink when clicking', cc.press, function (v) { cc.press = v; }),
    pCheck('Hide system cursor', cc.hide, function (v) { cc.hide = v; if (cc.on) curHide(v); }),
  ].forEach(function (n) { curPop.body.appendChild(n); });

  $('tg-cur').parentNode.oncontextmenu = function (e) {
    e.preventDefault();
    if (isTouch) { showToast('Custom Cursor only works on computer.'); return; }
    openPop(curPop, e);
  };

  // Right-click the switches to open settings
  $('tg-xh').parentNode.oncontextmenu = function (e) { e.preventDefault(); openPop(xsPop, e); };
  $('tg-ty').parentNode.oncontextmenu = function (e) { e.preventDefault(); openPop(tsPop, e); };

  // ───────────────────────── Destroy confirm, hub ghost button, Timer, Screen Time ─────────────────────────
  css.textContent +=
    '.nova-fab.ghost{background:transparent;box-shadow:none;border:1px dashed var(--sub);color:var(--sub);opacity:.4;transition:opacity .2s}.nova-fab.ghost:hover{opacity:1}' +
    '#nova-cfm{position:fixed;left:0;top:0;right:0;bottom:0;z-index:1000010;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.45);pointer-events:auto}' +
    '.nova-cfm-box{width:min(86vw,300px);padding:20px;border-radius:20px;box-shadow:8px 8px 16px var(--s1),-8px -8px 16px var(--s2);animation:nPop .25s ease forwards}' +
    '#nova-tmr{position:fixed;top:130px;left:20px;width:230px;padding:14px;border-radius:18px;box-shadow:7px 7px 14px var(--s1),-7px -7px 14px var(--s2);z-index:999999;display:none;animation:nPop .3s ease forwards}' +
    '.tmr-disp{font-family:monospace;font-size:30px;font-weight:800;text-align:center;margin:2px 0 12px}.tmr-row{display:flex;gap:6px;margin-bottom:10px}' +
    '#nova-scr{position:fixed;top:130px;right:20px;padding:10px 14px;border-radius:14px;box-shadow:6px 6px 12px var(--s1),-6px -6px 12px var(--s2);font-size:12px;font-weight:700;line-height:1.6;z-index:999998;display:none;cursor:grab;touch-action:none;animation:nPop .3s ease forwards}';

  // Confirm dialog
  var cfm = el('div', { id: 'nova-cfm' });
  var cfmTitle = el('div', { c: 'nova-ttl', style: 'margin-bottom:8px' });
  var cfmMsg = el('p', { style: 'margin:0 0 16px;font-size:12.5px;line-height:1.45;color:var(--sub)' });
  var cfmOk = el('button', { c: 'nova-kbtn', style: 'color:#e53e3e' });
  var cfmNo = el('button', { c: 'nova-kbtn', t: 'Cancel' });
  var cfmBox = el('div', { c: 'nova-box nova-cfm-box dark' }, [cfmTitle, cfmMsg, el('div', { style: 'display:flex;gap:10px' }, [cfmOk, cfmNo])]);
  cfm.appendChild(cfmBox);
  shadow.appendChild(cfm);
  var askConfirm = function (title, msg, okLabel, onOk) {
    cfmTitle.textContent = title;
    cfmMsg.textContent = msg;
    cfmOk.textContent = okLabel;
    cfm.style.display = 'flex';
    cfmOk.onclick = function () { cfm.style.display = 'none'; onOk(); };
    cfmNo.onclick = function () { cfm.style.display = 'none'; };
  };
  cfm.onclick = function (e) { if (e.target === cfm) cfm.style.display = 'none'; };

  // Transparent buttons toggle (Settings tab)
  var fabList = [];
  var tbOn = function () { var t = $('tg-tb'); return !t || t.checked; };
  var applyGhost = function () {
    var g = tbOn();
    fabList.forEach(function (b) { b.classList.toggle('ghost', g); });
  };
  $('tg-tb').addEventListener('change', applyGhost);
  $('tg-tb').addEventListener('change', saveSettings);

  // Floating button: drag to move, tap to trigger (used on touch devices, and for the hub ghost button on desktop)
  var mkFab = function (label, top, onTap) {
    var b = el('div', { c: 'nova-box nova-fab dark', t: label });
    b.style.left = Math.max(0, window.innerWidth - 60) + 'px';
    b.style.top = top + 'px';
    shadow.appendChild(b);
    dragBoxes.push(b);
    fabList.push(b);
    b.classList.toggle('ghost', tbOn());
    var sx = 0, sy = 0, mv = 0, dn = 0, ox = 0, oy = 0;
    b.onpointerdown = function (e) {
      dn = 1; mv = 0; sx = e.clientX; sy = e.clientY;
      var r = b.getBoundingClientRect();
      ox = e.clientX - r.left;
      oy = e.clientY - r.top;
      try { b.setPointerCapture(e.pointerId); } catch (x) {}
    };
    b.onpointermove = function (e) {
      if (!dn) return;
      if (!mv && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) > 8) mv = 1;
      if (mv) {
        b.style.left = Math.max(0, Math.min(window.innerWidth - 48, e.clientX - ox)) + 'px';
        b.style.top = Math.max(0, Math.min(window.innerHeight - 48, e.clientY - oy)) + 'px';
      }
    };
    b.onpointerup = function () {
      if (dn && !mv) onTap();
      dn = 0;
    };
    b.onpointercancel = function () { dn = 0; };
    return b;
  };

  // Transparent "hub" button on desktop when the hub keybind is turned off
  var hubGhost = null;
  if (!isTouch) {
    hubGhost = mkFab('hub', 12, function () {
      hub.style.display = hub.style.display === 'none' ? 'flex' : 'none';
    });
    hubGhost.style.left = '12px';
  }
  syncHubGhost = function () {
    if (hubGhost) hubGhost.style.display = st.hubKey ? 'none' : 'flex';
  };
  syncHubGhost();

  // ----- Saved data (localStorage of the site Nova is running on) -----
  var TKEY = 'novascriptin:timer', SKEY = 'novascriptin:screentime';
  var lsGet = function (k) {
    try { var v = window.localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  };
  var lsSet = function (k, v) {
    try { window.localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; }
  };
  var lsOk = lsSet('novascriptin:test', 1);
  var warnedLs = 0;
  var checkLs = function () {
    if (!lsOk && !warnedLs) { warnedLs = 1; showToast("This site blocks storage, so timer/screen time won't be saved."); }
  };
  var pad2 = function (n) { return n < 10 ? '0' + n : '' + n; };
  var fmtT = function (s) {
    s = Math.max(0, Math.round(s));
    return pad2(Math.floor(s / 3600)) + ':' + pad2(Math.floor(s % 3600 / 60)) + ':' + pad2(s % 60);
  };
  var fmtD = function (s) {
    s = Math.floor(s);
    var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60);
    return (h ? h + 'h ' : '') + (h || m ? m + 'm ' : '') + (s % 60) + 's';
  };

  // ----- Beep -----
  var audioCtx = null;
  var unlockAudio = function () {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
    } catch (e) {}
  };
  var beep = function (freq, dur) {
    try {
      unlockAudio();
      var o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.value = freq;
      g.gain.value = 0.2;
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start();
      o.stop(audioCtx.currentTime + dur);
    } catch (e) {}
  };

  // ----- Timer -----
  var tm = { state: 'idle', dur: 300, left: 300, endAt: 0, iv: 0, beepIv: 0, ringTo: 0, ringing: 0 };
  var tmrLbl = $('tmr-lbl');
  var tmrDefault = tmrLbl.textContent;
  var stopKeys2 = function (n) {
    n.onkeydown = function (e) { e.stopPropagation(); };
    n.onkeyup = function (e) { e.stopPropagation(); };
  };
  var tmrDisp = el('div', { c: 'tmr-disp', t: '00:05:00' });
  var inH = el('input', { type: 'number', c: 'nova-in', min: '0', max: '99', value: '0' });
  var inM = el('input', { type: 'number', c: 'nova-in', min: '0', max: '999', value: '5' });
  var inS = el('input', { type: 'number', c: 'nova-in', min: '0', max: '59', value: '0' });
  [inH, inM, inS].forEach(stopKeys2);
  var tCol = function (l, i) { return el('div', { c: 'nova-col' }, [el('label', { t: l }), i]); };
  var tmrMain = el('button', { c: 'nova-kbtn', t: 'Start' });
  var tmrReset = el('button', { c: 'nova-kbtn', t: 'Reset' });
  var tmrStopBtn = el('button', { c: 'nova-kbtn', style: 'display:none;margin-top:10px;color:#e53e3e', t: 'Stop beeping' });
  var tmrX = el('button', { c: 'nova-cls', t: 'X' });
  var tmrHdr = el('div', { c: 'nova-hdr' }, [el('span', { c: 'nova-ttl', style: 'font-size:14.5px', t: 'Timer' }), tmrX]);
  var tmrOvl = el('div', { id: 'nova-tmr', c: 'nova-box dark' }, [
    tmrHdr,
    tmrDisp,
    el('div', { c: 'tmr-row' }, [tCol('hr', inH), tCol('min', inM), tCol('sec', inS)]),
    el('div', { c: 'tmr-row' }, [tmrMain, tmrReset]),
    tmrStopBtn,
  ]);
  shadow.appendChild(tmrOvl);
  drag(tmrOvl, tmrHdr);

  var readIn = function () {
    var h = Math.min(99, Math.max(0, parseInt(inH.value, 10) || 0));
    var m = Math.min(999, Math.max(0, parseInt(inM.value, 10) || 0));
    var s = Math.min(59, Math.max(0, parseInt(inS.value, 10) || 0));
    return h * 3600 + m * 60 + s;
  };
  var tmrRemain = function () { return Math.max(0, (tm.endAt - Date.now()) / 1000); };
  var tmrSave = function () {
    lsSet(TKEY, { state: tm.state, dur: tm.dur, left: tm.left, endAt: tm.endAt, h: inH.value, m: inM.value, s: inS.value });
  };
  var tmrRender = function () {
    var shown = tm.state === 'running' ? tmrRemain() : tm.left;
    tmrDisp.textContent = fmtT(shown);
    tmrMain.textContent = tm.state === 'running' ? 'Pause' : tm.state === 'paused' ? 'Resume' : 'Start';
    tmrLbl.textContent = tm.state === 'idle' ? tmrDefault
      : tm.state === 'running' ? 'Running: ' + fmtT(shown) + ' left'
      : tm.state === 'paused' ? 'Paused: ' + fmtT(shown) + ' left'
      : 'Finished!';
  };
  var stopRing = function () {
    clearInterval(tm.beepIv);
    clearTimeout(tm.ringTo);
    tm.ringing = 0;
    tmrStopBtn.style.display = 'none';
  };
  var ring = function () {
    stopRing();
    tm.ringing = 1;
    tmrStopBtn.style.display = 'block';
    var pat = function () {
      beep(880, 0.18);
      setTimeout(function () { beep(880, 0.18); }, 250);
      setTimeout(function () { beep(1175, 0.35); }, 500);
      try { if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } catch (e) {}
    };
    pat();
    tm.beepIv = setInterval(pat, 1500);
    tm.ringTo = setTimeout(stopRing, 60000); // auto-stop after a minute
  };
  var tmrFinish = function () {
    clearInterval(tm.iv);
    tm.state = 'done';
    tm.left = 0;
    tm.endAt = 0;
    tmrSave();
    $('tg-tmr').checked = true; // pop the timer open so you can see/stop it
    tmrOvl.style.display = 'block';
    tmrRender();
    showToast('Timer finished!');
    ring();
  };
  var tmrTick = function () {
    if (tm.state !== 'running') return;
    if (tmrRemain() <= 0) tmrFinish();
    else tmrRender();
  };
  var tmrRun = function () {
    clearInterval(tm.iv);
    tm.iv = setInterval(tmrTick, 250);
  };

  tmrMain.onclick = function () {
    unlockAudio();
    checkLs();
    if (tm.state === 'running') {
      tm.left = tmrRemain();
      tm.state = 'paused';
      tm.endAt = 0;
      clearInterval(tm.iv);
    } else if (tm.state === 'paused') {
      tm.state = 'running';
      tm.endAt = Date.now() + tm.left * 1000;
      tmrRun();
    } else {
      stopRing();
      var d = readIn();
      if (d <= 0) { showToast('Set a time first.'); return; }
      tm.dur = d;
      tm.left = d;
      tm.state = 'running';
      tm.endAt = Date.now() + d * 1000;
      tmrRun();
    }
    tmrSave();
    tmrRender();
  };
  tmrReset.onclick = function () {
    stopRing();
    clearInterval(tm.iv);
    tm.state = 'idle';
    tm.dur = readIn();
    tm.left = tm.dur;
    tm.endAt = 0;
    tmrSave();
    tmrRender();
  };
  tmrStopBtn.onclick = stopRing;
  tmrX.onclick = function () { $('tg-tmr').checked = false; feat.tmr(0); };
  [inH, inM, inS].forEach(function (i) {
    i.oninput = function () {
      if (tm.state === 'idle' || tm.state === 'done') {
        tm.state = 'idle';
        tm.left = readIn();
        tm.dur = tm.left;
        tmrSave();
        tmrRender();
      }
    };
  });

  // restore a saved timer for this site
  (function () {
    var sv = lsGet(TKEY);
    if (!sv) { tm.left = readIn(); tmrRender(); return; }
    inH.value = sv.h || '0';
    inM.value = sv.m || '0';
    inS.value = sv.s || '0';
    tm.dur = sv.dur || readIn();
    if (sv.state === 'running' && sv.endAt) {
      tm.endAt = sv.endAt;
      if (sv.endAt > Date.now()) { tm.state = 'running'; tmrRun(); }
      else { tm.state = 'running'; setTimeout(tmrFinish, 900); } // finished while Nova wasn't open
    } else if (sv.state === 'paused') {
      tm.state = 'paused';
      tm.left = sv.left || 0;
    } else {
      tm.state = 'idle';
      tm.left = readIn();
    }
    tmrRender();
  })();

  feat.tmr = function (on) {
    tmrOvl.style.display = on ? 'block' : 'none';
    if (on) { checkLs(); tmrRender(); }
  };
  feat._tmrStop = function () { // used when Nova is destroyed: keep the saved state, stop the ticking
    tmrSave();
    clearInterval(tm.iv);
    stopRing();
  };

  // ----- Screen Time -----
  var sc = { iv: 0, last: 0, ticks: 0, data: { days: {}, total: 0 } };
  var scLbl = $('scr-lbl');
  var scDefault = scLbl.textContent;
  var scL1 = el('div'), scL2 = el('div'), scL3 = el('div');
  var scOvl = el('div', { id: 'nova-scr', c: 'nova-box dark' }, [scL1, scL2, scL3]);
  shadow.appendChild(scOvl);
  drag(scOvl, scOvl);
  var dayKey = function (t) {
    var d = new Date(t || Date.now());
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  };
  var scLoad = function () {
    var sv = lsGet(SKEY);
    if (sv && sv.days) sc.data = { days: sv.days, total: sv.total || 0 };
  };
  var scSave = function () {
    var keys = Object.keys(sc.data.days).sort();
    while (keys.length > 60) delete sc.data.days[keys.shift()]; // keep the last 60 days
    lsSet(SKEY, sc.data);
  };
  var scWeek = function () {
    var sum = 0;
    for (var i = 0; i < 7; i++) sum += sc.data.days[dayKey(Date.now() - i * 864e5)] || 0;
    return sum;
  };
  var scRender = function () {
    var today = sc.data.days[dayKey()] || 0;
    scL1.textContent = 'Today: ' + fmtD(today);
    scL2.textContent = 'Last 7 days: ' + fmtD(scWeek());
    scL3.textContent = 'Total: ' + fmtD(sc.data.total);
    scLbl.textContent = sc.iv ? 'Today ' + fmtD(today) + ' | Total ' + fmtD(sc.data.total) : scDefault;
  };
  var scTick = function () {
    var now = Date.now();
    var dt = Math.min(5, (now - sc.last) / 1000);
    sc.last = now;
    if (document.visibilityState === 'visible') {
      var k = dayKey();
      sc.data.days[k] = (sc.data.days[k] || 0) + dt;
      sc.data.total += dt;
    }
    sc.ticks++;
    if (sc.ticks % 5 === 0) scSave();
    scRender();
  };
  var scOnHide = function () { scSave(); };
  feat.scr = function (on) {
    clearInterval(sc.iv);
    sc.iv = 0;
    window.removeEventListener('pagehide', scOnHide);
    document.removeEventListener('visibilitychange', scOnHide);
    scOvl.style.display = on ? 'block' : 'none';
    if (on) {
      checkLs();
      scLoad();
      sc.last = Date.now();
      sc.iv = setInterval(scTick, 1000);
      window.addEventListener('pagehide', scOnHide);
      document.addEventListener('visibilitychange', scOnHide);
    } else {
      scSave();
    }
    scRender();
  };
  $('btn-scrreset').onclick = function () {
    askConfirm('Reset screen time?', 'This clears the saved screen time for this site.', 'Reset', function () {
      sc.data = { days: {}, total: 0 };
      scSave();
      scRender();
      showToast('Screen time reset.');
    });
  };
  scLoad();
  scRender();

  // ───────────────────────── Side tabs, whole-card toggles, gear buttons, keybind settings ─────────────────────────
  css.textContent +=
    '#novascriptin-hub{width:75vw;height:75vh;min-width:340px;min-height:260px}' +
    '.nova-main{display:flex;flex:1;min-height:0;gap:14px}' +
    '.nova-tabs{flex-direction:column;margin:0;width:112px;flex-shrink:0;overflow-y:auto}' +
    '.nova-tbtn{flex:none;text-align:left;padding:12px 12px}' +
    '.nova-body{min-width:0}' +
    '.nova-card.tgl{cursor:pointer}' +
    '.nova-ctop>div:first-child{flex:1;min-width:0}' +
    '.nova-gear{background:none;border:none;box-shadow:none;color:var(--sub);font-size:18px;line-height:1;padding:4px 6px;cursor:pointer;flex-shrink:0}.nova-gear:hover{color:var(--ac)}' +
    '.nova-fab.ghost.on{background:var(--ac);color:var(--bg);opacity:.8}.nova-fab.ghost:active{opacity:1}' +
    '@media (pointer:coarse){.nova-gear{font-size:22px;padding:6px 8px}}' +
    '@media (max-width:640px){#novascriptin-hub{width:min(94vw,420px);height:75vh}.nova-tabs{width:84px}.nova-tbtn{font-size:12px;padding:10px 8px}}';

  // Click anywhere on a card to flip its switch (buttons, sliders, text boxes and the gear still work normally)
  hub.querySelectorAll('.nova-card').forEach(function (c) {
    var cb = c.querySelector('.nova-sw input');
    if (!cb) return;
    c.classList.add('tgl');
    c.addEventListener('click', function (e) {
      if (e.target.closest('button,input,select,textarea,label,.nova-extra,.nova-gear')) return;
      cb.checked = !cb.checked;
      cb.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });

  // Keybind settings live in each script's settings popup (gear button or right-click the switch)
  var keyRow = function (label, btn) {
    return el('div', { c: 'nova-col', style: 'margin-bottom:10px' }, [el('label', { t: label }), btn]);
  };
  var keyHint = function (extra) {
    return el('p', { c: 'nova-hint', t: 'Click the button, then press a key (LShift, RShift, any key) or a mouse button (middle, right, back, forward). Click it again to disable.' + (extra || '') });
  };
  var acPop = mkPop('AutoClicker Settings');
  [keyHint(), keyRow('Start / stop clicking', btnAcKey), keyRow('Show / hide AutoClicker panel', btnAcHideKey)].forEach(function (n) { acPop.body.appendChild(n); });
  var aiPop = mkPop('Chatbot Settings');
  [keyHint(), keyRow('Show / hide chatbot window', btnAiKey)].forEach(function (n) { aiPop.body.appendChild(n); });
  var tbPop = mkPop('Buttons & Hub Settings');
  [keyHint(' If the hub key is off, a transparent "hub" button appears so you can still open the hub.'), keyRow('Show / hide hub window', btnHubKey)].forEach(function (n) { tbPop.body.appendChild(n); });

  // Gear button on a card = same as right-clicking its switch
  var addGear = function (id, open) {
    var top = $(id).closest('.nova-card').querySelector('.nova-ctop');
    var g = el('button', { c: 'nova-gear', t: '\u2699\uFE0E', title: 'Settings' });
    g.onclick = function (e) {
      e.stopPropagation();
      var r = g.getBoundingClientRect();
      open({ clientX: r.left, clientY: r.bottom });
    };
    top.insertBefore(g, top.lastElementChild);
  };
  addGear('tg-xh', function (pt) { openPop(xsPop, pt); });
  addGear('tg-ty', function (pt) { openPop(tsPop, pt); });
  addGear('tg-cur', function (pt) {
    if (isTouch) showToast('Custom Cursor only works on computer.');
    else openPop(curPop, pt);
  });
  if (!isTouch) { // keybinds only matter with a keyboard / mouse
    [['tg-ac', acPop], ['tg-ai', aiPop], ['tg-tb', tbPop]].forEach(function (p) {
      addGear(p[0], function (pt) { openPop(p[1], pt); });
      $(p[0]).parentNode.oncontextmenu = function (e) { e.preventDefault(); openPop(p[1], e); };
    });
  }

  // ───────────────────────── Mobile: floating buttons, touch target, long-press ─────────────────────────
  if (isTouch) {
    // Keybinds don't apply on touch: hide those cards, add a toggle for the floating buttons

    // "Right-click" wording -> "Long-press"
    hub.querySelectorAll('.nova-card p').forEach(function (p) {
      p.textContent = p.textContent.replace('Right-click', 'Long-press');
    });

    // Draggable red target the AutoClicker clicks on
    tgt = el('div', { id: 'nova-tgt' });
    shadow.appendChild(tgt);
    tgt.style.left = Math.round(window.innerWidth / 2 - 22) + 'px';
    tgt.style.top = Math.round(window.innerHeight / 2 - 22) + 'px';
    drag(tgt, tgt);

    acFab = mkFab('CLICK', 120, function () {
      if (tgAc.checked) setAc(!st.ac);
      else showToast('Turn on AutoClicker in Scripts first.');
    });
    var acpFab = mkFab('PANEL', 176, function () {
      acOvl.style.display = acOvl.style.display === 'none' ? 'block' : 'none';
    });
    var hubFab = mkFab('HUB', 232, function () {
      hub.style.display = hub.style.display === 'none' ? 'flex' : 'none';
    });
    var aiFab = mkFab('AI', 288, function () {
      aiOvl.style.display = aiOvl.style.display === 'none' ? 'flex' : 'none';
    });

    // Buttons only show when their feature is on
    syncFabs = function () {
      var on = true;
      var acShow = on && tgAc.checked ? 'flex' : 'none';
      hubFab.style.display = on ? 'flex' : 'none';
      acFab.style.display = acShow;
      acpFab.style.display = acShow;
      aiFab.style.display = on && $('tg-ai').checked ? 'flex' : 'none';
      tgt.style.display = tgAc.checked ? 'block' : 'none';
    };
    tgAc.addEventListener('change', syncFabs);
    $('tg-ai').addEventListener('change', syncFabs);
    syncFabs();

    // Dark theme toggle also themes the buttons
    $('tg-dark').addEventListener('change', function (e) {
      [acFab, acpFab, hubFab, aiFab].forEach(function (x) { x.classList.toggle('dark', e.target.checked); });
    });

    // Long-press a switch = right-click (opens its settings)
    var longPress = function (sw, pop) {
      var tm = 0, fired = 0, sx = 0, sy = 0;
      sw.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse') return;
        fired = 0;
        sx = e.clientX;
        sy = e.clientY;
        clearTimeout(tm);
        tm = setTimeout(function () {
          fired = 1;
          openPop(pop, { clientX: sx, clientY: sy });
        }, 500);
      });
      sw.addEventListener('pointermove', function (e) {
        if (Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) > 10) clearTimeout(tm);
      });
      ['pointerup', 'pointercancel'].forEach(function (t) {
        sw.addEventListener(t, function () { clearTimeout(tm); });
      });
      // swallow the click that follows a long-press so the switch doesn't flip
      sw.addEventListener('click', function (e) {
        if (fired) {
          e.preventDefault();
          e.stopPropagation();
          fired = 0;
        }
      }, true);
    };
    longPress($('tg-xh').parentNode, xsPop);
    longPress($('tg-ty').parentNode, tsPop);
  }

  // Wire toggles to features
  ['unl', 'pw', 'rm', 'hl', 'zoom', 'css', 'scroll', 'clk', 'note', 'xh', 'ty', 'ab', 'pop', 'cur', 'tmr', 'scr'].forEach(function (k) {
    $('tg-' + k).onchange = function (e) { feat[k](e.target.checked); };
  });

  // ----- Persist & restore Stats / Clock / Scratchpad / Cursor state -----
  (function () {
    ['st', 'clk', 'note', 'cur'].forEach(function (k) {
      $('tg-' + k).addEventListener('change', saveSettings);
    });
    noteTa.addEventListener('input', saveSettings);

    var sv = savedSet || {};
    var tog = sv.tog || {};

    // Flipping .checked then firing 'change' lets each feature's own
    // handler run, so nothing is duplicated here.
    var turnOn = function (k) {
      var cb = $('tg-' + k);
      if (!cb) return;
      cb.checked = true;
      cb.dispatchEvent(new Event('change', { bubbles: true }));
    };

    if (tog.st) turnOn('st');
    if (tog.clk) turnOn('clk');
    if (tog.note) turnOn('note');
    if (tog.cur && !isTouch) turnOn('cur'); // cursor is desktop-only

    if (typeof sv.noteText === 'string') noteTa.value = sv.noteText;
  })();

  $('rg-zoom').oninput = function () { if ($('tg-zoom').checked) feat.zoom(1); };
  $('ta-css').oninput = function () { if (ccss) ccss.textContent = $('ta-css').value; };
  // Don't let page key handlers eat typing in our textareas
  [noteTa, $('ta-css')].forEach(function (t) {
    t.onkeydown = function (e) { e.stopPropagation(); };
    t.onkeyup = function (e) { e.stopPropagation(); };
  });

  $('tg-dark').onchange = function (e) {
    [hub, ovl, acOvl, toast, aiOvl, clk, noteOvl, xsPop.p, tsPop.p, curPop.p, tmrOvl, scOvl, cfmBox, hubGhost, acPop.p, aiPop.p, tbPop.p].forEach(function (x) {
      if (x) x.classList.toggle('dark', e.target.checked);
    });
    saveSettings();
  };
  if (savedSet.dark === false) { // restore saved light mode
    $('tg-dark').checked = false;
    $('tg-dark').dispatchEvent(new Event('change'));
  }

  var cleanup = function () {
    saveNow();
    destroyed = 1;
    setAc(0);
    stop();
    clearTimeout(st.tid);
    globalL.forEach(function (l) { try { l[0].removeEventListener(l[1], l[2], l[3]); } catch (e) {} });
    globalL = [];
    st.st = 0;
    cancelAnimationFrame(st.rid);
    clearInterval(st.pid);
    dmStop();
    Object.keys(feat).forEach(function (k) {
      try { feat[k](0); } catch (e) {}
    });
    document.body.contentEditable = 'false';
    document.documentElement.classList.remove('n-inv');
    host.remove();
    gCss.remove();
    fdark.remove();
  };
  window.__novaCleanup = cleanup;

  $('nova-cls').onclick = function () {
    askConfirm(
      'Destroy UI?',
      'This closes NovaScriptin and turns off every script and effect. A running timer pauses its ticking (it picks up again if you reopen Nova).',
      'Destroy',
      function () {
        setAc(0);
        hub.style.opacity = '0';
        setTimeout(cleanup, 250);
      }
    );
  };
})();
