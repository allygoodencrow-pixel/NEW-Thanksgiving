import {useEffect,useState,type CSSProperties} from 'react';
import {createPortal} from 'react-dom';
type Feature={label:string;detail:string;target:string;reveal?:string};
const features:Record<string,Feature[]>={
 "HOME": [
  {
   "label": "Guest changes",
   "detail": "Change your guests, and the app changes how much food to buy.",
   "target": ".hosting-counts"
  },
  {
   "label": "One place",
   "detail": "Choose dishes, plan shopping and get ready for guests without keeping separate lists.",
   "target": ".hosting-navigation"
  },
  {
   "label": "Private parties",
   "detail": "Your purchased account keeps separate saved parties, so you can come back to each plan.",
   "target": ".buyer-demo-actions a"
  }
 ],
 "PARTY PLAN": [
  {
   "label": "Dinner time",
   "detail": "Change dinner time, and your cooking and serving schedule moves with it.",
   "target": ".setup-essentials input[type=\"time\"]"
  },
  {
   "label": "How many to feed",
   "detail": "Choose how many people to cook for, and the app works out your food and supply amounts.",
   "target": ".setup-details > summary"
  },
  {
   "label": "Kitchen setup",
   "detail": "Tell the app how many ovens you have, and it checks cooking times against your setup.",
   "target": "label=Ovens"
  },
  {
   "label": "Save a copy",
   "detail": "Download a copy of your plan, or open a plan you saved earlier.",
   "target": ".plan-settings"
  }
 ],
 "GUESTS": [
  {
   "label": "Guest changes",
   "detail": "Change your guests, and the app changes how much food to buy.",
   "target": ".guest-entry"
  },
  {
   "label": "Replies",
   "detail": "Change whether someone is coming, and your guest totals update.",
   "target": ".guest-rsvp select"
  },
  {
   "label": "Children",
   "detail": "Mark a guest as a child, and food amounts allow for smaller portions.",
   "target": "select[aria-label^=\"Adult or child for\"]",
   "reveal": ".guest-details-toggle"
  },
  {
   "label": "Dietary needs",
   "detail": "Add dietary needs, and the app flags guests who still need a suitable dish.",
   "target": ".dietary-picker",
   "reveal": ".guest-details-toggle"
  },
  {
   "label": "Drinks",
   "detail": "Choose who drinks alcohol, and the app adjusts the drinks needed.",
   "target": "select[aria-label^=\"Alcohol preference for\"]",
   "reveal": ".guest-details-toggle"
  },
  {
   "label": "Guest contributions",
   "detail": "Confirm what a guest is bringing, and you won’t shop for that dish yourself.",
   "target": ".guest-contribution",
   "reveal": ".guest-details-toggle"
  },
  {
   "label": "Guest notes",
   "detail": "Keep arrival and seating notes beside each name, so you don’t lose them in messages.",
   "target": "input[aria-label^=\"Seating note for\"]",
   "reveal": ".guest-details-toggle"
  },
  {
   "label": "How many to plan for",
   "detail": "Choose to include people still deciding, or cook only for guests who said yes.",
   "target": ".guest-headcount-settings"
  }
 ],
 "PLAN MENU": [
  {
   "label": "Recipe library",
   "detail": "Browse mains, sides, desserts and drinks instead of building your menu from scratch.",
   "target": ".recipe-browser"
  },
  {
   "label": "Add dishes",
   "detail": "Add a dish, and its ingredients and prep join your plan.",
   "target": ".library-recipe-card"
  },
  {
   "label": "Family recipes",
   "detail": "Add your own recipe, and its ingredients join the same shopping list.",
   "target": ".add-recipe-button"
  }
 ],
 "MENU": [
  {
   "label": "Recipe amounts",
   "detail": "Choose your dishes, and the app works out ingredient amounts for your guests.",
   "target": ".menu-dish-recipe"
  },
  {
   "label": "Shopping list",
   "detail": "Add a dish, and its ingredients go on your shopping list.",
   "target": ".add-dish-action"
  },
  {
   "label": "Guest dishes",
   "detail": "Assign a dish to a guest, then track whether they’ve confirmed they’re bringing it.",
   "target": "select[aria-label^=\"Who is responsible\"]"
  },
  {
   "label": "Bought dishes",
   "detail": "Mark a dish as purchased, and the list shows the prepared food instead of raw ingredients.",
   "target": "select[aria-label^=\"Preparation for\"]"
  },
  {
   "label": "Remove dishes",
   "detail": "Remove a dish, and the shopping and prep lists update too.",
   "target": ".recipe-remove-button"
  },
  {
   "label": "Dietary checks",
   "detail": "Review your menu against guests’ dietary needs before deciding what to serve.",
   "target": ".menu-support"
  },
  {
   "label": "Food and supplies",
   "detail": "Your dishes help plan serving pieces as well as ingredients, so you can check both.",
   "target": ".menu-totals"
  }
 ],
 "SHOPPING": [
  {
   "label": "Amounts",
   "detail": "Change your guest list or dishes, and the shopping amounts update.",
   "target": ".shopping-plan-note"
  },
  {
   "label": "Edit items",
   "detail": "Change an amount when you want more, less or a little extra.",
   "target": ".shopping-edit-trigger"
  },
  {
   "label": "Keep a fixed amount",
   "detail": "Keep an amount fixed when you don’t want guest changes to alter it.",
   "target": "select[aria-label^=\"Quantity mode for\"]",
   "reveal": ".shopping-edit-trigger"
  },
  {
   "label": "Prices",
   "detail": "Enter an item’s price, and the app includes it in your spending plan.",
   "target": "input[aria-label^=\"Unit price for\"]",
   "reveal": ".shopping-edit-trigger"
  },
  {
   "label": "Packages",
   "detail": "Enter a package size and price to work out its cost for your shopping list.",
   "target": "input[aria-label^=\"Package size for\"]",
   "reveal": ".shopping-edit-trigger"
  },
  {
   "label": "Bought items",
   "detail": "Check off what you bought, and see only what’s still left to get.",
   "target": ".shopping-list-filters"
  },
  {
   "label": "Extra items",
   "detail": "Add ice, candles and household extras to the same list, so little things aren’t forgotten.",
   "target": ".custom-shopping-panel"
  },
  {
   "label": "What you own",
   "detail": "Check your kitchen equipment, and add only the things you still need.",
   "target": ".equipment-guide"
  },
  {
   "label": "When to shop",
   "detail": "See when to buy ahead and what to leave until closer to the party.",
   "target": ".shopping-support-row:last-child"
  }
 ],
 "PREP": [
  {
   "label": "Make ahead",
   "detail": "Choose your dishes, and the app shows what you can prepare before Thanksgiving.",
   "target": ".guided-prep-grid .panel:nth-child(2)"
  },
  {
   "label": "House prep",
   "detail": "Food, cleaning, drinks and table setup share a checklist, so you can get ready in order.",
   "target": ".guided-prep-grid .panel:first-child"
  },
  {
   "label": "Day of",
   "detail": "Check off the day’s cooking and house tasks instead of trying to remember everything.",
   "target": ".guided-prep-grid .panel:nth-child(3)"
  },
  {
   "label": "Own tasks",
   "detail": "Add your own prep task, and keep it alongside the app’s checklist.",
   "target": "label=Task"
  },
  {
   "label": "Oven planning",
   "detail": "Tell the app how many ovens you have, and review dishes that need them at the same time.",
   "target": ".prep-details"
  }
 ],
 "TIMELINE": [
  {
   "label": "Cooking times",
   "detail": "Change your menu or dinner time, and the cooking schedule follows.",
   "target": ".timeline-row"
  },
  {
   "label": "Adjust times",
   "detail": "Move a cooking task earlier or later, and check how it fits with the rest of the day.",
   "target": ".timeline-row input"
  },
  {
   "label": "Add events",
   "detail": "Add arrivals, games or a family photo, and they appear in the same schedule.",
   "target": ".page-timeline .input-panel"
  },
  {
   "label": "Get ready",
   "detail": "Set aside time to get ready, and the app checks whether cooking tasks overlap your break.",
   "target": ".timeline-layout .warm"
  },
  {
   "label": "Serving",
   "detail": "Your dishes appear in a serving checklist with the bowls, platters and utensils they need.",
   "target": ".serving-row"
  },
  {
   "label": "Early finishes",
   "detail": "Plan where to keep dishes that finish early, instead of finding space at the last minute.",
   "target": ".holding-plan"
  }
 ],
 "TABLE": [
  {
   "label": "Tables and chairs",
   "detail": "Change your guest count, and the app updates how many tables and chairs you need.",
   "target": ".chair-logic"
  },
  {
   "label": "Kids table",
   "detail": "Plan children’s seating separately when you want a kids’ table.",
   "target": ".table-planner-grid .toggle-field"
  },
  {
   "label": "Assign seats",
   "detail": "Choose where each guest will sit, and keep the seating plan with their name.",
   "target": ".seat-grid"
  },
  {
   "label": "Room layout",
   "detail": "Move tables in the room plan to work out where they’ll fit before setting up.",
   "target": ".room-layout"
  },
  {
   "label": "What you own",
   "detail": "Enter the plates, glasses and chairs you have, and the app shows what’s still missing.",
   "target": ".inventory-panel"
  },
  {
   "label": "Table sizes",
   "detail": "Enter your table sizes to check seats and tablecloth sizes.",
   "target": ".table-visual"
  }
 ],
 "BUDGET": [
  {
   "label": "Party costs",
   "detail": "Enter prices, and the app totals shopping costs against the budget you chose.",
   "target": ".budget-head"
  },
  {
   "label": "Record spending",
   "detail": "Add what you paid, and see how much of your budget is still left.",
   "target": ".content .save-recipe-button"
  },
  {
   "label": "Avoid double counting",
   "detail": "Match a purchase to its shopping item, so it isn’t counted as still needing to be bought.",
   "target": "select[aria-label=\"Related planned item\"]"
  },
  {
   "label": "Cost breakdown",
   "detail": "See food, drinks, supplies and other costs separately, so you can decide where to spend less.",
   "target": ".budget-line"
  }
 ],
 "PRINTABLES": [
  {
   "label": "Included collection",
   "detail": "The printable collection comes with the app, so your party details are covered too.",
   "target": ".printable-collection-intro"
  },
  {
   "label": "Design choices",
   "detail": "Browse the printable designs by type instead of searching through one long list.",
   "target": ".printable-category"
  },
  {
   "label": "Personalized details",
   "detail": "Change your guests or menu, and name cards and menu labels update from your plan.",
   "target": ".printable-plan-heading"
  },
  {
   "label": "Edit wording",
   "detail": "Change the wording on a personalized printable when you want your own party details.",
   "target": ".printable-editor"
  },
  {
   "label": "Print your plan",
   "detail": "Print your shopping list, menu and schedule so you can keep a copy beside you.",
   "target": ".printable-plan-heading"
  }
 ],
 "EXPERIENCE": [
  {
   "label": "Activities",
   "detail": "Choose a game, and its supplies and timing join your party plan.",
   "target": ".activity-card"
  },
  {
   "label": "How to play",
   "detail": "Open an activity to see instructions, prompts and what you need to play.",
   "target": ".activity-details"
  },
  {
   "label": "Your own activities",
   "detail": "Add your own activity instead of keeping it in a separate note.",
   "target": ".activity-custom"
  },
  {
   "label": "Drinks",
   "detail": "Choose drinks for the party, and keep them with the food and shopping plan.",
   "target": "heading=Drinks"
  },
  {
   "label": "Activity printouts",
   "detail": "Print the activity instructions and prompts when you want them ready for your guests.",
   "target": ".activity-details .text-link"
  }
 ]
};
const recipeFeature:Feature={label:'HERE’S HOW MUCH YOU NEED',detail:'These are the amounts to buy for your guests. The app has already done the math.',target:'.recipe-ingredient-section .recipe-scale-note'};
const appearances=[
 {shape:'circle',color:'#334cff',line:'#334cff',text:'#ffffff'},
 {shape:'burst',color:'#6935c7',line:'#6935c7',text:'#ffffff'},
 {shape:'label',color:'#f9c8df',line:'#98285a',text:'#161616'},
 {shape:'ticket',color:'#08685d',line:'#08685d',text:'#ffffff'},
 {shape:'cut-corners',color:'#ccebe0',line:'#196555',text:'#161616'},
];
function locateFeature(selector:string):HTMLElement|null {
 if(selector.startsWith('label='))return [...document.querySelectorAll<HTMLElement>('label')].find(el=>el.querySelector('span')?.textContent?.trim()===selector.slice(6))||null;
 if(selector.startsWith('heading='))return [...document.querySelectorAll<HTMLElement>('h2,h3')].find(el=>el.textContent?.trim()===selector.slice(8))||null;
 return document.querySelector<HTMLElement>(selector);
}
type Position={x:number;y:number;tx:number;ty:number;size:number;recipe:boolean;visible:boolean;inView:boolean};
export function BuyerFeatureSticker({page}:{page:string}){
 const [index,setIndex]=useState(0),[position,setPosition]=useState<Position|null>(null);
  useEffect(()=>{setIndex(0);},[page]);
 useEffect(()=>{
  let frame=0;
  function update(){
   const recipe=Boolean(document.querySelector('.recipe-overlay'));
   const item=recipe?recipeFeature:features[page]?.[index];
   const target=item&&(locateFeature(item.target)||document.querySelector<HTMLElement>('.content .page-head'));
   if(!target||document.querySelector('.sidebar.show')){setPosition(p=>p?.visible?{...p,visible:false}:p);return;}
   const r=target.getBoundingClientRect(),w=window.innerWidth,h=window.innerHeight,size=w<650?190:200;
   const inView=r.bottom>20&&r.top<h-20&&r.width>0&&r.height>0;
   const tx=Math.max(16,Math.min(w-16,r.left+r.width/2)),ty=Math.max(24,Math.min(h-24,r.top+Math.min(r.height/2,80)));
   let x:number,y:number;
   const bounds=target.closest('.recipe-sheet,.content')?.getBoundingClientRect();
   if(bounds&&tx<bounds.left+bounds.width/2&&bounds.left>size+36){x=bounds.left-size-24;y=ty-size/2;}
   else if(bounds&&bounds.right+size+36<w){x=bounds.right+24;y=ty-size/2;}
   else if(bounds&&bounds.left>size+36){x=bounds.left-size-24;y=ty-size/2;}
   else if(r.right+size+36<w){x=r.right+24;y=ty-size/2;}
   else if(r.left>size+36){x=r.left-size-24;y=ty-size/2;}
   else if(r.top>size+100){x=w-size-24;y=r.top-size-60;}
   else{x=w-size-24;y=Math.min(h-size-70,r.bottom+28);}
   x=Math.max(16,Math.min(w-size-16,x));y=Math.max(16,Math.min(h-size-70,y));
   const next={x,y,tx,ty,size,recipe,visible:true,inView};
   setPosition(p=>p&&Object.keys(next).every(k=>p[k as keyof Position]===next[k as keyof Position])?p:next);
  }
  function queue(){window.clearTimeout(frame);frame=window.setTimeout(update,0);}
  const shell=document.querySelector('.shell');
  const mutations=new MutationObserver(queue);if(shell)mutations.observe(shell,{childList:true,subtree:true,attributes:true,attributeFilter:['class','open']});
  const resize=typeof ResizeObserver!=='undefined'?new ResizeObserver(queue):null;if(shell)resize?.observe(shell);
  window.addEventListener('scroll',queue,true);window.addEventListener('resize',queue);update();
  return()=>{window.clearTimeout(frame);mutations.disconnect();resize?.disconnect();window.removeEventListener('scroll',queue,true);window.removeEventListener('resize',queue);};
 },[page,index]);
 const list=features[page]||[],item=position?.recipe?recipeFeature:list[index];
 if(!item||!position?.visible)return null;
 function showFeature(feature:Feature){
  const trigger=feature.reveal&&document.querySelector<HTMLElement>(feature.reveal);
  if(trigger&&trigger.getAttribute('aria-expanded')!=='true')trigger.click();
  window.setTimeout(()=>{
   const target=locateFeature(feature.target);
   if(target?.tagName==='DETAILS')(target as HTMLDetailsElement).open=true;
   let parent=target?.parentElement;
   while(parent){if(parent.tagName==='DETAILS')(parent as HTMLDetailsElement).open=true;parent=parent.parentElement;}
   target?.scrollIntoView({block:'center',behavior:'instant'});
  },0);
 }
 function next(){const n=(index+1)%list.length;setIndex(n);showFeature(list[n]);}
 const {x,y,tx,ty,size}=position;
 const bx=x+size/2,by=y+size/2;
 const appearance=appearances[position.recipe?4:((Object.keys(features).indexOf(page)+index)%appearances.length)];
 return createPortal(<div className={`demo-annotation-layer demo-shape-${appearance.shape}`} style={{'--demo-ink':appearance.color,'--demo-text':appearance.text,'--demo-line':appearance.line} as CSSProperties}>
  {position.inView&&<svg className="demo-moving-arrow" aria-hidden="true"><defs><marker id="demo-arrow-tip" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6"/></marker></defs><path d={`M${bx} ${by} Q${bx} ${ty} ${tx} ${ty}`} markerEnd="url(#demo-arrow-tip)"/></svg>}
  <aside className="demo-feature-sticker" aria-label="Feature highlight" style={{left:x,top:y,width:size}}>
   <div className="demo-sticker-badge"><span className="demo-annotation-kicker">DEMO NOTE</span><p className="demo-sticker-message">{item.detail}</p></div>
   {!position.inView&&<button className="demo-next-feature" onClick={()=>showFeature(item)}>SHOW FEATURE ↓</button>}
   {!position.recipe&&list.length>1&&<button className="demo-next-feature" onClick={next}>NEXT FEATURE · {index+1}/{list.length} →</button>}
  </aside>
 </div>,document.body);
}
