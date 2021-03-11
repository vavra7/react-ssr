clear:
	rm -rf yarn-error.log \
	rm -rf yarn.lock \
	rm -rf node_modules
	$(MAKE) -C packages/compiler clear
	$(MAKE) -C packages/router clear
	$(MAKE) -C packages/ui-components clear
	$(MAKE) -C services/client clear

build:
	$(MAKE) -C packages/compiler build
	$(MAKE) -C packages/router build
	$(MAKE) -C packages/ui-components build
	$(MAKE) -C services/client build