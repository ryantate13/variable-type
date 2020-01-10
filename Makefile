PKG := variable-type
BUILD_IMG := $(PKG):build

build: dockerignore
		docker build -t $(BUILD_IMG) -f build.dockerfile .
		docker run -it --rm -v $$PWD/lib:/app/lib $(BUILD_IMG)

publish: build
	docker run -it --rm -v $$HOME/.npmrc:/root/.npmrc -v $$PWD/lib:/app $(BUILD_IMG) npm publish

dockerignore:
	echo '*' > .dockerignore
	for f in $$(cat build.dockerfile | grep COPY | cut -d' ' -f 2); do echo "!$$f" >> .dockerignore; done

.PHONY: build dockerignore
