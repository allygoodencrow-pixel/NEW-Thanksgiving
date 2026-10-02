import test from "node:test";
import assert from "node:assert/strict";
import {JSDOM} from "jsdom";

test("customer shell renders every destination and core write paths",async()=>{
 const dom=new JSDOM("<!doctype html><html><body><div id=\"app\"></div></body></html>",{url:"http://localhost/"});
 globalThis.window=dom.window;
 globalThis.document=dom.window.document;
 globalThis.localStorage=dom.window.localStorage;
 globalThis.FormData=dom.window.FormData;
 globalThis.Blob=dom.window.Blob;
 globalThis.URL=dom.window.URL;
 globalThis.confirm=()=>true;

 await import("../src/app.js?smoke=1");
 const submit=form=>form.dispatchEvent(new dom.window.Event("submit",{bubbles:true,cancelable:true}));
 const change=el=>el.dispatchEvent(new dom.window.Event("change",{bubbles:true,cancelable:true}));

 const setup=document.querySelector("#setup-form");
 assert.ok(setup,"first-run setup renders");
 setup.querySelector('[name="headcount"]').value="8";
 setup.querySelector('[name="dinnerAt"]').value="2026-11-26T17:00";
 submit(setup);
 assert.ok(document.querySelector(".desktop-sidebar"),"wide-screen workspace navigation renders");
 assert.equal(document.querySelectorAll(".desktop-sidebar nav [data-nav]").length,13,"desktop navigation exposes every planning section");

 const expected={
  home:"already figured out.",party:"Party plan",menu:"Menu",prep:"Prep",shopping:"Shopping",table:"Table",
  space:"Space + seating",timeline:"Timeline",guests:"Guests",experience:"Experience",budget:"Budget",printables:"Printables",
  "party-day":"Party day"
 };
 assert.equal(document.querySelectorAll(".bottom-nav [data-nav]").length,5);
 for(const [id,title] of Object.entries(expected)){
  let button=document.querySelector(`[data-nav="${id}"]`);
  if(!button){document.querySelector('[data-sheet="more"]').click();button=document.querySelector(`[data-nav="${id}"]`);}
  assert.ok(button,`nav exists: ${id}`);
  button.click();
  assert.ok(document.querySelector(".workspace").textContent.toLowerCase().includes(title.toLowerCase()),`view renders: ${id}`);
 }

 document.querySelector('[data-nav="menu"]').click();
 document.querySelector('[data-sheet="recipe"]').click();
 const recipe=document.querySelector("#recipe-form");
 recipe.querySelector('[name="title"]').value="Audit Potatoes";
 recipe.querySelector('[name="role"]').value="starch";
 recipe.querySelector('[name="servings"]').value="8";
 recipe.querySelector('[name="ingredients"]').value="1 | cup | butter\n4 | lb | potatoes";
 recipe.querySelector('[name="tasks"]').value="Prep potatoes | 10 | prep";
 submit(recipe);

 document.querySelector('[data-nav="shopping"]').click();
 assert.ok(document.querySelector(".workspace").textContent.toLowerCase().includes("butter"));
 assert.ok(document.querySelector(".workspace").textContent.toLowerCase().includes("potatoes"));

 document.querySelector('[data-nav="guests"]').click();
 document.querySelector('[data-sheet="guest"]').click();
 const guest=document.querySelector("#guest-form");
 guest.querySelector('[name="name"]').value="Alex";
 guest.querySelector('[name="rsvp"]').value="yes";
 submit(guest);

 document.querySelector('[data-sheet="more"]').click();document.querySelector('[data-nav="table"]').click();
 const table=document.querySelector("#table-form");
 table.querySelector('[name="id"]').value="dining-a";
 table.querySelector('[name="seats"]').value="8";
 submit(table);

 document.querySelector('[data-sheet="more"]').click();document.querySelector('[data-nav="space"]').click();
 const seat=document.querySelector("[data-seat-select]");
 assert.ok(seat,"open seat control renders");
 assert.ok([...seat.options].some(o=>o.textContent==="Alex"),"named guest is assignable");
 seat.value=[...seat.options].find(o=>o.textContent==="Alex").value;
 change(seat);
 assert.ok(document.querySelector(".workspace").textContent.includes("Alex"));
});
