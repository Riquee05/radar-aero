export const radii=[5,10,25,50];
export function validPoint(p){return p&&typeof p.lat==='number'&&Number.isFinite(p.lat)&&Math.abs(p.lat)<=90&&typeof p.lon==='number'&&Number.isFinite(p.lon)&&Math.abs(p.lon)<=180;}
export function distanceKm(p,a){const rad=Math.PI/180,dlat=(a.lat-p.lat)*rad,dlon=(a.lon-p.lon)*rad,h=Math.sin(dlat/2)**2+Math.cos(p.lat*rad)*Math.cos(a.lat*rad)*Math.sin(dlon/2)**2;return 6371*2*Math.asin(Math.sqrt(Math.min(1,h)));}
export function nearbyAircraft(list,point,radius,now=Date.now()){return list.filter(a=>!a.ground&&Number.isFinite(a.positionAt)&&now-a.positionAt<=120000).map(a=>({...a,distanceKm:distanceKm(point,a)})).filter(a=>a.distanceKm<=radius).sort((a,b)=>a.distanceKm-b.distanceKm);}
