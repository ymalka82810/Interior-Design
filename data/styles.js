// סגנונות עיצוב ופלטות צבעים.
// כדי להוסיף סגנון: מוסיפים אובייקט ל-STYLES, רושמים בו אילו פלטות מתאימות לו,
// ומשנים active ל-true כשיש לו פריטים בקטלוג.
// image: תמונת השראה של חדר שלם (אופציונלי). רק תמונות ברישיון חופשי (CC0), שמורות בתיקייה images/inspiration.
//        credit הוא שם הצלם, source הוא עמוד התמונה בוויקישיתוף עם פרטי הרישיון.

const PALETTES = {
  'mono-light': {
    name: 'מונוכרום בהיר',
    description: 'לבן, אפור בהיר ואפור. שקט ומואר.',
    colors: ['#F5F5F2', '#D9D9D6', '#8C8C8C'],
    image: { src: 'images/inspiration/mono-light.jpg', alt: 'שולחן לבן, כיסאות לבנים וספה אפורה', credit: 'Breather', source: 'https://commons.wikimedia.org/wiki/File:Chairs,_sofa,_plants,_pencils_(Unsplash).jpg' }
  },
  'black-white': {
    name: 'שחור ולבן',
    description: 'ניגודיות חדה ונקייה.',
    colors: ['#FFFFFF', '#6B6B6B', '#1E1E1E'],
    image: { src: 'images/inspiration/black-white.jpg', alt: 'קירות לבנים, כיסאות שחורים ושטיח שחור-לבן', credit: 'Breather', source: 'https://commons.wikimedia.org/wiki/File:Minimal_creative_interior_(Unsplash).jpg' }
  },
  'warm-neutral': {
    name: 'ניטרלי חם',
    description: 'שמנת, בז\' ועץ אלון.',
    colors: ['#F3EDE4', '#D8C8B0', '#A67C52'],
    image: { src: 'images/inspiration/warm-neutral.jpg', alt: 'שולחן עץ בהיר וכיסאות לבנים', credit: 'Breather', source: 'https://commons.wikimedia.org/wiki/File:Wooden_table_and_chairs_(Unsplash).jpg' }
  },
  'sage': {
    name: 'ירוק מרווה',
    description: 'ירוק עמום ורך לצד לבן שבור.',
    colors: ['#E8EDE6', '#A9B8A0', '#5F6F58'],
    image: { src: 'images/inspiration/sage.jpg', alt: 'ספות בירוק מרווה ליד חלון גדול', credit: 'Alexander Pemberton', source: 'https://commons.wikimedia.org/wiki/File:Coffee_table_corner_in_a_London_apartment_(Unsplash).jpg' }
  },
  'dusty-blue': {
    name: 'כחול עמום',
    description: 'אפור-כחלחל וכחול עמוק.',
    colors: ['#EEF1F4', '#9FB1C2', '#3E5366'],
    image: { src: 'images/inspiration/dusty-blue.jpg', alt: 'ספה אפורה-כחלחלה מול קיר כחול עמום', credit: 'Kari Shea', source: 'https://commons.wikimedia.org/wiki/File:Sofa_Side_Table_Kentwood_(Unsplash).jpg' }
  },
  'terracotta': {
    name: 'טרקוטה חמה',
    description: 'חימר צרוב, כתום עמום וחום אדמה.',
    colors: ['#F2E4D8', '#D98E5C', '#8C4A2F']
  },
  'charcoal-navy': {
    name: 'פחם וכחול כהה',
    description: 'כחול-פחם עמוק לצד אפור פלדה.',
    colors: ['#E7E9EC', '#5A6B7A', '#1F2B38']
  },
  'dusty-rose': {
    name: 'ורוד אבק',
    description: 'ורוד מאובק רך לצד שמנת ואפור חם.',
    colors: ['#F6ECE9', '#D9B3AC', '#9C6F68']
  },
  'birch-oak': {
    name: 'ליבנה ואלון בהיר',
    description: 'לבן חלבי, עץ ליבנה בהיר וגוון אלון טבעי.',
    colors: ['#F7F4EE', '#E4D6BC', '#C9A26D']
  },
  'soft-pastel': {
    name: 'פסטל רך',
    description: 'ורוד אבקתי, תכלת בהיר ולבן שבור.',
    colors: ['#FAF4F0', '#F1D9DA', '#B7CFDC']
  },
  'rattan-tan': {
    name: 'ראטן וחום זהוב',
    description: 'שמנת חמה, קש ראטן וחום זהוב לצד טקסטיל טבעי.',
    colors: ['#F4EEE1', '#D9BE8F', '#8C6A45']
  },
  'concrete-grey': {
    name: 'בטון חשוף',
    description: 'גווני אפור בטון גולמי, מקיר לרצפה.',
    colors: ['#D6D3CD', '#A8A49C', '#5C5850']
  },
  'raw-steel': {
    name: 'פלדה גולמית',
    description: 'שחור מתכתי וגוונים אפורים קרים.',
    colors: ['#C9CCCE', '#787D82', '#1C1F22']
  },
  'rust-copper': {
    name: 'חלודה ונחושת',
    description: 'נחושת חמה ואדום חלודה לצד אפור פחם.',
    colors: ['#E3B08C', '#B5602F', '#2E2B29']
  },
  'mahogany-walnut': {
    name: 'מהגוני ואגוז',
    description: 'עץ כהה עשיר, מהגוני ואגוז חם.',
    colors: ['#D9C2A6', '#8B5A2B', '#3E2417']
  },
  'burgundy-gold': {
    name: 'בורדו וזהב',
    description: 'בורדו עמוק וירוק יער עם נגיעות זהב.',
    colors: ['#EDE0C8', '#6E1F2A', '#2F4A3C']
  },
  'cream-dark-wood': {
    name: 'שמנת ועץ כהה',
    description: 'שמנת רכה לצד מסגרות עץ כהות.',
    colors: ['#F2EAD8', '#C9AE86', '#4A331E']
  }
};

