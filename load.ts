import fs from 'fs';
import { Quadstore } from 'quadstore';
import { ClassicLevel } from 'classic-level';
import { DataFactory } from 'rdf-data-factory';
import { rdfParser } from "rdf-parse";
const df = new DataFactory();


const file = process.argv[2];
const db = process.argv[3];

const store = new Quadstore({
  backend: new ClassicLevel(db),
  dataFactory: df
});

const quadStream = rdfParser.parse(
  fs.createReadStream(file),
  { contentType: 'application/n-triples' }
);

await store.open();
await store.putStream(quadStream);
await store.close();
