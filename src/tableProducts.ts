import type {State} from './App';
import {tablesFor,clothSize} from './hostingTools';
type Product={title:string;href:string;asin:string;pack:number;covers:string[];kind:string;dimensions?:number[];round?:boolean};
// Captured from the owner-approved Shop the Look catalog on October 5, 2026.
export const tableProducts:Product[]=[
  {
    "href": "https://www.amazon.com/dp/B0C7HZW146",
    "title": "Efavormart 6-Pack 13\" Taupe Plastic Hammered Rim Charger Plates",
    "asin": "B0C7HZW146",
    "pack": 6,
    "covers": [],
    "kind": "places"
  },
  {
    "href": "https://www.amazon.com/dp/B0GGDVBFMT",
    "title": "Efavormart 10-Pack 13\" Economy Clear Plastic Charger Plates with Black Scalloped Rim, Round Dinner Serving Trays for Modern Receptions and Industrial Chic Events",
    "asin": "B0GGDVBFMT",
    "pack": 10,
    "covers": [],
    "kind": "places"
  },
  {
    "href": "https://www.amazon.com/dp/B0B6H9HZG9",
    "title": "SUT 150-piece Silver Plastic Silverware Set — heavy-duty disposable cutlery with 50 forks, 50 spoons, and 50 knives",
    "asin": "B0B6H9HZG9",
    "pack": 50,
    "covers": [
      "forks",
      "dessertForks",
      "knives",
      "spoons"
    ],
    "kind": "service"
  },
  {
    "href": "https://www.amazon.com/dp/B0FXX2FP6M",
    "title": "WELLIFE 120-piece Gold Plastic Silverware set, heavy-duty disposable utensils for 40 guests (40 forks, 40 spoons, 40 knives), selected variation 40 Pack / Gold",
    "asin": "B0FXX2FP6M",
    "pack": 40,
    "covers": [
      "forks",
      "dessertForks",
      "knives",
      "spoons"
    ],
    "kind": "service"
  },
  {
    "href": "https://www.amazon.com/dp/B0CPY8V141",
    "title": "N9R 90PCS Gold Plastic Silverware, Disposable Wood Grain Utensils/Cutlery — 30 forks, 30 spoons, 30 knives; heavy-duty, BPA-free; 90-pack selected",
    "asin": "B0CPY8V141",
    "pack": 30,
    "covers": [
      "forks",
      "dessertForks",
      "knives",
      "spoons"
    ],
    "kind": "service"
  },
  {
    "href": "https://www.amazon.com/dp/B07DFCDGDM",
    "title": "IHR Ideal Home Range Cocktail Napkins, Marimekko Orkanen Linen/Black, disposable 3-ply paper party napkins, 5\" x 5\", 20-count",
    "asin": "B07DFCDGDM",
    "pack": 20,
    "covers": [
      "napkins"
    ],
    "kind": "service"
  },
  {
    "href": "https://www.amazon.com/dp/B0H1QRQ6XQ",
    "title": "Blue Orchards Beige Plastic Table Cover, pack of 3 with 20 glue dots, 54\" x 108\", waterproof disposable neutral beige tablecloth",
    "asin": "B0H1QRQ6XQ",
    "pack": 3,
    "covers": [
      "linens"
    ],
    "kind": "linen",
    "dimensions": [
      108,
      54
    ],
    "round": false
  },
  {
    "href": "https://www.amazon.com/dp/B0G8LG8RHV",
    "title": "OCCASIONS 120-Plate Pack for 60 guests, heavyweight disposable plastic dinnerware, selected variation Pearl Ivory & Gold. Includes 60 10-inch dinner plates + 60 7-inch salad/dessert plates; BPA-free",
    "asin": "B0G8LG8RHV",
    "pack": 60,
    "covers": [
      "plates",
      "dessertPlates"
    ],
    "kind": "service"
  },
  {
    "href": "https://www.amazon.com/dp/B0H35S469R",
    "title": "LEYIQU 24-Pack Plastic Martini Glasses / Coupe Glasses, 10 oz, ribbed unbreakable stemmed cocktail glasses, reusable/disposable style",
    "asin": "B0H35S469R",
    "pack": 24,
    "covers": [
      "cocktailGlasses"
    ],
    "kind": "service"
  },
  {
    "href": "https://www.amazon.com/dp/B0G39T283M",
    "title": "Jingmore 24-Piece Plastic Ribbed Martini/Coupe Glasses, 10 oz, Brown — disposable vintage-style unbreakable cocktail/dessert glasses",
    "asin": "B0G39T283M",
    "pack": 24,
    "covers": [
      "cocktailGlasses"
    ],
    "kind": "service"
  },
  {
    "href": "https://www.amazon.com/dp/B0FG7HJF9P",
    "title": "40-Pack Plastic Wine Glasses, 12 oz, disposable cocktail/whiskey glasses",
    "asin": "B0FG7HJF9P",
    "pack": 40,
    "covers": [
      "glasses"
    ],
    "kind": "service"
  },
  {
    "href": "https://www.amazon.com/dp/B0F1TMTWQ5",
    "title": "12 PCS Green Champagne Flutes Plastic, 5.4 oz clear acrylic long-stem champagne flutes / sparkling wine glasses in sage green, suitable for weddings/cocktails/prosecco",
    "asin": "B0F1TMTWQ5",
    "pack": 12,
    "covers": [
      "glasses"
    ],
    "kind": "service"
  },
  {
    "href": "https://www.amazon.com/dp/B0G2XXH2VZ",
    "title": "Qilery 50 Pcs Sage Green Disposable Dinner Napkins with Silverware Pocket — prefolded disposable linen-style Airlaid paper napkins; folded size about 7.87 x 3.54 in",
    "asin": "B0G2XXH2VZ",
    "pack": 50,
    "covers": [
      "napkins"
    ],
    "kind": "service"
  },
  {
    "href": "https://www.amazon.com/dp/B0H2DLZQTS",
    "title": "PAW Decor Collection Wedding Linen Feel Flatware Pocket Napkins, 50 Count — beige fabric-look/cloth-like paper napkins with built-in sleeve for silverware",
    "asin": "B0H2DLZQTS",
    "pack": 50,
    "covers": [
      "napkins"
    ],
    "kind": "service"
  },
  {
    "href": "https://www.amazon.com/dp/B0DHRZCX8B",
    "title": "Home Crystal Tealight Candle Holders, pack of 4, brown, 1.5-inch height, heavy solid square hand-cut tealight holders/centerpieces",
    "asin": "B0DHRZCX8B",
    "pack": 4,
    "covers": [],
    "kind": "holders"
  },
  {
    "href": "https://www.amazon.com/dp/B0DF5Q8YS4",
    "title": "Tableclothsfactory Premium Velvet Rectangle Tablecloth, Ivory, 90 x 156 inches, for weddings, parties, banquets, and events",
    "asin": "B0DF5Q8YS4",
    "pack": 1,
    "covers": [
      "linens"
    ],
    "kind": "linen",
    "dimensions": [
      156,
      90
    ],
    "round": false
  },
  {
    "href": "https://www.amazon.com/dp/B0DM5LGF9N",
    "title": "Aocoz 6-Pack Ivory Round Tablecloths, 132-inch round, washable decorative linen-look polyester table covers for dining tables, banquets, buffets, parties, and weddings",
    "asin": "B0DM5LGF9N",
    "pack": 6,
    "covers": [
      "linens"
    ],
    "kind": "linen",
    "dimensions": [
      132,
      132
    ],
    "round": true
  },
  {
    "href": "https://www.amazon.com/dp/B0FX22QHD3",
    "title": "Horaldaily Champagne Pearl Tablecloth, 60 x 84 inch, rectangular",
    "asin": "B0FX22QHD3",
    "pack": 1,
    "covers": [
      "linens"
    ],
    "kind": "linen",
    "dimensions": [
      84,
      60
    ],
    "round": false
  },
  {
    "href": "https://www.amazon.com/dp/B078T2DVZK",
    "title": "Lann's Linens 10-Pack 90 x 132 Inch Rectangular Tablecloths, Beige — washable polyester fabric tablecloths for dining tables, restaurants, weddings, banquets, and events",
    "asin": "B078T2DVZK",
    "pack": 10,
    "covers": [
      "linens"
    ],
    "kind": "linen",
    "dimensions": [
      132,
      90
    ],
    "round": false
  },
  {
    "href": "https://www.amazon.com/dp/B0FPW85W14",
    "title": "OMMATO Fall Brown Velvet Tablecloth, rectangular, selected size 84 x 55 inches. Luxury solid brown velvet tablecloth with vintage/rustic styling, washable",
    "asin": "B0FPW85W14",
    "pack": 1,
    "covers": [
      "linens"
    ],
    "kind": "linen",
    "dimensions": [
      84,
      55
    ],
    "round": false
  },
  {
    "href": "https://www.amazon.com/dp/B0DJR221F9",
    "title": "Fyrstliyn 20-Pack Assorted Amber Glass Votive Candle Holders for tealight candles. Ribbed/decorative thick glass set in two sizes: 10 pieces approx. 2\" wide x 2.5\" high and 10 pieces approx. 2\" wide x 1.4\" high",
    "asin": "B0DJR221F9",
    "pack": 20,
    "covers": [],
    "kind": "holders"
  },
  {
    "href": "https://www.amazon.com/dp/B0FL7LWT8Q",
    "title": "KDG Cordless Portable Rechargeable Table Lamp for restaurants/dining tables",
    "asin": "B0FL7LWT8Q",
    "pack": 1,
    "covers": [],
    "kind": "lamps"
  },
  {
    "href": "https://www.amazon.com/dp/B0BNQ4H51Q",
    "title": "MAONAME 13\" Black & Gold Charger Plates, set of 6 — round reusable plastic charger plates with antiqued black/gold finish and cutout coral-style edge",
    "asin": "B0BNQ4H51Q",
    "pack": 6,
    "covers": [],
    "kind": "places"
  },
  {
    "href": "https://www.amazon.com/dp/B0BXLCNG8K",
    "title": "Jovono Round Leather Placemats for Round Tables, set of 4, 13-inch diameter, washable/easy-care faux/leather-style placemats",
    "asin": "B0BXLCNG8K",
    "pack": 4,
    "covers": [],
    "kind": "places"
  },
  {
    "href": "https://www.amazon.com/dp/B0FQ4T33W4",
    "title": "Rubtlamp 60-Piece Amber Plastic Plates with Gold Rim — clear/brown disposable heavy-duty hammered plates, including 30 dessert plates and 30 dinner plates",
    "asin": "B0FQ4T33W4",
    "pack": 30,
    "covers": [
      "plates",
      "dessertPlates"
    ],
    "kind": "service"
  },
  {
    "href": "https://www.amazon.com/dp/B0DMBDJXPQ",
    "title": "Exquisite Brown Plastic Disposable Plates Set, 40 pieces for 20 guests — includes 20 x 11-inch dinner plates and 20 x 9-inch dessert plates; brown finish, disposable plastic dinnerware",
    "asin": "B0DMBDJXPQ",
    "pack": 20,
    "covers": [
      "plates",
      "dessertPlates"
    ],
    "kind": "service"
  },
  {
    "href": "https://www.amazon.com/dp/B0DPMZDHGV",
    "title": "LIYH 50-Piece Beige Plastic Plate Set for 25 guests — reusable/unbreakable scalloped plastic plates, dishwasher safe, BPA-free; includes 25 dinner plates and 25 dessert plates",
    "asin": "B0DPMZDHGV",
    "pack": 25,
    "covers": [
      "plates",
      "dessertPlates"
    ],
    "kind": "service"
  }
];
export function productRecommendations(s:State,inventory:{key:string;missing:number}[],head:number,kids:number,selection=s.selectedTableProducts){
 const remaining=new Map(inventory.map(r=>[r.key,r.missing]));const tables=tablesFor(s,head,kids);
 return selection.map(asin=>{const product=tableProducts.find(p=>p.asin===asin);if(!product)return null;let note='';
 if(product.kind==='linen'&&tables.some(t=>{const c=clothSize(t.detail);return Boolean(product.round)!==(t.detail.shape==='Round')||product.dimensions![0]<c.length||product.dimensions![1]<c.width;}))note='Size or shape does not cover every planned table at your selected drop. Check table dimensions.';
 const need=product.covers.length?Math.max(...product.covers.filter(k=>k!=='dessertForks').map(k=>k==='forks'?(remaining.get(k)||0)+(remaining.get('dessertForks')||0):remaining.get(k)||0)):head?Math.max(0,(product.kind==='holders'?tables.length*4:product.kind==='lamps'?tables.length:Math.ceil(head*1.1))-(s.productOwned[asin]||0)):0;
 const packs=note?0:Math.ceil(need/product.pack);if(!note)for(const key of product.covers){const supplied=key==='dessertForks'?Math.max(0,packs*product.pack-(inventory.find(r=>r.key==='forks')?.missing||0)):packs*product.pack;remaining.set(key,Math.max(0,(remaining.get(key)||0)-supplied));}
 return {...product,packs,note};
 }).filter((p):p is Product&{packs:number;note:string}=>Boolean(p));
}
