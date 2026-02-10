import { getEnv } from "./env";
import { makeWorkerUtils, type WorkerUtils } from "graphile-worker";

const globalForWorkerUtils = globalThis as unknown as {
  workerUtils?: WorkerUtils;
  workerUtilsPromise?: Promise<WorkerUtils>;
};

export async function getWorkerUtils(): Promise<WorkerUtils> {
  if (!globalForWorkerUtils.workerUtilsPromise) {
    const env = getEnv();
    globalForWorkerUtils.workerUtilsPromise = makeWorkerUtils({
      connectionString: env.DATABASE_URL,
    }).then((utils) => {
      if (process.env.NODE_ENV !== "production")
        globalForWorkerUtils.workerUtils = utils;
      return utils;
    });
  }
  return globalForWorkerUtils.workerUtilsPromise;
}
