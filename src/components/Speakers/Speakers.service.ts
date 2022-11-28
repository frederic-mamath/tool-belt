import { Worker } from "mocks/workers";

export const getCheckedWorkers = (workers: Worker[]) => {
  return workers.filter((worker) => {
    if (worker.isOff) {
      return true;
    }

    if (!worker.isEnabledByDefault) {
      return true;
    }

    return false;
  });
};

export const getFilteredSpeakers = (
  workers: Worker[],
  filteredWorkerIds: string[]
) => {
  return workers.filter((worker) => !filteredWorkerIds.includes(worker.id));
};
