import { TextLineStream } from "@std/streams";

const input = await Deno.open("./day01/input.txt");
const lines = input.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());

const ls: number[] = [];
const rs: Map<number, number> = new Map();

const DELIMITER = "   ";

for await (const line of lines) {
  const [l, r] = line.split(DELIMITER).map((i) => parseInt(i));
  ls.push(l);
  rs.set(r, (rs.get(r) ?? 0) + 1);
}

const solution = ls.reduce((total, l) => total += l * (rs.get(l) ?? 0), 0);

console.log(solution);
