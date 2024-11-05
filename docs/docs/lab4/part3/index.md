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

Your main *Digital* circuit should be named as `2421CLA`.
The following ports should be opened for `2421CLA`:

| Port Direction | Port Name       | Port Width (bits) | Description                                                             |
|:--------------:|-----------------|------------------:|-------------------------------------------------------------------------|
|      INPUT     | `X`             |                16 | 4-digit 2421 unsigned value                                             |
|      INPUT     | `Y`             |                16 | 4-digit 2421 unsigned value                                             |
|      INPUT     | `Cin`           |                 1 | Carry in to the adder                                                   |
|     OUTPUT     | `S`             |                16 | 4-digit 2421 unsigned sum                                               |
|     OUTPUT     | `Cout`          |                 1 | Carry out from the adder                                                |
