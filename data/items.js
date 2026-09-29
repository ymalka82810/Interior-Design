// קטלוג הפריטים. כל פריט הוא מוצר אמיתי מאתר החנות, עם קישור ומחיר שנבדקו ב-29.9.2026
// (פריטי הסגנונות תעשייתי וקלאסי נבדקו ב-30.9.2026).
// שדות:
//   id         - מזהה ייחודי. לא ממחזרים מזהה של פריט שהוסר: הוא עלול להיות שמור בחדר של משתמש או בקישור שיתוף
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
  { id: 'hc12', name: 'ספה לולה דו מושבית דמוי עור, שחור', category: 'ספות', styles: ['industrial'], palettes: ['raw-steel'], colors: ['#1C1F22', '#3A3A3A'], price: 1999, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1699516079124' },
  { id: 'hc13', name: 'מזנון טלוויזיה 150 ס"מ דגם בר, צבע בטון', category: 'אחסון', styles: ['industrial'], palettes: ['concrete-grey'], colors: ['#A8A49C', '#D6D3CD'], price: 399, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1781791225814' },
  { id: 'hc14', name: 'זוג שולחנות עגולים דגם ליטל, שחור עם בטון', category: 'שולחנות', styles: ['industrial'], palettes: ['concrete-grey', 'raw-steel'], colors: ['#1C1F22', '#8C8984'], price: 299, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1781791225871' },
  { id: 'hc15', name: 'שולחן סלון BurnWoodBlack', category: 'שולחנות', styles: ['industrial'], palettes: ['raw-steel'], colors: ['#1C1F22', '#8C7A55'], price: 1800, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1777298407238' },
  { id: 'hc16', name: 'שולחן עבודה עם מדפי אחסון צדדיים בסגנון תעשייתי', category: 'שולחנות', styles: ['industrial'], palettes: ['raw-steel'], colors: ['#1C1F22', '#B58A5C'], price: 319, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1773241205573' },
  { id: 'hc17', name: 'מעמד 5 קומות דגם KORA, שחור', category: 'אחסון', styles: ['industrial'], palettes: ['raw-steel'], colors: ['#1C1F22', '#4A4A4A'], price: 199, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1767042020115' },
  { id: 'hc18', name: 'כוננית מדפים מעוצבת 100X200 ס"מ, מתכת שחורה', category: 'אחסון', styles: ['industrial'], palettes: ['raw-steel'], colors: ['#1C1F22', '#2E2E2E'], price: 799.9, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1673251645607' },
  { id: 'hc19', name: 'כסא בר אלטו דמוי עור, שחור עם רגלי מתכת', category: 'כיסאות', styles: ['industrial'], palettes: ['raw-steel'], colors: ['#1C1F22', '#3A3A3A'], price: 229, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1737617306608' },
  { id: 'hc20', name: 'כסא טאמפה דמוי עור, אפור כהה', category: 'כיסאות', styles: ['industrial'], palettes: ['raw-steel', 'concrete-grey'], colors: ['#4A4A4A', '#1C1F22'], price: 199.9, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1737618972482' },
  { id: 'hc21', name: 'גוף תאורה רטרו צמוד קיר, נחושת', category: 'תאורה', styles: ['industrial'], palettes: ['rust-copper'], colors: ['#A87B3E', '#6B4E2A'], price: 43.92, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1737538689885' },
  { id: 'hc22', name: 'מנורת קיר GOLAN מתכווננת, שחור וזהב', category: 'תאורה', styles: ['industrial'], palettes: ['raw-steel'], colors: ['#1C1F22', '#B8975A'], price: 119.9, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1773757384515' },
  { id: 'hc23', name: 'שטיח סקאי A3 160X230, אפור', category: 'שטיחים', styles: ['industrial'], palettes: ['concrete-grey'], colors: ['#A8A49C', '#C9C6C0'], price: 623.9, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1753701622466' },
  { id: 'hc24', name: 'שטיח קרלטון 133X183, בריק', category: 'שטיחים', styles: ['industrial'], palettes: ['rust-copper'], colors: ['#B5412B', '#8C3222'], price: 249.9, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1772701819394' },
  { id: 'hc25', name: 'שטיח מאוריציוס 133X183, אדמה', category: 'שטיחים', styles: ['industrial'], palettes: ['rust-copper'], colors: ['#B98463', '#E3B08C'], price: 479.9, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1785737646991' },
  { id: 'hc26', name: 'גוף תאורה תלוי MAYA, 3 נורות, שחור וזהב', category: 'תאורה', styles: ['classic'], palettes: ['burgundy-gold'], colors: ['#C9A227', '#1C1F22'], price: 239.9, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1734010934356' },
  { id: 'hc27', name: 'מראת גוף אובלית 40X150 ס"מ, זהב', category: 'אקססוריז', styles: ['classic'], palettes: ['burgundy-gold'], colors: ['#C9A227', '#EDE0C8'], price: 199.9, storeId: 'homecenter', url: 'https://www.homecenter.co.il/products/1707984837750' },

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
  { id: 'ac11', name: 'מנורת תלייה רשתית, שחור', category: 'תאורה', styles: ['industrial'], palettes: ['raw-steel'], colors: ['#1C1F22', '#787D82'], price: 49.9, storeId: 'ace', url: 'https://www.ace.co.il/7641921' },
  { id: 'ac14', name: 'ספסל עץ מלא SHANGO LAGO, אגוז כהה', category: 'כיסאות', styles: ['classic'], palettes: ['mahogany-walnut'], colors: ['#3E2417', '#8B5A2B'], price: 519, storeId: 'ace', url: 'https://www.ace.co.il/4494535' },
  { id: 'ac15', name: 'שולחן סלון נוי, אפור בטון', category: 'שולחנות', styles: ['industrial'], palettes: ['concrete-grey'], colors: ['#8C8984', '#1C1F22'], price: 149, storeId: 'ace', url: 'https://www.ace.co.il/5702014' },
  { id: 'ac16', name: 'ספה 214 ס"מ נפתחת למיטה דגם GRANDE, חום', category: 'ספות', styles: ['classic'], palettes: ['cream-dark-wood', 'warm-neutral'], colors: ['#A8835A', '#C9AE86'], price: 2491, storeId: 'ace', url: 'https://www.ace.co.il/601123' },
  { id: 'ac17', name: 'שידה דגם תמר, עץ אגוז חום כהה', category: 'אחסון', styles: ['classic'], palettes: ['mahogany-walnut'], colors: ['#5A3A26', '#3E2417'], price: 769, storeId: 'ace', url: 'https://www.ace.co.il/4493274' },
  { id: 'ac18', name: 'זוג כסאות SHANGO William, חום אגוז כהה', category: 'כיסאות', styles: ['classic'], palettes: ['mahogany-walnut'], colors: ['#7A3B2A', '#5A2A1E'], price: 340, storeId: 'ace', url: 'https://www.ace.co.il/4496986' },
  { id: 'ac19', name: 'קונסולה נפתחת לפינת אוכל עד 3 מטר דגם מקסימוס, אגוז אמריקאי', category: 'שולחנות', styles: ['classic'], palettes: ['mahogany-walnut'], colors: ['#5A3A26', '#3E2417'], price: 2957, storeId: 'ace', url: 'https://www.ace.co.il/4441316' },
  { id: 'ac20', name: 'מראה מתכת, זהב עתיק', category: 'אקססוריז', styles: ['classic'], palettes: ['burgundy-gold'], colors: ['#B8975A', '#8C6A2F'], price: 489, storeId: 'ace', url: 'https://www.ace.co.il/4480317' },
  { id: 'ac21', name: 'שטיח וינטג\' מונקו 29145 130X191, אדום וכחול', category: 'שטיחים', styles: ['classic'], palettes: ['burgundy-gold'], colors: ['#8C2A2A', '#2F3F5C', '#EDE0C8'], price: 539, storeId: 'ace', url: 'https://www.ace.co.il/4500991' },

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
  { id: 'fx11', name: 'כרית נוי Donna, בד מבריק בגוון זהב', category: 'טקסטיל', styles: ['classic'], palettes: ['burgundy-gold', 'cream-dark-wood'], colors: ['#C9A227', '#EDE0C8'], price: 41.97, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/318999901' },
  { id: 'fx12', name: 'שולחן צד עגול ממתכת, שחור מט', category: 'שולחנות', styles: ['industrial'], palettes: ['raw-steel'], colors: ['#1C1F22', '#3A3A3A'], price: 129.9, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/291950200' },
  { id: 'fx13', name: 'עששית Or, מתכת עם רשת גאומטרית שחורה', category: 'אקססוריז', styles: ['industrial'], palettes: ['raw-steel'], colors: ['#1C1F22', '#F2F2EF'], price: 24.9, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/311460200' },
  { id: 'fx14', name: 'סט 2 שולחנות צד Ray, עץ אגוז כהה', category: 'שולחנות', styles: ['classic'], palettes: ['mahogany-walnut'], colors: ['#3E2417', '#5A3A26'], price: 727.86, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/set-of-2-side-tables-ray' },
  { id: 'fx15', name: 'שטיח ארוג Terra, פרחוני קלאסי', category: 'שטיחים', styles: ['classic'], palettes: ['cream-dark-wood', 'warm-neutral'], colors: ['#F2EAD8', '#6B7A5E', '#8B5A2B'], price: 104.93, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/0335759996' },
  { id: 'fx16', name: 'שטיח ארוג Delhi, פרחים בגווני חום', category: 'שטיחים', styles: ['classic'], palettes: ['cream-dark-wood', 'mahogany-walnut'], colors: ['#D9B98A', '#4A331E'], price: 118.93, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/0335770300' },
  { id: 'fx17', name: 'שטיח עבודת יד Wellness, פרחוני עם מסגרת', category: 'שטיחים', styles: ['classic'], palettes: ['cream-dark-wood'], colors: ['#F2EAD8', '#6B5A4A'], price: 349.93, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/0336489900' },
  { id: 'fx18', name: 'כרית נוי מלבנית Connie, שמנת וזהב', category: 'טקסטיל', styles: ['classic'], palettes: ['burgundy-gold', 'cream-dark-wood'], colors: ['#EDE0C8', '#C9A227'], price: 97.93, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/0333909901' },
  { id: 'fx19', name: 'פמוט Cognac 22 ס"מ, מתכת בגוון זהב', category: 'אקססוריז', styles: ['classic'], palettes: ['burgundy-gold'], colors: ['#C9A227', '#F2EAD8'], price: 69.93, storeId: 'foxhome', url: 'https://www.foxhome.co.il/products/0336209901' },

  // ---------- גולף & קו ----------
  { id: 'gf01', name: 'כרית נוי לין, אוף וויט', category: 'טקסטיל', styles: ['modern'], palettes: ['mono-light', 'warm-neutral'], colors: ['#F3EFE7', '#E2DCD0'], price: 119.9, storeId: 'golf', url: 'https://www.golfco.co.il/93656076200' },
  { id: 'gf02', name: 'כרית אורי, טבעי', category: 'טקסטיל', styles: ['modern'], palettes: ['warm-neutral'], colors: ['#D8C8B0', '#C2AB8A'], price: 89.9, storeId: 'golf', url: 'https://www.golfco.co.il/93656355900' },
  { id: 'gf03', name: 'כרית נוי שון, שמנת', category: 'טקסטיל', styles: ['modern'], palettes: ['warm-neutral', 'mono-light'], colors: ['#F1E9DA', '#E2D6C2'], price: 77.9, storeId: 'golf', url: 'https://www.golfco.co.il/9365624105' },
  { id: 'gf04', name: 'אגרטל מילקי, בז\'', category: 'אקססוריז', styles: ['modern'], palettes: ['warm-neutral'], colors: ['#D8C8B0', '#C8B596'], price: 77.9, storeId: 'golf', url: 'https://www.golfco.co.il/93476282100' },
  { id: 'gf05', name: 'אגרטל בנזי, אוף וויט', category: 'אקססוריז', styles: ['modern'], palettes: ['mono-light'], colors: ['#F3EFE7', '#E2DCD0'], price: 53.9, storeId: 'golf', url: 'https://www.golfco.co.il/9347618162' },
  { id: 'gf06', name: 'אגרטל מרומית, לבן', category: 'אקססוריז', styles: ['modern'], palettes: ['mono-light', 'black-white'], colors: ['#FFFFFF', '#E6E6E3'], price: 167.9, storeId: 'golf', url: 'https://www.golfco.co.il/93476170100' },
  { id: 'gf07', name: 'אגרטל טוקו, חמרה', category: 'אקססוריז', styles: ['industrial'], palettes: ['rust-copper'], colors: ['#B5704F', '#C98A6A'], price: 89.5, storeId: 'golf', url: 'https://www.golfco.co.il/82476532400' },
  { id: 'gf08', name: 'אגרטל לומי, אפור', category: 'אקססוריז', styles: ['industrial'], palettes: ['concrete-grey'], colors: ['#A8A49C', '#8C8984'], price: 140, storeId: 'golf', url: 'https://www.golfco.co.il/82476570700' },
  { id: 'gf09', name: 'כרית נוי אורה, גינס אפור', category: 'טקסטיל', styles: ['industrial'], palettes: ['raw-steel'], colors: ['#6E767C', '#1C1F22'], price: 29.9, storeId: 'golf', url: 'https://www.golfco.co.il/89656129300' },
  { id: 'gf10', name: 'אגרטל סאנו, חום כהה', category: 'אקססוריז', styles: ['classic'], palettes: ['burgundy-gold', 'mahogany-walnut'], colors: ['#4A1F1F', '#3E2417'], price: 149.9, storeId: 'golf', url: 'https://www.golfco.co.il/93476456500' },
  { id: 'gf11', name: 'כרית נוי לוקה, חום', category: 'טקסטיל', styles: ['classic'], palettes: ['cream-dark-wood'], colors: ['#5A4E48', '#4A331E'], price: 59.9, storeId: 'golf', url: 'https://www.golfco.co.il/93656203000' },
  { id: 'gf12', name: 'כרית נוי טוליפ גלארי אסתר, שמנת', category: 'טקסטיל', styles: ['classic'], palettes: ['cream-dark-wood'], colors: ['#F2EAD8', '#A67C52'], price: 131.9, storeId: 'golf', url: 'https://www.golfco.co.il/61672060500' },

  // ---------- נלה ----------
  { id: 'nl01', name: 'שולחן סלון דגם Alaska', category: 'שולחנות', styles: ['modern'], palettes: ['warm-neutral', 'black-white', 'mono-light'], colors: ['#C49A6C', '#1E1E1E', '#F2F2EF'], variants: 'גוונים: אלון טבעי, שחור מט, לבן מט', price: 2490, priceFrom: true, storeId: 'nalla', url: 'https://www.nalla.co.il/product/%D7%A9%D7%95%D7%9C%D7%97%D7%9F-%D7%93%D7%92%D7%9D-%D7%B4alaska%D7%B4' },
  { id: 'nl02', name: 'שולחן סלון דגם Tony', category: 'שולחנות', styles: ['modern'], palettes: ['warm-neutral', 'black-white', 'mono-light'], colors: ['#C49A6C', '#1E1E1E', '#8C8C8C'], variants: 'גוונים: אלון טבעי, אלון שחור, לבן מט, אגוז אמריקאי, אפור בטון', price: 2790, priceFrom: true, storeId: 'nalla', url: 'https://www.nalla.co.il/product/%D7%A9%D7%95%D7%9C%D7%97%D7%9F-%D7%A1%D7%9C%D7%95%D7%9F-%D7%93%D7%92%D7%9D-%D7%B4tony%D7%B4' },
  { id: 'nl03', name: 'שולחן סלון דגם Kim', category: 'שולחנות', styles: ['modern'], palettes: ['warm-neutral', 'black-white'], colors: ['#C49A6C', '#1E1E1E'], variants: 'גוונים: אלון טבעי, אלון שחור', price: 2390, priceFrom: true, storeId: 'nalla', url: 'https://www.nalla.co.il/product/%D7%A9%D7%95%D7%9C%D7%97%D7%9F-%D7%A1%D7%9C%D7%95%D7%9F-%D7%93%D7%92%D7%9D-%D7%B4kim' },
  { id: 'nl05', name: 'כיסא בר דגם Loft Frame', category: 'כיסאות', styles: ['industrial'], palettes: ['raw-steel'], colors: ['#1C1F22', '#D9CFC0'], price: 990, storeId: 'nalla', url: 'https://www.nalla.co.il/product/%D7%9B%D7%99%D7%A1%D7%90-%D7%91%D7%A8-%D7%93%D7%92%D7%9D-%D7%B4loft-frame%D7%B4' },
  { id: 'nl06', name: 'כיסא לפינת אוכל דגם Classic', category: 'כיסאות', styles: ['classic'], palettes: ['cream-dark-wood'], colors: ['#EDE6DA', '#A0613A'], price: 790, storeId: 'nalla', url: 'https://www.nalla.co.il/product/%D7%9B%D7%99%D7%A1%D7%90-%D7%9C%D7%A4%D7%99%D7%A0%D7%AA-%D7%90%D7%95%D7%9B%D7%9C-%D7%93%D7%92%D7%9D-%D7%B4classic%D7%B4' }
];
