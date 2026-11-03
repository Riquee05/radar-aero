import assert from 'node:assert/strict';
import {GET} from '../app/api/aircraft/route.ts';
const originalFetch=globalThis.fetch;let calls=0;
try{
 globalThis.fetch=async()=>{calls++;await new Promise(r=>setTimeout(r,20));return Response.json({now:Date.now(),ac:[{hex:'abc123',flight:' TEST1 ',lat:0,lon:0,alt_baro:0,gs:0,track:0,seen_pos:0},{hex:'abc124',lat:null,lon:0},{hex:'abc125',lat:100,lon:0}]});};
 assert.equal((await GET(new Request('https://radar.test/api/aircraft?region=invalid'))).status,400);assert.equal(calls,0);
 const first=await GET(new Request('https://radar.test/api/aircraft?region=sp'));assert.equal(first.status,200);const data=await first.json();assert.equal(data.aircraft.length,1);assert.equal(data.aircraft[0].callsign,'TEST1');assert.equal(data.aircraft[0].altitudeFt,0);assert.equal(data.aircraft[0].lat,0);assert.equal(data.aircraft[0].speedKt,0);
 await GET(new Request('https://radar.test/api/aircraft?region=sp'));assert.equal(calls,1);
 const pair=await Promise.all([GET(new Request('https://radar.test/api/aircraft?region=rio')),GET(new Request('https://radar.test/api/aircraft?region=rio'))]);assert.equal(calls,2);assert.ok(pair.every(r=>r.status===200));
 globalThis.fetch=async()=>{throw Error('Offline');};assert.equal((await GET(new Request('https://radar.test/api/aircraft?region=brasilia'))).status,503);
 globalThis.fetch=async()=>Response.json({ac:'not an array'});assert.equal((await GET(new Request('https://radar.test/api/aircraft?region=salvador'))).status,503);
 console.log('PASS: regiões, valores zero, posições inválidas, cache, consultas simultâneas e falhas da fonte.');
}finally{globalThis.fetch=originalFetch;}
