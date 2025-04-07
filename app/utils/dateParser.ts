import dayjs from "dayjs";
import type { DateInputProps } from "@mantine/dates";

/**
 * Parses date input with flexible formats:
 *
 * - `+` → Today
 * - `+N` or `-N` → Add/Subtract N days from today
 * - `+y N` or `-y N` → Add/Subtract N years from today
 * - `+N +y M` or `-N -y M` → Add/Subtract N days and M years from today
 * - `DD/MM/YYYY` → Specific date input
 *
 * Example Usage:
 * - `+` → (Today: Feb 10, 2025) → Feb 10, 2025
 * - `+3` → (Today: Feb 10, 2025) → Feb 13, 2025
 * - `-2` → (Today: Feb 10, 2025) → Feb 8, 2025
 * - `+y 2` → (Today: Feb 10, 2025) → Feb 10, 2027
 * - `-y 1` → (Today: Feb 10, 2025) → Feb 10, 2024
 * - `+3 +y 1` → (Today: Feb 10, 2025) → Feb 13, 2026
 * - `-2 +y 5` → (Today: Feb 10, 2025) → Feb 8, 2030
 * - `+0 +y 2` → (Today: Feb 10, 2025) → Feb 10, 2027
 * - `-1 -y 3` → (Today: Feb 10, 2025) → Feb 9, 2022
 * - `05/03/2023` → Mar 5, 2023
 */

export const dateParser: DateInputProps["dateParser"] = (input) => {
  if (input === "+") {
    return new Date(); // Return today's date
  }

  // Handle "+N" or "-N" (Add/Subtract N days from today)
  const dayMatch = input.match(/^([+-])(\d+)$/);
  if (dayMatch) {
    const operator = dayMatch[1]; // "+" or "-"
    const days = parseInt(dayMatch[2], 10);
    return dayjs()
      .add(operator === "+" ? days : -days, "day")
      .toDate();
  }

  // Handle "+y N" or "-y N" (Add/Subtract N years from today)
  const yearMatch = input.match(/^([+-]?)y (\d+)$/);
  if (yearMatch) {
    const operator = yearMatch[1] || "+"; // Default to "+"
    const years = parseInt(yearMatch[2], 10);
    return dayjs()
      .add(operator === "+" ? years : -years, "year")
      .toDate();
  }

  // Handle "+N +y M" or "-N -y M" (Add/Subtract days & years from today)
  const combinedMatch = input.match(/^([+-]?\d+)?( [+-]?y \d+)?$/);
  if (combinedMatch) {
    const baseDate = dayjs(); // Default: today
    const dayChange = combinedMatch[1] ? parseInt(combinedMatch[1]) : 0;
    const yearChange = combinedMatch[2]
      ? parseInt(combinedMatch[2].replace(/ [+-]?y /, ""))
      : 0;
    const yearOperator = combinedMatch[2]?.trim().startsWith("-") ? -1 : 1;

    return baseDate
      .add(dayChange, "day")
      .add(yearChange * yearOperator, "year")
      .toDate();
  }

  // Handle specific date format "DD/MM/YYYY"
  return dayjs(input, "DD/MM/YYYY").toDate();
};
