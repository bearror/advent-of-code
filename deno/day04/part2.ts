const input = await Deno.readTextFile("./day04/input.txt")
  .then((text) => text.replaceAll("\n", "")); // to avoid newline row offsets

type Point = [number, number];

const [WIDTH, HEIGHT] = [140, 140];
const toIndex = ([x, y]: Point): number => x + y * WIDTH;
const toPoint = (i: number): Point => [i % WIDTH, Math.floor(i / WIDTH)];

const DIRECTIONS = [1, 3, 7, 9] as const; // numpad
type Direction = typeof DIRECTIONS[number];

const step = ([x, y]: Point, direction: Direction, step: number): Point => {
  // deno-fmt-ignore
  switch (direction) {
    case 1: return [x - step, y + step]
    case 3: return [x + step, y + step]
    case 7: return [x - step, y - step]
    case 9: return [x + step, y - step]
  }
};

const WORD = Array.from("MAS");
const points: Point[] = [];
const indexes = new Set<number>();

let solution = 0;

for (let i = 0; i < input.length; i++) {
  if (input[i] === WORD[0]) points.push(toPoint(i));
}

for (const point of points) {
  for (const direction of DIRECTIONS) {
    for (const [i, character] of WORD.entries()) {
      if (i === 0) continue; // skip, first character always matches
      const [x, y] = step(point, direction, i);
      if (x < 0 || x > WIDTH - 1 || y < 0 || y > HEIGHT - 1) break; // overflow
      if (input[toIndex([x, y])] !== character) break;
      if (i === WORD.length - 1) { // found at `point`, `direction`
        const a = toIndex(step(point, direction, 1));
        if (indexes.has(a)) solution += 1; // any overlap is an "X-MAS"
        indexes.add(a);
      }
    }
  }
}

console.log(solution);
