export class WidgetFlightRequest {
 constructor(params){const id=params.get('aircraft')||'';this.id=/^[a-f0-9]{6}$/i.test(id)?id.toLowerCase():null;this.done=!this.id;}
 resolve(aircraft,now=Date.now()){if(this.done)return {status:'idle'};this.done=true;const match=aircraft.find(a=>a.id===this.id&&Number.isFinite(a.positionAt)&&now-a.positionAt<=120000&&a.positionAt<=now+10000);return match?{status:'found',aircraft:match}:{status:'missing'};}
}
