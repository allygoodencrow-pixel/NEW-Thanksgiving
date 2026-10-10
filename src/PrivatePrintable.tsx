import {useEffect,useState} from 'react';
import {ArrowRight} from 'lucide-react';
export type PrintableLoader=(path:string)=>Promise<Blob>;
export function PrivatePrintableImage({path,alt,load}:{path:string;alt:string;load?:PrintableLoader}) {
 const [url,setUrl]=useState('');
 useEffect(()=>{
  let cancelled=false,objectUrl='';
  if(load)void load(path).then(blob=>{if(cancelled)return;objectUrl=URL.createObjectURL(blob);setUrl(objectUrl);}).catch(()=>{});
  return ()=>{cancelled=true;if(objectUrl)URL.revokeObjectURL(objectUrl);};
 },[path,load]);
 return url?<img src={url} alt={alt} width={218} height={286} loading="lazy" decoding="async" />:<div role="img" aria-label={alt}>Preview available in your paid account</div>;
}
export function PrivatePrintableDownload({path,filename,children,load}:{path:string;filename:string;children:string;load?:PrintableLoader}) {
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 async function download(){
  if(!load)return;
  setBusy(true);setError('');
  try{const blob=await load(path),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  catch{setError('Could not download. Check your connection and sign in to your paid account.');}
  finally{setBusy(false);}
 }
 return <><button className="text-link" disabled={busy||!load} onClick={()=>void download()}>{busy?'DOWNLOADING…':children} <ArrowRight size={16}/></button>{error&&<p role="alert">{error}</p>}</>;
}
