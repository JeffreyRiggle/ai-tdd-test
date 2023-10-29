## The goal here is to create a sort of sub/pub logging system with different backing stores. However only the tests have been written by a human. This tests a couple of things

* Multiple implementations of the same interface
* interactions between an interface and a concrete use case

## Findings

* Again this took what felt like an exceedingly long time
* In the end I had to give the AI hints about what changes might fix its implementation
* The more files we got through the better it got about generating the right thing
* Made several ts errors and ultimatly did not produce the IBackingStore interface I wanted
* Found that I had not tested some assumptions like creating the file/directory if it didn't exist
* Often felt like I was pair programming with a junior dev