---
title: Lab 4
layout: katex
nav_order: 6
---

{: .warning}
This lab is unfinished, and subject to change without warning!

# Carry Look-Ahead 2421 Adder and Hazard Free Designs
{: .no_toc}

#### Assigned
{: .no_toc}
November 6th, 2024

#### Due
{: .no_toc}
November 18th, 2024

## Contents
{: .no_toc .text-delta}

1. TOC
{:toc}

---

## Lore

This lab assignment consists of two major sections.
In this first part, you will design and implement two versions of an 2421 carry look-ahead adder, explore the carry look-ahead structure in this context, and then analyze and explore the timing paths through the separate versions.
In the second part, you will perform static hazard analysis and focus on the implementation of hazard-free circuits.

## Goals
The goal of this lab is to teach you how to build a carry-lookahead adder, analyzing critical paths, and calculating propogation delays.
Additionally, we want to ensure that you can design a hazard-free circuit.

1. **Carry Look-Ahead 2421 Adder**
2. **Hazard Free Design**

## Lab Report

Please write a lab report that contains the following information:
- Your name(s) and PID(s)
- Pictures of your final circuits for each part (including embedded circuits)
- Answers to lab report questions

## Deliverables

Please submit the following files to Gradescope **individually**:

- `SingleLevelCLA.dig`
- `TwoLevelCLA.dig`
- `2421SingleLevelCLA.dig`
- `2421SingleLevelCLA_D.dig`
- `2421TwoLevelCLA.dig`
- `2421TwoLevelCLA_D.dig`
- `delayed_tables.toml`
- `HazardFree.dig`
- All `.dig` files you have created 
- PDF of your [lab report](#lab-report)

## Grading

* [Part 1](https://cse140l.github.io/fa24-labs/docs/lab4/part1): 20%
* [Part 2](https://cse140l.github.io/fa24-labs/docs/lab4/part2): 20%
* [Part 3](https://cse140l.github.io/fa24-labs/docs/lab4/part3): 30%
* [Part 4](https://cse140l.github.io/fa24-labs/docs/lab4/part4): 20%
* [Lab Report](#lab-report): 10%
