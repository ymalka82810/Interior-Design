(function () {
  'use strict';

  const STORAGE_KEY = 'interior-design-choices';
  const ROOM_KEY = 'interior-design-room';
  const MAX_QTY = 20;

  const state = {
    styleId: null,
    paletteId: null,
    location: null, // { lat, lng, label, source: 'geo' | 'city' }
    category: 'all',
    radius: 'all'
  };

  // הרשימה של המשתמש: פריטים שנשמרו, כמות לכל פריט ותקציב
  const room = {
    items: [], // [{ id, qty }]
    budget: null
  };

  const $ = (id) => document.getElementById(id);

  // ---------- שמירת הבחירות בדפדפן ----------

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved) return;
      // המיקום נטען גם בלי סגנון, כי הוא משמש גם את מסלול הקניות בעמוד "החדר שלי"
      if (saved.location && typeof saved.location.lat === 'number') state.location = saved.location;
      const style = STYLES.find((s) => s.id === saved.styleId && s.active);
      if (!style) return;
      state.styleId = style.id;
      if (style.palettes.includes(saved.paletteId)) state.paletteId = saved.paletteId;
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

  // מנקה רשימה שהגיעה מהאחסון או מקישור: רק פריטים שקיימים בקטלוג, כמות סבירה, בלי כפילויות
  function cleanRoomItems(items) {
    const seen = new Set();
    return (Array.isArray(items) ? items : []).filter((entry) => {
      if (!entry || seen.has(entry.id) || !ITEMS.some((i) => i.id === entry.id)) return false;
      seen.add(entry.id);
      return true;
    }).map((entry) => ({ id: entry.id, qty: clampQty(entry.qty) }));
  }

  function clampQty(qty) {
    const n = Math.round(Number(qty));
    return Number.isFinite(n) ? Math.min(Math.max(n, 1), MAX_QTY) : 1;
  }

  function cleanBudget(value) {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
  }

  function loadRoom() {
    try {
      const saved = JSON.parse(localStorage.getItem(ROOM_KEY));
      if (!saved) return;
      room.items = cleanRoomItems(saved.items);
      room.budget = cleanBudget(saved.budget);
    } catch (e) { /* אין גישה לאחסון, ממשיכים בלי */ }
  }

  function saveRoom() {
    try {
      localStorage.setItem(ROOM_KEY, JSON.stringify(room));
    } catch (e) { /* אין גישה לאחסון, ממשיכים בלי */ }
  }

  function isSaved(id) {
    return room.items.some((entry) => entry.id === id);
  }

  function toggleSaved(id) {
    if (isSaved(id)) room.items = room.items.filter((entry) => entry.id !== id);
    else room.items.push({ id, qty: 1 });
    saveRoom();
    renderRoomCount();
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

  // תמונת השראה עם פס הצבעים מתחתיה. בלי תמונה, רק פס הצבעים.
  function cardVisual(image, colors) {
    if (!image) return swatch(colors);
    return el('div', { class: 'card-visual' }, [
      el('img', { src: image.src, alt: image.alt, loading: 'lazy' }),
      swatch(colors, 'swatch swatch-strip')
    ]);
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

  function formatShekel(amount) {
    return '₪' + amount.toLocaleString('he-IL', { maximumFractionDigits: 2 });
  }

  function formatPrice(item, qty) {
    const amount = formatShekel(item.price * (qty || 1));
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

  // חיפוש לפי שם הסניף והכתובת, כדי שהניווט יגיע לחנות עצמה גם כשהקואורדינטות מקורבות
  function placeQuery(store, branch) {
    return store.name + ' ' + branch.name + ', ' + branch.address;
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
        cardVisual(style.image, previewColors),
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
        cardVisual(palette.image, palette.colors),
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

  function cityOptions(select) {
    select.append(...CITIES.map((city) => el('option', { value: city.name, text: city.name })));
  }

  function selectCity(name) {
    const city = CITIES.find((c) => c.name === name);
    if (city) setLocation({ lat: city.lat, lng: city.lng, label: city.name, source: 'city' });
  }

  function locateMe(status) {
    if (!('geolocation' in navigator)) {
      status.textContent = 'הדפדפן לא תומך באיתור מיקום. בחרו עיר מהרשימה.';
      return;
    }
    status.textContent = 'מאתר את המיקום שלכם...';
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        $('city-select').value = '';
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: 'המיקום שלי', source: 'geo' });
      },
      () => {
        status.textContent = 'לא הצלחנו לאתר את המיקום. בחרו עיר מהרשימה.';
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
    );
  }

  function setupLocation() {
    const select = $('city-select');
    cityOptions(select);
    select.addEventListener('change', () => selectCity(select.value));
    $('btn-geo').addEventListener('click', () => locateMe($('geo-status')));
  }

  function setLocation(location) {
    state.location = location;
    saveState();
    render();
    if (currentView() === 'search') scrollToSection('results');
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

  function saveButton(item) {
    const button = el('button', { type: 'button', class: 'save-btn' });
    const paint = () => {
      const saved = isSaved(item.id);
      button.textContent = saved ? '✓ נשמר' : '+ שמירה';
      button.classList.toggle('saved', saved);
      button.setAttribute('aria-pressed', saved ? 'true' : 'false');
      button.title = saved ? 'הסרה מהחדר שלי' : 'שמירה בחדר שלי';
    };
    button.addEventListener('click', () => {
      toggleSaved(item.id);
      paint();
    });
    paint();
    return button;
  }

  function itemCard({ item, store, branch, km }) {
    const visual = item.image
      ? el('img', { class: 'item-image', src: item.image, alt: item.name, loading: 'lazy' })
      : swatch(item.colors, 'item-swatch');

    const mapUrl = 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(placeQuery(store, branch));

    return el('article', { class: 'item-card' }, [
      el('div', { class: 'item-visual' }, [visual, saveButton(item)]),
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

    summary.textContent = 'נמצאו ' + shown.length + ' פריטים, מהקרוב לרחוק. שמרו את מה שאהבתם כדי להרכיב את החדר.';
    list.replaceChildren(...shown.map(itemCard));
  }

  // תמונת החדר שמתאימה לסגנון ולפלטה שנבחרו, כדי לראות את הכיוון תוך כדי בחירת פריטים
  function renderInspiration() {
    const box = $('inspiration');
    const style = STYLES.find((s) => s.id === state.styleId);
    const palette = PALETTES[state.paletteId];
    const image = palette && palette.image;
    box.hidden = !(style && image);
    if (box.hidden) return;

    box.replaceChildren(
      el('img', { src: image.src, alt: image.alt }),
      el('figcaption', {}, [
        el('strong', { text: 'כך זה יכול להיראות: ' + style.name + ' בפלטת ' + palette.name }),
        el('span', { class: 'credit' }, [
          document.createTextNode('צילום: ' + image.credit + ', '),
          el('a', { href: image.source, target: '_blank', rel: 'noopener', text: 'רישיון חופשי (CC0)' })
        ])
      ])
    );
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

  // ---------- החדר שלי ----------

  // רשימה ששותפה בקישור: #room?items=hc01.2,ac04&budget=5000
  function sharedRoom() {
    const query = location.hash.split('?')[1];
    if (!query) return null;
    const params = new URLSearchParams(query);
    const items = cleanRoomItems((params.get('items') || '').split(',').filter(Boolean).map((part) => {
      const [id, qty] = part.split('.');
      return { id, qty: qty || 1 };
    }));
    return { items, budget: cleanBudget(params.get('budget')) };
  }

  function shareLink() {
    if (!/^https?:$/.test(location.protocol)) return null; // קובץ מקומי: לקישור אין משמעות אצל מישהו אחר
    const items = room.items.map((e) => (e.qty > 1 ? e.id + '.' + e.qty : e.id)).join(',');
    return location.origin + location.pathname + '#room?items=' + items +
      (room.budget ? '&budget=' + room.budget : '');
  }

  function roomEntries(list) {
    return list.items.map(({ id, qty }) => {
      const item = ITEMS.find((i) => i.id === id);
      const store = item && STORES.find((s) => s.id === item.storeId);
      return store ? { item, store, qty } : null;
    }).filter(Boolean);
  }

  function roomTotal(entries) {
    return entries.reduce((sum, e) => sum + e.item.price * e.qty, 0);
  }

  // סדר החנויות שממזער את הדרך הכוללת מהבית (בלי חזרה). מספר הרשתות קטן, אז בודקים את כל הסדרים.
  function planRoute(stores, origin) {
    const stops = stores
      .filter((store) => store.branches.length)
      .map((store) => ({ store, branch: nearestBranch(store, origin).branch }));

    let best = { length: Infinity, order: [] };
    const visit = (from, order, remaining, length) => {
      if (length >= best.length) return;
      if (!remaining.length) {
        best = { length, order };
        return;
      }
      remaining.forEach((stop, i) => {
        visit(stop.branch, order.concat(stop), remaining.filter((_, j) => j !== i),
          length + distanceKm(from, stop.branch));
      });
    };
    visit(origin, [], stops, 0);

    let from = origin;
    return best.order.map((stop) => {
      const km = distanceKm(from, stop.branch);
      from = stop.branch;
      return Object.assign({ km }, stop);
    });
  }

  function directionsUrl(route, origin) {
    const places = route.map((stop) => placeQuery(stop.store, stop.branch));
    const waypoints = places.slice(0, -1);
    return 'https://www.google.com/maps/dir/?api=1' +
      '&origin=' + origin.lat + ',' + origin.lng +
      '&destination=' + encodeURIComponent(places[places.length - 1]) +
      (waypoints.length ? '&waypoints=' + encodeURIComponent(waypoints.join('|')) : '') +
      '&travelmode=driving';
  }

  function storesOf(entries) {
    return [...new Set(entries.map((e) => e.store))];
  }

  function budgetStatus(total, budget, hasFrom) {
    const nodes = [
      el('p', { class: 'room-total' }, [
        el('span', { class: 'room-total-label', text: 'סה"כ' }),
        el('strong', { text: formatShekel(total) })
      ])
    ];
    if (hasFrom) {
      nodes.push(el('p', { class: 'room-note', text: 'חלק מהמחירים הם מחירים התחלתיים, והמחיר הסופי תלוי במידה או בגוון.' }));
    }
    if (!budget) {
      nodes.push(el('p', { class: 'room-note', text: 'הגדירו תקציב כדי לראות כמה נשאר.' }));
      return nodes;
    }
    const left = budget - total;
    const over = left < 0;
    const bar = el('div', { class: 'budget-bar' + (over ? ' over' : ''), 'aria-hidden': 'true' }, [
      el('span', { style: 'width:' + Math.min(100, total / budget * 100) + '%' })
    ]);
    nodes.push(bar, el('p', {
      class: 'budget-left' + (over ? ' over' : ''),
      text: over
        ? 'חריגה של ' + formatShekel(-left) + ' מהתקציב'
        : 'נשארו ' + formatShekel(left) + ' מתוך ' + formatShekel(budget)
    }));
    return nodes;
  }

  function budgetPanel(entries, list, editable) {
    const total = roomTotal(entries);
    const hasFrom = entries.some((e) => e.item.priceFrom);
    const status = el('div', { class: 'budget-status', 'aria-live': 'polite' }, budgetStatus(total, list.budget, hasFrom));

    const field = editable
      ? el('label', { class: 'budget-field' }, [
        document.createTextNode('תקציב לחדר (₪)'),
        el('input', {
          type: 'number', min: '0', step: '100', inputmode: 'numeric', placeholder: 'למשל 5000',
          value: list.budget || '',
          oninput: (e) => {
            room.budget = cleanBudget(e.target.value);
            saveRoom();
            status.replaceChildren(...budgetStatus(total, room.budget, hasFrom));
          }
        })
      ])
      : null;

    return el('section', { class: 'room-panel budget-panel' }, [status, field]);
  }

  function changeQty(id, delta) {
    const entry = room.items.find((e) => e.id === id);
    if (!entry) return;
    entry.qty = clampQty(entry.qty + delta);
    saveRoom();
    renderRoom();
  }

  function removeFromRoom(id) {
    room.items = room.items.filter((e) => e.id !== id);
    saveRoom();
    render();
  }

  function roomItemRow({ item, store, qty }, editable) {
    const qtyControl = editable
      ? el('div', { class: 'qty', role: 'group', 'aria-label': 'כמות' }, [
        el('button', {
          type: 'button', class: 'qty-btn', 'aria-label': 'הפחתת כמות', 'data-focus': 'minus-' + item.id,
          disabled: qty <= 1, onclick: () => changeQty(item.id, -1), text: '−'
        }),
        el('span', { class: 'qty-value', text: String(qty) }),
        el('button', {
          type: 'button', class: 'qty-btn', 'aria-label': 'הוספת כמות', 'data-focus': 'plus-' + item.id,
          disabled: qty >= MAX_QTY, onclick: () => changeQty(item.id, 1), text: '+'
        })
      ])
      : (qty > 1 ? el('span', { class: 'qty-value', text: '×' + qty }) : null);

    return el('li', { class: 'room-item' }, [
      swatch(item.colors, 'room-item-swatch'),
      el('div', { class: 'room-item-info' }, [
        el('span', { class: 'item-category', text: item.category + ' · ' + store.name }),
        el('h4', { text: item.name }),
        item.variants ? el('p', { class: 'item-variants', text: item.variants }) : null,
        el('p', { class: 'room-item-links' }, [
          item.url ? el('a', { href: item.url, target: '_blank', rel: 'noopener', text: 'לפריט באתר החנות' }) : null,
          editable ? el('button', { type: 'button', class: 'link-btn', onclick: () => removeFromRoom(item.id), text: 'הסרה' }) : null
        ])
      ]),
      el('div', { class: 'room-item-price' }, [
        qtyControl,
        el('strong', { text: formatPrice(item, qty) }),
        qty > 1 ? el('span', { class: 'room-note', text: formatShekel(item.price) + ' ליחידה' }) : null
      ])
    ]);
  }

  function itemsPanel(entries, editable) {
    return el('section', { class: 'room-panel' }, [
      el('h3', { text: 'הפריטים (' + entries.length + ')' }),
      el('ul', { class: 'room-items' }, entries.map((e) => roomItemRow(e, editable)))
    ]);
  }

  function locationPicker() {
    const status = el('p', { class: 'status', 'aria-live': 'polite' });
    const select = el('select', { 'aria-label': 'בחירת עיר', onchange: (e) => selectCity(e.target.value) }, [
      el('option', { value: '', text: 'בחרו עיר מהרשימה' })
    ]);
    cityOptions(select);
    return el('div', {}, [
      el('p', { class: 'room-note', text: 'כדי לסדר את החנויות לפי מסלול, ספרו לנו מאיפה יוצאים.' }),
      el('div', { class: 'location-row' }, [
        el('button', { type: 'button', class: 'btn', onclick: () => locateMe(status), text: '📍 השתמשו במיקום שלי' }),
        el('span', { class: 'or', text: 'או' }),
        select
      ]),
      status
    ]);
  }

  function routePanel(entries) {
    const stores = storesOf(entries);
    const panel = el('section', { class: 'room-panel' }, [el('h3', { text: 'מסלול קניות' })]);

    if (!state.location) {
      panel.append(
        el('ul', { class: 'route-plain' }, stores.map((s) => el('li', { text: s.name }))),
        locationPicker()
      );
      return panel;
    }

    const route = planRoute(stores, state.location);
    panel.append(
      el('p', { class: 'room-note', text: 'יוצאים מ: ' + state.location.label + '. הסדר נבחר כך שהדרך הכוללת תהיה הקצרה ביותר.' }),
      el('ol', { class: 'route' }, route.map((stop, i) => el('li', { class: 'route-stop' }, [
        el('span', { class: 'step-num', text: String(i + 1) }),
        el('div', {}, [
          el('p', { class: 'route-store' }, [
            el('strong', { text: stop.store.name }),
            document.createTextNode(' · סניף ' + stop.branch.name)
          ]),
          el('p', { class: 'room-note', text: stop.branch.address + ' · ' + formatKm(stop.km) + (i ? ' מהתחנה הקודמת' : ' מהבית') }),
          el('p', {
            class: 'route-items',
            text: 'לאסוף: ' + entries.filter((e) => e.store === stop.store)
              .map((e) => e.item.name + (e.qty > 1 ? ' ×' + e.qty : '')).join(', ')
          })
        ])
      ]))),
      el('a', { class: 'btn', href: directionsUrl(route, state.location), target: '_blank', rel: 'noopener', text: 'פתחו את המסלול בגוגל מפות' }),
      el('p', { class: 'room-note', text: 'המרחקים בקו אוויר, לסניף הקרוב של כל רשת. אין לנו מידע על מלאי בסניפים, ולכן כדאי להתקשר לפני שיוצאים.' })
    );
    return panel;
  }

  function shareText(entries) {
    const total = roomTotal(entries);
    const lines = ['החדר שלי: רשימת קניות', ''];
    entries.forEach(({ item, store, qty }) => {
      lines.push('• ' + item.name + (qty > 1 ? ' ×' + qty : '') + ' · ' + formatPrice(item, qty) + ' · ' + store.name);
      if (item.url) lines.push(item.url);
    });
    lines.push('', 'סה"כ: ' + formatShekel(total) + (entries.some((e) => e.item.priceFrom) ? ' (חלק מהמחירים התחלתיים)' : ''));
    if (room.budget) {
      const left = room.budget - total;
      lines.push('תקציב: ' + formatShekel(room.budget) + ' · ' +
        (left < 0 ? 'חריגה של ' + formatShekel(-left) : 'נשארו ' + formatShekel(left)));
    }
    if (state.location) {
      lines.push('מסלול: ' + planRoute(storesOf(entries), state.location)
        .map((stop) => stop.store.name + ' ' + stop.branch.name).join(' ← '));
    }
    const link = shareLink();
    if (link) lines.push('', 'לצפייה ברשימה ולהוספה לרשימה שלך: ' + link);
    return lines.join('\n');
  }

  function sharePanel(entries) {
    const whatsappUrl = () => 'https://wa.me/?text=' + encodeURIComponent(shareText(entries));
    return el('section', { class: 'room-panel' }, [
      el('h3', { text: 'להחליט ביחד' }),
      el('p', { class: 'room-note', text: 'שלחו את הרשימה בוואטסאפ, עם המחירים, הקישורים לפריטים והסכום הכולל.' }),
      el('a', {
        class: 'btn btn-whatsapp',
        href: whatsappUrl(),
        target: '_blank', rel: 'noopener', text: 'שיתוף בוואטסאפ',
        // התקציב יכול להשתנות אחרי הציור, אז בונים את ההודעה מחדש ברגע הלחיצה
        onclick: (e) => { e.currentTarget.href = whatsappUrl(); }
      })
    ]);
  }

  function mergeShared(shared) {
    shared.items.forEach((entry) => {
      const own = room.items.find((e) => e.id === entry.id);
      if (own) own.qty = Math.max(own.qty, entry.qty);
      else room.items.push({ id: entry.id, qty: entry.qty });
    });
    if (!room.budget) room.budget = shared.budget;
    saveRoom();
    location.hash = '#room';
  }

  function sharedBanner(shared, count) {
    return el('div', { class: 'notice' }, [
      el('p', { text: count
        ? 'שיתפו איתכם רשימה של ' + count + ' פריטים. המסלול מחושב לפי המיקום שלכם.'
        : 'הקישור לא כולל פריטים שקיימים אצלנו בקטלוג.' }),
      el('div', { class: 'item-actions' }, [
        count ? el('button', { type: 'button', class: 'btn', onclick: () => mergeShared(shared), text: 'הוסיפו לרשימה שלי' }) : null,
        el('a', { class: 'btn btn-ghost', href: '#room', text: 'לרשימה שלי' })
      ])
    ]);
  }

  function renderRoom() {
    const shared = sharedRoom();
    const list = shared || room;
    const editable = !shared;
    const entries = roomEntries(list);
    const focusKey = document.activeElement && document.activeElement.getAttribute('data-focus');

    $('room-title').textContent = shared ? 'רשימה ששיתפו איתכם' : 'החדר שלי';

    const parts = [];
    if (shared) parts.push(sharedBanner(shared, entries.length));
    if (!entries.length) {
      if (editable) {
        parts.push(el('div', { class: 'empty' }, [
          el('p', { text: 'עוד לא שמרתם פריטים. בחיפוש, לחצו "שמירה" על כל פריט שמתאים לחדר.' }),
          el('a', { class: 'btn', href: '#search', text: 'לחיפוש פריטים' })
        ]));
      }
      $('room-content').replaceChildren(...parts);
      return;
    }

    parts.push(
      budgetPanel(entries, list, editable),
      itemsPanel(entries, editable),
      routePanel(entries),
      editable ? sharePanel(entries) : null
    );
    $('room-content').replaceChildren(...parts.filter(Boolean));

    // אחרי ציור מחדש, מחזירים את הפוקוס לכפתור הכמות שנלחץ
    if (focusKey) {
      const target = $('room-content').querySelector('[data-focus="' + focusKey + '"]');
      if (target && !target.disabled) target.focus();
    }
  }

  function renderRoomCount() {
    const count = $('room-count');
    count.hidden = !room.items.length;
    count.textContent = room.items.length;
  }

  // ---------- תצוגות ----------

  function currentView() {
    return location.hash.startsWith('#room') ? 'room' : 'search';
  }

  function renderView() {
    const view = currentView();
    $('view-search').hidden = view !== 'search';
    $('view-room').hidden = view !== 'room';
    $('tab-search').setAttribute('aria-current', view === 'search' ? 'page' : 'false');
    $('tab-room').setAttribute('aria-current', view === 'room' ? 'page' : 'false');
  }

  // ---------- הפעלה ----------

  function render() {
    renderView();
    renderStyles();
    renderPalettes();
    renderLocation();
    renderResults();
    renderInspiration();
    renderRoomCount();
    if (currentView() === 'room') renderRoom();
  }

  window.addEventListener('hashchange', () => {
    render();
    window.scrollTo(0, 0);
  });

  loadState();
  loadRoom();
  setupLocation();
  setupFilters();
  render();
})();
