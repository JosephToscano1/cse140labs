---
title: Lab 3
layout: katex
nav_order: 5
---

# Error Detection/Correction and Constant-3 Adder/Subtractor
{: .no_toc}

#### Assigned
{: .no_toc}
October 23th, 2024

#### Due
{: .no_toc}
November 4th, 2024

## Contents
{: .no_toc .text-delta}

1. TOC
{:toc}

---

## Lore

This lab assignment consists of two parts. In the first part, you are invited to implement an error
detection/correction circuit by modifying the Booth’s multiplier circuit you have designed in
Digital in your Lab 2 assignment. We will provide you with a correctly functioning multiplier
circuit for this part in case you do not have a fully operational circuit handy from your Lab 2
assignment. In the second part, we consider the subtraction of two decimal numbers
represented in excess-3 codes. As we have discussed in CSE 140, the result of a direct binary
subtraction on two excess-3 numbers is not a valid excess-3 code. Therefore, we ask you to
implement an optimized correction circuit that will add/subtract 3 to/from the binary subtraction
result of two excess-3 digits. The correct operation of your correction circuit can be confirmed by
connecting it to a 4-bit binary subtractor that you can obtain from the Digital standard
library. The combined circuit should deliver the difference of two excess-3 decimal digits in
excess-3 representation which you will extend to subtract two 4 digit excess-3 numbers.

## Goals
<!-- TODO: FIX THIS -->
The goal of this lab is to teach you how to correct binary subtraction results for excess-3 numbers and 
extend the solution to subtract multi-digit excess-3 numbers.
The lab will be divided into 2 parts:

1. **Error Detection/Correction Circuit**
2. **Constant-3 Adder/Subtractor**

## Lab Report

Please write a lab report that contains the following information:
- Your name(s) and PID(s)
- Pictures of your final circuits for each part (including embedded circuits)
- Answers to lab report questions (located on the bottom of each part)

## Deliverables

Please submit the following files to Gradescope **individually**:

- `ErrorDetectionCorrectionCircuit.v`
- `Constant-3AdderSubtractor.v`
- All `.dig` files you have created 
- PDF of your [lab report](#lab-report)

## Grading

* [Part 1](https://cse140l.github.io/fa24-labs/docs/lab3/part1): 18%
* [Part 2](https://cse140l.github.io/fa24-labs/docs/lab3/part2): 18%
* [Lab Report](#lab-report): 10%
