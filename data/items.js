// קטלוג הפריטים.
// שדות:
//   id        - מזהה ייחודי
//   name      - שם הפריט
//   category  - קטגוריה (מופיעה בסינון)
//   styles    - מזהי הסגנונות שהפריט מתאים להם (מתוך data/styles.js)
//   palettes  - מזהי פלטות הצבעים שהפריט מתאים להן
//   colors    - הצבעים העיקריים של הפריט (מוצגים כשאין תמונה)
//   price     - מחיר בשקלים
//   storeId   - הסניף שמוכר את הפריט (מתוך data/stores.js)
//   url       - קישור לעמוד הפריט באתר החנות (ריק = עוד אין קישור)
//   image     - קישור לתמונה (אופציונלי; רק תמונה שהחנות אישרה להציג)
// כל הפריטים כאן הם לדוגמה בלבד.

const ITEMS = [
  { id: 'i01', name: 'ספה תלת-מושבית, בד אפור בהיר', category: 'ספות', styles: ['modern'], palettes: ['mono-light'], colors: ['#D9D9D6', '#BDBDB8'], price: 3490, storeId: 's1', url: '' },
  { id: 'i02', name: 'שולחן קפה עגול, לבן מט', category: 'שולחנות', styles: ['modern'], palettes: ['mono-light', 'black-white'], colors: ['#F5F5F2', '#8C8C8C'], price: 790, storeId: 's4', url: '' },
  { id: 'i03', name: 'מנורת רצפה, מתכת שחורה', category: 'תאורה', styles: ['modern'], palettes: ['black-white'], colors: ['#1E1E1E', '#6B6B6B'], price: 450, storeId: 's1', url: '' },
  { id: 'i04', name: 'כיסא אוכל שחור עם רגלי עץ', category: 'כיסאות', styles: ['modern'], palettes: ['black-white', 'warm-neutral'], colors: ['#1E1E1E', '#A67C52'], price: 320, storeId: 's3', url: '' },
  { id: 'i05', name: 'שטיח צמר, בז\' חלק', category: 'שטיחים', styles: ['modern'], palettes: ['warm-neutral'], colors: ['#D8C8B0', '#F3EDE4'], price: 1200, storeId: 's2', url: '' },
  { id: 'i06', name: 'שולחן אוכל, עץ אלון', category: 'שולחנות', styles: ['modern'], palettes: ['warm-neutral'], colors: ['#A67C52', '#D8C8B0'], price: 2890, storeId: 's2', url: '' },
  { id: 'i07', name: 'כורסת בוקלה, שמנת', category: 'כורסאות', styles: ['modern'], palettes: ['warm-neutral', 'mono-light'], colors: ['#F3EDE4', '#D9D9D6'], price: 1650, storeId: 's6', url: '' },
  { id: 'i08', name: 'כרית נוי, ירוק מרווה', category: 'טקסטיל', styles: ['modern'], palettes: ['sage'], colors: ['#A9B8A0', '#E8EDE6'], price: 89, storeId: 's4', url: '' },
  { id: 'i09', name: 'ספה דו-מושבית, ירוק זית', category: 'ספות', styles: ['modern'], palettes: ['sage'], colors: ['#5F6F58', '#A9B8A0'], price: 2990, storeId: 's3', url: '' },
  { id: 'i10', name: 'אגרטל קרמיקה, ירוק עמום', category: 'אקססוריז', styles: ['modern'], palettes: ['sage', 'warm-neutral'], colors: ['#A9B8A0', '#D8C8B0'], price: 129, storeId: 's5', url: '' },
  { id: 'i11', name: 'כורסה מרופדת, כחול-אפור', category: 'כורסאות', styles: ['modern'], palettes: ['dusty-blue'], colors: ['#9FB1C2', '#3E5366'], price: 1490, storeId: 's1', url: '' },
  { id: 'i12', name: 'וילון פשתן, כחול עמום', category: 'טקסטיל', styles: ['modern'], palettes: ['dusty-blue'], colors: ['#9FB1C2', '#EEF1F4'], price: 260, storeId: 's6', url: '' },
  { id: 'i13', name: 'מדף קיר צף, לבן', category: 'אחסון', styles: ['modern'], palettes: ['mono-light', 'black-white'], colors: ['#FFFFFF', '#D9D9D6'], price: 180, storeId: 's5', url: '' },
  { id: 'i14', name: 'שידת מגירות, אפור', category: 'אחסון', styles: ['modern'], palettes: ['mono-light', 'dusty-blue'], colors: ['#8C8C8C', '#D9D9D6'], price: 1150, storeId: 's4', url: '' },
  { id: 'i15', name: 'מנורת תלייה, אהיל בד לבן', category: 'תאורה', styles: ['modern'], palettes: ['mono-light', 'warm-neutral'], colors: ['#F5F5F2', '#D8C8B0'], price: 340, storeId: 's3', url: '' },
  { id: 'i16', name: 'שטיח גאומטרי, שחור-לבן', category: 'שטיחים', styles: ['modern'], palettes: ['black-white'], colors: ['#FFFFFF', '#1E1E1E'], price: 690, storeId: 's5', url: '' },
  { id: 'i17', name: 'מנורת שולחן, קרמיקה מרווה', category: 'תאורה', styles: ['modern'], palettes: ['sage'], colors: ['#A9B8A0', '#5F6F58'], price: 290, storeId: 's6', url: '' },
  { id: 'i18', name: 'שולחן צד, מתכת כחול כהה', category: 'שולחנות', styles: ['modern'], palettes: ['dusty-blue'], colors: ['#3E5366', '#9FB1C2'], price: 390, storeId: 's2', url: '' }
];
