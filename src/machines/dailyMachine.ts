import { WORKERS, Worker } from "mocks/workers";
import { createMachine } from "xstate";

export const PICK_PARTICIPANTS_STATE = "PICK_PARTICIPANTS";
export const ON_GOING_STATE = "ON_GOING";
export const QUESTION_STATE = "QUESTION";
export const END_STATE = "END";

export const NEXT_EVENT = "NEXT";
export const QUESTION_EVENT = "QUESTION";
export const RESUME_EVENT = "RESUME";

export const dailyMachine = createMachine({
  id: "daily",
  initial: PICK_PARTICIPANTS_STATE,
  context: {
    users: WORKERS,
    orderedSpeakers: [],
    validatedSpeakers: [],
    currentSpeakerId: null,
    nextSpeakerId: null,
  } as {
    users: Worker[];
    orderedSpeakers: Worker[];
    validatedSpeakers: Worker[];
    currentSpeakerId: string | null;
    nextSpeakerId: string | null;
  },
  states: {
    [PICK_PARTICIPANTS_STATE]: {
      on: {
        [NEXT_EVENT]: { target: ON_GOING_STATE },
      },
    },
    [ON_GOING_STATE]: {
      on: {
        [QUESTION_EVENT]: { target: QUESTION_STATE },
      },
    },
    [QUESTION_STATE]: {
      on: {
        [RESUME_EVENT]: { target: ON_GOING_STATE },
        [NEXT_EVENT]: { target: END_STATE },
      },
    },
    [END_STATE]: {
      type: "final",
    },
  },
});
