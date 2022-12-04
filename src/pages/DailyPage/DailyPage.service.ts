import { DateTime, Duration } from "luxon";

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
