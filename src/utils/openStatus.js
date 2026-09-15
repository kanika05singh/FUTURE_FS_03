// ============================================================================
// openStatus.js
// ----------------------------------------------------------------------------
// Reads the existing `businessData.openingHours` array (e.g.
// [{ days: "Monday – Thursday", hours: "12:00 PM – 11:00 PM" }, ...]) and
// works out, for right now, whether the place is open — including handling
// hours that run past midnight (e.g. "12:00 PM – 12:30 AM"). Used by the
// Location section to show a live "Open now" / "Closed" badge.
// ============================================================================

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function parseTimeToMinutes(rawTime) {
  const match = rawTime.trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  let [, hours, minutes, meridiem] = match;
  hours = Number(hours) % 12;
  if (meridiem.toUpperCase() === "PM") hours += 12;
  return hours * 60 + Number(minutes);
}

function expandDayRange(daysLabel) {
  // Normalise any dash variant ("-", "–", "—") to a single separator.
  const parts = daysLabel.split(/[-–—]/).map((part) => part.trim());
  const startIndex = DAY_NAMES.indexOf(parts[0]);
  const endIndex = DAY_NAMES.indexOf(parts[1] ?? parts[0]);
  if (startIndex === -1 || endIndex === -1) return [];

  const days = [];
  let i = startIndex;
  // Walk forward from start to end, wrapping around the week if needed.
  while (true) {
    days.push(i);
    if (i === endIndex) break;
    i = (i + 1) % 7;
  }
  return days;
}

function buildDaySchedule(openingHours) {
  // A map of weekday index -> { open, close } in minutes-from-midnight.
  // `close` may exceed 1440 to represent closing after midnight.
  const schedule = {};
  openingHours.forEach(({ days, hours }) => {
    const [openRaw, closeRaw] = hours.split(/[-–—]/).map((part) => part.trim());
    const open = parseTimeToMinutes(openRaw);
    let close = parseTimeToMinutes(closeRaw);
    if (open === null || close === null) return;
    if (close <= open) close += 24 * 60; // crosses midnight

    expandDayRange(days).forEach((dayIndex) => {
      schedule[dayIndex] = { open, close };
    });
  });
  return schedule;
}

/**
 * getOpenStatus
 * @param {Array<{days: string, hours: string}>} openingHours
 * @param {Date} now
 * @returns {{ isOpen: boolean, label: string, detail: string }}
 */
export function getOpenStatus(openingHours, now = new Date()) {
  const schedule = buildDaySchedule(openingHours);
  const todayIndex = now.getDay();
  const yesterdayIndex = (todayIndex + 6) % 7;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const today = schedule[todayIndex];
  const yesterday = schedule[yesterdayIndex];

  // Case 1: still within yesterday's hours, which ran past midnight.
  if (yesterday && yesterday.close > 24 * 60) {
    const overflowClose = yesterday.close - 24 * 60;
    if (nowMinutes < overflowClose) {
      return {
        isOpen: true,
        label: "Open Now",
        detail: `Closes ${formatMinutes(overflowClose)}`,
      };
    }
  }

  // Case 2: within today's own hours.
  if (today && nowMinutes >= today.open && nowMinutes < today.close) {
    const closeDisplay =
      today.close >= 24 * 60 ? today.close - 24 * 60 : today.close;
    return {
      isOpen: true,
      label: "Open Now",
      detail: `Closes ${formatMinutes(closeDisplay)}`,
    };
  }

  // Closed — figure out when it next opens.
  if (today && nowMinutes < today.open) {
    return {
      isOpen: false,
      label: "Closed",
      detail: `Opens ${formatMinutes(today.open)} today`,
    };
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const dayIndex = (todayIndex + offset) % 7;
    const entry = schedule[dayIndex];
    if (entry) {
      const dayLabel = offset === 1 ? "tomorrow" : DAY_NAMES[dayIndex];
      return {
        isOpen: false,
        label: "Closed",
        detail: `Opens ${formatMinutes(entry.open)} ${dayLabel}`,
      };
    }
  }

  return { isOpen: false, label: "Closed", detail: "See hours below" };
}

function formatMinutes(totalMinutes) {
  const hours24 = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const meridiem = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const minuteLabel = minutes === 0 ? "" : `:${String(minutes).padStart(2, "0")}`;
  return `at ${hours12}${minuteLabel} ${meridiem}`;
}
