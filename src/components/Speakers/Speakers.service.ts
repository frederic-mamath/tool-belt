import { ClearstreamUserOutboundDto } from "generated/model";

export const getCheckedWorkers = (workers: ClearstreamUserOutboundDto[]) => {
  return workers.filter((worker) => {
    if (worker.isOff) {
      return true;
    }

    // @debt fred "this should be saved in DB"
    // if (!worker.isEnabledByDefault) {
    //   return true;
    // }

    return false;
  });
};

export const getFilteredSpeakers = (
  workers: ClearstreamUserOutboundDto[],
  filteredWorkerIds: string[]
) => {
  return workers.filter((worker) => !filteredWorkerIds.includes(worker.id));
};
