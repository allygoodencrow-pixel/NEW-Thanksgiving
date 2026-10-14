const highlights: Record<string, {label:string;detail:string}> = {
  HOME: {label:'ONE CONNECTED PLAN',detail:'Guests → menu → shopping → prep. Try the tour to see it work.'},
  'PARTY PLAN': {label:'PLAN FOR YOUR ACTUAL CROWD',detail:'Choose Expected, Confirmed or a custom headcount to drive your quantities.'},
  GUESTS: {label:'RSVPS DO THE MATH',detail:'Change an RSVP below. Expected and confirmed counts update your plan.'},
  MENU: {label:'RECIPES THAT SCALE',detail:'Open View recipe to see ingredients calculated for your guest count.'},
  'PLAN MENU': {label:'ADD IT. THE PLAN FOLLOWS.',detail:'Add a recipe here to update your menu, shopping and prep.'},
  SHOPPING: {label:'YOUR MENU → YOUR LIST',detail:'Ingredients are mapped to your dishes. Edit quantities, lock overrides and check off purchases.'},
  PREP: {label:'MAKE-AHEAD, MADE CLEAR',detail:'Your selected recipes feed the prep plan. Check off tasks as you go.'},
  TIMELINE: {label:'TIMING THAT CONNECTS',detail:'Cooking, arrivals and serving share one timeline, with equipment conflicts flagged.'},
  TABLE: {label:'EVERY GUEST. EVERY SEAT.',detail:'Assign seats and see how many tables and chairs your gathering needs.'},
  BUDGET: {label:'PLANNED VS. ACTUAL',detail:'Record purchases and link them to planned items. Missing prices stay visible.'},
  PRINTABLES: {label:'DETAILS FROM YOUR PLAN',detail:'Personalized tools use your guest list and menu. Collection PDFs unlock with purchase.'},
  EXPERIENCE: {label:'MORE THAN DINNER',detail:'Add activities to connect their supplies and timing to your plan.'},
};
export function BuyerFeatureSticker({page}:{page:string}) {
 const highlight=highlights[page];
 if(!highlight)return null;
 return <aside className={`demo-feature-sticker${page==='HOME'?' demo-feature-home':''}`} aria-label="Feature highlight">
   <span className="demo-sticker-marker" aria-hidden="true">↙</span>
   <div><span className="demo-sticker-title">{highlight.label}</span><p>{highlight.detail}</p></div>
 </aside>;
}
