const input = await Deno.readTextFile("./day03/input.txt");

let solution = 0;

const segments = input.split(/don't\(\)/);
let included = segments[0];
segments.forEach((s) => included += s.split(/do\(\)/).slice(1).join());

const matches = included.matchAll(/mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/g);
for (const match of matches) {
  const { a, b } = match.groups!;
  solution += parseInt(a) * parseInt(b);
}

console.log(solution);
