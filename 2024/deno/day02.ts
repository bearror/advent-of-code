/**
 * ### Day 2: Red-Nosed Reports
 *
 * @see https://adventofcode.com/2024/day/2
 * @module
 */

/** The puzzle input consists of many `reports`. */
type Input = Report[];
/** Each report is a list of numbers called `levels`. */
type Report = number[];

/**
 * @example Solve both parts with example input.
 * ```ts
 * import { assertEquals } from "jsr:@std/assert/equals";
 *
 * const example = `
 * 7 6 4 2 1
 * 1 2 7 8 9
 * 9 7 6 2 1
 * 1 3 2 4 5
 * 8 6 4 4 1
 * 1 3 6 7 9
 * `.trim();
 *
 * assertEquals(solve(example, 1), 2, "part 1");
 * assertEquals(solve(example, 2), 4, "part 2");
 * ```
 */
export default function solve(input: string, part: 1 | 2): number {
  const reports: Input = input.split("\n")
    .map((levels) => levels.split(/\s+/).map(Number));

  if (part === 1) return reports.filter(isSafe).length;

  return reports
    .filter((levels) => isSafe(levels) || removeOne(levels).some(isSafe))
    .length;
}

/**
 * Checks whether the given report is considered `safe`:
 *
 * - The levels are either **all increasing** or **all decreasing**.
 * - Any two adjacent levels differ by **at least one** and **at most three**.
 */
function isSafe(levels: Report) {
  const sign = Math.sign(levels[0] - levels[1]);
  if (sign === 0) return false;

  return levels.slice(0, -1).every((l, i) => {
    const delta = l - levels[i + 1];
    if (Math.sign(delta) !== sign) return false;
    return Math.abs(delta) <= 3;
  });
}

/** Yields all variations of the given report with one of the levels removed. */
function* removeOne(levels: Report): Generator<Report> {
  for (let i = 0; i < levels.length; i++) {
    const copy = [...levels];
    copy.splice(i, 1);
    yield copy;
  }
}
