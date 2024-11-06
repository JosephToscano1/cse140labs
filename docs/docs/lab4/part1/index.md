---
title: Part 1
parent: Lab 4
layout: katex
nav_order: 2
---

# Single Level Carry Look-Ahead Adder
{: .no_toc}

## Contents
{: .no_toc .text-delta}

1. TOC
{:toc}

---

## Introduction

In the CLA half of the lab, you will be designing a carry look-ahead adder for 2421 numbers of 4 decimal digits.
You will complete this section in three parts.
First, you will start by building a 4-bit CLA generator to precompute carries.
Then you will create a fast 4-bit CLA adder by using the CLA generator designed in the first step.
After the successful implementation of the 4-bit CLA adder, you will need to design a 16-bit CLA adder by reusing the 4-bit CLA adders and exploring two different approaches which will result in different timing and hardware complexity.
In the first approach you will cascade 4-bit CLA adders to create a larger CLA module, but you will soon realize that you can do even better in terms of delay.
The second solution will generalize the approach that you have used while designing CLAs and by utilizing a second level CLA will reduce the delay caused by the cascaded carry adders.
After finishing these two alternative implementations, in the final step, you will complete the implementation of the two 16-bit 2421 adders by building on the two 16-bit CLA binary adders that you have previously designed by adding correction steps to convert the binary addition result to a 2421 form.
Even though the corrections to the binary adders will be identical, the timing and area trade-offs inherent to the two types of CLAs should still be visible because of the difference in the base 16-bit binary adders.

An interesting aspect of a binary carry look-ahead adder is that it can precompute the carries of each bit, thus drastically speeding up the overall adder through reducing the delay caused by the carry propagation between different bits.
One of the questions that this lab assignment tries to get you to address is whether the same idea of precomputation of carries is applicable to 2421 addition.
The write-up explains how to approach this problem so that you can design a circuit that can speedily add two 4-digit 2421 numbers.

One important concept in digital logic design is the circuit’s **latency**.
Latency is the time the circuit takes to provide an output when a new set of inputs is presented.
In a combinational circuit, this is simply the propagation delay of the longest path from input to output.
To observe the delay, we would need to supply appropriate inputs to exercise the path; this typically gets achieved by providing two inputs in sequence, with the first priming the path and the second toggling it throughout so that the length of a propagation path can be fully observed in a simulator such as *Digital*.
You will be asked during this lab to observe the propagation length of certain critical paths through the input sequences provided.


## Circuit Structure

{: .warning}
Failure to follow this structure can result in grading of the lab to be delayed or incorrect.

Your main *Digital* circuit should be named as `SingleLevelCLA`.
The following ports should be opened for `SingleLevelCLA`:

| Port Direction | Port Name       | Port Width (bits) | Description                                                             |
|:--------------:|-----------------|------------------:|-------------------------------------------------------------------------|
|      INPUT     | `X`             |                16 | 16-digit unsigned value                                                 |
|      INPUT     | `Y`             |                16 | 16-digit unsigned value                                                 |
|      INPUT     | `Cin`           |                 1 | Carry in to the adder                                                   |
|     OUTPUT     | `S`             |                16 | 16-digit unsigned sum                                                   |
|     OUTPUT     | `Cout`          |                 1 | Carry out from the adder                                                |
