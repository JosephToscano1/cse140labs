---
title: Part 4
parent: Lab 4
layout: katex
nav_order: 5
---

# Hazard Free Design
{: .no_toc}

## Contents
{: .no_toc .text-delta}

1. TOC
{:toc}

---

## Introduction

This part of the lab concerns the design of static hazard-free circuits.
Static hazards are caused by signal transitions on two complemented signals (such as $x$ and $\overline{x}$).
If these two signals propagate through paths of distinct delays, they may exhibit identical values for short periods of time, possibly resulting in a signal glitch at the logic where these two signals reconverge.

Fundamentally, static hazards can be detected using Karnaugh maps.
A **static 1-hazard** occurs if there exist two adjacent **1-minterms** that are not covered by a common **product** term in a sum-of-products implementation.
Similarly, a **static 0-hazard** occurs if two adjacent **0-maxterms** are not covered by a common **sum** term in a product-of-sums implementation.

The elimination of a static hazard is not cost free; it is achieved at the cost of redundant gates.
Minimizing such a cost thus becomes an important goal in designing hazard-free circuits.
For certain circuits such as FSMs whose behavior is easy to profile, it is possible to find the set of input transitions that will never occur during the regular operation of the circuit.
This set of input transitions can be considered as *Transition Don’t Cares*, and be utilized to minimize the redundant hardware needed in a hazard-free design.
This is achieved by removing the redundant gates that only cover hazard-generating transitions in the Transition Don’t Care set.

In this part, you are asked to design the minimal hazard-free implementation for two 4-input circuits with their Transition Don’t Cares specified.
The first circuit must be implemented in the sum-of-products form, while the second one should be in a product-of-sums implementation.
Karnaugh maps and the Transition Don’t Care sets of these circuits are as follows:

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}
.tg .tg-0pky{border-color:inherit;text-align:center;vertical-align:top}
.kmap-header{margin-top:0px; margin-bottom:0px; font-weight:bold;}
</style>

### Table 1

{: .text-delta}
Circuit 1 K-Map

<table class="tg"><thead>
  <tr>
    <td class="tg-0pky">
        <p class="kmap-header" style="text-align: right;">AB</p>
        <p class="kmap-header" style="text-align: center;">CD</p>
    </td>
    <td class="tg-0pky">00</td>
    <td class="tg-0pky">01</td>
    <td class="tg-0pky">11</td>
    <td class="tg-0pky">10</td>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-c3ow">00</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-c3ow">01</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-c3ow">11</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-c3ow">10</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">0</td>
  </tr>
</tbody>
</table>

### Table 2

{: .text-delta}
Circuit 1 Transition Don't Care Set

| $\text{ABCD}\_{\text{current}} \rightarrow \text{ABCD}\_{\text{next}}$ |
|:---------------------:|
|       `1101 → 1100`       |
|       `1001 → 1000`       |
|       `1111 → 0111`       |
|       `0011 → 0010`       |
|       `0111 → 0110`       |


### Table 3

{: .text-delta}
Circuit 2 K-Map

<table class="tg"><thead>
  <tr>
    <td class="tg-0pky">
        <p class="kmap-header" style="text-align: right;">AB</p>
        <p class="kmap-header" style="text-align: center;">CD</p>
    </td>
    <td class="tg-0pky">00</td>
    <td class="tg-0pky">01</td>
    <td class="tg-0pky">11</td>
    <td class="tg-0pky">10</td>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-c3ow">00</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">0</td>
  </tr>
  <tr>
    <td class="tg-c3ow">01</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">0</td>
  </tr>
  <tr>
    <td class="tg-c3ow">11</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">1</td>
  </tr>
  <tr>
    <td class="tg-c3ow">10</td>
    <td class="tg-0pky">1</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">0</td>
    <td class="tg-0pky">1</td>
  </tr>
</tbody>
</table>

### Table 4

{: .text-delta}
Circuit 2 Transition Don't Care Set

| $\text{ABCD}\_{\text{current}} \rightarrow \text{ABCD}\_{\text{next}}$ |
|:---------------------:|
|       `1100 → 1110`       |
|       `0001 → 1001`       |
|       `0011 → 0111`       |
|       `0110 → 1110`       |
|       `1000 → 1001`       |

The circuits should be implemented only with AND and OR gates and inverters.
To examine whether there is any static hazard in your implementation, you need to again set the delay of the gates according to the delay values specified in Table 2 and to observe the output signal waveform for various single-variable transition patterns.
For each circuit, you need to identify and eliminate the hazard through the following steps: 

1. Draw the Karnaugh map and show the minimal **prime implicants (implicates)** needed for a minimal sum-of-products (product-of-sums) design by circling them.

2. On the same map, also encircle the **prime implicants (implicates)** necessary to correct static hazards in the implementation, but this time with **dotted lines** or other means of distinguishing them from the minimum set.

3. On the same map, encircle, with **dotted lines in another color**, also the **additional prime implicants (implicates)** that would have been needed to resolve all static hazards if the provided *Transition Don’t Care* information was **not** applicable.

{: .note}
Please carefully examine all minimal 2-level solutions and select the one that requires the minimal amount of additional logic gates to fix the static hazards.

{: .highlight-title}
> Lab Report
> 
> All the steps from above must be clearly presented in your report
> Your report needs to clearly state how the Transition Don’t Cares reduce the necessary redundant gates in each circuit, and to present the corresponding Karnaugh map representation according to the instructions outlined above.


## Circuit Structure

{: .warning}
Failure to follow this structure can result in grading of the lab to be delayed or incorrect.

You are asked to also provide a *Digital* circuit named `HazardFree.dig` that contains the minimal hazard-free implementations for both circuits that follow the following port list:

| Port Direction | Port Name       | Port Width (bits) | Description                                                             |
|:--------------:|-----------------|------------------:|-------------------------------------------------------------------------|
|      INPUT     | `A`             |                 1 | Input A                                                                 |
|      INPUT     | `B`             |                 1 | Input B                                                                 |
|      INPUT     | `C`             |                 1 | Input C                                                                 |
|      INPUT     | `D`             |                 1 | Input D                                                                 |
|     OUTPUT     | `C1`            |                 1 | Output of circuit 1                                                     |
|     OUTPUT     | `C2`            |                 1 | Output of circuit 2                                                     |

