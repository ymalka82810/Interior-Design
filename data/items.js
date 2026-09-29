// קטלוג הפריטים. כל פריט הוא מוצר אמיתי מאתר החנות, עם קישור ומחיר שנבדקו ב-29.9.2026.
// שדות:
//   id         - מזהה ייחודי
//   name       - שם הפריט (כמו באתר החנות)
//   category   - קטגוריה (מופיעה בסינון)
//   styles     - מזהי הסגנונות שהפריט מתאים להם (מתוך data/styles.js)
//   palettes   - מזהי פלטות הצבעים שהפריט מתאים להן
//   colors     - הצבעים העיקריים של הפריט (מוצגים כשאין תמונה)
//   variants   - גוונים לבחירה, כשהפריט מגיע בכמה גוונים (אופציונלי)
//   price      - מחיר בשקלים, כפי שהופיע באתר ביום הבדיקה (כולל מבצע אם היה)
//   priceFrom  - true כשזה מחיר התחלתי שתלוי במידה או בגוון ("החל מ-")
//   storeId    - הרשת שמוכרת את הפריט (מתוך data/stores.js)
//   url        - קישור לעמוד הפריט באתר החנות
//   image      - קישור לתמונה (אופציונלי; רק תמונה שהחנות אישרה להציג)
// אין כרגע תמונות: מוסיפים image רק אחרי שהחנות אישרה, או כשהתמונה מגיעה מתוכנית שותפים.

