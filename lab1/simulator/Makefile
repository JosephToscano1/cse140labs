# These targets are meant to be run in the build container!

.PHONY: wasm simulate

VERILATOR_ROOT    = /tools/verilator
VERILATOR_EXE     = $(VERILATOR_ROOT)/bin/verilator
EMMAKE            = emmake
EMCXX             = em++

OUTPUT_DIR        = ./scripts/wasm

VERILATOR_CONFIG  = ../verilog/verilator_config

PORT ?= 8000
TOPLEVEL_FILE = ../top_level.txt

MODELS = $(shell cat $(TOPLEVEL_FILE))

define get-part-number
$(shell awk '/$(1)/{ print NR; exit }' $(TOPLEVEL_FILE))
endef

define make-toplevel-target

$(1)_dir/: ../verilog/
	$(VERILATOR_EXE) --Mdir $(1)_dir --cc --public ../verilog/$(1).v $(VERILATOR_CONFIG)
	$(EMMAKE) make -C $(1)_dir -f V$(1).mk

$(OUTPUT_DIR)/$(1).js: $(1)_dir/ wasm.cpp
	mkdir -p $(OUTPUT_DIR)
	$(EMCXX) -O3 -I$(1)_dir -I$(VERILATOR_ROOT)/include -DPART$(2) wasm.cpp $(1)_dir/*.o -o $(OUTPUT_DIR)/$(1).js

build_$(2): $(OUTPUT_DIR)/$(1).js

endef

$(foreach model,$(MODELS),$(eval $(call make-toplevel-target,$(model),$(call get-part-number,$(model)))))

wasm: $(addprefix $(OUTPUT_DIR)/,$(addsuffix .js,$(MODELS)))

simulate: wasm
	python3 -m http.server $(PORT)
