---
title: Part 2
parent: Lab 3
layout: katex
nav_order: 2
---

# Constant-3 Adder/Subtractor Implementation
{: .no_toc}

## Contents
{: .no_toc .text-delta}

1. TOC
{:toc}

---

## Goals

1. Design a subtractor for two 4-digit decimal excess-3 numbers

## Circuit Structure

{: .warning}
Failure to follow this structure can result in grading of the lab to be delayed or incorrect.

Your main *Digital* circuit should be named as `Lab3Part2`.
The following ports should be opened for the `Lab3Part2`:

| Port Direction | Port Name       | Active | Port Width (bits) | Description                                                             |
|:--------------:|-----------------|:------:|------------------:|-------------------------------------------------------------------------|
|      INPUT     | `CLK`           | Rising |                 1 | Clock input used for controlling the multiplier                         |
|      INPUT     | `CLR`           |  High  |                 1 | Clears the multiplier to allow it for later reuse                       |
|      INPUT     | `MULTIPLIER`    |    -   |                13 | 13-bit signed decimal input as multiplier                               |
|      INPUT     | `MULTIPLICAND`  |    -   |                13 | 13-bit signal decimal input as multiplicand                             |
|     OUTPUT     | `RESULT`        |    -   |                26 | 26-bit signed decimal output as a result from your multiplication       |
|     OUTPUT     | `OP_DONE`       |    -   |                 2 | The operation you have performed (addition, subtraction, or no-op)      |
|     OUTPUT     | `DONE`          |  High  |                 1 | Set high when you have finished the multiplication                      |

## Background

In this part of the lab, you are asked to design a subtractor for two **4-digit decimal excess-3 numbers**. 
In the scope of this assignment, we will restrict our analysis to the cases where each 4-digit decimal excess-3 input, and also the subtraction result is non-negative.

As you have learned from your CSE 140 textbook (p. 48), in excess-3 code each decimal digit is represented in 4 bits.
Therefore, given two excess-3 digits $A_3A_2A_1A_0$ and $B_3B_2B_1B_0$, you can get from the LogicWorks standard library a **4-bit binary subtractor** that produces a borrow $Bo$ and a 4-bit difference $X_3X_2X_1X_0$. 
Unfortunately, the result produced by this 4-bit binary subtractor is not a valid excess-3 code.
For example, for the operation of $8 - 6 = 2$, the two excess-3 inputs are 1011 (value 8) and 1001 (value 6). 
We should expect a value of 0101 (value 2 in excess-3) as the difference, while the 4-bit binary subtractor would produce a difference of 0010 (which is not even a legal excess-3 number). 
In this case, a constant numeral 3 should be **added** to the binary difference $X_3X_2X_1X_0$ so as to generate the correct excess-3 code of the difference.
Unfortunately, the addition of 3 does not always produce the correct excess-3 code of the difference. 
Let’s take another operation, say $1 - 2 = -1$ for example. 
For the two excess-3 inputs 0100 (value 1) and 0101 (value 2), we should expect a value of 1 as the borrow and a value of 1100 (value 9) as the difference. 
However, while a 4-bit binary subtractor correctly produces a borrow of 1, the value of the difference it generates would be 1111 (once again not even a legal excess-3 number).
As you can see, in this case a constant numeral 3 should be **subtracted** from the binary difference so as to generate the correct excess-3 code of the difference.

It turns out that if you use a 4-bit binary subtractor to do subtraction on two excess-3 digits, 
depending on the value of the borrow Bo, 
you need to either add 3 to (if $Bo = 0$) or subtract 3 from (if $Bo = 1$) the binary difference to get a valid excess-3 difference. 
Therefore, we ask you in this part of the lab to design a circuit that takes as inputs a signal Bo and a 4-bit value $X_3X_2X_1X_0$,
and produces as outputs a 4-bit value $Z_3Z_2Z_1Z_0$ defined as follows:

$$
Z_3Z_2Z_1Z_0 = X_3X_2X_1X_0 + 3 \quad \text{if} \quad Bo = 0;\\
Z_3Z_2Z_1Z_0 = X_3X_2X_1X_0 - 3 \quad \text{if} \quad Bo = 1.
$$

The function of adding/subtracting 3 to/from a given value could be easily implemented through using another 4-bit adder.
However, the addition and subtraction of a **constant** value can be performed more efficiently as only one of the two operands is variable.
The objective of this part of the lab is for you to familiarize yourself with the transformation of Boolean expressions as well as the relationship between adders and subtractors. 
Therefore, you are asked to implement this function of adding/subtracting 3 by using basic logic gates. 
Furthermore, you should try to optimize your design by using as few gates as possible.
We will guide you through on how to implement an adder/subtractor and how to reduce the number of gates used in your design.

## Implementation

You have learned from your textbook that for a single-bit full adder with inputs $X_i$, $Y_i$, and $R_i$ (carryIn), the sum $Z_i$ and the carryOut $R_{i+1}$ can be expressed by the following Boolean expressions:

$$
Z_i = X_i \oplus Y_i \oplus R_i\\
R_{i+1} = X_i Y_i + X_i R_i + Y_i R_i
$$

