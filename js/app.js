(function () {
  'use strict';

  const STORAGE_KEY = 'interior-design-choices';

  const state = {
    styleId: null,
    paletteId: null,
    location: null, // { lat, lng, label, source: 'geo' | 'city' }
    category: 'all',
    radius: 'all'
  };

  const $ = (id) => document.getElementById(id);

  // ---------- שמירת הבחירות בדפדפן ----------

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved) return;
      const style = STYLES.find((s) => s.id === saved.styleId && s.active);
      if (!style) return;
      state.styleId = style.id;
      if (style.palettes.includes(saved.paletteId)) state.paletteId = saved.paletteId;
      if (saved.location && typeof saved.location.lat === 'number') state.location = saved.location;
    } catch (e) { /* אין גישה לאחסון, ממשיכים בלי */ }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        styleId: state.styleId,
        paletteId: state.paletteId,
        location: state.location
      }));
    } catch (e) { /* אין גישה לאחסון, ממשיכים בלי */ }
  }

  // ---------- עזרים ----------

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([key, value]) => {
      if (value === null || value === undefined || value === false) return;
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? '' : value);
    });
    (children || []).forEach((child) => {
      if (child) node.append(child);
    });
    return node;
  }

  function swatch(colors, className) {
    return el('div', { class: className || 'swatch', 'aria-hidden': 'true' },
      colors.map((c) => el('span', { style: 'background:' + c })));
  }

  // מרחק בק"מ בין שתי נקודות (נוסחת האברסין)
  function distanceKm(a, b) {
    const R = 6371;
    const toRad = (d) => d * Math.PI / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function formatKm(km) {
    return (km < 10 ? km.toFixed(1) : Math.round(km)) + ' ק"מ';
  }

  function formatPrice(item) {
    const amount = '₪' + item.price.toLocaleString('he-IL', { maximumFractionDigits: 2 });
    return item.priceFrom ? 'החל מ-' + amount : amount;
  }

  // הסניף הקרוב ביותר של הרשת למיקום המשתמש
  function nearestBranch(store, location) {
    let best = null;
    store.branches.forEach((branch) => {
      const km = distanceKm(location, branch);
      if (!best || km < best.km) best = { branch, km };
    });
    return best;
  }

  function scrollToSection(id) {
    const node = $(id);
    if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ---------- שלב 1: סגנון ----------

  function renderStyles() {
    const list = $('style-list');
    list.replaceChildren(...STYLES.map((style) => {
      const selected = style.id === state.styleId;
      const previewColors = style.palettes.length
        ? style.palettes.slice(0, 3).map((p) => PALETTES[p].colors[1])
        : ['#E6E6E6', '#D0D0D0', '#BBBBBB'];
      return el('button', {
        type: 'button',
        class: 'card' + (selected ? ' selected' : '') + (style.active ? '' : ' disabled'),
        disabled: !style.active,
        'aria-pressed': selected ? 'true' : 'false',
        onclick: () => selectStyle(style.id)
      }, [
        swatch(previewColors),
        el('h3', { text: style.name }),
        el('p', { text: style.description }),
        style.active ? null : el('span', { class: 'badge', text: 'בקרוב' })
      ]);
    }));
  }

  function selectStyle(id) {
    if (state.styleId !== id) state.paletteId = null;
    state.styleId = id;
    saveState();
    render();
    scrollToSection('step-palette');
  }

  // ---------- שלב 2: פלטה ----------

  function renderPalettes() {
    const section = $('step-palette');
    const style = STYLES.find((s) => s.id === state.styleId);
    section.hidden = !style;
    if (!style) return;

    $('palette-list').replaceChildren(...style.palettes.map((pid) => {
      const palette = PALETTES[pid];
      const selected = pid === state.paletteId;
      return el('button', {
        type: 'button',
        class: 'card' + (selected ? ' selected' : ''),
        'aria-pressed': selected ? 'true' : 'false',
        onclick: () => selectPalette(pid)
      }, [
        swatch(palette.colors),
        el('h3', { text: palette.name }),
        el('p', { text: palette.description })
      ]);
    }));
  }

  function selectPalette(id) {
    state.paletteId = id;
    state.category = 'all';
    saveState();
    render();
    scrollToSection(state.location ? 'results' : 'step-location');
  }

  // ---------- שלב 3: מיקום ----------

  function setupLocation() {
    const select = $('city-select');
    CITIES.forEach((city) => select.append(el('option', { value: city.name, text: city.name })));

    select.addEventListener('change', () => {
      const city = CITIES.find((c) => c.name === select.value);
      if (!city) return;
      setLocation({ lat: city.lat, lng: city.lng, label: city.name, source: 'city' });
    });

    $('btn-geo').addEventListener('click', () => {
      const status = $('geo-status');
      if (!('geolocation' in navigator)) {
        status.textContent = 'הדפדפן לא תומך באיתור מיקום. בחרו עיר מהרשימה.';
        return;
      }
      status.textContent = 'מאתר את המיקום שלכם...';
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          select.value = '';
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: 'המיקום שלי', source: 'geo' });
        },
        () => {
          status.textContent = 'לא הצלחנו לאתר את המיקום. בחרו עיר מהרשימה.';
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
      );
    });
  }

  function setLocation(location) {
    state.location = location;
    saveState();
    render();
    scrollToSection('results');
  }

  function renderLocation() {
    const section = $('step-location');
    section.hidden = !state.paletteId;
    if (state.location) {
      $('geo-status').textContent = 'מחפשים לפי: ' + state.location.label;
      if (state.location.source === 'city') $('city-select').value = state.location.label;
    }
  }

  // ---------- תוצאות ----------

  function matchingItems() {
    return ITEMS
      .filter((item) => item.styles.includes(state.styleId) && item.palettes.includes(state.paletteId))
      .map((item) => {
        const store = STORES.find((s) => s.id === item.storeId);
        if (!store || !store.branches.length) return null;
        const { branch, km } = nearestBranch(store, state.location);
        return { item, store, branch, km };
      })
      .filter(Boolean);
  }

  function renderFilters(matches) {
    const select = $('category-select');
    const categories = [...new Set(matches.map((m) => m.item.category))].sort((a, b) => a.localeCompare(b, 'he'));
    if (!categories.includes(state.category)) state.category = 'all';
    select.replaceChildren(
      el('option', { value: 'all', text: 'הכול' }),
      ...categories.map((c) => el('option', { value: c, text: c }))
    );
    select.value = state.category;
    $('radius-select').value = state.radius;
  }

  function itemCard({ item, store, branch, km }) {
    const visual = item.image
      ? el('img', { class: 'item-image', src: item.image, alt: item.name, loading: 'lazy' })
      : swatch(item.colors, 'item-swatch');

    // חיפוש לפי שם הסניף והכתובת, כדי שהניווט יגיע לחנות עצמה גם כשהקואורדינטות מקורבות
    const mapUrl = 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(store.name + ' ' + branch.name + ', ' + branch.address);

    return el('article', { class: 'item-card' }, [
      visual,
      el('div', { class: 'item-body' }, [
        el('span', { class: 'item-category', text: item.category }),
        el('h3', { text: item.name }),
        item.variants ? el('p', { class: 'item-variants', text: item.variants }) : null,
        el('p', { class: 'item-price', text: formatPrice(item) }),
        el('p', { class: 'item-store' }, [
          el('strong', { text: store.name }),
          document.createTextNode(' · סניף ' + branch.name + ' · ' + formatKm(km))
        ]),
        el('div', { class: 'item-actions' }, [
          item.url
            ? el('a', { class: 'btn', href: item.url, target: '_blank', rel: 'noopener', text: 'לפריט באתר החנות' })
            : el('span', { class: 'btn btn-disabled', text: 'קישור לחנות יתווסף' }),
          el('a', { class: 'btn btn-ghost', href: mapUrl, target: '_blank', rel: 'noopener', text: 'ניווט לסניף' })
        ])
      ])
    ]);
  }

  function renderResults() {
    const section = $('results');
    const ready = state.styleId && state.paletteId && state.location;
    section.hidden = !ready;
    if (!ready) return;

    const matches = matchingItems();
    renderFilters(matches);

    const shown = matches
      .filter((m) => state.category === 'all' || m.item.category === state.category)
      .filter((m) => state.radius === 'all' || m.km <= Number(state.radius))
      .sort((a, b) => a.km - b.km);

    const list = $('item-list');
    const summary = $('results-summary');

    if (!matches.length) {
      summary.textContent = 'עדיין אין פריטים בפלטה הזו. נסו פלטה אחרת.';
      list.replaceChildren();
      return;
    }
    if (!shown.length) {
      summary.textContent = 'אין פריטים מתאימים בטווח הזה. נסו להגדיל את המרחק.';
      list.replaceChildren();
      return;
    }

    summary.textContent = 'נמצאו ' + shown.length + ' פריטים, מהקרוב לרחוק';
    list.replaceChildren(...shown.map(itemCard));
  }

  function setupFilters() {
    $('category-select').addEventListener('change', (e) => {
      state.category = e.target.value;
      renderResults();
    });
    $('radius-select').addEventListener('change', (e) => {
      state.radius = e.target.value;
      renderResults();
    });
  }

  // ---------- הפעלה ----------

  function render() {
    renderStyles();
    renderPalettes();
    renderLocation();
    renderResults();
  }

  loadState();
  setupLocation();
  setupFilters();
  render();
})();
