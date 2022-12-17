import { DateTime, Duration } from "luxon";

import { ClearstreamUserOutboundDto } from "generated/model";

export interface Stopwatch {
  start: DateTime;
  now: DateTime;
  tick: null;
}

export interface Timer {
  end: DateTime;
  now: DateTime;
  tick: null;
}

export const shouldMeetingEnd = (timer: Timer | null) => {
  if (!timer) {
    return false;
  }

  const timeLeft = Duration.fromObject(timer.end.diff(timer.now).toObject());

  return timeLeft.milliseconds < 0;
};

export const getTimerDiff = (timer: Timer | null) => {
  if (!timer) {
    return "00:15:00";
  }

  return Duration.fromObject(timer.end.diff(timer.now).toObject()).toFormat(
    "hh:mm:ss"
  );
};

export const getStopwatchDiff = (stopwatch: Stopwatch | null) => {
  if (!stopwatch) {
    return "00:00:00";
  }

  return Duration.fromObject(
    stopwatch.now.diff(stopwatch.start).toObject()
  ).toFormat("hh:mm:ss");
};

export const getCurrentSpeaker = (
  filteredSpeakers: ClearstreamUserOutboundDto[],
  currentSpeakerIndex?: number
) => {
  return currentSpeakerIndex !== undefined
    ? filteredSpeakers[currentSpeakerIndex]?.firstName || "Done !"
    : "No one yet";
};

export const getNextSpeaker = (
  filteredSpeakers: ClearstreamUserOutboundDto[],
  currentSpeakerIndex?: number
) => {
  return currentSpeakerIndex !== undefined
    ? filteredSpeakers[currentSpeakerIndex + 1]?.firstName || "Let's Go !"
    : "Click here to start";
};

export const burndownChartData = [
  {
    name: "08",
    expectedPointsDone: 105,
    pointsLeftToDo: 105,
  },
  {
    name: "09",
    expectedPointsDone: 75,
    pointsLeftToDo: 97,
    pointsLeftToDoIfEverythingIsValidated: 22,
  },
  {
    name: "12",
    expectedPointsDone: 0,
    pointsLeftToDo: 22,
    pointsLeftToDoIfEverythingIsValidated: 0,
  },
  {
    name: "13",
    expectedPointsDone: 0,
    pointsLeftToDo: 22,
    pointsLeftToDoIfEverythingIsValidated: 0,
  },
  {
    name: "14",
    expectedPointsDone: 0,
    pointsLeftToDo: 22,
    pointsLeftToDoIfEverythingIsValidated: 0,
  },
  {
    name: "15",
    expectedPointsDone: 0,
    pointsLeftToDo: 22,
    pointsLeftToDoIfEverythingIsValidated: 0,
  },
  {
    name: "16",
    expectedPointsDone: 0,
    pointsLeftToDo: 22,
    pointsLeftToDoIfEverythingIsValidated: 0,
  },
  {
    name: "19",
    expectedPointsDone: 0,
    pointsLeftToDo: 22,
    pointsLeftToDoIfEverythingIsValidated: 0,
  },
  {
    name: "20",
    expectedPointsDone: 0,
    pointsLeftToDo: 22,
    pointsLeftToDoIfEverythingIsValidated: 0,
  },
  {
    name: "21",
    expectedPointsDone: 0,
    pointsLeftToDo: 22,
    pointsLeftToDoIfEverythingIsValidated: 0,
  },
  {
    name: "22",
    expectedPointsDone: 0,
    pointsLeftToDo: 22,
    pointsLeftToDoIfEverythingIsValidated: 0,
  },
];
