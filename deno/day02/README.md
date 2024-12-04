# Day 2: Red-Nosed Reports

## Part 1

### Problem

1. Given rows of numbers, determine the "safety" of each row by checking that:
   - Numbers are all increasing or all decreasing.
   - Any two adjacent numbers differ by at least one and at most three.
2. Count these.

### Solution

Alright, same idea, but with a sprinkle of complexity in the form of invariants.

We'll start by parsing each row of numbers. First, it's necessary to skip rows
where there aren't enough numbers to check, or where the first two are equal.
From there, we can determine the "mode" from the first two numbers; increasing
or decreasing. This leaves us to iterate over each number against the previous,
checking the invariants. Using `some` here allows for easy early returns
whenever we come across an "unsafe" pair. If `some` comes up empty, the row is
"safe", and we add it to the count.

## Part 2

### Problem

1. Given the same problem statement in Part 1, find which rows are "safe" when
   any one number may be removed.
2. Count these.

### Solution

I'm 100% certain that this could be solved pretty elegantly by only changing the
way the pair of the previous and current numbers are handled. After bashing my
head against that approach for a minute, here's the caveman solution;

For each row, we'll iterate over the possible variants by progressively removing
one of the numbers, running the same check from Part 1. We can then add any row
with a "safe" variant to the count, exiting early.
