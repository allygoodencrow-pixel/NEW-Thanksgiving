const UNIT_ALIASES=new Map([
 ["tsp","tsp"],["teaspoon","tsp"],["teaspoons","tsp"],
 ["tbsp","tbsp"],["tablespoon","tbsp"],["tablespoons","tbsp"],
 ["cup","cup"],["cups","cup"],
 ["fl oz","floz"],["fluid ounce","floz"],["fluid ounces","floz"],["floz","floz"],
 ["ml","ml"],["milliliter","ml"],["milliliters","ml"],["millilitre","ml"],["millilitres","ml"],
 ["l","l"],["liter","l"],["liters","l"],["litre","l"],["litres","l"],
 ["oz","oz"],["ounce","oz"],["ounces","oz"],
 ["lb","lb"],["lbs","lb"],["pound","lb"],["pounds","lb"],
 ["g","g"],["gram","g"],["grams","g"],
 ["kg","kg"],["kilogram","kg"],["kilograms","kg"],
 ["each","each"],["ea","each"],["item","each"],["items","each"],["count","each"],["whole","each"],
 ["serving","serving"],["servings","serving"],
 ["package","package"],["packages","package"],["pack","package"],["packs","package"]
]);
const UNITS={
 tsp:{dimension:"volume",toBase:4.92892159375},tbsp:{dimension:"volume",toBase:14.78676478125},cup:{dimension:"volume",toBase:236.5882365},floz:{dimension:"volume",toBase:29.5735295625},ml:{dimension:"volume",toBase:1},l:{dimension:"volume",toBase:1000},
 oz:{dimension:"mass",toBase:28.349523125},lb:{dimension:"mass",toBase:453.59237},g:{dimension:"mass",toBase:1},kg:{dimension:"mass",toBase:1000},
 each:{dimension:"count",toBase:1},serving:{dimension:"serving",toBase:1},package:{dimension:"package",toBase:1}
};
export function normalizeUnit(unit="each"){
 const raw=String(unit||"each").trim().toLowerCase().replace(/\./g,"").replace(/\s+/g," ");
 const id=UNIT_ALIASES.get(raw)||raw;
 return {id,dimension:UNITS[id]?.dimension||`custom:${id}`,toBase:UNITS[id]?.toBase??1,known:Boolean(UNITS[id])};
}
export function compatibleUnits(a,b){return normalizeUnit(a).dimension===normalizeUnit(b).dimension;}
export function toCanonical(quantity,unit){const q=Number(quantity)||0;const u=normalizeUnit(unit);return {quantity:q*u.toBase,dimension:u.dimension,unit:u.id};}
export function fromCanonical(quantity,dimension,preferredUnit){const p=normalizeUnit(preferredUnit);if(p.dimension!==dimension)return null;return quantity/p.toBase;}
export function chooseDisplayUnit(quantity,dimension){
 const q=Math.abs(quantity);
 if(dimension==="volume"){if(q>=59.147059125)return "cup";if(q>=14.78676478125)return "tbsp";if(q>=4.92892159375)return "tsp";return "ml";}
 if(dimension==="mass"){if(q>=453.59237)return "lb";if(q>=28.349523125)return "oz";return "g";}
 if(dimension==="count")return "each";if(dimension==="serving")return "serving";if(dimension==="package")return "package";
 return dimension.startsWith("custom:")?dimension.slice(7):"each";
}
export function displayQuantity(canonicalQuantity,dimension,preferredUnit){const unit=preferredUnit&&normalizeUnit(preferredUnit).dimension===dimension?normalizeUnit(preferredUnit).id:chooseDisplayUnit(canonicalQuantity,dimension);const quantity=fromCanonical(canonicalQuantity,dimension,unit)??canonicalQuantity;return {quantity,unit};}
