// Check the real stylesheet cascade, including specificity and media boundaries.
// This is a source-level regression check; it does not replace browser layout QA.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const postcss=require('postcss');
const parser=require('postcss-selector-parser');
const {JSDOM}=require('jsdom');
const files=[...fs.readFileSync('src/main.tsx','utf8').matchAll(/import '\.\/([^']+\.css)'/g)].map(m=>m[1]);
const rules=[];
const add=(a,b)=>a.map((v,i)=>v+b[i]);
const cmp=(a,b)=>{for(let i=0;i<a.length;i++)if(a[i]!==b[i])return a[i]-b[i];return 0};
function specificity(node){
 let n=[0,0,0];
 for(const x of node.nodes||[]){
  if(x.type==='id')n=add(n,[1,0,0]);
  else if(x.type==='class'||x.type==='attribute')n=add(n,[0,1,0]);
  else if(x.type==='tag')n=add(n,[0,0,1]);
  else if(x.type==='pseudo'){
   if(x.value===':where')continue;
   if([':is',':not',':has'].includes(x.value)){const best=x.nodes.map(specificity).sort(cmp).at(-1);n=add(n,best||[0,0,0]);}
   else n=add(n,x.value.startsWith('::')?[0,0,1]:[0,1,0]);
  }
 }
 return n;
}
for(const file of files)postcss.parse(fs.readFileSync('src/'+file,'utf8')).walkRules(rule=>{
 const media=[];for(let p=rule.parent;p;p=p.parent)if(p.type==='atrule')media.push(p);
 if(media.some(p=>p.name!=='media'))return;
 parser().astSync(rule.selector).each(s=>rules.push({selector:s.toString(),specificity:specificity(s),media:media.map(p=>p.params),decls:rule.nodes.filter(n=>n.type==='decl'),file}));
});
function active(query,width){
 return query.split(',').some(part=>{
  if(/print|prefers-reduced-motion|orientation|prefers-color-scheme/.test(part))return false;
  for(const m of part.matchAll(/(min|max)-width\s*:\s*(\d+)px/g))if(m[1]==='min'?width<+m[2]:width>+m[2])return false;
  return true;
 });
}
function cascade(el,width){
 const winners={};let order=0;
 for(const r of rules){order++;if(!r.media.every(m=>active(m,width))||r.selector.includes('::'))continue;
  let matches;try{matches=el.matches(r.selector)}catch{continue}if(!matches)continue;
  for(const d of r.decls){const rank=[d.important?1:0,...r.specificity,order];if(!winners[d.prop]||cmp(rank,winners[d.prop].rank)>=0)winners[d.prop]={value:d.value,rank,file:r.file};}
 }
 return winners;
}
function value(el,prop,width){
 if(!el)return '';
 let v=cascade(el,width)[prop]?.value;
 if(v==='inherit'||(!v&&(prop.startsWith('--')||/^(font-|color|line-height|letter-spacing)/.test(prop))))return value(el.parentElement,prop,width);
 if(v?.includes('var('))v=v.replace(/var\((--[\w-]+)\)/g,(_,name)=>value(el,name,width));
 return v||'';
}
const doc=new JSDOM(`<body><div class="shell reference-shell planning-active page-menu"><div class="recipe-overlay"><section class="recipe-sheet glass-light"><div class="recipe-reader-header"><button>Close</button></div><div class="recipe-reader-intro"><h2>Recipe</h2></div><div class="recipe-reader-columns"><section class="recipe-section-heading"><h3>Ingredients</h3></section><section><ol class="reader-method"><li><span>Method</span></li></ol></section></div></section></div><main class="main"><div class="planning-backdrop"></div><header class="topbar"><button class="mobile-menu">Menu</button></header><div class="content menu-studio"><div class="page-head"><h1>Menu</h1></div><div class="reference-menu"><div class="menu-composition"><aside class="menu-support"></aside><div class="menu-dishes"><div class="menu-dish"><img class="menu-dish-photo"><div class="menu-dish-copy"><span class="menu-dish-title">Turkey</span><button class="menu-dish-recipe">View recipe</button></div><details class="menu-dish-settings"><summary>Manage dish</summary><div class="menu-dish-fields"><label>Responsible<select><option>You (host)</option></select></label></div></details></div></div></div></div><div class="two-col"><div class="panel"><h2>Section</h2><p>Body</p><input></div></div></div></main></div></body>`).window.document;
const q=s=>doc.querySelector(s);
// Exercise shared roles in every planning route, including intrinsic drawer flow.
const drawer=doc.createElement('aside');drawer.className='sidebar';drawer.innerHTML='<nav><div class="drawer-subnav"><button>Party plan</button></div></nav><div class="sidebar-foot">Thanksgiving</div>';q('.shell').append(drawer);
const disclosure=doc.createElement('details');disclosure.className='panel';disclosure.innerHTML='<summary>Checklist</summary>';q('.content').append(disclosure);
for(const page of ['plan','guests','menu','shopping','prep','timeline','experiences','tables','budget','printables']){
 q('.shell').className=`shell reference-shell planning-active page-${page}`;
 for(const width of [375,390,650,767,768,1100]){
  assert.equal(value(q('.page-head'),'min-height',width),'0',`${page} must not retain fixed header height`);
  assert.equal(value(q('.page-head'),'padding',width),'0',`${page} has no padded header box`);
  assert.equal(value(q('.page-head h1'),'font-size',width),width<768?'24px':'28px',`${page} title at ${width}`);
  assert.equal(value(q('.sidebar nav'),'flex',width),'0 0 auto',`${page} drawer must occupy its content height`);
  assert.equal(value(q('.sidebar nav'),'min-height',width),'auto');
  assert.equal(value(q('.sidebar-foot'),'position',width),'static');
  assert(value(disclosure.querySelector('summary'),'font-family',width).startsWith('Lato'));
  assert.equal(value(disclosure.querySelector('summary'),'font-size',width),'11px');
  assert.equal(value(disclosure,'padding',width),'12px 16px');
  if(width<768){assert.notEqual(value(disclosure,'background',width),'transparent');assert.notEqual(value(disclosure,'border-radius',width),'0');}
  assert.equal(value(q('.sidebar button'),'min-height',width),'44px');
 }
}
q('.shell').className='shell reference-shell planning-active page-menu';
console.log('PASS shared compact mobile roles on ten planning routes and intrinsic drawer flow');