const STYLES = [
  {
    id: 'modern',
    name: 'מודרני / מינימליסטי',
    description: 'קווים נקיים, משטחים חלקים ומעט פריטים. כל פריט בחדר צריך להצדיק את מקומו.',
    palettes: ['mono-light', 'black-white', 'warm-neutral', 'sage', 'dusty-blue', 'terracotta', 'charcoal-navy', 'dusty-rose'],
    image: { src: 'images/inspiration/modern.jpg', alt: 'סלון לבן עם ספה אפורה ומנורה שחורה', credit: 'Breather', source: 'https://commons.wikimedia.org/wiki/File:Cozy_interior_with_a_sofa_(Unsplash).jpg' },
    active: true
  },
  {
    id: 'scandi',
    name: 'סקנדינבי / בוהו',
    description: 'עץ בהיר, טקסטיל טבעי וצמחים. חלל מואר ונעים עם נגיעות ראטן וגוונים רכים.',
    palettes: ['birch-oak', 'soft-pastel', 'rattan-tan', 'warm-neutral', 'sage'],
    active: false
  },
  {
    id: 'industrial',
    name: 'תעשייתי',
    description: 'מתכת, בטון ועץ גולמי. קירות חשופים, גופי תאורה מתכתיים ונגיעות חלודה חמות.',
    palettes: ['concrete-grey', 'raw-steel', 'rust-copper'],
    active: false
  },
  {
    id: 'classic',
    name: 'קלאסי / כפרי',
    description: 'עיטורים, עץ כהה וחמימות. ריהוט מעוצב, בדים עשירים וגוונים חמים ומזמינים.',
    palettes: ['mahogany-walnut', 'burgundy-gold', 'cream-dark-wood', 'warm-neutral'],
    active: false
  }
];