Similarly, for a single-bit full subtractor with inputs $X_i$, $Y_i$, and $R_i$ (borrowIn), the result $Z_i$ and the borrowOut $R_{i+1}$ can be written in the following Boolean expressions:

$$
Z_i = X_i \oplus Y_i \oplus R_i \\
R_{i+1} = X'_i Y_i + X'_i R_i + Y_i R_i
$$

As you can see, for both the adder and the subtractor, the result bit $Z_i$ can be calculated in the same way!
Therefore, in order to implement an adder/subtractor, we only need to take care of the signal $R_{i+1}$, so that the value of this signal will be a carryOut for an add operation and a borrowOut for a subtract operation. 
Because the operation of add/subtract is conditionally performed according to the signal **Bo** (the borrow signal from the excess-3 subtraction), we can write $R_{i+1}$ in the following way:

$$
R_{i+1} = Bo'(X'_i Y_i + X'_i R_i + Y_i R_i) + Bo(X'_i Y_i + X'_i R_i + Y_i R_i)
$$

Simplifying further:

$$
R_{i+1} = (Bo' X_i + Bo X'_i) (Y_i + R_i) + Y_i R_i
$$


#### Optimization

The equations above provide a generic way to implement a single-bit full adder/subtractor.
The constant-3 adder/subtractor could be implemented by using four of these single-bit full adder/subtractors.
However, as the second input $Y_3 Y_2 Y_1 Y_0$ is known to be 0011, further optimizations on each bit of the full adder/subtractor can be effected so that no more than the minimum necessary number of gates are used.

For example, for bit 0, we have $R_0 = 0$ and $Y_0 = 1$.
Therefore, the calculation of $Z_0$ and $R_1$ can be simplified as follows:

$$
Z_0 = X_0 \oplus 1 \oplus 0 = X_0'
$$

$$
R_1 = (Bo' X_0 + Bo X_0') (1 + 0) + 1 \cdot 0 = Bo \oplus X_0
$$

Similarly, you can perform Boolean transformations to simplify the Boolean expressions for $Z_1$, $R_2$, $Z_2$, $R_3$, $Z_3$, and $R_4$ subsequently. 
Based on the simplified Boolean expressions you get, you can implement this constant-3 adder/subtractor in Digital using basic logic gates.

In this part of the exercise, you are constrained to only use inverters and **two-input** basic logic gates provided in the Digital standard library.
The total number of gates used in your implementation should be less than 10.

#### Construction (4-digit excess-3 subtractor)

You can now construct a single-digit subtractor for the excess-3 representation by connecting a 4-bit binary subtractor component from the LogicWorks library and the newly designed constant-3 adder/subtractor. 
Now, the only remaining task is to grow it so it can handle subtraction operations on numbers composed of 4 decimal digits. 
You have likely realized that the generalization to 4 digits could be accomplished by replicating a single-digit excess-3 subtractor 4 times. 
Most of the rest should be rather straightforward and consists of hooking appropriately the interfaces corresponding to each digit.

As a good design practice, you should first create a single-digit excess-3 subtractor component in LogicWorks, then instantiate these in your circuit file to build a 4-digit excess-3 subtractor.
Finally, please use Hex keyboards in the circuit to enter the 4-digit excess-3 inputs and display the subtraction result in the Hex displays.

We will leave some interface questions for you to figure out, such as how the modules need to be connected and how the borrow-in signal from the previous digit could be taken into consideration in the subtraction operation. 
One important question as you hook up the digits together that we would like you to ponder is the question of the borrow signal between the digits. 
As you know, at this point each digit is possibly producing two digit borrow-outs: one from the binary subtraction and the other the borrow-out of the correction step. 
One question that you should be pondering is which of these two borrows is actually the right one to drive the subtraction of the next digit. 
Please make sure that you hook these correctly and provide us a report in the deliverables detailing your understanding as to which of these could be used for driving the next digit.
If you decide neither should, please provide an alternate borrow to drive the next digit operation. 
If you decide either will do the job, please provide a discussion as to which may be preferable.
In the case of only one, please provide a rationale for your selection and identify which one is your favorite.

You can try your design on the following two test cases.
Please also come up with a few additional test cases to check the correctness of your design.

| **Input A** | **Input B** | **Result (A-B)** |
|:----------:|:-----------:|:----------------:|
| 8A94       | 6575        | 584C             |
| B677       | A786        | 3BC4             |

## Lab Report

Your report should present the simplified Boolean expressions for $Z_1$, $R_2$, $Z_2$, $R_3$, $Z_3$, and $R_4$. 
Note that these equations should be consistent with the circuit implemented in your LogicWorks design file. 
In the report, please include your test cases with the expected results and compare them with the observed outputs in your circuit. 
Please describe which of the mentioned signals (e.g., borrow-out before and after the correction step, or perhaps another signal in your component) can be used to drive the borrow-in signal of the next digit and which one you have preferred to implement.
Please also let us know your thoughts and implementation regarding which borrow bit should be driving the next digit binary operation and a rationale for your decision.
