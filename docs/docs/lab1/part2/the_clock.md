---
title: The French Republican Alarm Clock
parent: Part 2
grand_parent: Lab 1
layout: default
nav_order: 1
---

# The French Republican Calendar Alarm Clock
{: .no_toc}

## Contents
{: .no_toc .text-delta}

1. TOC
{:toc}

---

Your previous product (the *Conventional Alarm Clock*) was an overnight hit!
People were lining up around the doors (virtually on their phones) to order it from the TickTok shop.
Pleased with all the people you are waking up now, you decide to try something a little more radical.
Recently, TickTok has performed some user studies, and found that majority of Gen Z finds the current metric of keeping time to be very confusing.

Some user responses are provided below:
> Who in their right mind decided that 60 seconds was one minute?

> You know what else is 60? Boomers.

> Not as simple as a hundred, everything should be 💯.

With your recent successes, the higher ups at TickTok have decided to let you perform some R&D on creating a new clock for Gen Z.
After your happy acceptance, you start realizing how difficult it is to create a new scale of time.
Thanks to the TickTok TimeSearch algorithm though, you were able to find traces of something promising called the "French Republican Calendar".

During the late 18th century (yes during the Reign of Terror), French revolutionaries attempted to create a calendar that introduced some sort of regularity.
While loading the next bourgeois sacrifice to the chopping block, revolutionaries were also busy modernizing calendars.
Joseph-Louis Lagrange was one of the proponents of the decimalisation movement in France at the time.

In their zeal for scientific precision, the French revolutionaries carried their love of the metric system which they propounded into the measurement of time.
The French Republican calendar was much more regular with every one of the 12 months being exactly 30 days which are divided into three ten-day weeks.
The deficit of 5 days at the end of each year (or 6 days in leap years) were designated as national holidays.
You decide to refer to these days of celebration as *complementary days* and jot down an idea on perhaps implementing it into another product later.
As far as the lower level time units were concerned, **each day was made up of ten decimal hours, each hour broken into 100 decimal minutes, and each decimal minute consisted of 100 decimal seconds**.

Happy with your research, you set off starting to build a French Republican Alarm Clock.


## Goals

1. Learn how to use *Digital*
2. Create a French Republican Calendar Alarm Clock 

## Instructions

{: .highlight-title}
> Lab Report
> 
> **Question 4:** Clearly, the time standards are different across the Western Calendar and the French Revolutionary Calendar.
> In the report, show your work on calculating how many conventional seconds a decimal second would correspond to.
> Although you have probably realized the period of pulse generators in the Western and the French Revolutionary Clocks will need to be adjusted according to this ratio for clocks to keep track of time correctly, you do not need to modify the pulse generators in this assignment, assuming that the manufacturer will combine the appropriate pulse generators with the alarm clocks if your designs become real-life products some day!
> Similarly, please calculate and show in your report how many conventional minutes a decimal minute would correspond to.

All of your work should be in a new circuit called `FrenchRepublicanAlarmClock` (it will save as `FrenchRepublicanAlarmClock.dig`).

Unlike [Part 1](https://cse140l.github.io/fa24-labs/docs/lab1/part1), the rest of this lab will have more discovery required on your part.
A great place to start would be to see how you can modify your `ConventionalAlarmClock` to fit the requirements for the `FrenchRepublicanAlarmClock`.
You may quickly realize that the `BabylonianClock` component has inherent limitations for repurposing, you and can't simply reuse it for this case.
It is up to you to modify the functionality of the `BabylonianClock` by yourself and implement it in your circuit.
You can see how the `BabylonianClock` was implemented for inspiration by opening it in *Digital* or by checking out the [previous section](https://cse140l.github.io/fa24-labs/docs/lab1/part1/provided_components#babylonianclock).

{: .note}
Do not modify `BabylonianClock`! Either create a new embedded circuit and include it in your `FrenchRepublicanAlarmClock` circuit or implement the logic into the `FrenchRepublicanAlarmClock` circuit itself.

Remember, your final circuit should implement:
- The correct time functionality (outlined in **bold** in the lore above)
- The time setting logic
- The alarm setting logic
- The alarm buzzing logic
- The display functionality
