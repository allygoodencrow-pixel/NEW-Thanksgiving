import test from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {createPartyState} from '../src/domain/state.js';
import {withSignatureMenu} from '../src/catalog/thanksgiving.js';
import {scaledIngredientsForDish} from '../src/domain/ingredients.js';
import {DEFAULT_STORAGE_KEY} from '../src/domain/persistence.js';

async function mount(state,failWrites=false){
 const dom=new JSDOM('<div id="app"></div>',{url:'http://localhost/'});
 Object.assign(globalThis,{window:dom.window,document:dom.window.document,FormData:dom.window.FormData,localStorage:dom.window.localStorage});
 localStorage.setItem(DEFAULT_STORAGE_KEY,JSON.stringify(state));
 if(failWrites)globalThis.localStorage={getItem:k=>dom.window.localStorage.getItem(k),setItem(){throw Error('Quota exceeded');}};
 await import(`../src/app.js?release=${Math.random()}`);
 return dom;
}
test('top switcher and keyboard drawer reach all 13 sections',async()=>{
 const dom=await mount(createPartyState({setupCompleted:true}));
 const select=document.querySelector('.section-switcher');
 assert.equal(select.options.length,13);
 select.value='budget';select.dispatchEvent(new dom.window.Event('change'));
 assert.match(document.querySelector('.workspace').textContent,/Budget/);
 document.querySelector('[data-sheet="more"]').click();
 const dialog=document.querySelector('[role="dialog"]');
 assert.equal(dialog.querySelectorAll('[data-nav]').length,13);
 dialog.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
 assert.equal(document.querySelector('[role="dialog"]'),null);
});
test('recipe detail uses the actual scaled ingredient requirement and instructions',async()=>{
 const state=withSignatureMenu(createPartyState({setupCompleted:true,planning:{estimatedHeadcount:24}}));
 state.dishes.turkey={on:true,recipeId:'turkey',preparationMode:'homemade'};
 await mount(state);
 document.querySelector('[data-nav="menu"]').click();
 const row=document.querySelector('[data-action="toggle-catalog"][data-id="turkey"]').closest('.menu-row');
 const butter=scaledIngredientsForDish(state,'turkey').find(i=>i.name==='Unsalted butter');
 assert.ok(row.textContent.includes(`Unsalted butter · ${butter.quantity} ${butter.unit}`));
 assert.ok(row.textContent.includes(state.recipes.turkey.instructions[0]));
 assert.ok(!row.querySelector('.catalog-detail').textContent.includes('per guest'));
});
test('failed save retains edits in memory and exposes a backup recovery action',async()=>{
 const dom=await mount(createPartyState({setupCompleted:true}),true);
 document.querySelector('[data-nav="party"]').click();
 const form=document.querySelector('#party-form');form.querySelector('[name="headcount"]').value='18';
 form.dispatchEvent(new dom.window.Event('submit',{cancelable:true,bubbles:true}));
 assert.equal(document.querySelector('[name="headcount"]').value,'18');
 assert.match(document.querySelector('[role="status"]').textContent,/Not saved/);
 assert.ok(document.querySelector('[role="status"] [data-action="backup"]'));
});
test('blocked printable popup does not claim successful generation',async()=>{
 await mount(createPartyState({setupCompleted:true}));window.open=()=>null;
 document.querySelector('[data-nav="printables"]').click();
 document.querySelector('[data-action="print"]').click();
 assert.match(document.querySelector('[role="status"]').textContent,/Allow pop-ups/);
 assert.match(document.querySelector('.print-card').textContent,/Not generated/);
});
