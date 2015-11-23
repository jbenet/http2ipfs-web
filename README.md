# add2ipfs webapp

This is a simple webtool to add URLs to an IPFS node.

**Latest Version:**
- http://localhost:8080/ipfs/QmZTEDF8yN3dMGcYqtyTzuR8PFsTqmLLBxsVZ4jzV2a1rd
- https://ipfs.io/ipfs/QmZTEDF8yN3dMGcYqtyTzuR8PFsTqmLLBxsVZ4jzV2a1rd (*)

(*) wont work directly out of https://ipfs.io until https://github.com/ipfs/infrastructure/issues/105 is fixed.

## Preview

![](https://ipfs.io/ipfs/QmTmWyc2pMtG27pUYQdQQSooCPtbfZZCjS9ivAMBkbh4hM/add2ipfs.gif)

## Develop

Clone it, edit, and make:
```sh
> make build
cp -r lib build/.
cp index.html build/.
ipfs add -r build | tail -n1
added QmZTEDF8yN3dMGcYqtyTzuR8PFsTqmLLBxsVZ4jzV2a1rd build

> make publish
cp -r lib build/.
cp index.html build/.
ipfs add -r build | tail -n1
added QmZTEDF8yN3dMGcYqtyTzuR8PFsTqmLLBxsVZ4jzV2a1rd build
ipfs add -r -q build | tail -n1 >versions/current
cat versions/current >>versions/history
here are the links:
http://localhost:8080/ipfs/QmZTEDF8yN3dMGcYqtyTzuR8PFsTqmLLBxsVZ4jzV2a1rd
http://gateway.ipfs.io/ipfs/QmZTEDF8yN3dMGcYqtyTzuR8PFsTqmLLBxsVZ4jzV2a1rd

now must:
- ipfs pin add /ipfs/QmZTEDF8yN3dMGcYqtyTzuR8PFsTqmLLBxsVZ4jzV2a1rd
- add TXT to add2.ipfs.io: dnslink=/ipfs/QmZTEDF8yN3dMGcYqtyTzuR8PFsTqmLLBxsVZ4jzV2a1rd
```

## About

- Author: @jbenet
- License: MIT
