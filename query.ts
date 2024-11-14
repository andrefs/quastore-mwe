import { Quadstore } from 'quadstore';
import { ClassicLevel } from 'classic-level';
import { Engine } from 'quadstore-comunica';
import { DataFactory } from 'rdf-data-factory';
const df = new DataFactory();
import fs from 'fs';

const db = process.argv[2];

if (!fs.existsSync(db)) {
  throw new Error(`Database directory ${db} does not exist`);
}
if (fs.existsSync(db)) {
  console.log('Database directory exists')
}

const backend = new ClassicLevel(db);
const store = new Quadstore({
  backend,
  dataFactory: df
});
const engine = new Engine(store)


await store.open();
const query = 'SELECT * WHERE { ?s ?p ?o }';

let i = 0;
const stream = await engine.queryBindings(query);
stream.on('data', (bindings) => {
  console.log(i++);
  console.log(bindings.toString());
});
stream.on('error', (e) => {
  console.error('Error:', e);
})

stream.on('end', () => {
  console.log('done')
})


await store.close();
