---
title: Robertson's Multiplication
parent: Lab 2
layout: katex
nav_order: 1
---

# Robertson's Multiplication
{: .no_toc}

## Contents
{: .no_toc .text-delta}

1. TOC
{:toc}

---

## The Algorithm

Fundamentally, a multiplication algorithm needs to check each digit of the multiplier (conventionally, from the least significant to the most significant digit) and accumulate a partial sum.
The pencil and paper method that you should be quite familiar with from your childhood days does the same thing,
except that you would typically sum all the partial products in one scoop rather than iteratively step-by-step.
If we turn our attention to the binary two's complement multiplication hardware, we note that the process described in the previous paragraph holds except with an important simplification.
Since each digit in a binary system can only be a 0 or a 1, deriving the partial products is trivial to accomplish.

The partial sum which accumulates the result of our multiplication circuit iteratively as is to be expected starts off at 0.
Starting from the least significant bit (LSB) of the multiplier, if the $ith$ bit (counting from the right of the multiplier) is a '1', we shift the multiplicand left $i$ times and add it to our partial sum.
This operation is repeated until the most significant bit (MSB) is encountered, which is the sign bit of the multiplier.
Since the sign bit has a negative weight, we need to subtract the shifted multiplicand from the partial sum (instead of the usual addition) if it is 1.
The use of a distinct storage element at every step to save the partial sum can be avoided by a simpler implementation that keeps a running total (an accumulation) in a single accumulator register which can be reused in each step.
Hence, in order to perform $n$-bit multiplication, a $2n-1$ bit accumulator register ($2n-1$ bits suffice to capture the multiplication result of two $n$-bit numbers as long as the two's complement representation of inputs is restricted to the symmetric range of $(-2^{(n-1)}, 2^{(n-1)})$), a $2n-1$ bit multiplicand register (because the $n$-bit multiplicand needs to be shifted left $n-1$ times) and an $n$-bit multiplier register would be required.
Can this hardware outlay be reduced even further? 
The answer is a resounding yes when you consider the following two observations:

- Instead of shifting the multiplicand 1-bit left on each step, we can just as easily shift the partial sum stored in the accumulator 1-bit right.
In this way, the addition inputs still line up correctly, while the multiplicand, which no longer needs to be shifted, can remain stored in an $n$-bit register.

- The multiplier bits that have already been examined in prior steps are of no further use subsequently.
Therefore, as we shift the multiplier right at every step, the higher bit positions of the multiplier register can be exploited to store the extra bits required by the growing partial sum.

Based on these two observations, we can design a multiplication circuit that needs no more than three $n$-bit registers in total for the partial sum, multiplier and multiplicand.
During the multiplication process, the accumulator and multiplier register pair is shifted one bit to the right on every step, while no shifting is performed on the multiplicand register.
The bit being shifted out of the accumulator register on each step is fed to the leftmost bit of the multiplier register to be shifted in for storage.
If the rightmost bit of the multiplier register is a '1', the contents of the multiplicand and the accumulator registers are added (or subtracted if this happens to be the MSB of the multiplier), and the results are written back to the accumulator register.
Figure 1 below illustrates this optimized data flow in the accumulator/multiplier register pair:

#### Figure 1

{: .text-delta}
Accumulator Cannibalization of Multiplier Register

![](../../assets/lab2/figure1.png)

In the process of cannibalization of the multiplier, one can see that a $(2n-1)$-bit partial sum storage has inherited an extra bit from the cannibalized multiplier, thus growing into a $2n$ bit accumulator.
This is just as well, since true n-bit two's complement numbers actually lie in the range of $[-2^{(n-1)}, 2^{(n-1)})$ whose product will produce results in the range $(-2^{(2n-2)}, 2^{(2n-2)}]$.
(Note that the square bracket ']' indicates a hard boundary, including the right element, whereas the parenthesis '(' indicates a soft boundary that encompasses numbers greater than, but not equal to, the left value).

**This necessitates a truly $2n$-bit representation to account for the somewhat exceptional case of $2^{(2n-2)}$ as the square of the largest representable negative number.**

Of course, you realize that the corner-cutting of NumeriCorp has made this issue moot, but you keep it in the back of your mind in the hopes of enabling you to contribute to your company, by setting them on the path of the true and righteous (and earning for yourself, of course, that long coveted promotion in these lean times).
There is one more implementation detail that merits consideration. As each step consists of the partial sum being added to the multiplicand (after appropriate alignment, of course) one needs to address the question of the bit width of the needed adder component.
It is easy to observe that the first addition to the partial result for the LSB will produce an $n$-bit sum, while the final partial sum (and product of the multiplication) which we just discussed can be $2n-1$ bits long.
While the latter part of this discussion seems to argue in favor of $2n-1$ bit adders, one can notice that at any point the addition will only involve $n$-bit inputs, as any bits of the partial sum to the right of the actual summation will remain constant and unaffected by the operation.
While the inputs to the two's complement addition that underpins the multiplication algorithm can thus be reduced to $n$-bit numbers, we do know that $n$-bit addition (for same sign inputs) is prone to overflow when the output is $n+1$-bits.
To preclude this overflow possibility, we will start you off in this exercise with an $n+1$ bit adder.
At the inputs of the adder, we will need to replicate the most significant $n$th bit and connect to the $(n+1)$th bit position, effectively performing a sign extension at the input space.

## Resources

1. [Robertson's Algorithm Example](https://www.youtube.com/watch?v=U62iP8RkZIk&pp=ygUjcm9iZXJ0c29uIG11bHRpcGxpY2F0aW9uIGFsZ29yaXRobSA%3D)
