const input = await Deno.readTextFile("./day03/input.txt");

let solution = 0;

const matches = input.matchAll(/mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/g);
for (const match of matches) {
  const { a, b } = match.groups!;
  solution += parseInt(a) * parseInt(b);
}

console.log(solution);
