/**
 * ### Day 4: Ceres Search
 *
 * @see https://adventofcode.com/2024/day/4
 * @module
 */

/** The puzzle input consists of a `word search`. */
type WordSearch = string;
/** The word we're searching for. */
type Word = string;

/** The allowed directions `[dx, dy]` for finding the word. */
const directions = {
  "↑": [0, -1],
  "↗": [1, -1],
  "→": [1, 0],
  "↘": [1, 1],
  "↓": [0, 1],
  "↙": [-1, 1],
  "←": [-1, 0],
  "↖": [-1, -1],
} as const;
/** An allowed direction `[dx, dy]` for finding the word.  */
type Direction = typeof directions[keyof typeof directions];

/** An index `i` in the original 1D word search. */
type Index = number;
/** A point `[x, y]` in a 2D representation of the word search. */
type Point = [number, number];
/** Gets a character at the given point or `undefined` if it's out of bounds. */
type Get = (point: Point) => string | undefined;

/**
 * @example Solve both parts with example input.
 * ```ts
 * import { assertEquals } from "jsr:@std/assert/equals";
 *
 * const example = `
 * MMMSXXMASM
 * MSAMXMSMSA
 * AMXSXMAAMM
 * MSAMASMSMX
 * XMASAMXAMM
 * XXAMMXXAMA
 * SMSMSASXSS
 * SAXAMASAAA
 * MAMMMXMMMM
 * MXMXAXMASX
 * `.trim();
 *
 * assertEquals(solve(example, 1), 18, "part 1");
 * assertEquals(solve(example, 2), 9, "part 2");
 * ```
 */
export default function solve(input: string, part: 1 | 2) {
  const width = input.indexOf("\n");
  const toIndex = ([x, y]: Point): Index => x + y * width;
  const toPoint = (i: Index): Point => [i % width, Math.floor(i / width)];

  const search: WordSearch = input.split("\n").join("");
  const get: Get = ([x, y]) =>
    (x >= 0 && x < width) ? search[toIndex([x, y])] : undefined;

  let solution = 0;

  for (let i = 0; i < search.length; i++) {
    if (part === 1 && search[i] === "X") {
      solution += Object.values(directions)
        .filter((d) => find("XMAS", toPoint(i), d, get)).length;
    }

    if (part === 2 && search[i] === "A") {
      const [x, y] = toPoint(i);
      solution += [
          [[x - 1, y - 1], directions["↘"]] as [Point, Direction],
          [[x + 1, y - 1], directions["↙"]] as [Point, Direction],
        ].every(([p, d]) => find("MAS", p, d, get) || find("SAM", p, d, get))
        ? 1
        : 0;
    }
  }

  return solution;
}

/** Finds the given word, starting at the point, searching in the direction. */
const find = (word: Word, [x, y]: Point, [dx, dy]: Direction, get: Get) =>
  Array.from(word).entries()
    .every(([i, character]) => get([x + dx * i, y + dy * i]) === character);
