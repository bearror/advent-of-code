import { TextLineStream } from "@std/streams";

const input = await Deno.open("./inputs/day01.txt");
const lines = input.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());

const ls: number[] = [];
const rs: number[] = [];

for await (const line of lines) {
  const [l, r] = line.split("   ").map((i) => parseInt(i));
  ls.push(l);
  rs.push(r);
}

ls.sort();
rs.sort();

const solution = ls.reduce((total, l, i) => total += Math.abs(l - rs[i]), 0);

console.log(solution);
