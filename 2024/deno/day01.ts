/**
 * ### Day 1: Historian Hysteria
 *
 * @see https://adventofcode.com/2024/day/1
 * @module
 */

/** The puzzle input consists of two lists side by side. */
type Input = [List, List];
/** Each list contains numbers called `location ID`s. */
type List = number[];

/**
 * @example Solve both parts with example input.
 * ```ts
 * import { assertEquals } from "jsr:@std/assert/equals";
 *
 * const example = `
 * 3   4
 * 4   3
 * 2   5
 * 1   3
 * 3   9
 * 3   3
 * `.trim();
 *
 * assertEquals(solve(example, 1), 11, "part 1");
 * assertEquals(solve(example, 2), 31, "part 2");
 * ```
 */
export default function solve(input: string, part: 1 | 2): number {
  const [left, right]: Input = [[], []];
  for (const line of input.split("\n")) {
    const [l, r] = line.split(/\s+/).map(Number);
    left.push(l);
    right.push(r);
  }

  if (part === 1) return totalDistance(left, right);

  return similarityScore(left, right);
}

/** Sums the distance between numbers in the left and right sorted lists. */
function totalDistance(left: List, right: List) {
  left = left.toSorted((a, b) => a - b);
  right = right.toSorted((a, b) => a - b);
  return left.reduce((total, l, i) => total + Math.abs(l - right[i]), 0);
}

/** Sums left numbers multiplied by the times they appear in the right list. */
function similarityScore(left: List, right: List) {
  const counts = new Map();
  right.forEach((r) => counts.set(r, (counts.get(r) ?? 0) + 1));
  return left.reduce((total, l) => total + l * (counts.get(l) ?? 0), 0);
}
