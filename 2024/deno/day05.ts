/**
 * ### Day 5: Print Queue
 *
 * @see https://adventofcode.com/2024/day/5
 * @module
 */

/**
 * The puzzle input consists of two sections:
 *
 * - A list of `page ordering rules` → {@linkcode OrderingRules}
 * - A list of `pages to produce in each update` → {@linkcode Updates}
 */
type Input = [string, string];

/**
 * The set of all page ordering rules that the updates must follow.
 *
 * Note that **there are no transitive rules**, i.e. each page pair has a
 * defined rule. E.g. given `A|B` and `B|C`, we don't have to infer `A|C`.
 */
type OrderingRules = Set<OrderingRule>;
/**
 * A page ordering rule in the format `X|Y`, where `X` must appear before `Y`
 * in all updates where both pages are present.
 */
type OrderingRule = `${Page}|${Page}`;

/** The pages to produce in each update. */
type Updates = Page[][];

/** A page number. */
type Page = number;

/** An ordering between two pages. */
type Ordering = {
  /**
   * The page this ordering starts from; e.g. given `A|B`, it's `A`.
   *
   * Note that only the first page of the pair needs to be stored, as a valid
   * update `A|B`, `B|C`, `C|D` always has duplicates until the last element.
   */
  page: Page;
  /** Whether or not the ordering follows the page ordering rules. */
  valid: 1 | 0;
};

/**
 * @example Solve both parts with example input.
 * ```ts
 * import { assertEquals } from "jsr:@std/assert/equals";
 *
 * const example = `
 * 47|53
 * 97|13
 * 97|61
 * 97|47
 * 75|29
 * 61|13
 * 75|53
 * 29|13
 * 97|29
 * 53|29
 * 61|53
 * 97|53
 * 61|29
 * 47|13
 * 75|47
 * 97|75
 * 47|61
 * 75|61
 * 47|29
 * 75|13
 * 53|13
 *
 * 75,47,61,53,29
 * 97,61,53,29,13
 * 75,29,13
 * 75,97,47,61,53
 * 61,13,29
 * 97,13,75,29,47
 * `.trim();
 *
 * assertEquals(solve(example, 1), 143, "part 1");
 * assertEquals(solve(example, 2), 123, "part 2");
 * ```
 */
export default function solve(input: string, part: 1 | 2): number {
  const [r, u] = input.split("\n\n") as Input;
  const rules = new Set(r.split("\n")) as OrderingRules;
  const updates: Updates = u.split("\n").map((u) => u.split(",").map(Number));

  let solution = 0;

  for (const pages of updates) {
    if (pages.slice(0, -1).every((p, i) => rules.has(`${p}|${pages[i + 1]}`))) {
      if (part === 1) solution += pages[Math.floor(pages.length / 2)];
    } else if (part === 2) {
      const orderings: Ordering[][] = pages.map((page, _, row) =>
        row.map((p) => ({ page, valid: rules.has(`${page}|${p}`) ? 1 : 0 }))
      );

      for (let colI = 0; colI < orderings.length - 1; colI++) {
        orderings.sort((rowA, rowB) => rowB[colI].valid - rowA[colI].valid);
      }

      solution += orderings.map(([o]) => o.page)[Math.floor(pages.length / 2)];
    }
  }

  return solution;
}
