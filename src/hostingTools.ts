import type {State} from './App';
export type TableDetail={capacity:number;shape:string;length:number;width:number;drop:number;x:number;y:number};
export function tablesFor(s:State,head:number,kids:number){
 const groups:{id:string;label:string;kind:string;detail:TableDetail}[]=[];
 for(const [kind,total] of [['main',head-(s.kidsTable?kids:0)],['kids',s.kidsTable?kids:0]] as const){
  let left=total,index=1;
  while(left>0&&index<=100){const id=kind+'-'+index,raw=s.tableDetails?.[id];
   const defaults:TableDetail={capacity:kind==='kids'?6:Math.max(2,s.tableCapacity),shape:kind==='kids'?'Rectangle':s.tableShape,length:72,width:36,drop:12,x:12+(index-1)%3*80,y:12+Math.floor((index-1)/3)*70+(kind==='kids'?80:0)};
   const detail:TableDetail={...defaults,...raw};
   detail.capacity=Math.max(2,Math.min(24,Math.floor(detail.capacity)));detail.length=Math.max(12,detail.length);detail.width=detail.shape==='Rectangle'?Math.max(12,detail.width):detail.length;
   groups.push({id,label:kind==='kids'?'Kids table '+index:'Table '+index,kind,detail});left-=detail.capacity;index++;
  }
 }
 return groups;
}
export function clothSize(t:TableDetail){return t.shape==='Round'?{width:t.length+2*t.drop,length:t.length+2*t.drop,label:`${t.length+2*t.drop} in round`}:{width:t.width+2*t.drop,length:t.length+2*t.drop,label:`${t.width+2*t.drop} × ${t.length+2*t.drop} in`};}
export const activityContent:Record<string,{instructions:string;prompts:string[];materials:string[];minutes:number}>={
 'Conversation cards':{instructions:'Print and cut the questions. Let each person choose one; passing is welcome.',prompts:['What small moment from this year would you keep?','What meal reminds you of home?','What are you looking forward to next year?','Who taught you something useful?','What would your ideal slow Sunday include?','What family tradition would you start?'],materials:['Conversation cards'],minutes:15},
 'Family questions':{instructions:'Invite one story at a time. Ask a follow-up, listen and let everyone pass.',prompts:['What was Thanksgiving like when you were little?','Which family recipe has a story?','What is a funny travel memory?','What would you like the younger generation to know?'],materials:[],minutes:20},
 'Gratitude cards':{instructions:'Put one card and pen at each place. Write something specific; sharing is optional.',prompts:['Today I am grateful for…','Someone I would like to thank…','A small joy I noticed this week…'],materials:['Pens','Gratitude cards'],minutes:10},
 'Photo prompts':{instructions:'Ask before photographing. Choose a few moments and keep the camera away during dinner.',prompts:['Everyone at the table before serving','The cooks and their favorite dish','Three generations together','A candid moment after dessert'],materials:[],minutes:10},
 'After-dinner game':{instructions:'Play Story Chain: one person starts a story with one sentence. Go around adding a sentence each. Stop after two rounds and give the story a title.',prompts:['It started with a missing pie…','The turkey had a surprising visitor…','We found a note under the table…'],materials:[],minutes:20},
 'Kids’ table sheets':{instructions:'Provide crayons and a printed sheet. Invite children to draw, find and share; young children need an adult nearby.',prompts:['Draw your dream Thanksgiving plate.','Find something round, something soft and something red.','Draw three things that make you smile.','Invent a turkey superhero and give it a name.'],materials:['Crayons','Kids activity sheets'],minutes:20},
};
