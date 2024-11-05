---
title: Part 2
parent: Lab 4
layout: katex
nav_order: 3
---

# Two-Level Carry Look-Ahead Adder
{: .no_toc}

## Contents
{: .no_toc .text-delta}

1. TOC
{:toc}

---

## Circuit Structure

{: .warning}
Failure to follow this structure can result in grading of the lab to be delayed or incorrect.

Your main *Digital* circuit should be named as `TwoLevelCLA`.
The following ports should be opened for `TwoLevelCLA`:

| Port Direction | Port Name       | Port Width (bits) | Description                                                             |
|:--------------:|-----------------|------------------:|-------------------------------------------------------------------------|
|      INPUT     | `X`             |                16 | 16-digit unsigned value                                                 |
|      INPUT     | `Y`             |                16 | 16-digit unsigned value                                                 |
|      INPUT     | `Cin`           |                 1 | Carry in to the adder                                                   |
|     OUTPUT     | `S`             |                16 | 16-digit unsigned sum                                                   |
|     OUTPUT     | `Cout`          |                 1 | Carry out from the adder                                                |
