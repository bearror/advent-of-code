# Day 3: Mull It Over

## Part 1

### Problem

1. Given a garbled input, find segments that match `mul(X,Y)`, where `X` and `Y`
   are numbers with 1-3 digits.
2. Perform these multiplication operations.
3. Add up the results.

### Solution

Uh oh, I guess I'll have to try and get back into parser combinators eventually.

We'll run a simple regular expression with named capture groups to extract each
pair of numbers to be multiplied with `matchAll`. It's simple enough to parse
those into integers and do the multiplication, adding the results together.

## Part 2

### Problem

1. Given the same problem statement from Part 1, ignore any multiplications
   between `don't()` and `do()`.
2. Perform these multiplications.
3. Add up the results.

### Solution

I was almost ready to reach out for `parzec` here, but it's not quite the time.

The context is simple enough here, so we can just split the input into segments
using "don't()", and then split each of the segments using "do()". This'll let
us ignore the first element of each segment, and concat the rest to the string
before the first "don't()". After that, we'll run the same regular expression
and calculation from Part 1.
