---
title: Provided Components
grand_parent: Lab 4
parent: Part 3
layout: default
nav_order: 3
---

# Components Provided
{: .no_toc}

## Contents
{: .no_toc .text-delta}

1. TOC
{:toc}

---


## Delayed Logic Gates

{: .warning}
Delayed components (suffixed with a `D`) **cannot be exported to Verilog and hence cannot be autograded**.
Please do not use these components if we are testing it logically.

The delayed logic gates are identical in behavior to traditional *Digital* logic gates, except you have to define the number of inputs a special way.
When you right click the component, you will find a text field denoting the number of inputs to use for the logic gate.
Please fill this field with an integer value denoting to how many inputs you want to use.

For example, to use 3 inputs, you would fill in the field with:

```
inputCount := 3;
```

Please do not input any numbers that are less than 2 or greater than 8 (we cannot guarantee your circuit working if you use numbers outside of these bounds)

These gates all have a predefined delay used to help calculate the performance.
For more information, please refer to the [Performance Analysis](https://cse140l.github.io/fa24-labs/lab4/part3/delay) page.
