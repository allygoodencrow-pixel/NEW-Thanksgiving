// One record owns the photo, contents and eventual design download together.
// Lifestyle photos are not print-ready artwork. Do not substitute a plan export
// for a missing design file or infer a download from the order of the photos.
export type PrintableCollection = {
  id: string;
  title: string;
  image: string;
  alt: string;
  contents: string;
  download?: {href: string; filename: string};
};
export const printableCollections: PrintableCollection[] = [
  {id:'napkin-bands',title:'Thanksgiving napkin bands',image:'napkin-bands.webp',alt:'Ivory and dark Thanksgiving bands wrapped around linen napkins',contents:'Ivory and dark Thanksgiving napkin bands.'},
  {id:'buffet-labels',title:'Buffet labels',image:'buffet-labels.webp',alt:'Buffet cards identifying turkey, cranberry, stuffing, potatoes, rolls and gravy',contents:'Turkey, cranberry, stuffing, potatoes, rolls and gravy cards.'},
  {id:'cider-bar-sign',title:'Cider bar sign',image:'cider-bar-sign.webp',alt:'Dark oval Cider Bar sign beside a carafe of apple cider',contents:'The standalone oval Cider Bar sign.'},
  {id:'cider-menus',title:'Cider bar + seasonal menus',image:'cider-menus.webp',alt:'Cider Bar sign with dark Cider Menu and ivory Seasonal Sips menus',contents:'Cider Bar sign, Cider Menu and Seasonal Sips menu.'},
  {id:'pie-table',title:'The pie table',image:'pie-table.webp',alt:'Ivory Pie Table sign with apple pie, cookies, pumpkin pie and pecan pie labels',contents:'Pie Table sign and four dessert labels.'},
  {id:'take-home-favors',title:'Take-home favors',image:'take-home-favors.webp',alt:'Thank You arch sign and A Little Thanks bag toppers on take-home cookies',contents:'Thank You sign and A Little Thanks bag toppers.'},
  {id:'gratitude-station',title:'Gratitude station',image:'gratitude-station.webp',alt:'Taupe Gratitude Challenge sign and ivory Leave a Little Thanks sign beside blank cards',contents:'Gratitude Challenge and Leave a Little Thanks signs.'},
  {id:'pumpkin-sketch-studio',title:'Pumpkin sketch studio',image:'pumpkin-sketch-studio.webp',alt:'Dark Pumpkin Sketch Studio sign with pens, ivory pumpkins and pumpkin sketch sheets',contents:'Pumpkin Sketch Studio sign and pumpkin drawing sheets.'},
];
