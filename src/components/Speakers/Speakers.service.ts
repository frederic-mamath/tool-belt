import { ClearstreamUserOutboundDto } from "generated/model";

export const getCheckedWorkers = (workers: ClearstreamUserOutboundDto[]) => {
  return workers.filter((worker) => {
    if (worker.isOff) {
      return true;
    }

    if (worker.isRegularSpeakersForDailies) {
      return false;
    }

    return true;
  });
};

export const getFilteredSpeakers = (
  workers: ClearstreamUserOutboundDto[],
  filteredWorkerIds: string[]
) => {
  return workers.filter((worker) => !filteredWorkerIds.includes(worker.id));
};
