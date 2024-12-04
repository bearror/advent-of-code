import { TextLineStream } from "@std/streams";

const input = await Deno.open("./day02/input.txt");
const lines = input.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());

let solution = 0;

const DELIMITER = " ";

for await (const line of lines) {
  const levels = line.split(DELIMITER).map((i) => parseInt(i));

  // Note that it's necessary to start from -1 to include the original variant
  for (let removed = -1; removed < levels.length; removed++) {
    const variant = levels.filter((_, i) => i !== removed);
    if (variant.length < 2 || variant[0] === variant[1]) continue; // skip
    const mode = variant[1] > variant[0] ? "inc" : "dec";

    const safe = variant.some((l, i, arr) => {
      const prev = arr[i - 1];
      if (prev === undefined) return; // skip
      if (l === prev) return true;
      if (mode === "inc" && l < prev || mode === "dec" && l > prev) return true;
      if (Math.abs(l - prev) > 3) return true;
    }) === false; // `some` returns early when unsafe

    if (safe) {
      solution += 1;
      break; // exit, given that one safe variant is enough
    }
  }
}

console.log(solution);
