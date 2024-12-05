import { TextLineStream } from "@std/streams";

const input = await Deno.open("./inputs/day01.txt");
const lines = input.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());

const ls: number[] = [];
const rs: Map<number, number> = new Map();

for await (const line of lines) {
  const [l, r] = line.split("   ").map((i) => parseInt(i));
  ls.push(l);
  rs.set(r, (rs.get(r) ?? 0) + 1);
}

const solution = ls.reduce((total, l) => total += l * (rs.get(l) ?? 0), 0);

console.log(solution);
