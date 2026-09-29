import "./styles.css";
import {createPartyState} from "./domain/state.js";
import {derivePlan} from "./domain/planning.js";

const state=createPartyState();
const derived=derivePlan(state);
const plan=derived.planning;

document.querySelector("#app").innerHTML='<main class="shell"><header class="topbar"><div class="brand">CROW & CROWN</div><div class="eyebrow">THANKSGIVING</div></header><section class="hero"><p class="kicker">Good holidays, already figured out.</p><h1>Your Thanksgiving<br>operating system.</h1><p class="lede">The clean rebuild is live. Guest counts, menu decisions, shopping, prep, space, budget and printables now have a dedicated domain layer instead of being buried inside the interface.</p></section><section class="grid"><article class="card"><span class="label">Planning headcount</span><strong>'+plan.planningHeadcount+'</strong><p>One source of truth for downstream quantities.</p></article><article class="card"><span class="label">Architecture</span><strong>Logic first</strong><p>UI is presentation only. Rules live in <code>src/domain</code>.</p></article><article class="card"><span class="label">Menu engine</span><strong>Integrated</strong><p>Recipe choices now derive ingredients, shopping requirements and prep from the same canonical state.</p></article></section></main>';
