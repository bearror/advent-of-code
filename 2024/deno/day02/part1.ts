import { TextLineStream } from "@std/streams";

const input = await Deno.open("./inputs/day02.txt");
const lines = input.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());

let solution = 0;

for await (const line of lines) {
  const levels = line.split(" ").map((i) => parseInt(i));

  if (levels.length < 2 || levels[0] === levels[1]) continue; // skip
  const mode = levels[1] > levels[0] ? "inc" : "dec";

  const safe = levels.some((l, i, arr) => {
    const prev = arr[i - 1];
    if (prev === undefined) return; // skip
    if (l === prev) return true;
    if (mode === "inc" && l < prev || mode === "dec" && l > prev) return true;
    if (Math.abs(l - prev) > 3) return true;
  }) === false; // `some` returns early when unsafe

  if (safe) solution += 1;
}

console.log(solution);
