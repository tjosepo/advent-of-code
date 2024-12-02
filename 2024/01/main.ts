// --- Part 1 ---

const input = await Deno.readTextFile("./input.txt");

const first_list: number[] = [];
const second_list: number[] = [];

const lines = input.split("\n");

// 1. Parse the input
for (const line of lines) {
  const [first, second] = line.split("   ");
  first_list.push(Number(first));
  second_list.push(Number(second));
}

// 2. Sort the lists
first_list.sort((a, b) => a - b);
second_list.sort((a, b) => a - b);

// 3. Compare the lists
let distance = 0;
for (const i in lines) {
  distance += Math.abs(first_list[i] - second_list[i]);
}

console.log("Total distance:", distance);

// --- Part 2 ---

const second_list_map = new Map<number, number>();
for (const value of second_list) {
  const count = second_list_map.get(value);
  if (!count) {
    second_list_map.set(value, 1);
  } else {
    second_list_map.set(value, count + 1);
  }
}

let similarity = 0;
for (const value of first_list) {
  const count = second_list_map.get(value) ?? 0;
  similarity += value * count;
}

console.log("Similarity score:", similarity);