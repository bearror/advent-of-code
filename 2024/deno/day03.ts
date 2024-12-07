/**
 * ### Day 3: Mull It Over
 *
 * @see https://adventofcode.com/2024/day/3
 * @module
 */

/** The puzzle input consists of corrupted computer memory. */
type Memory = string;

/**
 * @example Solve both parts with example input.
 * ```ts
 * import { assertEquals } from "jsr:@std/assert/equals";
 *
 * const example1 = `
 * xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
 * `.trim();
 *
 * const example2 = `
 * xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
 * `.trim();
 *
 * assertEquals(solve(example1, 1), 161, "part 1");
 * assertEquals(solve(example2, 2), 48, "part 2");
 * ```
 */
export default function solve(input: string, part: 1 | 2) {
  const memory: Memory = input.split("\n").join("");
  if (part === 1) return mul(memory);
  // - The `do()` instruction **enables** future `mul` instructions.
  // - The `don't()` instruction **disables** future `mul` instructions.
  // - At the beginning of the program, `mul` instructions are **enabled**.
  return mul(memory.replaceAll(/don't\(\).*?do\(\)/g, ""));
}

/** Sums the results of all `mul(X,Y)` operations found in the given memory. */
const mul = (memory: Memory) =>
  memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)
    .reduce((total, [_, a, b]) => total + Number(a) * Number(b), 0);
