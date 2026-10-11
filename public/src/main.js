/* Language switch (DE/EN), theme toggle, list rendering, mailto form. No cookies, no storage. */
(function () {
  var C = window.CONTENT;
  var state = { lang: 'de', dark: true, legal: null };
  var META = {
    de: { title: 'William Paul – Projektleiter & Terminplaner Brownfield',
          desc: 'Freelance Projektleiter & Terminplaner für Brownfield-Projekte: integrierte Terminplanung in MS Project, kritischer Pfad, Risikomanagement für Rohrleitungs- und Utility-Bau. Deutschlandweit.' },
    en: { title: 'William Paul – Project Manager & Scheduler Brownfield',
          desc: 'Freelance project manager & scheduler for brownfield pipeline and utility projects: integrated MS Project scheduling, critical path reviews, risk management. Across Germany.' }
  };
  var THEME = { de: { light: 'Hell', dark: 'Dunkel' }, en: { light: 'Light', dark: 'Dark' } };
  var $ = function (id) { return document.getElementById(id); };
  function get(o, path) { return path.split('.').reduce(function (a, k) { return a == null ? a : a[k]; }, o); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function fill(id, items, build) { var box = $(id); box.textContent = ''; items.forEach(function (it) { box.appendChild(build(it)); }); }

  function render() {
    var t = C[state.lang];
    document.documentElement.lang = state.lang;
    document.documentElement.setAttribute('data-theme', state.dark ? 'dark' : 'light');
    document.title = META[state.lang].title;
    document.querySelector('meta[name="description"]').setAttribute('content', META[state.lang].desc);
    document.querySelectorAll('[data-i18n]').forEach(function (n) { n.textContent = get(t, n.getAttribute('data-i18n')); });
    $('langBtn').textContent = t.langBtn;
    $('themeBtn').textContent = state.dark ? THEME[state.lang].light : THEME[state.lang].dark;
    fill('nav', t.nav, function (n) { var a = el('a', null, n.label); a.href = n.href; return a; });
    fill('facts', t.facts, function (f) { var c = el('div', 'card'); c.appendChild(el('div', 'lbl sm', f.k)); c.appendChild(el('div', 'fv', f.v)); return c; });
    ['skills', 'services'].forEach(function (k) {
      fill(k + '-grid', t[k], function (s) { var c = el('div', 'card'); c.appendChild(el('h3', null, s.title)); c.appendChild(el('p', null, s.text)); return c; });
    });
    fill('projects-grid', t.projects, function (p) { var c = el('div', 'card'); c.appendChild(el('div', 'lbl sm', p.tag)); c.appendChild(el('h3', null, p.title)); c.appendChild(el('p', null, p.text)); return c; });
    var L = state.legal ? t.legal[state.legal] : null;
    $('legal').hidden = !L;
    if (L) {
      $('legal-title').textContent = L.title;
      fill('legal-body', L.blocks, function (b) { var d = el('div', 'lb'); d.appendChild(el('h3', null, b.h)); d.appendChild(el('p', null, b.p)); return d; });
    }
  }
  function openLegal(k) { state.legal = k; render(); setTimeout(function () { $('legal').scrollIntoView({ behavior: 'smooth' }); }, 60); }

  $('langBtn').addEventListener('click', function () { state.lang = state.lang === 'de' ? 'en' : 'de'; render(); });
  $('themeBtn').addEventListener('click', function () { state.dark = !state.dark; render(); });
  $('openImp').addEventListener('click', function () { openLegal('imp'); });
  $('openDp').addEventListener('click', function () { openLegal('dp'); });
  $('closeLegal').addEventListener('click', function () { state.legal = null; render(); });
  $('sendCv').addEventListener('click', function () {
    var subj = state.lang === 'de' ? 'Lebenslauf anfragen' : 'Résumé request';
    var body = $('f-name').value + ' (' + $('f-mail').value + ')\n\n' + $('f-msg').value;
    window.location.href = 'mailto:zappchilis@gmail.com?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
  });
  render();
})();
