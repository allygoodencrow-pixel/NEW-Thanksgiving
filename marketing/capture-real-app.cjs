const {chromium}=require('playwright'),sharp=require('sharp'),fs=require('fs'),path=require('path'),cp=require('child_process');
const dir='marketing/live-app-media/2026-10-09',sd=dir+'/screenshots',ad=dir+'/etsy-images';fs.mkdirSync(sd,{recursive:true});fs.mkdirSync(ad,{recursive:true});
const items=[
['home','', 'HOME','THANKSGIVING, ALREADY FIGURED OUT.','ONE CONNECTED HOSTING SYSTEM'],
['party-plan','#party-plan','PARTY PLAN','START WITH ONE PLAN.','EVENT DETAILS, ALL TOGETHER'],
['guests','#guests','GUESTS','EVERY GUEST. CONSIDERED.','RSVPS, NEEDS AND CONTRIBUTIONS'],
['plan-menu','#plan-menu','PLAN MENU','MAKE THE MENU YOURS.','BROWSE RECIPES, ADD YOUR OWN'],
['menu','#menu','MENU','ONE MENU. ALL THE DETAILS.','DISHES, QUANTITIES, RESPONSIBILITIES'],
['shopping','#shopping','SHOPPING','THE LIST THAT CONNECTS.','BASED ON YOUR MENU'],
['prep','#prep','PREP','MAKE AHEAD. STAY AHEAD.','YOUR PREP ALL IN ONE PLACE'],
['timeline','#timeline','TIMELINE','YOUR DAY. IN ORDER.','A SCHEDULE BUILT AROUND DINNER'],
['activities','#activities','EXPERIENCE','THE DETAILS MATTER.','DRINKS AND ACTIVITIES'],
['seating','#seating','TABLE AND SEATING','A PLACE FOR EVERYONE.','YOUR ROOM, TABLES AND CHAIRS'],
['budget','#budget','BUDGET','BUDGET UNDER CONTROL.','SEE COSTS BEFORE THEY ADD UP'],
['printables','#printables','PRINTABLES','76 PRINTABLE DESIGN SHEETS.','INCLUDED IN YOUR APP']];
const base='https://thanksgiving.thecrowandcrown.com/';
const safe=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
async function panel(a,i){
 const light=i%2===0,bg=light?'#f4f4f1':'#121212',fg=light?'#171717':'#fdfcf9',muted=light?'#5a5a58':'#cacac5';
 const [name,hash,kicker,title,desc]=a;
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="1500"><rect width="2000" height="1500" fill="'+bg+'"/>'+
 '<text x="105" y="110" font-family="Arial" font-weight="600" letter-spacing="5" font-size="27" fill="'+fg+'">CROW &amp; CROWN</text>'+
 '<text x="1900" y="110" text-anchor="end" font-family="Arial" letter-spacing="4" font-size="20" fill="'+muted+'">THE THANKSGIVING EDIT</text>'+
 '<path d="M100 150 H1900" stroke="'+muted+'" stroke-opacity=".55"/>'+
 '<text x="105" y="247" font-family="Arial" letter-spacing="5" font-size="22" fill="'+muted+'">'+safe(kicker)+'</text>'+
 '<text x="102" y="365" font-family="Arial" font-weight="300" letter-spacing="-2" font-size="'+(title.length>27?'67':'84')+'" fill="'+fg+'">'+safe(title)+'</text>'+
 '<text x="107" y="434" font-family="Arial" letter-spacing="3" font-size="25" fill="'+muted+'">'+safe(desc)+'</text>'+
 '<path d="M100 483 H1900" stroke="'+muted+'" stroke-opacity=".55"/>'+
 '<text x="105" y="1460" font-family="Arial" letter-spacing="4" font-size="18" fill="'+muted+'">THANKSGIVING, ALREADY FIGURED OUT.</text>'+
 '<text x="1900" y="1460" text-anchor="end" font-family="Arial" font-size="20" fill="'+muted+'">'+String(i+1).padStart(2,'0')+' / 12</text></svg>';
 const shot=await sharp(sd+'/'+name+'.png').resize(1730,916,{fit:'contain',background:bg}).png().toBuffer();
 await sharp(Buffer.from(svg)).composite([{input:shot,left:135,top:515}]).jpeg({quality:86,mozjpeg:true}).toFile(ad+'/'+String(i+1).padStart(2,'0')+'_'+name+'.jpg');
}
async function run(){
 const b=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
 const p=await ctx.newPage();let manifest=[];
 for(const item of items){
   const [name,hash]=item;
   try{
     const response=await p.goto(base+hash,{waitUntil:'domcontentloaded',timeout:40000});await p.waitForTimeout(1500);
     const title=await p.title();
     if(response.status()!==200||!title.includes('CROW & CROWN'))throw Error('Not expected live app: '+title);
     await p.screenshot({path:sd+'/'+name+'.png',animations:'disabled'});
     manifest.push({section:name,url:p.url(),httpStatus:response.status(),title: title});
     console.log('CAPTURED',name);
   }catch(e){console.error('FAILED',name,String(e));throw e;}
 }
 fs.writeFileSync(dir+'/capture-manifest.json',JSON.stringify({source:base,captured_at:new Date().toISOString(),screens:manifest,method:'real browser-rendered screenshots; no AI'},null,2));
 await ctx.close();
 const vc=await b.newContext({viewport:{width:1280,height:800},recordVideo:{dir:dir,size:{width:1280,height:800}}});
 const vp=await vc.newPage();await vp.goto(base,{waitUntil:'domcontentloaded'});await vp.waitForTimeout(1700);
 for(let item of items.slice(1)){await vp.evaluate(h=>{window.location.hash=h},item[1]);await vp.waitForTimeout(1700);}
 const vf=await vp.video().path();await vc.close();await b.close();
 fs.renameSync(vf,dir+'/real-app-recording.webm');
 const c=cp.spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',dir+'/real-app-recording.webm','-c:v','libx264','-crf','29','-preset','veryfast','-pix_fmt','yuv420p','-movflags','+faststart',dir+'/real-app-recording.mp4'],{encoding:'utf8'});
 if(c.status!==0)console.error('VIDEO CONVERSION FAILED',c.stderr);
 for(let i=0;i<items.length;i++)await panel(items[i],i);
 fs.writeFileSync(dir+'/README.txt','CROW & CROWN real production app captures\nSource: '+base+'\nEvery screenshot was taken from a real browser session. Each marketing image composites the actual screenshot pixels without recreating the interface. The MP4 is a browser navigation recording. Seller must review screen accuracy before uploading.\n');
 console.log('COMPLETE '+items.length+' screenshots, '+items.length+' gallery images, recording.');
}
run().catch(e=>{console.error(e);process.exit(1)});