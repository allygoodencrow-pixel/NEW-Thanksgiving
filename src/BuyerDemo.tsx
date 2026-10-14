import { useState } from 'react';
import App, { freshPlan, type State } from './App';

export const demoStorageKey = 'cc-thanksgiving-buyer-demo-v1';
export function buyerSample(): State {
  const state = freshPlan('sample');
  const names = ['Avery', 'Jordan', 'Morgan', 'Taylor', 'Casey', 'Riley', 'Jamie', 'Quinn', 'Sam', 'Drew', 'Harper', 'Charlie'];
  state.guests = names.map((name, index) => ({guestId:`demo-guest-${index}`, name, rsvp: index===8 || index===9 ? 'Pending' : 'Attending', ageGroup:index>=10?'Child':'Adult', alcohol:index<7, kidBeverage:index>=10?'Water':'', diet:'', dietaryNeeds:[], dish:'', status:'Not confirmed', note:''}));
  state.count=12;state.kids=2;state.customHeadcount=12;state.customKids=2;state.estimatedDrinkers=7;
  state.menuPlan={};state.menuOwners={};state.seating={};state.notes='Sample gathering — explore freely.';
  return state;
}
const tour = [
  {route:'home', title:'Thanksgiving, already figured out.', copy:'Explore a sample party for 12. Use the menu at the top left, or follow this short tour.'},
  {route:'guests',title:'Start with your people.',copy:'Change a pending RSVP to declined. Expected headcount changes, and your plan follows.'},
  {route:'menu',title:'Make the menu yours.',copy:'Open a recipe to see the total amount of each ingredient you need. The app has already done the multiplying for you.'},
  {route:'shopping',title:'Your menu becomes your list.',copy:'See ingredients from the selected dishes. Edit a quantity, lock an override or mark an item bought.'},
  {route:'prep',title:'A little now. Less later.',copy:'Review make-ahead tasks and check off prep as you go.'},
  {route:'timeline',title:'Give everything its moment.',copy:'Review cooking, arrivals and serving around dinner. Check equipment conflicts and adjust your timing.'},
  {route:'table',title:'A place for everyone.',copy:'Try seating assignments and review the table and chair requirements for your guest count.'},
  {route:'budget',title:'Keep the costs in view.',copy:'Review estimated costs, supply needs and actual spending. Add missing prices to refine the estimate.'},
  {route:'printables',title:'The finishing details.',copy:'Explore the printable sections and personalized planning tools. Original collection downloads are available in a purchased account.'},
];
function readSample() {
  try {const saved=localStorage.getItem(demoStorageKey);return saved?JSON.parse(saved):buyerSample();}
  catch {return buyerSample();}
}
export default function BuyerDemo() {
  const [seed,setSeed]=useState(readSample);
  const [epoch,setEpoch]=useState(0);
  const [step,setStep]=useState(0);
  const [tourOpen,setTourOpen]=useState(true);
  const [highlightsOn,setHighlightsOn]=useState(true);
  const current=tour[step];
  function go(next:number) {
    setStep(next);setTourOpen(true);
    window.location.hash=tour[next].route;
  }
  function reset() {
    if(!window.confirm('Reset only your demo changes and start the sample again?'))return;
    const sample=buyerSample();
    try {localStorage.removeItem(demoStorageKey);localStorage.removeItem(`${demoStorageKey}-archive`);}catch {/* The fresh sample remains usable without storage. */}
    setSeed(sample);setEpoch(v=>v+1);go(0);
  }
  return <div className="buyer-demo">
    <section className="buyer-demo-bar" aria-label="Buyer demo controls">
      <div className="buyer-demo-label"><span>BUYER DEMO</span><small>Sample data · saved on this device</small></div>
      <div className="buyer-demo-actions"><button aria-pressed={highlightsOn} onClick={()=>setHighlightsOn(v=>!v)}>{highlightsOn?'HIDE HIGHLIGHTS':'SHOW HIGHLIGHTS'}</button><button aria-expanded={tourOpen} onClick={()=>setTourOpen(v=>!v)}>{tourOpen?'HIDE TOUR':'SHOW TOUR'}</button><button onClick={reset}>RESET SAMPLE</button><a href="/">CUSTOMER SIGN IN ↗</a></div>
      {tourOpen&&<div className="buyer-demo-tour"><div><span className="eyebrow">{String(step+1).padStart(2,'0')} / {String(tour.length).padStart(2,'0')}</span><h2>{current.title}</h2><p>{current.copy}</p></div><div className="buyer-demo-tour-actions">{step>0&&<button onClick={()=>go(step-1)}>BACK</button>}<button onClick={()=>step<tour.length-1?go(step+1):setTourOpen(false)}>{step===0?'START TOUR →':step===tour.length-1?'EXPLORE FREELY →':'NEXT →'}</button></div></div>}
    </section>
    <App key={epoch} seed={seed} storageKey={demoStorageKey} saveStatus="Demo · saved on this device" featureStickers={highlightsOn} />
  </div>;
}
