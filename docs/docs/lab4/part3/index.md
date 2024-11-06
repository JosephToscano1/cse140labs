---
title: Part 3
parent: Lab 4
layout: katex
nav_order: 4
---

# Carry Look-Ahead 2421 Adder
{: .no_toc}

## Contents
{: .no_toc .text-delta}

1. TOC
{:toc}

---

## Circuit Structure

{: .warning}
Failure to follow this structure can result in grading of the lab to be delayed or incorrect.

This part of the lab requires four deliverables, `2421SingleLevelCLA`, `2421SingleLevelCLA_D`, `2421TwoLevelCLA`, `2421TwoLevelCLA_D`.
The circuits without any suffix (i.e. without `_D`) are graded for functionality, and should only use components that can be exported to verilog (more on this in later sections).
The following ports should be opened for all of the circuits:

| Port Direction | Port Name       | Port Width (bits) | Description                                                             |
|:--------------:|-----------------|------------------:|-------------------------------------------------------------------------|
|      INPUT     | `X`             |                16 | 4-digit 2421 unsigned value                                             |
|      INPUT     | `Y`             |                16 | 4-digit 2421 unsigned value                                             |
|      INPUT     | `Cin`           |                 1 | Carry in to the adder                                                   |
|     OUTPUT     | `S`             |                16 | 4-digit 2421 unsigned sum                                               |
|     OUTPUT     | `Cout`          |                 1 | Carry out from the adder                                                |
