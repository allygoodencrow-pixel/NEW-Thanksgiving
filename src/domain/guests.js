export function normalizeGuest(guest={},fallbackId=null){
 const type=guest.type==="child"?"child":"adult";const rsvp=["yes","pending","no"].includes(guest.rsvp)?guest.rsvp:"pending";const kids=Math.max(0,Math.floor(Number(guest.kids)||0));const guestId=String(guest.guestId||guest.id||fallbackId||"guest");
 return {guestId,name:String(guest.name||"Guest"),type,rsvp,plus:Number(guest.plus)?1:0,kids,dietaryRestrictions:list(guest.dietaryRestrictions),allergies:list(guest.allergies),plusDietaryRestrictions:list(guest.plusDietaryRestrictions),plusAllergies:list(guest.plusAllergies),childDietaryRestrictions:Array.isArray(guest.childDietaryRestrictions)?guest.childDietaryRestrictions.map(list):[],childAllergies:Array.isArray(guest.childAllergies)?guest.childAllergies.map(list):[],appetite:normalizeAppetite(guest.appetite),plusAppetite:normalizeAppetite(guest.plusAppetite),childAppetites:Array.isArray(guest.childAppetites)?guest.childAppetites.map(normalizeAppetite):[],alcohol:guest.alcohol??null,plusAlcohol:guest.plusAlcohol??null,highChairs:Math.max(0,Number(guest.highChairs)||0),householdId:String(guest.householdId||guestId)};
}
const list=value=>Array.isArray(value)?value.map(x=>String(x).trim().toLowerCase()).filter(Boolean):[];
const normalizeAppetite=value=>["light","regular","hearty"].includes(value)?value:"regular";
export function guestPopulation(guests,mode="expected"){const include=guest=>mode==="confirmed"?guest.rsvp==="yes":guest.rsvp!=="no";let adults=0,children=0,drinkers=0;(guests||[]).map((g,i)=>normalizeGuest(g,`guest-${i+1}`)).filter(include).forEach(guest=>{if(guest.type==="child")children+=1;else{adults+=1;if(guest.alcohol===true||guest.alcohol==="yes")drinkers+=1;}if(guest.plus){adults+=1;if(guest.plusAlcohol===true||guest.plusAlcohol==="yes")drinkers+=1;}children+=guest.kids;});return {headcount:adults+children,adults,children,drinkers};}
export function planningContext(state){const mode=state.planning.mode;if(mode==="expected"||mode==="confirmed"){const p=guestPopulation(state.guests,mode);return {mode,planningHeadcount:p.headcount,planningAdults:p.adults,planningChildren:p.children,planningAdultDrinkers:p.drinkers};}const prefix=mode==="custom"?"custom":"estimated";const headcount=Math.max(0,Number(state.planning[prefix+"Headcount"])||0);const children=Math.min(headcount,Math.max(0,Number(state.planning[prefix+"Children"])||0));return {mode,planningHeadcount:headcount,planningAdults:headcount-children,planningChildren:children,planningAdultDrinkers:Math.max(0,Number(state.planning[prefix+"AdultDrinkers"])||0)};}
export function namedPlanningPeople(state){
 const mode=state.planning.mode==="confirmed"?"confirmed":"expected";const include=g=>mode==="confirmed"?g.rsvp==="yes":g.rsvp!=="no";const people=[];
 for(const [index,raw] of (state.guests||[]).entries()){const g=normalizeGuest(raw,`guest-${index+1}`);if(!include(g))continue;people.push({personId:g.guestId,name:g.name,child:g.type==="child",dietaryRestrictions:g.dietaryRestrictions,allergies:g.allergies,appetite:g.appetite});
  if(g.plus)people.push({personId:`${g.guestId}:plus`,name:`${g.name} +1`,child:false,dietaryRestrictions:g.plusDietaryRestrictions,allergies:g.plusAllergies,appetite:g.plusAppetite,unconfirmedDietary:g.plusDietaryRestrictions.length===0&&g.plusAllergies.length===0});
  for(let i=0;i<g.kids;i++)people.push({personId:`${g.guestId}:child:${i}`,name:`${g.name} child ${i+1}`,child:true,dietaryRestrictions:g.childDietaryRestrictions[i]||[],allergies:g.childAllergies[i]||[],appetite:g.childAppetites[i]||"regular",unconfirmedDietary:!(g.childDietaryRestrictions[i]?.length||g.childAllergies[i]?.length)});
 }
 return people;
}

function belongsToGuest(personId,guestId){const p=String(personId||""),g=String(guestId);return p===g||p.startsWith(g+":plus")||p.startsWith(g+":child:");}
function releaseGuestSeats(state,guestId){const seats={...(state.seats||{})};for(const [seatId,personId] of Object.entries(seats))if(belongsToGuest(personId,guestId))delete seats[seatId];return seats;}
export function updateGuest(state,guestId,patch={}){
 const id=String(guestId);const guests=(state.guests||[]).map((g,index)=>{const n=normalizeGuest(g,`guest-${index+1}`);return n.guestId===id?{...g,...patch,guestId:id}:g;});
 const declined=patch.rsvp==="no";return {...state,guests,seats:declined?releaseGuestSeats(state,id):state.seats};
}
export function removeGuest(state,guestId){
 const id=String(guestId);
 const guests=(state.guests||[]).filter((g,index)=>normalizeGuest(g,`guest-${index+1}`).guestId!==id);
 const menuResponsibilities={...(state.menuResponsibilities||{})};
 for(const [dishId,r] of Object.entries(menuResponsibilities)){if(String(r?.contributorGuestId||"")===id)menuResponsibilities[dishId]={...r,contributorGuestId:null,status:"contributor-removed"};}
 return {...state,guests,seats:releaseGuestSeats(state,id),menuResponsibilities};
}