const nestedSummary=doc.createElement('details');nestedSummary.className='panel printable-category';nestedSummary.innerHTML='<summary><div><h2>Labels</h2><p class="fine">Buffet labels from your plan</p><span class="eyebrow">12 design sheets</span></div></summary>';q('.content').append(nestedSummary);
const prep=doc.createElement('div');prep.className='prep-start-grid';prep.innerHTML='<button class="prep-start-card">Start prep</button>';q('.main').append(prep);
const categories=doc.createElement('div');categories.className='printable-categories';q('.content').append(categories);
const libraryCard=doc.createElement('article');libraryCard.className='library-recipe-card';libraryCard.innerHTML='<span class="eyebrow">Source</span><h3>Recipe title</h3><p>Original measured yield</p><button class="recipe-add-button">Add to menu</button>';q('.content').append(libraryCard);
const menuActions=doc.createElement('div');menuActions.className='menu-actions';menuActions.innerHTML='<button class="add-dish-action">Add a dish</button><button>Add your own recipe</button>';q('.menu-studio').append(menuActions);
const menuMeta=doc.createElement('small');menuMeta.className='menu-dish-meta';menuMeta.textContent='Main · 4 planned portions';q('.menu-dish-copy').append(menuMeta);
const paper=doc.createElement('div');paper.className='paper';paper.innerHTML='<h3>A long family dinner title</h3><p>Full details</p>';q('.content').append(paper);
for(const width of [320,375,390,560,650,767]){
 assert.equal(value(libraryCard.querySelector('h3'),'font-size',width),'14px');
 assert.equal(value(libraryCard.querySelector('h3'),'font-weight',width),'200');
 assert.equal(value(libraryCard.querySelector('.eyebrow'),'font-size',width),'8px');
 assert(value(libraryCard.querySelector('.eyebrow'),'font-family',width).startsWith('Metropolis'));
 assert.equal(value(libraryCard.querySelector('p'),'font-size',width),'13px');
 assert.equal(value(libraryCard.querySelector('button'),'font-size',width),'11px');
 assert.equal(value(menuMeta,'font-size',width),'11px','recipe details must remain legible on narrow phones');
 assert.equal(value(menuActions,'grid-template-columns',width),'1fr','long primary actions must not be squeezed into half-width pills');
 assert.equal(value(menuActions.firstElementChild,'color',width),'#f1f1f1','dark menu controls must have light text');
 assert.equal(value(libraryCard.querySelector('button'),'color',width),'#f1f1f1');
 assert.equal(value(q('.menu-dish-title'),'letter-spacing',width),'.045em');
 assert.equal(value(prep,'gap',width),'10px');
 assert.equal(value(categories,'gap',width),'24px');
 assert.equal(value(prep.firstElementChild,'border-radius',width),'18px');
 assert.equal(value(prep.firstElementChild,'background',width),'rgba(29,27,27,.72)');
 assert.notEqual(value(nestedSummary,'background',width),'transparent');
 assert.notEqual(value(nestedSummary,'border-radius',width),'0');
 assert.equal(value(q('.menu-studio'),'width',width),'calc(100% - 32px)');
 assert.equal(value(q('.menu-studio'),'border-radius',width),'0');
 assert.equal(value(q('.menu-studio'),'background',width),'transparent');
 assert.equal(value(nestedSummary.querySelector('p'),'text-transform',width),'none','summary descriptions must not inherit uppercase utility styling');
 assert.equal(value(nestedSummary.querySelector('p'),'letter-spacing',width),'0','summary descriptions must not inherit action tracking');
 assert.equal(value(nestedSummary.querySelector('.eyebrow'),'text-transform',width),'uppercase');
 assert.equal(value(q('.page-head'),'min-height',width),'0','mobile heading flow must not retain legacy fixed heights');
 assert.equal(value(paper,'height',width),'auto','personalized previews grow with wrapping text');
 assert.equal(value(paper.querySelector('p'),'max-height',width),'none');
}

