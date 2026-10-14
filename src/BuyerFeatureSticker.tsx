import {useEffect,useState} from 'react';
import {createPortal} from 'react-dom';
type Feature={label:string;detail:string;target:string};
const features:Record<string,Feature[]>={
 HOME:[{label:'ONE CONNECTED PLAN',detail:'These counts connect your guests, menu and quantities.',target:'.hosting-counts'},{label:'EXPLORE YOUR PLAN',detail:'Choose one of these four sections to begin.',target:'.hosting-navigation'}],
 'PARTY PLAN':[{label:'SET YOUR GATHERING',detail:'Your date and dinner time guide the prep and timeline.',target:'.setup-essentials'},{label:'CHOOSE YOUR HEADCOUNT',detail:'Expected includes pending guests. Confirmed includes only guests who are attending.',target:'.setup-essentials select'}],
 GUESTS:[{label:'ADD YOUR PEOPLE',detail:'Add adults and children individually so their preferences stay connected.',target:'.guest-entry'},{label:'RSVPS DO THE MATH',detail:'Change this RSVP. Expected and confirmed counts update your quantities.',target:'.guest-rsvp select'},{label:'COUNTS STAY CONNECTED',detail:'Attending, awaiting reply and declined remain separate.',target:'.guest-count-line'}],
 MENU:[{label:'OPEN A REAL RECIPE',detail:'Tap View recipe to see ingredient amounts already adjusted for your gathering.',target:'.menu-dish-recipe'},{label:'MAKE THE MENU YOURS',detail:'Add another dish. Its ingredients and prep join your plan.',target:'.add-dish-action'},{label:'YOUR LIST FOLLOWS',detail:'Open Shopping to see ingredients from the dishes you selected.',target:'.menu-support'}],
 'PLAN MENU':[{label:'CHOOSE YOUR DISHES',detail:'Add a dish from the recipe library to your own menu.',target:'.library-recipe-card'},{label:'YOUR OWN RECIPES TOO',detail:'Save a family recipe with its ingredients and original serving count.',target:'.add-recipe-button'}],
 SHOPPING:[{label:'EDIT YOUR QUANTITIES',detail:'Open a row to change the amount, price or quantity mode.',target:'.shopping-edit-trigger'},{label:'SEE WHAT IS LEFT',detail:'Switch between the full list, items still to buy and purchases already checked off.',target:'.shopping-list-filters'},{label:'ADD HOUSEHOLD EXTRAS',detail:'Add items that are not already generated from your menu.',target:'.custom-shopping-panel'}],
 PREP:[{label:'MAKE AHEAD',detail:'Your dishes feed the prep plan. Finish what you can before guests arrive.',target:'.prep-start-grid'},{label:'CHECK OFF THE WORK',detail:'Mark tasks complete as you prepare your gathering.',target:'.content input[type="checkbox"]'}],
 TIMELINE:[{label:'FOLLOW THE TIMING',detail:'Cooking, arrivals and serving are organized around dinner.',target:'.timeline-row'},{label:'ADD YOUR OWN MOMENTS',detail:'Add a family photo, an activity or another event.',target:'.page-timeline .input-panel'}],
 TABLE:[{label:'SEE THE TABLE PLAN',detail:'Review seats and table capacity together.',target:'.table-visual'},{label:'GIVE EACH GUEST A SEAT',detail:'Assign guests to seats; declining an RSVP releases their seat.',target:'.seat-grid'}],
 BUDGET:[{label:'PLAN VS. SPENDING',detail:'Compare estimated costs with purchases you have recorded.',target:'.budget-head'},{label:'RECORD A PURCHASE',detail:'Link a purchase to a planned item to avoid counting the same cost twice.',target:'input[type="number"]'}],
 PRINTABLES:[{label:'EXPLORE THE COLLECTION',detail:'Original collection PDFs are available with purchase.',target:'.printable-collection-intro'},{label:'PERSONALIZE FROM YOUR PLAN',detail:'Open a category to see tools using your guest list and menu.',target:'.printable-category'}],
 EXPERIENCE:[{label:'MORE THAN DINNER',detail:'Activities connect their supplies and timing to your plan.',target:'.content .panel'}],
};
const recipeFeature:Feature={label:'AMOUNTS ALREADY ADJUSTED',detail:'Use the ingredient amounts shown here. They are the total you need—do not multiply them again. Whole recipes round up when needed.',target:'.recipe-ingredient-section .recipe-scale-note'};
type Position={x:number;y:number;tx:number;ty:number;size:number;recipe:boolean;visible:boolean;inView:boolean};
export function BuyerFeatureSticker({page}:{page:string}){
 const [index,setIndex]=useState(0),[position,setPosition]=useState<Position|null>(null);
 const [expanded,setExpanded]=useState(false);
 useEffect(()=>{setIndex(0);setExpanded(false);},[page]);
 useEffect(()=>{
  let frame=0;
  function update(){
   const recipe=Boolean(document.querySelector('.recipe-overlay'));
   const item=recipe?recipeFeature:features[page]?.[index];
   const target=item&&document.querySelector<HTMLElement>(item.target);
   if(!target||document.querySelector('.sidebar.show')){setPosition(p=>p?.visible?{...p,visible:false}:p);return;}
   const r=target.getBoundingClientRect(),w=window.innerWidth,h=window.innerHeight,size=w<650?110:140;
   const inView=r.bottom>20&&r.top<h-20&&r.width>0&&r.height>0;
   const tx=Math.max(16,Math.min(w-16,r.left+r.width/2)),ty=Math.max(24,Math.min(h-24,r.top+Math.min(r.height/2,80)));
   let x:number,y:number;
   if(r.right+size+36<w){x=r.right+24;y=ty-size/2;}
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
 function next(){const n=(index+1)%list.length;setIndex(n);setExpanded(false);document.querySelector<HTMLElement>(list[n].target)?.scrollIntoView({block:'center',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 const {x,y,tx,ty,size}=position;
 const bx=x+size/2,by=y+size/2;
 return createPortal(<div className="demo-annotation-layer">
  {position.inView&&<svg className="demo-moving-arrow" aria-hidden="true"><defs><marker id="demo-arrow-tip" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6"/></marker></defs><path d={`M${bx} ${by} Q${bx} ${ty} ${tx} ${ty}`} markerEnd="url(#demo-arrow-tip)"/></svg>}
  <aside className="demo-feature-sticker" aria-label="Feature highlight" style={{left:x,top:y,width:size}}>
   <button className="demo-sticker-badge" aria-expanded={expanded} aria-label={`Demo highlight: ${item.label}`} onClick={()=>setExpanded(v=>!v)}><span className="demo-annotation-kicker">DEMO NOTE</span><span className="demo-sticker-title">{item.label}</span><span className="demo-annotation-tap">TAP TO LEARN</span></button>
   {expanded&&<p className="demo-sticker-explanation" style={{left:Math.max(16,Math.min(window.innerWidth-246,x>260?x-246:x+size+16)),top:Math.max(16,Math.min(window.innerHeight-170,y))}}>{item.detail}</p>}
   {!position.inView&&<button className="demo-next-feature" onClick={()=>document.querySelector<HTMLElement>(item.target)?.scrollIntoView({block:'center',behavior:'smooth'})}>SHOW FEATURE ↓</button>}
   {!position.recipe&&list.length>1&&<button className="demo-next-feature" onClick={next}>NEXT FEATURE · {index+1}/{list.length} →</button>}
  </aside>
 </div>,document.body);
}
