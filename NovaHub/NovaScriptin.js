(function () {
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
      innerCardChildren.push(el('div', { style: 'margin-top:10px;' }, extraElements));
    }
    return el('div', { c: 'nova-card' }, innerCardChildren);
  };

  // Scoped Shadow DOM styles with safely escaped inner single quotes for SVGs
  var css = el('style', {
    id: 'novascriptin-css',
    t: ':host{all:initial;font-family:sans-serif}@keyframes nPop{0%{opacity:0}100%{opacity:1}}@keyframes nFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}@keyframes nSpin{to{transform:rotate(360deg)}}.nova-box{pointer-events:auto;--bg:#e0e5ec;--txt:#3182ce;--sub:#718096;--s1:rgba(163,177,198,.7);--s2:rgba(255,255,255,.85);--ac:#3182ce;background:var(--bg);color:var(--txt);font-family:sans-serif;user-select:none;box-sizing:border-box;transition:background .35s,color .35s,box-shadow .35s;line-height:normal;letter-spacing:normal;text-transform:none}.nova-box *{box-sizing:border-box;font-family:inherit}.nova-box.dark{--bg:#1e2229;--txt:#b794f4;--sub:#a0aec0;--s1:rgba(11,13,16,.85);--s2:rgba(46,52,64,.6);--ac:#b794f4}#nova-ldr{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;z-index:1000000;transition:opacity .4s}#nova-spin{width:46px;height:46px;border-radius:50%;border:4px solid var(--s1);border-top-color:var(--ac);animation:nSpin .8s linear infinite}#novascriptin-hub{position:fixed;width:50vw;height:50vh;min-width:260px;min-height:220px;border-radius:22px;box-shadow:9px 9px 18px var(--s1),-9px -9px 18px var(--s2);z-index:999999;padding:20px;display:none;flex-direction:column;animation:nPop .3s ease forwards}.nova-hdr{display:flex;justify-content:space-between;align-items:center;cursor:grab;padding-bottom:12px;margin-bottom:14px;border-bottom:1px solid rgba(150,150,150,.2);flex-shrink:0}.nova-hdr:active{cursor:grabbing}.nova-ttl{font-weight:800;font-size:17px}.nova-hbtns{display:flex;gap:8px;align-items:center}.nova-cls,.nova-min{width:26px;height:26px;border-radius:50%;border:none;background:var(--bg);box-shadow:4px 4px 8px var(--s1),-4px -4px 8px var(--s2);font-weight:700;cursor:pointer;transition:transform .2s;display:flex;align-items:center;justify-content:center;padding:0}.nova-cls{color:#e53e3e}.nova-min{color:var(--ac);font-size:16px;line-height:1}.nova-cls:hover,.nova-min:hover{transform:scale(1.1)}#nova-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);padding:10px 18px;border-radius:14px;box-shadow:6px 6px 12px var(--s1),-6px -6px 12px var(--s2);font-size:13px;font-weight:700;z-index:1000001;opacity:0;pointer-events:none;transition:opacity .3s}.nova-tabs{display:flex;gap:8px;margin-bottom:18px;flex-shrink:0}.nova-tbtn{flex:1;padding:9px 6px;border:none;border-radius:12px;background:var(--bg);box-shadow:5px 5px 10px var(--s1),-5px -5px 10px var(--s2);font-weight:600;font-size:13px;color:var(--sub);cursor:pointer;transition:.25s}.nova-tbtn.active{box-shadow:inset 4px 4px 8px var(--s1),inset -4px -4px 8px var(--s2);color:var(--ac)}.nova-body{flex:1;overflow-y:auto;overflow-x:hidden;padding-right:2px}.nova-body::-webkit-scrollbar{width:4px}.nova-body::-webkit-scrollbar-thumb{background:var(--sub);border-radius:4px}.nova-sec{display:none}.nova-sec.active{display:block;animation:nFade .3s ease forwards}.nova-card{padding:14px 16px;margin-bottom:14px;border-radius:15px;background:var(--bg);box-shadow:5px 5px 10px var(--s1),-5px -5px 10px var(--s2);transition:transform .25s}.nova-card:hover{transform:translateY(-2px)}.nova-ctop{display:flex;justify-content:space-between;align-items:center;gap:10px}.nova-card h4{margin:0 0 3px;font-size:14.5px;font-weight:700}.nova-card p{margin:0;font-size:11.5px;color:var(--sub)}.nova-grid{display:flex;gap:10px}.nova-col{flex:1}.nova-col label{display:block;font-size:11px;font-weight:600;margin-bottom:5px;color:var(--sub)}.nova-sw{position:relative;display:inline-block;width:48px;height:26px;flex-shrink:0}.nova-sw input{opacity:0;width:0;height:0;margin:0}.nova-sl{position:absolute;cursor:pointer;inset:0;background:var(--bg);border-radius:26px;box-shadow:inset 3px 3px 6px var(--s1),inset -3px -3px 6px var(--s2);transition:.3s}.nova-sl:before{position:absolute;content:"";height:18px;width:18px;left:4px;bottom:4px;background:var(--sub);border-radius:50%;transition:.35s cubic-bezier(.68,-.55,.265,1.55)}input:checked+.nova-sl:before{transform:translateX(22px);background:var(--ac)}.nova-in,.nova-kbtn,.nova-select{width:100%;padding:8px 10px;border:none;border-radius:10px;background:var(--bg);box-shadow:inset 3px 3px 6px var(--s1),inset -3px -3px 6px var(--s2);color:var(--txt);font-size:12.5px;outline:none;box-sizing:border-box}.nova-kbtn{box-shadow:3px 3px 6px var(--s1),-3px -3px 6px var(--s2);cursor:pointer;font-weight:600;text-align:center;transition:background 0.2s, color 0.2s}.nova-kbtn:active{box-shadow:inset 2px 2px 4px var(--s1),inset -2px -2px 4px var(--s2)}.nova-kbtn.recording{background:var(--ac);color:var(--bg);box-shadow:inset 3px 3px 6px var(--s1),inset -3px -3px 6px var(--s2)}#nova-res{position:absolute;right:6px;bottom:6px;width:16px;height:16px;cursor:nwse-resize;border-right:3px solid var(--sub);border-bottom:3px solid var(--sub);border-bottom-right-radius:6px;opacity:.7;z-index:10}#nova-res:hover{opacity:1;border-color:var(--ac)}#nova-ovl{position:fixed;top:20px;right:20px;padding:10px 16px;border-radius:14px;box-shadow:6px 6px 12px var(--s1),-6px -6px 12px var(--s2);font-family:monospace;font-size:13px;font-weight:700;z-index:999998;display:none;align-items:center;gap:10px;cursor:grab;animation:nPop .3s ease forwards}#nova-ac-ovl{position:fixed;top:90px;right:20px;width:265px;padding:16px;border-radius:18px;box-shadow:7px 7px 14px var(--s1),-7px -7px 14px var(--s2);z-index:999999;display:none;animation:nPop .3s ease forwards}#nova-ai-ovl{position:fixed;bottom:20px;right:20px;width:320px;height:430px;border-radius:20px;box-shadow:8px 8px 16px var(--s1),-8px -8px 16px var(--s2);z-index:999999;display:none;flex-direction:column;padding:16px;animation:nPop .3s ease forwards}.ai-chat-area{flex:1;overflow-y:auto;margin-bottom:10px;padding-right:2px;display:flex;flex-direction:column;gap:8px}.ai-msg{max-width:85%;padding:8px 12px;border-radius:12px;font-size:12.5px;word-break:break-word;user-select:text}.ai-msg.user{align-self:flex-end;background:var(--ac);color:var(--bg)}.ai-msg.bot{align-self:flex-start;background:var(--s1);color:var(--txt);border:1px solid rgba(150,150,150,0.1)}.ai-msg.system{align-self:center;font-size:11px;color:var(--sub);background:transparent;text-align:center}.ai-controls{display:flex;flex-direction:column;gap:6px;margin-bottom:10px;flex-shrink:0}.ai-input-wrap{display:flex;gap:6px;flex-shrink:0}.ai-input-wrap input{flex:1}',
  });
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
    acKey: '`',       // AutoClicker operational execution toggle keybind 
    acHideKey: '3',   // Toggle visibility on AutoClicker macro options screen
    hubKey: '1',      // Toggle framework main control dashboard visibility
    aiKey: '2',       // Interactive dynamic panel chatbot assistant toggle keybind
    currentRecording: null, // Tracks which functional element is binding a key
    id: 0,
    x: 0,
    y: 0,
    st: 0,
    rid: 0,
    pid: 0,
    hid: 0,
    tid: 0,
    groqKey: '',
  };

  // Button components structured into modern interactive dynamic key selectors instead of drops
  var btnAcKey = el('button', { c: 'nova-kbtn', t: st.acKey.toUpperCase() });
  var btnAcHideKey = el('button', { c: 'nova-kbtn', t: st.acHideKey.toUpperCase() });
  var btnHubKey = el('button', { c: 'nova-kbtn', t: st.hubKey.toUpperCase() });
  var btnAiKey = el('button', { c: 'nova-kbtn', t: st.aiKey.toUpperCase() });

  var sTab = el('div', { id: 'tab-scripts', c: 'nova-sec active' }, [
    card('AutoClicker', 'Toggle overlay dashboard panel', 'tg-ac', 'ac-lbl'),
    card('Stats Overlay', 'Draggable FPS & Google Ping', 'tg-st'),
    card('Groq Chatbot', 'AI Companion Overlay Panel', 'tg-ai'),
  ]);

  var pTab = el('div', { id: 'tab-page', c: 'nova-sec' }, [
    card('Edit Page', 'Click text on site to edit', 'tg-edit'),
    card('Force Dark Mode (Experimental)', 'Attempt dark theme on site', 'tg-fdark'),
    card('Reverse Contrast', 'Invert page colors', 'tg-inv'),
  ]);

  var hAcKeyCard = el('div', { c: 'nova-card' }, [
    el('div', { c: 'nova-ctop' }, [
      el('div', 0, [
        el('h4', { t: 'AutoClicker Activation' }),
        el('p', { t: 'Keybind assignment to fire macro loop' }),
      ]),
      el('div', { style: 'width:90px;flex-shrink:0' }, [btnAcKey]),
    ])
  ]);

  var hAcHideCard = el('div', { c: 'nova-card' }, [
    el('div', { c: 'nova-ctop' }, [
      el('div', 0, [
        el('h4', { t: 'Hide AutoClicker Window' }),
        el('p', { t: 'Toggle visibility on AutoClicker panel overlay' }),
      ]),
      el('div', { style: 'width:90px;flex-shrink:0' }, [btnAcHideKey]),
    ])
  ]);

  var hHubKeyCard = el('div', { c: 'nova-card' }, [
    el('div', { c: 'nova-ctop' }, [
      el('div', 0, [
        el('h4', { t: 'Hide Hub Window' }),
        el('p', { t: 'Toggle visual dashboard configuration' }),
      ]),
      el('div', { style: 'width:90px;flex-shrink:0' }, [btnHubKey]),
    ])
  ]);

  var hAiKeyCard = el('div', { c: 'nova-card' }, [
    el('div', { c: 'nova-ctop' }, [
      el('div', 0, [
        el('h4', { t: 'Hide Chatbot Panel' }),
        el('p', { t: 'Toggle visibility on Groq Assistant window' }),
      ]),
      el('div', { style: 'width:90px;flex-shrink:0' }, [btnAiKey]),
    ])
  ]);

  var stTab = el('div', { id: 'tab-settings', c: 'nova-sec' }, [
    card('Dark Mode', 'Switch neumorphic theme', 'tg-dark'),
    hAcKeyCard,
    hAcHideCard,
    hHubKeyCard,
    hAiKeyCard,
  ]);

  var bodyWrap = el('div', { c: 'nova-body' }, [sTab, pTab, stTab]);
  var res = el('div', { id: 'nova-res' });
  var hub = el(
    'div',
    { id: 'novascriptin-hub', c: 'nova-box dark' },
    [hdr, tabs, bodyWrap, res]
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

  var acOvl = el('div', { id: 'nova-ac-ovl', c: 'nova-box dark' }, [acHdr, acBody]);
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

  // Query helper inside Shadow DOM
  var $ = function (id) {
    return shadow.getElementById(id);
  };

  $('tg-dark').checked = true;

  setTimeout(function () {
    ldr.style.opacity = '0';
    hub.style.display = 'flex';
    hub.style.left = Math.max(10, (window.innerWidth - hub.offsetWidth) / 2) + 'px';
    hub.style.top = Math.max(10, (window.innerHeight - hub.offsetHeight) / 2) + 'px';
    setTimeout(function () {
      ldr.remove();
    }, 400);
  }, 750);

  document.addEventListener('mousemove', function (e) {
    st.x = e.clientX;
    st.y = e.clientY;
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
        return;
      }
      if (st.currentRecording) {
        st.currentRecording.classList.remove('recording');
      }
      st.currentRecording = btn;
      btn.classList.add('recording');
      btn.textContent = 'PRESS KEY';
      showToast('Press any standard keyboard controller button to bind. Double click button to disable.');
    };
  };

  setupKeybindButton(btnAcKey, 'acKey', 'AutoClicker');
  setupKeybindButton(btnAcHideKey, 'acHideKey', 'AutoClicker Panel');
  setupKeybindButton(btnHubKey, 'hubKey', 'Hub Window');
  setupKeybindButton(btnAiKey, 'aiKey', 'Chatbot Panel');

  var rz = 0, rx = 0, ry = 0, rw = 0, rh = 0;
  res.onmousedown = function (e) {
    e.preventDefault();
    e.stopPropagation();
    rz = 1;
    rx = e.clientX;
    ry = e.clientY;
    rw = hub.offsetWidth;
    rh = hub.offsetHeight;
    hub.style.transition = 'none';
  };
  document.addEventListener('mousemove', function (e) {
    if (rz) {
      hub.style.width = Math.max(260, rw + (e.clientX - rx)) + 'px';
      hub.style.height = Math.max(220, rh + (e.clientY - ry)) + 'px';
    }
  });
  document.addEventListener('mouseup', function () {
    if (rz) {
      rz = 0;
      hub.style.transition = '';
    }
  });

  var drag = function (box, h) {
    var d = 0, ox = 0, oy = 0;
    h.onmousedown = function (e) {
      if (e.target.closest('button,input,select,#nova-res,.ai-chat-area')) return;
      d = 1;
      var r = box.getBoundingClientRect();
      box.style.transition = 'none';
      box.style.right = 'auto';
      box.style.left = r.left + 'px';
      box.style.top = r.top + 'px';
      ox = e.clientX - r.left;
      oy = e.clientY - r.top;
    };
    document.addEventListener('mousemove', function (e) {
      if (d) {
        box.style.left = e.clientX - ox + 'px';
        box.style.top = e.clientY - oy + 'px';
      }
    });
    document.addEventListener('mouseup', function () {
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
    lbl.textContent = 'Toggle overlay dashboard panel | Key: ' + (st.acKey ? st.acKey.toUpperCase() : 'NONE');
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

    while (el && el.tagName === 'IFRAME') {
      try {
        var nextDoc = el.contentDocument || el.contentWindow.document;
        var nextWin = el.contentWindow;
        var rect = el.getBoundingClientRect();
        
        x = x - rect.left;
        y = y - rect.top;
        
        var innerEl = nextDoc.elementFromPoint(x, y);
        if (!innerEl || innerEl === el) break;
        
        el = innerEl;
        currentDoc = nextDoc;
        targetWin = nextWin;
      } catch (err) {
        break;
      }
    }
    return { element: el, doc: currentDoc, win: targetWin, cx: x, cy: y };
  };

  var start = function () {
    stop();
    st.id = setInterval(function () {
      var rootEl = document.elementFromPoint(st.x, st.y);
      if (rootEl === host || (rootEl && host.contains(rootEl))) return;

      var data = getDeepTargetData(st.x, st.y);
      if (data.element) {
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
    st.ac = v;
    acStatE.textContent = v ? 'ON' : 'OFF';
    acStatE.style.color = v ? '#48bb78' : '#e53e3e';
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
    if (st.hubKey) {
      showToast('Click ' + st.hubKey.toUpperCase() + ' to unhide display dashboard');
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
      .then(function (r) { return r.text(); })
      .then(function (raw) {
        var lines = raw.split(/[\r\n]+/);
        var cleanTokenLine = '';
        for (var i = 0; i < lines.length; i++) {
          var entry = lines[i].replace(/\s+/g, '');
          if (entry.length > 10) {
            cleanTokenLine = entry;
            break;
          }
        }
        
        if (!cleanTokenLine && lines.length > 0) {
          cleanTokenLine = lines[0].replace(/\s+/g, '');
        }

        var decoded = atob(cleanTokenLine);
        st.groqKey = 'gsk_' + decoded;
        appendAiMsg('Groq token successfully decoded!', 'system');
        fetchGroqModelsList();
      })
      .catch(function () {
        appendAiMsg('Error downloading token via server requests.', 'system');
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

  document.addEventListener('keydown', function (e) {
    // Intercept if processing keybind mapping capture
    if (st.currentRecording) {
      e.preventDefault();
      e.stopPropagation();
      var keyStr = e.key;
      
      // Prevent collisions across layout targets
      if ((st.currentRecording !== btnAcKey && st.acKey && st.acKey.toLowerCase() === keyStr.toLowerCase()) ||
          (st.currentRecording !== btnAcHideKey && st.acHideKey && st.acHideKey.toLowerCase() === keyStr.toLowerCase()) ||
          (st.currentRecording !== btnHubKey && st.hubKey && st.hubKey.toLowerCase() === keyStr.toLowerCase()) ||
          (st.currentRecording !== btnAiKey && st.aiKey && st.aiKey.toLowerCase() === keyStr.toLowerCase())) {
        showToast('Key conflict! That button is currently bound elsewhere.');
        return;
      }

      if (st.currentRecording === btnAcKey) {
        st.acKey = keyStr;
        btnAcKey.textContent = keyStr.toUpperCase();
        upd();
      } else if (st.currentRecording === btnAcHideKey) {
        st.acHideKey = keyStr;
        btnAcHideKey.textContent = keyStr.toUpperCase();
      } else if (st.currentRecording === btnHubKey) {
        st.hubKey = keyStr;
        btnHubKey.textContent = keyStr.toUpperCase();
      } else if (st.currentRecording === btnAiKey) {
        st.aiKey = keyStr;
        btnAiKey.textContent = keyStr.toUpperCase();
      }

      st.currentRecording.classList.remove('recording');
      st.currentRecording = null;
      showToast('Successfully bound action to ' + keyStr.toUpperCase());
      return;
    }

    if (shadow.activeElement && (shadow.activeElement.tagName === 'INPUT' || shadow.activeElement.tagName === 'SELECT')) {
      return;
    }

    if (document.body.contentEditable !== 'true') {
      var pressedKey = e.key.toLowerCase();
      
      if (st.acKey && pressedKey === st.acKey.toLowerCase()) {
        if (tgAc.checked) {
          setAc(!st.ac);
        } else {
          showToast('Turn on AutoClicker in Scripts first.');
        }
      } else if (st.acHideKey && pressedKey === st.acHideKey.toLowerCase()) {
        if (tgAc.checked) {
          var isAcHidden = (acOvl.style.display === 'none');
          acOvl.style.display = isAcHidden ? 'block' : 'none';
        } else {
          showToast('Turn on AutoClicker in Scripts first.');
        }
      } else if (st.hubKey && pressedKey === st.hubKey.toLowerCase()) {
        var isHidden = (hub.style.display === 'none');
        hub.style.display = isHidden ? 'flex' : 'none';
      } else if (st.aiKey && pressedKey === st.aiKey.toLowerCase()) {
        if ($('tg-ai').checked) {
          var isAiHidden = (aiOvl.style.display === 'none');
          aiOvl.style.display = isAiHidden ? 'flex' : 'none';
        } else {
          showToast('Enable the Groq Chatbot switch inside Scripts panel first.');
        }
      }
    }
  });

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

  $('tg-fdark').onchange = function (e) {
    fdark.textContent = e.target.checked
      ? 'html,body{background-color:#111317 !important;color:#e2e8f0 !important;color-scheme:dark !important}*:not(#novascriptin-host):not(img):not(video):not(canvas):not(svg):not(svg *):not(i):not(span):not(button):not(input):not(select):not(textarea):not([role="button"]):not([role="img"]):not([class="icon"]){background-color:#16181d !important;color:#e2e8f0 !important;border-color:#2c323d !important}span,i,svg,[class="icon"]{background-color:transparent !important;color:#e2e8f0 !important}button,input,select,textarea,[role="button"]{background-color:#252932 !important;color:#f1f5f9 !important;border:1px solid #3f4654 !important}button:hover,[role="button"]:hover{background-color:#313744 !important}a{color:#90cdf4 !important}img,video{filter:brightness(.9) contrast(1.05) !important}img[src*=".svg"],img[src*="icon"],img[class*="icon"],img[class*="logo"],button img,a img[width]{filter:invert(.88) hue-rotate(180deg) brightness(1.1) !important}'
      : '';
  };

  $('tg-inv').onchange = function (e) {
    document.documentElement.classList.toggle('n-inv', e.target.checked);
  };

  $('tg-dark').onchange = function (e) {
    [hub, ovl, acOvl, toast, aiOvl].forEach(function (x) {
      x.classList.toggle('dark', e.target.checked);
    });
  };

  $('nova-cls').onclick = function () {
    setAc(0);
    st.st = 0;
    cancelAnimationFrame(st.rid);
    clearInterval(st.pid);
    document.body.contentEditable = 'false';
    document.documentElement.classList.remove('n-inv');
    hub.style.opacity = '0';
    setTimeout(function () {
      host.remove();
      gCss.remove();
      fdark.remove();
    }, 250);
  };
})();
