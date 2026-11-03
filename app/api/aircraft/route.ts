const regions:Record<string,[number,number]>={sp:[-23.4356,-46.4731],rio:[-22.81,-43.25],brasilia:[-15.87,-47.92],salvador:[-12.91,-38.33]};
const cache=new Map<string,{at:number,data:unknown}>();
const pending=new Map<string,Promise<unknown>>();
async function query(request:Request){
  const params=new URL(request.url).searchParams;let region=params.get('region')||'sp';let center=regions[region],radiusNm=100;
  if(params.has('lat')||params.has('lon')||params.has('radiusKm')){
    const latText=params.get('lat'),lonText=params.get('lon'),radiusText=params.get('radiusKm');
    const lat=Number(latText),lon=Number(lonText),radius=Number(radiusText);
    if(!latText?.trim()||!lonText?.trim()||!radiusText?.trim()||!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180||![5,10,25,50].includes(radius))return Response.json({error:'Ponto ou raio inválido.'},{status:400});
    center=[Math.round(lat*100)/100,Math.round(lon*100)/100];radiusNm=Math.ceil((radius+2)/1.852);region='near:'+center.join(',')+':'+radius;
  }
  if(cache.size>=128){for(const [key,item] of cache)if(Date.now()-item.at>=15000)cache.delete(key);if(cache.size>=128)cache.delete(cache.keys().next().value!);}
  if(pending.size>=32&&!pending.has(region))return Response.json({error:'Muitas consultas. Tente em instantes.'},{status:429});
  if(!center)return Response.json({error:'Região inválida.'},{status:400});
  const hit=cache.get(region);if(hit&&Date.now()-hit.at<15000)return Response.json(hit.data,{headers:{'Cache-Control':'private, max-age=5'}});
  try{
    if(!pending.has(region))pending.set(region,(async()=>{
      const [lat,lon]=center;const response=await fetch(`https://api.adsb.lol/v2/lat/${lat}/lon/${lon}/dist/${radiusNm}`,{signal:AbortSignal.timeout(12000),headers:{Accept:'application/json'}});
      if(!response.ok)throw new Error('Fonte indisponível');const raw=await response.json() as {ac?:Record<string,unknown>[],now?:number};
      if(!Array.isArray(raw.ac))throw new Error('Resposta inválida');
      const fetchedAt=Date.now();const sourceAt=Number.isFinite(raw.now)?(raw.now!>1e12?raw.now!:raw.now!*1000):fetchedAt;
      const finite=(v:unknown)=>typeof v==='number'&&Number.isFinite(v)?v:null;
      const aircraft=raw.ac.filter(a=>typeof a.hex==='string'&&/^[a-f0-9]{6}$/i.test(a.hex)&&finite(a.lat)!==null&&finite(a.lon)!==null&&Math.abs(Number(a.lat))<=90&&Math.abs(Number(a.lon))<=180).map(a=>({id:String(a.hex).toLowerCase(),callsign:typeof a.flight==='string'?a.flight.trim():'',registration:typeof a.r==='string'?a.r:'',model:typeof a.t==='string'?a.t:'',lat:a.lat,lon:a.lon,altitudeFt:finite(a.alt_baro),ground:a.alt_baro==='ground',speedKt:finite(a.gs),heading:finite(a.track),positionAt:finite(a.seen_pos)!==null?Math.min(fetchedAt,sourceAt-Number(a.seen_pos)*1000):null}));
      const result={aircraft,fetchedAt,source:'adsb.lol',region,center:[lat,lon],radiusNm};cache.set(region,{at:fetchedAt,data:result});return result;
    })());
    return Response.json(await pending.get(region),{headers:{'Cache-Control':'private, max-age=5'}});
  }catch{return Response.json({error:'Não foi possível consultar a fonte de aeronaves. Tente novamente em instantes.'},{status:503,headers:{'Retry-After':'30'}});}finally{pending.delete(region);}
}

export async function GET(request:Request){const response=await query(request);if(request.headers.get('Origin')==='https://riquee05.github.io'){response.headers.set('Access-Control-Allow-Origin','https://riquee05.github.io');response.headers.set('Vary','Origin');}return response;}
