import {useEffect,useState,type CSSProperties} from 'react';
import {createPortal} from 'react-dom';
type Feature={label:string;detail:string;target:string};
const features:Record<string,Feature[]>={
 HOME:[{label:'YOUR GUESTS + MENU',detail:'Pick your guests and dishes. The app tells you how much food to buy.',target:'.hosting-counts'},{label:'CHOOSE A SECTION',detail:'Keep guests, food, shopping and prep here instead of juggling separate lists.',target:'.hosting-navigation'}],
 'PARTY PLAN':[{label:'SET THE DATE + TIME',detail:'Set dinner time once. Your cooking and serving schedule is built around it.',target:'.setup-essentials'},{label:'HOW MANY ARE COMING?',detail:'Choose how many people to cook for. The app works out the food amounts.',target:'.setup-details > summary'}],
 GUESTS:[{label:'ADD YOUR GUESTS',detail:'Keep names, food allergies and what people are bringing together in one guest list.',target:'.guest-entry'},{label:'CHANGE WHO’S COMING',detail:'When someone can’t come, food and shopping amounts change—without redoing the math.',target:'.guest-rsvp select'},{label:'SEE WHO’S COMING',detail:'Know who’s coming and who hasn’t answered, without counting replies yourself.',target:'.guest-count-line'}],
 MENU:[{label:'SEE THE RECIPE',detail:'Recipes show how much you need for your guests. You don’t have to work it out.',target:'.menu-dish-recipe'},{label:'ADD A DISH',detail:'Add a dish and its ingredients go on your shopping list. No rewriting needed.',target:'.add-dish-action'},{label:'YOUR SHOPPING LIST',detail:'Your dishes become a shopping list, so you don’t have to make one from scratch.',target:'.menu-support'}],
 'PLAN MENU':[{label:'CHOOSE YOUR DISHES',detail:'Choose from the recipe library instead of starting your menu from scratch.',target:'.library-recipe-card'},{label:'ADD YOUR OWN RECIPE',detail:'Use your family recipes too. Their ingredients can join the same shopping list.',target:'.add-recipe-button'}],
 SHOPPING:[{label:'CHANGE HOW MUCH TO BUY',detail:'Need more or less? Edit any shopping amount and keep the list right for your party.',target:'.shopping-edit-trigger'},{label:'SEE WHAT IS LEFT',detail:'Check off what you buy. See what’s left at a glance.',target:'.shopping-list-filters'},{label:'ADD HOUSEHOLD EXTRAS',detail:'Add ice, candles and trash bags to the same list, so the little things aren’t forgotten.',target:'.custom-shopping-panel'}],
 PREP:[{label:'MAKE AHEAD',detail:'See what you can prepare early, so there’s less to do when guests arrive.',target:'.prep-start-grid'}],
 TIMELINE:[{label:'FOLLOW THE TIMING',detail:'See when to cook and serve. Spot dishes that need the oven at the same time.',target:'.timeline-row'},{label:'ADD AN EVENT',detail:'Add photos, games and arrivals to the schedule, so the whole day is easy to follow.',target:'.page-timeline .input-panel'}],
 TABLE:[{label:'SEE THE TABLE PLAN',detail:'Know how many tables and chairs you need before guests arrive.',target:'.table-visual'},{label:'GIVE EACH GUEST A SEAT',detail:'Give everyone a seat ahead of time instead of sorting it out at dinner.',target:'.seat-grid'}],
 BUDGET:[{label:'KEEP TRACK OF COSTS',detail:'See what the party may cost and what you’ve already spent, all in one place.',target:'.budget-head'},{label:'RECORD A PURCHASE',detail:'Record purchases as you go, so you can keep track of spending.',target:'input[type="number"]'}],
 PRINTABLES:[{label:'EXPLORE THE COLLECTION',detail:'The printable collection comes with the app, so you can finish the party details too.',target:'.printable-collection-intro'},{label:'ADD YOUR PARTY DETAILS',detail:'Your guests and dishes fill in name cards and menu labels, saving you from typing them again.',target:'.printable-category'}],
 EXPERIENCE:[{label:'CHOOSE AN ACTIVITY',detail:'Choose an activity. Its supplies and timing join your plan, so there’s less to remember.',target:'.content .panel'}],
};
const recipeFeature:Feature={label:'HERE’S HOW MUCH YOU NEED',detail:'These are the amounts to buy for your guests. The app has already done the math.',target:'.recipe-ingredient-section .recipe-scale-note'};
const appearances=[
 {shape:'circle',color:'#334cff',line:'#334cff',text:'#ffffff'},
 {shape:'burst',color:'#6935c7',line:'#6935c7',text:'#ffffff'},
 {shape:'label',color:'#f9c8df',line:'#98285a',text:'#161616'},
 {shape:'ticket',color:'#08685d',line:'#08685d',text:'#ffffff'},
 {shape:'cut-corners',color:'#ccebe0',line:'#196555',text:'#161616'},
];
type Position={x:number;y:number;tx:number;ty:number;size:number;recipe:boolean;visible:boolean;inView:boolean};
export function BuyerFeatureSticker({page}:{page:string}){
 const [index,setIndex]=useState(0),[position,setPosition]=useState<Position|null>(null);
  useEffect(()=>{setIndex(0);},[page]);
 useEffect(()=>{
  let frame=0;
  function update(){
   const recipe=Boolean(document.querySelector('.recipe-overlay'));
   const item=recipe?recipeFeature:features[page]?.[index];
   const target=item&&document.querySelector<HTMLElement>(item.target);
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
 function next(){const n=(index+1)%list.length;setIndex(n);document.querySelector<HTMLElement>(list[n].target)?.scrollIntoView({block:'center',behavior:'instant'});}
 const {x,y,tx,ty,size}=position;
 const bx=x+size/2,by=y+size/2;
 const appearance=appearances[position.recipe?4:((Object.keys(features).indexOf(page)+index)%appearances.length)];
 return createPortal(<div className={`demo-annotation-layer demo-shape-${appearance.shape}`} style={{'--demo-ink':appearance.color,'--demo-text':appearance.text,'--demo-line':appearance.line} as CSSProperties}>
  {position.inView&&<svg className="demo-moving-arrow" aria-hidden="true"><defs><marker id="demo-arrow-tip" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6"/></marker></defs><path d={`M${bx} ${by} Q${bx} ${ty} ${tx} ${ty}`} markerEnd="url(#demo-arrow-tip)"/></svg>}
  <aside className="demo-feature-sticker" aria-label="Feature highlight" style={{left:x,top:y,width:size}}>
   <div className="demo-sticker-badge"><span className="demo-annotation-kicker">DEMO NOTE</span><p className="demo-sticker-message">{item.detail}</p></div>
   {!position.inView&&<button className="demo-next-feature" onClick={()=>document.querySelector<HTMLElement>(item.target)?.scrollIntoView({block:'center',behavior:'instant'})}>SHOW FEATURE ↓</button>}
   {!position.recipe&&list.length>1&&<button className="demo-next-feature" onClick={next}>NEXT FEATURE · {index+1}/{list.length} →</button>}
  </aside>
 </div>,document.body);
}
