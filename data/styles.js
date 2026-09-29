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
  }
};

const STYLES = [
  {
    id: 'modern',
    name: 'מודרני / מינימליסטי',
    description: 'קווים נקיים, משטחים חלקים ומעט פריטים. כל פריט בחדר צריך להצדיק את מקומו.',
    palettes: ['mono-light', 'black-white', 'warm-neutral', 'sage', 'dusty-blue'],
    image: { src: 'images/inspiration/modern.jpg', alt: 'סלון לבן עם ספה אפורה ומנורה שחורה', credit: 'Breather', source: 'https://commons.wikimedia.org/wiki/File:Cozy_interior_with_a_sofa_(Unsplash).jpg' },
    active: true
  },
  {
    id: 'scandi',
    name: 'סקנדינבי / בוהו',
    description: 'עץ בהיר, טקסטיל וצמחים.',
    palettes: [],
    active: false
  },
  {
    id: 'industrial',
    name: 'תעשייתי',
    description: 'מתכת, בטון ועץ גולמי.',
    palettes: [],
    active: false
  },
  {
    id: 'classic',
    name: 'קלאסי / כפרי',
    description: 'עיטורים, עץ כהה וחמימות.',
    palettes: [],
    active: false
  }
];