const ITEMS = [
  // ---------- הום סנטר ----------
  { id: 'hc01', name: 'שולחן סלון מלבני שיש 40X100 ס"מ, לבן', category: 'שולחנות', styles: ['modern'], palettes: ['mono-light', 'black-white'], colors: ['#F2F2EF', '#1E1E1E'], price: 299.9, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1769080073467' },
  { id: 'hc02', name: 'שולחן סלון עגול מיגו שחור, קוטר 45', category: 'שולחנות', styles: ['modern'], palettes: ['black-white'], colors: ['#1E1E1E', '#3A3A3A'], price: 169.9, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1713684492726' },
  { id: 'hc03', name: 'זוג שולחנות סלון דגם ליאם, גוון אלון', category: 'שולחנות', styles: ['modern'], palettes: ['warm-neutral'], colors: ['#B98D5F', '#D8C8B0'], price: 349, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1781791225861' },
  { id: 'hc04', name: 'שולחן אוכל דגם מעיין, גוון אלון', category: 'שולחנות', styles: ['modern'], palettes: ['warm-neutral'], colors: ['#B98D5F', '#E7DCCB'], price: 349, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1781791225841' },
  { id: 'hc05', name: 'כסא פינת אוכל דגם רומא, אפור', category: 'כיסאות', styles: ['modern'], palettes: ['mono-light'], colors: ['#8C8C8C', '#2B2B2B'], price: 129.9, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1705832754724' },
  { id: 'hc06', name: 'כסא אוכל טוליקס, ירוק זית', category: 'כיסאות', styles: ['modern'], palettes: ['sage'], colors: ['#6B7A55', '#5F6F58'], price: 99.9, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1785930875996' },
  { id: 'hc07', name: 'כסא אוכל טוליקס, כחול נייבי', category: 'כיסאות', styles: ['modern'], palettes: ['dusty-blue'], colors: ['#2E3F57', '#3E5366'], price: 99.9, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1785930875997' },
  { id: 'hc08', name: 'מנורת תלייה LUNARA 40 ס"מ, שחור', category: 'תאורה', styles: ['modern'], palettes: ['black-white'], colors: ['#1E1E1E', '#F5F5F2'], price: 279.92, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1752559566336' },
  { id: 'hc09', name: 'מדף צף 100 ס"מ, אלון', category: 'אחסון', styles: ['modern'], palettes: ['warm-neutral'], colors: ['#B98D5F', '#D8C8B0'], price: 119.9, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1694336471124' },
  { id: 'hc10', name: 'הדום קטיפה זואי, תכלת שמיים', category: 'הדומים', styles: ['modern'], palettes: ['dusty-blue'], colors: ['#A9C0D6', '#9FB1C2'], price: 429, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1745870435722' },

  // ---------- ACE ----------
  { id: 'ac01', name: 'ספה 3 מושבים דומיניק, אפור בהיר', category: 'ספות', styles: ['modern'], palettes: ['mono-light'], colors: ['#C9C9C5', '#A8A8A4'], price: 1399, storeId: 'ace', url: 'https://www.ace.co.il/5702468' },
  { id: 'ac02', name: 'ספה תלת-מושבית JASMIN, ירוק', category: 'ספות', styles: ['modern'], palettes: ['sage'], colors: ['#6B7A5E', '#A9B8A0'], price: 2197, storeId: 'ace', url: 'https://www.ace.co.il/600259' },
  { id: 'ac03', name: 'ספה תלת-מושבית Random 220 ס"מ, תכלת (URBAN)', category: 'ספות', styles: ['modern'], palettes: ['dusty-blue'], colors: ['#9FB8CC', '#7E98AE'], price: 3493, storeId: 'ace', url: 'https://www.ace.co.il/600046' },
  { id: 'ac04', name: 'כורסת בוקלה Vika, לבן', category: 'כורסאות', styles: ['modern'], palettes: ['mono-light', 'warm-neutral'], colors: ['#F3EFE7', '#E2DCD0'], price: 299, storeId: 'ace', url: 'https://www.ace.co.il/4481470' },
  { id: 'ac05', name: 'כורסה קליפורניה, ירוק', category: 'כורסאות', styles: ['modern'], palettes: ['sage'], colors: ['#5F6F58', '#A9B8A0'], price: 649, storeId: 'ace', url: 'https://www.ace.co.il/5702032' },
  { id: 'ac06', name: 'שולחן סלון NOVO 120 ס"מ, אלון מולבן', category: 'שולחנות', styles: ['modern'], palettes: ['warm-neutral', 'mono-light'], colors: ['#D9C7AE', '#EFE6D6'], price: 1149, storeId: 'ace', url: 'https://www.ace.co.il/601581' },
  { id: 'ac07', name: 'סט 2 שולחנות ליון, שחור', category: 'שולחנות', styles: ['modern'], palettes: ['black-white'], colors: ['#1E1E1E', '#444444'], price: 249, storeId: 'ace', url: 'https://www.ace.co.il/5702012' },
  { id: 'ac08', name: 'כסא פינת אוכל סלינה, קרם', category: 'כיסאות', styles: ['modern'], palettes: ['warm-neutral'], colors: ['#EDE3D1', '#D8C8B0'], price: 279, storeId: 'ace', url: 'https://www.ace.co.il/5702303' },
  { id: 'ac09', name: 'מנורת שולחן לד HAT, שחור', category: 'תאורה', styles: ['modern'], palettes: ['black-white'], colors: ['#1E1E1E', '#F5F5F2'], price: 290, storeId: 'ace', url: 'https://www.ace.co.il/332915' },
  { id: 'ac10', name: 'מנורת תלייה רשתית, לבן', category: 'תאורה', styles: ['modern'], palettes: ['mono-light'], colors: ['#FFFFFF', '#D9D9D6'], price: 49.9, storeId: 'ace', url: 'https://www.ace.co.il/7641884' },

  // ---------- פוקס הום ----------
  { id: 'fx01', name: 'כרית נוי Fabian, אפור בהיר', category: 'טקסטיל', styles: ['modern'], palettes: ['mono-light'], colors: ['#C9C9C5', '#EFE9DD'], price: 90.93, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/0318155800' },
  { id: 'fx02', name: 'כרית נוי Fabian, ירוק בהיר', category: 'טקסטיל', styles: ['modern'], palettes: ['sage'], colors: ['#B5C4A8', '#EFE9DD'], price: 90.93, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/0318152105' },
  { id: 'fx03', name: 'כרית נוי Mist, משבצות תכלת ולבן', category: 'טקסטיל', styles: ['modern'], palettes: ['dusty-blue'], colors: ['#A9C0D6', '#FFFFFF'], price: 125.93, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/0323156506' },
  { id: 'fx04', name: 'כרית נוי Betty, בז\' כהה', category: 'טקסטיל', styles: ['modern'], palettes: ['warm-neutral'], colors: ['#B8A07E', '#EFE6D6'], price: 83.93, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/0333796001' },
  { id: 'fx05', name: 'כרבולית Bar, אפור', category: 'טקסטיל', styles: ['modern'], palettes: ['mono-light'], colors: ['#9A9A96', '#C9C9C5'], price: 62.93, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/0333055800' },
  { id: 'fx06', name: 'שטיח Steve, זיגזג אפור ולבן', category: 'שטיחים', styles: ['modern'], palettes: ['mono-light', 'black-white'], colors: ['#9A9A96', '#FFFFFF'], price: 749.95, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/0317095800' },
  { id: 'fx07', name: 'שטיח Rene, שמנת עם קווים גאומטריים', category: 'שטיחים', styles: ['modern'], palettes: ['warm-neutral', 'mono-light'], colors: ['#EFE6D6', '#D8C8B0'], variants: 'מידות: 160X230 או 200X290', price: 1409.94, priceFrom: true, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/3219401' },
  { id: 'fx08', name: 'אגרטל פורצלן Honir, שחור מט', category: 'אקססוריז', styles: ['modern'], palettes: ['black-white'], colors: ['#1E1E1E', '#3A3A3A'], price: 20.97, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/0320550200' },
  { id: 'fx09', name: 'אגרטל זכוכית Terra, ירוק מעושן', category: 'אקססוריז', styles: ['modern'], palettes: ['sage'], colors: ['#6F7F62', '#A9B8A0'], price: 90.93, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/0336599996' },
  { id: 'fx10', name: 'מנורת לד שולחנית Lake, אפור מט וחלבי', category: 'תאורה', styles: ['modern'], palettes: ['mono-light'], colors: ['#8C8C8C', '#F2F2EF'], price: 90.93, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/0335555800' },

  // ---------- גולף & קו ----------
  { id: 'gf01', name: 'כרית נוי לין, אוף וויט', category: 'טקסטיל', styles: ['modern'], palettes: ['mono-light', 'warm-neutral'], colors: ['#F3EFE7', '#E2DCD0'], price: 119.9, storeId: 'golf', url: 'https://www.golfco.co.il/93656076200' },
  { id: 'gf02', name: 'כרית אורי, טבעי', category: 'טקסטיל', styles: ['modern'], palettes: ['warm-neutral'], colors: ['#D8C8B0', '#C2AB8A'], price: 89.9, storeId: 'golf', url: 'https://www.golfco.co.il/93656355900' },
  { id: 'gf03', name: 'כרית נוי שון, שמנת', category: 'טקסטיל', styles: ['modern'], palettes: ['warm-neutral', 'mono-light'], colors: ['#F1E9DA', '#E2D6C2'], price: 77.9, storeId: 'golf', url: 'https://www.golfco.co.il/9365624105' },
  { id: 'gf04', name: 'אגרטל מילקי, בז\'', category: 'אקססוריז', styles: ['modern'], palettes: ['warm-neutral'], colors: ['#D8C8B0', '#C8B596'], price: 77.9, storeId: 'golf', url: 'https://www.golfco.co.il/93476282100' },
  { id: 'gf05', name: 'אגרטל בנזי, אוף וויט', category: 'אקססוריז', styles: ['modern'], palettes: ['mono-light'], colors: ['#F3EFE7', '#E2DCD0'], price: 53.9, storeId: 'golf', url: 'https://www.golfco.co.il/9347618162' },
  { id: 'gf06', name: 'אגרטל מרומית, לבן', category: 'אקססוריז', styles: ['modern'], palettes: ['mono-light', 'black-white'], colors: ['#FFFFFF', '#E6E6E3'], price: 167.9, storeId: 'golf', url: 'https://www.golfco.co.il/93476170100' },

  // ---------- נלה ----------
  { id: 'nl01', name: 'שולחן סלון דגם Alaska', category: 'שולחנות', styles: ['modern'], palettes: ['warm-neutral', 'black-white', 'mono-light'], colors: ['#C49A6C', '#1E1E1E', '#F2F2EF'], variants: 'גוונים: אלון טבעי, שחור מט, לבן מט', price: 2490, priceFrom: true, storeId: 'nalla', url: 'https://www.nalla.co.il/product/%D7%A9%D7%95%D7%9C%D7%97%D7%9F-%D7%93%D7%92%D7%9D-%D7%B4alaska%D7%B4' },
  { id: 'nl02', name: 'שולחן סלון דגם Tony', category: 'שולחנות', styles: ['modern'], palettes: ['warm-neutral', 'black-white', 'mono-light'], colors: ['#C49A6C', '#1E1E1E', '#8C8C8C'], variants: 'גוונים: אלון טבעי, אלון שחור, לבן מט, אגוז אמריקאי, אפור בטון', price: 2790, priceFrom: true, storeId: 'nalla', url: 'https://www.nalla.co.il/product/%D7%A9%D7%95%D7%9C%D7%97%D7%9F-%D7%A1%D7%9C%D7%95%D7%9F-%D7%93%D7%92%D7%9D-%D7%B4tony%D7%B4' },
  { id: 'nl03', name: 'שולחן סלון דגם Kim', category: 'שולחנות', styles: ['modern'], palettes: ['warm-neutral', 'black-white'], colors: ['#C49A6C', '#1E1E1E'], variants: 'גוונים: אלון טבעי, אלון שחור', price: 2390, priceFrom: true, storeId: 'nalla', url: 'https://www.nalla.co.il/product/%D7%A9%D7%95%D7%9C%D7%97%D7%9F-%D7%A1%D7%9C%D7%95%D7%9F-%D7%93%D7%92%D7%9D-%D7%B4kim' }
];
