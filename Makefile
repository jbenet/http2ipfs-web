local="http://localhost:8080/ipfs/"
gway="http://gateway.ipfs.io/ipfs/"

build: $(shell find lib) index.html
	@mkdir -p build
	cp -r lib build/.
	cp index.html build/.
	ipfs add -r build | tail -n1

publish: build
	ipfs add -r -q build | tail -n1 >versions/current
	cat versions/current >>versions/history
	@export hash=`cat versions/current`; \
		echo "here are the links:"; \
		echo $(local)$$hash; \
		echo $(gway)$$hash; \
		echo ""; \
		echo "now must:"; \
		echo "- ipfs pin add /ipfs/$$hash"; \
		echo "- add TXT to add2.ipfs.io: dnslink=/ipfs/$$hash"; \

clean:
	rm -rf build
