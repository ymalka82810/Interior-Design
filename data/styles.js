// סגנונות עיצוב ופלטות צבעים.
// כדי להוסיף סגנון: מוסיפים אובייקט ל-STYLES, רושמים בו אילו פלטות מתאימות לו,
// ומשנים active ל-true כשיש לו פריטים בקטלוג.

const PALETTES = {
  'mono-light': {
    name: 'מונוכרום בהיר',
    description: 'לבן, אפור בהיר ואפור. שקט ומואר.',
    colors: ['#F5F5F2', '#D9D9D6', '#8C8C8C']
  },
  'black-white': {
    name: 'שחור ולבן',
    description: 'ניגודיות חדה ונקייה.',
    colors: ['#FFFFFF', '#6B6B6B', '#1E1E1E']
  },
  'warm-neutral': {
    name: 'ניטרלי חם',
    description: 'שמנת, בז\' ועץ אלון.',
    colors: ['#F3EDE4', '#D8C8B0', '#A67C52']
  },
  'sage': {
    name: 'ירוק מרווה',
    description: 'ירוק עמום ורך לצד לבן שבור.',
    colors: ['#E8EDE6', '#A9B8A0', '#5F6F58']
  },
  'dusty-blue': {
    name: 'כחול עמום',
    description: 'אפור-כחלחל וכחול עמוק.',
    colors: ['#EEF1F4', '#9FB1C2', '#3E5366']
  }
};

const STYLES = [
  {
    id: 'modern',
    name: 'מודרני / מינימליסטי',
    description: 'קווים נקיים, משטחים חלקים ומעט פריטים. כל פריט בחדר צריך להצדיק את מקומו.',
    palettes: ['mono-light', 'black-white', 'warm-neutral', 'sage', 'dusty-blue'],
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
