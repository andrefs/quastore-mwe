Steps to reproduce:

```
npm install
tsx load.ts  test.nt test_db
tsx query.ts test_db
```

The `test.nt` contains the first 100 triples of `wordnet.nt`.

The results I'm getting are:

```
Database directory exists
0
{
  "o": "\"Sam cannot %s Sue \"@en",
  "p": "http://www.w3.org/2000/01/rdf-schema#label",
  "s": "_:bc_0_b0_genid10000"
}
```
