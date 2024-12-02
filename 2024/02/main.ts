const input = await Deno.readTextFile("./input.txt");

const reports = input.split("\n").map(report => report.split(" ").map(Number));

function isReportSafe(...levels: number[]): boolean {
  let decreasing = true;
  let increasing = true;
  let safe_increments = true;

  let previous_level: number | null = null;
  for (const level of levels) {
    if (previous_level === null) {
      previous_level = level;
      continue;
    }

    const increment = level - previous_level;

    if (increment < 0) {
      increasing = false;
    }

    if (increment > 0) {
      decreasing = false;
    }

    if (Math.abs(increment) < 1 || Math.abs(increment) > 3) {
      safe_increments = false;
    }

    previous_level = level;
  }

  return (increasing || decreasing) && safe_increments;
}

let safe_reports = 0;
for (const levels of reports) {
  if (isReportSafe(...levels)) {
    safe_reports += 1;
  }
}

console.log("Safe reports:", safe_reports);

// --- Part two ---
let safe_dampened_reports = 0;
for (const levels of reports) {

  if (isReportSafe(...levels)) {
    safe_dampened_reports += 1;
    continue;
  }

  // Slow, but who cares
  for (const i in levels) {
    const levelsMinusOne = [...levels.slice(0, Number(i)), ...levels.slice(Number(i) + 1)];
    if (isReportSafe(...levelsMinusOne)) {
      safe_dampened_reports += 1;
      break;
    }
  }
}

console.log("Safe dampened reports:", safe_dampened_reports);