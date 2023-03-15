import { create } from "zustand";

import { TeamUserOutboundDto } from "generated/model";

interface DailyStoreState {
  users: TeamUserOutboundDto[];
  orderedSpeakers: TeamUserOutboundDto[];
  validatedSpeakers: TeamUserOutboundDto[];
  currentSpeakerId: string | null;
  nextSpeakerId: string | null;
  setValidatedSpeakers: VoidFunction;
}

export const useDailyStore = create<DailyStoreState>((set) => ({
  users: [],
  validatedSpeakers: [],
  setValidatedSpeakers: () => {
    set(() => ({
      validatedSpeakers: [],
    }));
  },
  orderedSpeakers: [],
  currentSpeakerId: null,
  nextSpeakerId: null,
}));
