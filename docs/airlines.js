const airlines=Object.freeze({
 TAM:{name:'LATAM Brasil',logo:'./airlines/latam.svg'},
 AZU:{name:'Azul',logo:'./airlines/azul.svg'},
 GLO:{name:'GOL',logo:'./airlines/gol.svg'}
});
// Match an ICAO operator prefix followed by a flight identifier, not a registration.
export function airlineFor(callsign){if(typeof callsign!=='string')return null;const match=callsign.trim().toUpperCase().match(/^([A-Z]{3})[0-9][A-Z0-9]*$/);return match&&Object.hasOwn(airlines,match[1])?airlines[match[1]]:null;}
