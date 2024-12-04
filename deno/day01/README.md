# Day 1: Historian Hysteria

## Part 1

### Problem

1. Given two lists of numbers, pair up the numbers from smallest to largest.
2. Within each pair, get the distance (i.e. absolute difference).
3. Add these up.

### Solution

Given that the input is quite short, let's start off simple.

We can parse the input line by line, splitting the left and right numbers into
separate arrays. We can then sort each array separately, reducing the absolute
difference of each pair into a sum. Efficient? Nah. Simple? Yep.

## Part 2

### Problem

1. Given two lists of numbers, find how many times each left number appears in
   the right list.
2. Multiply each left number by the number of occurrences.
3. Add these up.

### Solution

Let's push on with simple approaches.

We'll parse the input like in Part 1. Instead of using two arrays, here it's
easier to use a `Map` for the right list. We'll build up the occurrences of the
right numbers in the `Map`. We can then reduce the left array, adding up each
number multiplied by the value found in the `Map`; or zero.
