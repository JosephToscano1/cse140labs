---
title: 2421 Performance Analysis
grand_parent: Lab 4
parent: Part 3
layout: katex
nav_order: 2
---

# 2421 Performance Analysis
{: .no_toc}

## Contents
{: .no_toc .text-delta}

1. TOC
{:toc}

---

## 2421 CLA Delay Analysis

You are first asked to implement both the single-level and two-level 16-bit CLA 2421 look-ahead adders.
Once you have finished both implementations, you are asked to furthermore compare their performance.

To start comparing the performance, please **make a copy of your circuit** and swap all of your logic gates with the ones provided by us in your library.

{: .warning}
*Digital* will not export any circuits with the `Delay` component (which we use internally for the delayed logic gates). This is why creating a backup is super important, as we will look at both your functionality as well as your delay comparisons.

You can read the total delay of the circuit by using the `Data Graph` component and setting the `Show single gate steps` option and count the cycles between your signal change and the output changing.
When you change the inputs, it will take some time for the effect of that change to reflect into the output.
This difference in time is your total delay.
Usually different input-output pairs have distinct delays.
Even for the same input-output pair, its delay varies with distinct input combinations.
The maximum delay value of each input-output pair is considered as its real delay value.

To understand the timing behavior of these two circuits (single and two-level 4-digit 2421 CLA adders) better, we will start by analyzing the paths in the small components that we have created; then we will look into timing paths in the entire 2421 adder designs.
First, let us try to find the maximum delays in the 4-bit CLA adder.
We provide you with the test vectors you need to use for each column.

{: .highlight-title}
> Lab Report
> 
> What is unique about these test vectors? 
> Does any other test vector work to test the maximum delays in these paths?
> Please fill in Delay Tables 1-4 with your measured results (and fill in `delay_tables.toml`).
> Are they consistent with your expectations?

For the following sections, please note which block we want you to analyze and what test vectors to use.
More specifically, use the block, provide the inputs, and make any changes (denoted by an arrow), then observe the delay.
Please refer to [Table 2](#table-2) for information about the gate delays.

### Table 2

{: .text-delta}
Gate Delays

| **Logic Gate** | **Delay Equation**  |
|:--------------:|:-------------------:|
| NOT            | $2$                 |
| AND            | $5 + n$             |
| NAND           | $3 + n$             |
| OR             | $5 + n$             |
| NOR            | $3 + n$             |
| XOR            | $7 + n$             |
| XNOR           | $9 + n$             |

where $n = \text{number of inputs} - 2$.

### Path Delay of 4-bit CLA Binary Adder

#### Test Vector 1

$X$: `1000`

$Y$: `0111`

$C_0$: `0` → `1`

{: .text-delta}
Delay Table 1

| **TOML Code** | **Path**         | **Delay**     |
|:-------------:|:----------------:|:-------------:|
|   `d1.a`      | $c_0$ to $c_1$   |   10          |
|   `d1.b`      | $c_0$ to $c_2$   |               |
|   `d1.c`      | $c_0$ to $c_3$   |               |
|   `d1.d`      | $c_0$ to $c_4$   |               |


#### Test Vector 2

$X$: `1000` → `1001`

$Y$: `0111`

$C_0$: `0`

{: .text-delta}
Delay Table 2

| **TOML Code** | **Path**         | **Delay**     |
|:-------------:|:----------------:|:-------------:|
|   `d2.a`      | $x_0$ to $c_1$   |   17          |
|   `d2.b`      | $x_0$ to $c_2$   |               |
|   `d2.c`      | $x_0$ to $c_3$   |               |
|   `d2.d`      | $x_0$ to $c_4$   |               |

### Path Delay of 16-bit CLA Binary Adder

{: .note}
$s^*_i$ is the delay to sum bits at the binary adder output (**without** the correction step)

#### Test Vector 1

$X$: `1000100010001000`

$Y$: `0111011101110111`

$C_0$: `0` → `1`

{: .text-delta}
Delay Table 3

| **TOML Code** | **Path**           | **Delay (Single-Level)**     | **Delay (Two-Level)**        |
|:-------------:|:------------------:|:----------------------------:|:----------------------------:|
|   `d3.a`      | $c_0$ to $c_4$     |   10                         |   10                         |
|   `d3.b`      | $c_0$ to $c_8$     |                              |                              |
|   `d3.c`      | $c_0$ to $c_{12}$  |                              |                              |
|   `d3.d`      | $c_0$ to $c_{16}$  |                              |                              |
|   `d3.e`      | $c_0$ to $s^*_3$   |                              |                              |
|   `d3.f`      | $c_0$ to $s^*_7$   |                              |                              |
|   `d3.g`      | $c_0$ to $s^*_{11}$|                              |                              |
|   `d3.h`      | $c_0$ to $s^*_{15}$|                              |                              |

#### Test Vector 2

$X$: `1000100010001000` → `1000100010001001`

$Y$: `0111011101110111`

$C_0$: `0`

{: .text-delta}
Delay Table 4

| **TOML Code** | **Path**           | **Delay (Single-Level)**     | **Delay (Two-Level)**        |
|:-------------:|:------------------:|:----------------------------:|:----------------------------:|
|   `d4.a`      | $x_0$ to $c_4$     |   24                         |   24                         |
|   `d4.b`      | $x_0$ to $c_8$     |                              |                              |
|   `d4.c`      | $x_0$ to $c_{12}$  |                              |                              |
|   `d4.d`      | $x_0$ to $c_{16}$  |                              |                              |
|   `d4.e`      | $x_0$ to $s^*_3$   |                              |                              |
|   `d4.f`      | $x_0$ to $s^*_7$   |                              |                              |
|   `d4.g`      | $x_0$ to $s^*_{11}$|                              |                              |
|   `d4.h`      | $x_0$ to $s^*_{15}$|                              |                              |

### Path Delay of 4-digit CLA 2421 Adder

{: .note}
$s^+_i$ is the delay to sum bits at the binary adder output (**with** the correction step)

#### Test Vector 1

$X$: `1000100010001000`

$Y$: `0111011101110111`

$C_0$: `0` → `1`

{: .text-delta}
Delay Table 5

| **TOML Code** | **Path**           | **Delay (Single-Level)**     | **Delay (Two-Level)**        |
|:-------------:|:------------------:|:----------------------------:|:----------------------------:|
|   `d5.a`      | $c_0$ to $s^+_3$   |                              |                              |
|   `d5.b`      | $c_0$ to $s^+_7$   |                              |                              |
|   `d5.c`      | $c_0$ to $s^+_{11}$|                              |                              |
|   `d5.d`      | $c_0$ to $s^+_{15}$|                              |                              |

#### Test Vector 2

$X$: `1000100010001000` → `1000100010001001`

$Y$: `0111011101110111`

$C_0$: `0`

{: .text-delta}
Delay Table 6

| **TOML Code** | **Path**           | **Delay (Single-Level)**     | **Delay (Two-Level)**        |
|:-------------:|:------------------:|:----------------------------:|:----------------------------:|
|   `d6.a`      | $x_0$ to $s^+_3$   |                              |                              |
|   `d6.b`      | $x_0$ to $s^+_7$   |                              |                              |
|   `d6.c`      | $x_0$ to $s^+_{11}$|                              |                              |
|   `d6.d`      | $x_0$ to $s^+_{15}$|                              |                              |
