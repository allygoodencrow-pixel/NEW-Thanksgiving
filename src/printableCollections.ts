// One record owns the photo, contents and eventual design download together.
// Lifestyle photos are not print-ready artwork. Do not substitute a plan export
// for a missing design file or infer a download from the order of the photos.
export type PrintableCollection = {
  id: string;
  title: string;
  image: string;
  alt: string;
  contents: string;
  alternateImages?: {image: string; alt: string}[];
  download?: {href: string; filename: string};
};
export const printableCollections: PrintableCollection[] = [
  {id:'napkin-bands',title:'Thanksgiving napkin bands',image:'napkin-bands.webp',alt:'Ivory and dark Thanksgiving bands wrapped around linen napkins',contents:'Ivory and dark Thanksgiving napkin bands.',alternateImages:[{image:'napkin-bands-marble.webp',alt:'Ivory and dark Thanksgiving napkin bands on a dark marble table'}]},
  {id:'buffet-labels',title:'Buffet labels',image:'buffet-labels.webp',alt:'Buffet cards identifying turkey, cranberry, stuffing, potatoes, rolls and gravy',contents:'Turkey, cranberry, stuffing, potatoes, rolls and gravy cards.',alternateImages:[{image:'buffet-labels-detail.webp',alt:'Close view of turkey, stuffing and potatoes cards on a marble buffet'}]},
  {id:'cider-bar-sign',title:'Cider bar sign',image:'cider-bar-sign.webp',alt:'Dark oval Cider Bar sign beside a carafe of apple cider',contents:'The standalone oval Cider Bar sign.'},
  {id:'cider-menus',title:'Cider bar + seasonal menus',image:'cider-menus.webp',alt:'Cider Bar sign with dark Cider Menu and ivory Seasonal Sips menus',contents:'Cider Bar sign, Cider Menu and Seasonal Sips menu.'},
  {id:'pie-table',title:'The pie table',image:'pie-table.webp',alt:'Ivory Pie Table sign with apple pie, cookies, pumpkin pie and pecan pie labels',contents:'Pie Table sign and four dessert labels.',alternateImages:[{image:'pie-table-detail.webp',alt:'Pie Table sign beside pumpkin pie and apple pie labels'}]},
  {id:'take-home-favors',title:'Take-home favors',image:'take-home-favors.webp',alt:'Thank You arch sign and A Little Thanks bag toppers on take-home cookies',contents:'Thank You sign and A Little Thanks bag toppers.'},
  {id:'gratitude-station',title:'Gratitude station',image:'gratitude-station.webp',alt:'Taupe Gratitude Challenge sign and ivory Leave a Little Thanks sign beside blank cards',contents:'Gratitude Challenge and Leave a Little Thanks signs.',alternateImages:[{image:'leave-a-little-thanks.webp',alt:'Ivory Leave a Little Thanks sign with blank gratitude cards and pens'}]},
  {id:'thanksgiving-welcome',title:'Thanksgiving welcome sign',image:'thanksgiving-welcome.webp',alt:'Dark arched Thanksgiving sign reading Good Food / Grateful People beside roast turkey',contents:'Thanksgiving welcome sign · Good Food / Grateful People.',alternateImages:[{image:'thanksgiving-welcome-buffet.webp',alt:'Thanksgiving welcome sign displayed with turkey, stuffing, cranberry and gravy labels'}]},
  {id:'thanksgiving-menus',title:'Thanksgiving + harvest menus',image:'thanksgiving-menus.webp',alt:'Dark Thanksgiving Menu and ivory Harvest Menu on place settings beside napkin bands',contents:'Thanksgiving Menu and Harvest Menu designs.'},
  {id:'take-home-signs',title:'Take-home signs',image:'take-home-signs.webp',alt:'Dark Thank You sign and ivory Please Take One sign beside boxed take-home treats',contents:'Thank You and Please Take One signs · Take a Little Home.'},
  {id:'pumpkin-sketch-studio',title:'Pumpkin sketch studio',image:'pumpkin-sketch-studio.webp',alt:'Dark Pumpkin Sketch Studio sign with pens, ivory pumpkins and pumpkin sketch sheets',contents:'Pumpkin Sketch Studio sign and pumpkin drawing sheets.'},
];
