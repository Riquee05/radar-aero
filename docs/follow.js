export class FlightFollower {
 constructor(){this.id=null;this.reason='';this.positionAt=null;}
 start(aircraft,now=Date.now()){if(!this.fresh(aircraft,now))return false;this.id=aircraft.id;this.reason='';this.positionAt=null;return true;}
 fresh(a,now){return !!a&&Number.isFinite(a.lon)&&Number.isFinite(a.lat)&&a.lon>=-180&&a.lon<=180&&a.lat>=-90&&a.lat<=90&&Number.isFinite(a.positionAt)&&a.positionAt>0&&now-a.positionAt<=60000&&a.positionAt-now<10000;}
 stop(reason=''){this.id=null;this.positionAt=null;this.reason=reason;}
 update(aircraft,now=Date.now(),failed=false){if(!this.id)return null;const a=aircraft.find(a=>a.id===this.id);if(failed||!this.fresh(a,now)){this.stop(failed?'Consulta indisponível · acompanhamento parado':!a?'Aeronave fora da consulta · acompanhamento parado':'Posição antiga · acompanhamento parado');return null;}if(this.positionAt===a.positionAt)return null;this.positionAt=a.positionAt;return a;}
}
