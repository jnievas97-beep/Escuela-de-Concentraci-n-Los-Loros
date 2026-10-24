/* Mejoras institucionales: filtros de noticias y navegación histórica. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const input = $('buscarNoticiasEscolares');
  const year = $('filtrarAnioNoticias');
  const clear = $('limpiarFiltrosNoticias');
  const list = $('noticiasEscuelaLista');
  const more = $('noticiasEscuelaVerMas');
  const status = $('estadoFiltrosNoticias');
  if (!input || !year || !list) return;
  let news = [];
  let expandedForFilter = false;
  let applying = false;
  const normalize = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const filtered = () => {
    const q = normalize(input.value.trim());
    const y = year.value;
    return news.filter(n => (!q || normalize([n.titulo, ...(n.parrafos || []), n.fecha].join(' ')).includes(q)) && (!y || String(n.fecha || '').startsWith(y)));
  };
  function refresh() {
    if (applying) return;
    applying = true;
    const active = Boolean(input.value.trim() || year.value);
    if (active && more && !expandedForFilter && !more.hidden && more.textContent.includes('anteriores')) {
      expandedForFilter = true;
      more.click();
    }
    const selected = filtered();
    const titles = new Set(selected.map(n => n.titulo));
    list.querySelectorAll('.noticias-escolares-tarjeta').forEach(card => {
      const title = card.querySelector('h3')?.textContent || '';
      card.hidden = active && !titles.has(title);
    });
    if (more) more.hidden = active || news.length <= 3;
    if (status) status.textContent = active ? `${selected.length} ${selected.length === 1 ? 'noticia encontrada' : 'noticias encontradas'}` : '';
    applying = false;
  }
  fetch('noticias/noticias.json?v=' + Date.now(), {cache:'no-store'})
    .then(r => {if (!r.ok) throw Error('No se pudo cargar el catálogo'); return r.json();})
    .then(data => {
      news = (Array.isArray(data) ? data : []).filter(n => n && n.formato === 'texto' && typeof n.titulo === 'string');
      const years = [...new Set(news.map(n => String(n.fecha || '').slice(0,4)).filter(x => /^\d{4}$/.test(x)))].sort().reverse();
      years.forEach(y => {const o = document.createElement('option'); o.value = y; o.textContent = y; year.append(o);});
      refresh();
    }).catch(() => {if (status) status.textContent = 'No se pudo cargar el catálogo de noticias.';});
  input.addEventListener('input', refresh);
  year.addEventListener('change', refresh);
  if (clear) clear.addEventListener('click', () => {input.value = ''; year.value = ''; refresh(); input.focus();});
  if (more) more.addEventListener('click', () => {if (input.value.trim() || year.value) requestAnimationFrame(refresh);});
  document.querySelectorAll('.historia-saltos a').forEach(a => a.addEventListener('click', e => {
    const target = a.getAttribute('href');
    if (!target || !target.startsWith('#')) return;
    const el = document.getElementById(target.slice(1));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'});
    el.setAttribute('tabindex','-1'); el.focus({preventScroll:true});
  }));
})();
