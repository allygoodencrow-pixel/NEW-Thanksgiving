export function normalizeGuest(guest={}){
 const type=guest.type==="child"?"child":"adult";
 const rsvp=["yes","pending","no"].includes(guest.rsvp)?guest.rsvp:"pending";
 const kids=Math.max(0,Math.floor(Number(guest.kids)||0));
 return {guestId:guest.guestId||guest.id||crypto.randomUUID(),name:String(guest.name||"Guest"),type,rsvp,plus:Number(guest.plus)?1:0,kids,dietaryRestrictions:Array.isArray(guest.dietaryRestrictions)?guest.dietaryRestrictions:[],plusDietaryRestrictions:Array.isArray(guest.plusDietaryRestrictions)?guest.plusDietaryRestrictions:[],appetite:normalizeAppetite(guest.appetite),plusAppetite:normalizeAppetite(guest.plusAppetite),childAppetites:Array.isArray(guest.childAppetites)?guest.childAppetites.map(normalizeAppetite):[],alcohol:guest.alcohol??null,plusAlcohol:guest.plusAlcohol??null,highChairs:Math.max(0,Number(guest.highChairs)||0),householdId:String(guest.householdId||guest.guestId||guest.id||"")};
}
const normalizeAppetite=value=>["light","regular","hearty"].includes(value)?value:"regular";
export function guestPopulation(guests,mode="expected"){
 const include=guest=>mode==="confirmed"?guest.rsvp==="yes":guest.rsvp!=="no";
 let adults=0,children=0,drinkers=0;
 guests.map(normalizeGuest).filter(include).forEach(guest=>{if(guest.type==="child")children+=1;else{adults+=1;if(guest.alcohol===true||guest.alcohol==="yes")drinkers+=1;}if(guest.plus){adults+=1;if(guest.plusAlcohol===true||guest.plusAlcohol==="yes")drinkers+=1;}children+=guest.kids;});
 return {headcount:adults+children,adults,children,drinkers};
}
export function planningContext(state){
 const mode=state.planning.mode;
 if(mode==="expected"||mode==="confirmed"){const p=guestPopulation(state.guests,mode);return {mode,planningHeadcount:p.headcount,planningAdults:p.adults,planningChildren:p.children,planningAdultDrinkers:p.drinkers};}
 const prefix=mode==="custom"?"custom":"estimated";
 const headcount=Math.max(0,Number(state.planning[prefix+"Headcount"])||0);
 const children=Math.min(headcount,Math.max(0,Number(state.planning[prefix+"Children"])||0));
 return {mode,planningHeadcount:headcount,planningAdults:headcount-children,planningChildren:children,planningAdultDrinkers:Math.max(0,Number(state.planning[prefix+"AdultDrinkers"])||0)};
}
