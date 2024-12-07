import { parseArgs } from "jsr:@std/cli/parse-args";

main();

async function main() {
  const { day = 1 } = parseArgs<{ day: number }>(Deno.args);
  const fileName = `day${String(day).padStart(2, "0")}`;

  if (!Number.isInteger(day) || day < 1 || day > 25) {
    console.error("Day must be an integer between 1 and 25");
    Deno.exit(1);
  }

  try {
    const input = await Deno.readTextFile(`./2024/inputs/${fileName}.txt`);
    const solve = await import(`./${fileName}.ts`)
      .then((x) => x.default as (input: string, level: 1 | 2) => number);

    console.log("Part 1:", solve(input, 1));
    console.log("Part 2:", solve(input, 2));
  } catch (e) {
    console.error((e as Error).message);
    Deno.exit(1);
  }
}
