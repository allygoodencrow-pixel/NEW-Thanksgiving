import {planningContext} from './guests.js';

export function deriveHousePrepTasks(state){
 if(state.housePrep?.enabled===false)return [];
 const plan=planningContext(state),headcount=plan.planningHeadcount;
 const tasks=[
  {id:'house:fridge',taskId:'house:fridge',title:'Clear refrigerator + freezer space',phase:'days-ahead',durationMinutes:25,fixedStartOffsetMinutes:-5760,handsOn:true,source:'house-prep',derived:true},
  {id:'house:serving-check',taskId:'house:serving-check',title:'Pull serving pieces + label what each dish uses',phase:'days-ahead',durationMinutes:20,fixedStartOffsetMinutes:-4320,handsOn:true,source:'house-prep',derived:true},
  {id:'house:bathroom',taskId:'house:bathroom',title:'Reset guest bathroom',phase:'day-before',durationMinutes:25,fixedStartOffsetMinutes:-1440,handsOn:true,source:'house-prep',derived:true},
  {id:'house:dishwasher',taskId:'house:dishwasher',title:'Empty dishwasher + clear sink',phase:'day-before',durationMinutes:15,fixedStartOffsetMinutes:-1320,handsOn:true,source:'house-prep',derived:true},
  {id:'house:trash',taskId:'house:trash',title:'Stage trash + recycling',phase:'day-before',durationMinutes:10,fixedStartOffsetMinutes:-1260,handsOn:true,source:'house-prep',derived:true},
  {id:'house:coat-zone',taskId:'house:coat-zone',title:'Set coat + bag drop area',phase:'morning',durationMinutes:10,fixedStartOffsetMinutes:-420,handsOn:true,source:'house-prep',derived:true},
  {id:'house:coffee',taskId:'house:coffee',title:'Stage coffee + tea station',phase:'morning',durationMinutes:15,fixedStartOffsetMinutes:-360,handsOn:true,source:'house-prep',derived:true},
  {id:'house:leftovers',taskId:'house:leftovers',title:'Stage leftover containers + labels',phase:'morning',durationMinutes:10,fixedStartOffsetMinutes:-300,handsOn:true,source:'house-prep',derived:true},
  {id:'house:welcome',taskId:'house:welcome',title:'Set welcome + drinks station',phase:'before-guests',durationMinutes:20,fixedStartOffsetMinutes:-120,handsOn:true,source:'house-prep',derived:true},
  {id:'house:final-reset',taskId:'house:final-reset',title:'Final bathroom, trash + surface reset',phase:'before-guests',durationMinutes:15,fixedStartOffsetMinutes:-75,handsOn:true,source:'house-prep',derived:true}
 ];
 if(headcount>=20)tasks.push({id:'house:flow',taskId:'house:flow',title:'Walk guest flow: entry, drinks, dining + exits',phase:'days-ahead',durationMinutes:15,fixedStartOffsetMinutes:-2880,handsOn:true,source:'house-prep',derived:true,detail:`${headcount} planned guests`});
 return tasks;
}