const guestEntry=doc.createElement('div');guestEntry.className='panel glass-light guest-entry';guestEntry.innerHTML='<div class="guest-add"><input placeholder="Add a guest name"/><button>Add guest</button></div>';q('.content').append(guestEntry);
for(const width of [320,390,430]){
 assert.equal(value(guestEntry.querySelector('.guest-add'),'display',width),'grid');
 assert.equal(value(guestEntry.querySelector('input'),'height',width),'44px');
 assert.equal(value(guestEntry.querySelector('button'),'background',width),'#080808b3');
}
const actions=doc.createElement('div');actions.className='library-recipe-actions';actions.innerHTML='<button class="library-view-recipe">View recipe</button><div class="recipe-selection"><button class="recipe-add-button">Add to menu</button></div>';
q('.menu-studio').append(actions);
for(const width of [320,390,430]){
 assert.equal(value(actions.firstElementChild,'padding',width),'10px 8px','mobile action padding must beat the shared frosted control rule');
 assert.equal(value(q('.menu-dish-settings summary'),'background',width),'transparent','mobile manage action remains a quiet disclosure, not another pill');
}
console.log('PASS mobile text inheritance and intrinsic long-content geometry');
for(const width of [375,390,560,650,767,768,850,1099,1100,1440]){
 const phone=width<768;
 assert.equal(value(q('.topbar'),'position',width),'relative',`header position at ${width}`);
 assert.equal(value(q('.topbar'),'height',width),phone?'calc(72px + env(safe-area-inset-top))':'88px',`header height at ${width}`);
 assert.equal(value(q('.topbar'),'z-index',width),'8');
 assert.equal(value(q('.recipe-sheet'),'max-height',width),phone?'100dvh':'calc(100dvh - 64px)');
 assert.equal(value(q('.recipe-reader-columns'),'grid-template-columns',width),phone?'1fr':width>=1100?'minmax(260px,.8fr) minmax(0,1.3fr)':'minmax(0,.9fr) minmax(0,1.35fr)');
 assert(value(q('.recipe-reader-intro h2'),'font-family',width).startsWith('Metropolis'));
 assert.equal(value(q('.recipe-reader-intro h2'),'font-weight',width),'100');
 assert.equal(value(q('.recipe-reader-intro h2'),'font-size',width),phone?'24px':'28px');
 assert(value(q('.reader-method li span'),'font-family',width).startsWith('Lato'));
 assert.equal(value(q('.reader-method li span'),'color',width),'#292725');
 assert.equal(value(q('.panel p'),'color',width),'#f1f1f1');
 assert.equal(value(q('.panel input'),'font-size',width),phone?'16px':'13px');
 assert.equal(value(q('.recipe-reader-header button'),'font-weight',width),'300');
 assert.equal(value(q('.panel h2'),'font-weight',width),'200');
 assert.equal(value(q('.menu-dish-fields'),'grid-template-columns',width),width>=1100?'repeat(2,minmax(0,1fr))':'1fr');
 assert.equal(value(q('.menu-dish-recipe'),'border',width),'1px solid #ffffff38');
 assert(value(q('.menu-dish-recipe'),'font-family',width).startsWith('Lato'));
 assert.equal(value(q('.menu-dish-recipe'),'font-weight',width),'300');
 assert.equal(value(q('.menu-dish-title'),'font-weight',width),'200');
 assert.equal(value(q('.menu-dish-settings select'),'font-size',width),phone?'16px':'13px');
 assert.equal(value(q('.menu-dish-settings select'),'color',width),'#f1f1f1');
 assert.equal(value(q('.menu-composition'),'display',width),'grid');
 assert.equal(value(q('.menu-support'),'position',width),width>=1100?'sticky':'');
 assert.equal(value(q('.menu-dish'),'grid-template-columns',width),phone?'72px minmax(0,1fr)':width>=1100?'160px minmax(0,1fr)':'1fr 1fr');
 console.log(`PASS responsive cascade and recipe type at ${width}px`);
}
// The same elements outside planning mode retain Home's original header rules.
q('.shell').className='shell reference-shell page-home';
for(const width of [390,850,1440]){
 assert.equal(value(q('.topbar'),'position',width),'absolute');
 assert.equal(value(q('.topbar'),'height',width),width<=560?'92px':width<=850?'110px':'128px');
 console.log(`PASS Home header unchanged at ${width}px`);
}
// Typography must have one owner, so older page styles cannot win again.
for(const file of files.filter(f=>f!=='typography.css')){
 postcss.parse(fs.readFileSync('src/'+file,'utf8')).walkDecls(d=>{
  let print=false;for(let p=d.parent;p;p=p.parent)if(p.type==='atrule'&&p.name==='media'&&/print/.test(p.params))print=true;
  assert(print||!/^(font($|-)|line-height$|letter-spacing$)/.test(d.prop),`${file} competes with typography.css: ${d.prop}`);
 });
}
const typeSource=fs.readFileSync('src/typography.css','utf8');
assert(typeSource.includes('-webkit-text-size-adjust:100%'));
assert(typeSource.includes('text-size-adjust:100%'));
assert(!/user-scalable\s*=\s*no|maximum-scale\s*=\s*1/.test(fs.readFileSync('index.html','utf8')));
for(const path of ['Metropolis-ExtraLight.otf','Lato-Regular.ttf','Lato-Light.ttf']){
 assert(fs.existsSync('public/fonts/'+path));
 assert(fs.readFileSync('index.html','utf8').includes(`href="/fonts/${path}" as="font"`));
}
q('.shell').className='shell reference-shell planning-active page-shopping';
const contrast=doc.createElement('section');contrast.className='glass-light guest-entry';contrast.innerHTML='<div class="guest-add"><button>Add guest</button></div><div class="guest-identity"><input></div>';q('.shell').append(contrast);
for(const width of [390,850,1440]){assert.equal(value(contrast.querySelector('input'),'font-size',width),width<768?'16px':'13px');assert(value(contrast.querySelector('input'),'font-family',width).startsWith('Lato'));assert.equal(value(contrast.querySelector('button'),'color',width),'#f1f1f1');assert(value(contrast.querySelector('button'),'font-family',width).startsWith('Lato'));}
console.log('PASS single typography owner, mobile text sizing, local font preloads, accessible zoom and guest button contrast');
