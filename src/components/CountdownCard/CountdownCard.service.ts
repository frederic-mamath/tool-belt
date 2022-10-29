import { DateTime, Duration } from "luxon";

interface Stopwatch {
  from: DateTime;
  now: DateTime;
  duration: Duration | null;
  isRunning: boolean;
}

export const startDuration = (): Stopwatch => {
  return {
    from: DateTime.local(),
    now: DateTime.local(),
    duration: null,
    isRunning: true,
  };
};

export const play = (stopwatch: Stopwatch): Stopwatch => {
  return {
    from: DateTime.local(),
    now: DateTime.local(),
    duration: stopwatch.duration,
    isRunning: true,
  };
};

export const pause = (stopwatch: Stopwatch): Stopwatch => {
  return {
    from: stopwatch.from,
    now: stopwatch.now,
    duration: stopwatch.duration,
    isRunning: false,
  };
};

export const reset = (stopwatch: Stopwatch): Stopwatch => {
  const now = DateTime.local();

  return {
    from: now,
    now,
    duration: Duration.fromObject(now.diff(now).toObject()),
    isRunning: false,
  };
};

export const updateDuration = (stopwatch: Stopwatch) => {
  const now = DateTime.local();

  return {
    from: stopwatch.from,
    now,
    duration: Duration.fromObject(now.diff(stopwatch.from).toObject()),
  };
};
