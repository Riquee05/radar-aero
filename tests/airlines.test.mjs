import assert from 'node:assert/strict';
import {airlineFor} from '../public/airlines.js';
assert.equal(airlineFor('TAM3181').name,'LATAM Brasil');assert.equal(airlineFor(' azu1234 ').name,'Azul');assert.equal(airlineFor('GLO1038A').name,'GOL');
for(const value of ['',null,undefined,'PT-AZU','PR-GLO','TAM','TAMABC','ZZZ123','xTAM123','<img src=x>'])assert.equal(airlineFor(value),null);
console.log('PASS: companhias conhecidas, indicativos normalizados, matrículas e desconhecidos.');
