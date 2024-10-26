.PHONY: clean build simulate all test test_all _verilog

PODMAN_RUN = podman run -it --rm -v ./:/src -e PART=$(PART)

ARCH=$(shell uname -m)
ifeq ($(ARCH), x86_64)
	CONTAINER ?= docker.io/anishg24/cse140l:latest
else ifeq ($(ARCH), arm64)
	CONTAINER ?= docker.io/anishg24/cse140l:latest-arm64
endif

PORT ?= 8000

TOPLEVEL_LIST ?= top_level.txt

all: build_all

pull:
	podman pull $(CONTAINER)

schematics/lib:
	mkdir -p schematics/lib
	cp ../libdig/lab1/*.dig schematics/lib

verilog: schematics/lib schematics/*.dig
	mkdir -p verilog/
	cp ../common/verilator_config.v verilog/
	$(PODMAN_RUN) $(CONTAINER) make _verilog
	rm -rf schematics/lib

build: verilog
	$(PODMAN_RUN) $(CONTAINER) make -C simulator build_$(PART)

build_all: verilog
	$(PODMAN_RUN) $(CONTAINER) make -C simulator wasm

simulate:
	$(PODMAN_RUN) -p $(PORT):$(PORT) $(CONTAINER) make -C simulator simulate PORT=$(PORT)

test: verilog
	$(PODMAN_RUN) $(CONTAINER) make -C tests

test_all: verilog
	$(PODMAN_RUN) $(CONTAINER) make -C tests test_all

_verilog:
	for top in $$(tr -d '\015' < $(TOPLEVEL_LIST)) ; do \
		digital verilog -dig schematics/$$top.dig -verilog verilog/$$top.v; \
	done

clean:
	$(RM) -rf verilog simulator/scripts/wasm schematics/lib simulator/*_dir
