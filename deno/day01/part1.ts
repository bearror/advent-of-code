import { TextLineStream } from "@std/streams";

const input = await Deno.open("./day01/input.txt");
const lines = input.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());

const ls: number[] = [];
const rs: number[] = [];

const DELIMITER = "   ";

for await (const line of lines) {
  const [l, r] = line.split(DELIMITER).map((i) => parseInt(i));
  ls.push(l);
  rs.push(r);
}

ls.sort();
rs.sort();

const solution = ls.reduce((total, l, i) => total += Math.abs(l - rs[i]), 0);

console.log(solution);
