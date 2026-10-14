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
  {route:'home', title:'Try the Thanksgiving app.', copy:'Explore a sample party for 12. Use the menu at the top left, or follow this short tour.'},
  {route:'guests',title:'Add your guests.',copy:'Try changing someone’s answer to “Declined.” The app changes how much food you need.'},
  {route:'menu',title:'Choose your dishes.',copy:'Choose what you want to serve. Open a recipe to see how much to buy for your guests.'},
  {route:'shopping',title:'See what you need to buy.',copy:'Your dishes become your shopping list. Change an amount, add something or check off what you’ve bought.'},
  {route:'prep',title:'Get ready before the day.',copy:'Review make-ahead tasks and check off prep as you go.'},
  {route:'timeline',title:'Plan when to cook and serve.',copy:'See when to cook, when guests arrive and when to serve. The app warns you if dishes need the oven at the same time.'},
  {route:'table',title:'Choose where people will sit.',copy:'Choose where people will sit and see how many tables and chairs you need.'},
  {route:'budget',title:'Keep track of spending.',copy:'See what you expect to spend. Add prices and record what you’ve paid.'},
  {route:'printables',title:'See the printables.',copy:'See printables for your party. Buy the app to download the full collection.'},
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
