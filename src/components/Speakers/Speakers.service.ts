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
