---
title: Booth's Multiplication
parent: Lab 2
layout: katex
nav_order: 2
---

# Booth's Multiplication
{: .no_toc}

## Contents
{: .no_toc .text-delta}

1. TOC
{:toc}

---

## The Algorithm

Now that we have the fundamentals of two's complement multiplication algorithm summarized, we turn to the particularities of Booth's multiplication algorithm. We will start by elaborating on an opportunity for optimization which arises from the generic multiplication algorithm previously discussed.
In the generic multiplication algorithm, each step decides whether an addition (or subtraction, in the case of the MSB) operation is needed by examining the individual bit corresponding to that multiplier position; for an $n$-bit number, $\frac{n}{2}$ addition/subtraction steps are to be expected on average.
Yet a moment's thought helps us realize that, in the binary numbering system, the sum of a consecutive sequence of '1's can be easily calculated using the following equation, perhaps enabling us to reduce the number of addition/subtraction steps:

\begin{equation}
2^{i+k}+2^{i+k-1}+...+2^{i+1} + 2^i = 2^{i+k+1}- 2^{i}
\end{equation}

In the binary numbering system, the left-hand side of Equation (1) is represented by a consecutive sequence of '1's, starting from bit $i$ to bit $i+k$ (counting from the right).
If we use 1&#773; to represent -1, Equation (1) implies that a standard binary number can be converted into a three-valued (0, 1, and 1&#773;) codeword representation.
For instance, assuming $i=1$ and $k=7$, we can get the following transformation:

\begin{equation}
00111111110 = 010000000\overline{1}0
\end{equation}

Given this type of transformation, what is its impact on our multiplication algorithm?
In the generic algorithm, an add/subtract operation would be executed for each 1 in the multiplier.
On the other hand, Equation (1), and its illustration in Equation (2), imply that a consecutive sequence of 1's in the multiplier, starting from bit $i$ to bit $i+k$, can be converted into nothing more than a 1&#773; at bit $i$ and a 1 at bit $i+k+1$.
Therefore, all the additions needed for bit $i, i+1, ..., i+k$ can be replaced by an addition for bit $i+k+1$ and a subtraction for bit $i$. In this way, we can replace the consecutive sequence of additions with only two operations!

Scanning the multiplier from right to left, how do we detect where to place a 1 and where to place a 1&#773;?
The discussion heretofore indicates that we need a 1&#773; for the starting point of the sequence of 1's, that is, when we encounter a 0→1 transition as we scan from right to left (i.e. the sequence '10' as it appears written in left-to-right form).
Similarly, we need a 1 for the finishing point of the sequence of 1's, that is, when we encounter a 1→0 transition (i.e. '01').
This is what is implemented in Booth's algorithm.
Rather than simply looking at bit i of the multiplier to determine whether to add or not, in Booth's we examine two bits at a time: bit i and the bit immediately to its right.
If we see a sequence of 1's starting from bit $i$ to bit $i+k$, we can simply perform a subtraction when we are examining $M_iM_{i-1} = '10'$ (the starting point of the sequence of 1's) and an addition when we are examining $M_{i+k+1}M_{i+k} = '01'$ (the finishing point of the sequence of 1's).
One thing that you may worry about is what happens to negative 2's complement multipliers and whether any special treatment needs to be accorded to them.
It turns out that Booth's encoding has the extra benefit that negative numbers require no special handling whatsoever as Booth's encoding will automatically generate representations with the correct value embedded.
Perhaps one way to realize this is that in the case of a two's complement negative number, one or more consecutive bits of 1's are in the most significant positions.
Since there is no 1→0 transition (i.e. '01') at the most significant bit, the last non zero bit in the right-to-left sweep through the encoded multiplier will be a 1&#773;.
This guarantees that the resultant representation is indeed negative.
For example, the two's complement number 11111000110 transforms into 00001&#773;00101&#773;0.
Both bit strings represent the (negative) value -58.
(For those of you a bit more into number theory, please note that the conversion into the Booth's representation, accords the MSB the regular treatment as if it were a position with positive $2^{(n-1)}$, whereas it should have been accorded the negative weight of $-2^{(n-1)}$, the difference of $2^n$ being exactly what would have been forthcoming, should we have completed the squaring of the books by having an extra 1 at the left end of the word, worth exactly the difference $2^{n}$!)

Because we are always examining two bits at a time, we need a value for $M_{-1}$ to help us complete the inspection of the least significant bit, $M_0$.
Therefore, in Booth's algorithm we add an extra '0' to the right of our multiplier input to help get the first step of our multiplication algorithm going.
This bit can be thought of as being after the binary point, e.g. delivering a representation for decimal '29' as '011101.0' (plus however many leading bits may be required).
This extraneous rightmost bit is not part of the value of the multiplier, so we need a storage element to keep track of it outside of the multiplier
register.
It will be stored in a D flip-flop ("F1" in [Figure 2](https://cse140l.github.io/fa24-labs/docs/lab2/part1/step1#figure-2)). Each time the multiplier is shifted right by a single bit, the least significant bit is fed into this flip-flop.
In this way, we can always inspect the rightmost bit of the multiplier register and the value in the flip-flop to determine the arithmetic operation to be performed, as shown in [Table 1](https://cse140l.github.io/fa24-labs/docs/lab2/booths#table-1).
Keep in mind that though we are inspecting two bits, we only shift by a single bit between each step, i.e. each bit ends up being examined twice (once in the $M_0$ position, and then once in the $M_{-1}$ position), leading to exactly $n$ inspections of the bit pairs.

#### Table 1

{: .text-delta}
Booth's multiplication operation based on the LSB of the multiplier register and flip-flop F1

| Rightmost Bit | Value in F1 | Arithmetic Operation |
|--------------:|------------:|:--------------------:|
|             0 |           0 |         No Op        |
|             0 |           1 |       Addition       |
|             1 |           0 |      Subtraction     |
|             1 |           1 |         No Op        |

The functions determined by [Table 1](https://cse140l.github.io/fa24-labs/docs/lab2/booths#table-1) can be broken down between the Rightmost Bit and the value in F1 as follows:

- If the Rightmost Bit is a 0, then the circuit will be performing an addition.
- If the Rightmost Bit is a 1, then the circuit will be performing a subtraction.

Whether this operation is actually saved by being committed to the accumulator register is determined by a single 2-input gate with the Rightmost Bit and the value in F1 as inputs.
It is left to you to figure out what gate will perform the necessary function.
Considering the logic in this way will help with your implementation.

## Resources

1. [Multiplication & Division Handout](../../assets/lab2/MultDiv_Fall24.pdf)
2. [Booth's Multiplication Example](https://www.youtube.com/watch?v=QFXaddi-Ag8&t=770s&pp=ygUVYm9vdGhzIG11bHRpcGxpY2F0aW9u)
3. [Concept of Booth's Algorithm](https://www.youtube.com/watch?v=meSn0UXmgac&pp=ygUVYm9vdGhzIG11bHRpcGxpY2F0aW9u)
