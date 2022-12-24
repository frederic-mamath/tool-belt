import { DateTime } from "luxon";
import { clone } from "ramda";

interface CelerityPerDev {
  [name: string]: number;
}
export interface SprintCelerityPerDay {
  [day: string]: {
    [name: string]: number;
  };
}

export const DEVS = [
  { name: "Frederic" },
  { name: "Mohamed" },
  { name: "Maxime" },
  { name: "Othmane" },
];

export const getAllBusinessDayBetween = (
  startDate: DateTime | null,
  endDate: DateTime | null
) => {
  if (!startDate || !endDate) {
    return [];
  }

  let loopCount = 0;
  const LOOP_COUNT_MAX = 21;
  const days: string[] = [];

  let tmp = DateTime.fromMillis(startDate.toMillis());
  let diffInMillis = endDate.diff(tmp).toMillis();

  while (diffInMillis >= 0 && loopCount < LOOP_COUNT_MAX) {
    loopCount++;
    days.push(tmp.toISODate());
    tmp = tmp.plus({ days: 1 });
    diffInMillis = endDate.diff(tmp).toMillis();
  }

  return days;
};

const initSprintCelerityDay = () => {
  const sprintCelerityDay: CelerityPerDev = {};

  DEVS.forEach((dev) => {
    sprintCelerityDay[dev.name] = 5;
  });

  return sprintCelerityDay;
};

export const updateSprintCelerityPerDay = (
  sprintCelerityPerDay: SprintCelerityPerDay,
  newStartDate: DateTime,
  newEndDate: DateTime
  // defaultCelerity = 5
) => {
  const businessDays = getAllBusinessDayBetween(newStartDate, newEndDate);
  const updatedSprintCelerityPerDay = clone(sprintCelerityPerDay);

  businessDays.forEach((businessDay) => {
    if (!updatedSprintCelerityPerDay[businessDay]) {
      updatedSprintCelerityPerDay[businessDay] = initSprintCelerityDay();
    }
  });

  Object.keys(updatedSprintCelerityPerDay).forEach((day) => {
    if (!businessDays.includes(day)) {
      delete updatedSprintCelerityPerDay[day];
    }
  });

  return updatedSprintCelerityPerDay;
};
