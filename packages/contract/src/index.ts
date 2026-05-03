import {
  clientContract,
  fileContract,
  jobContract,
  mediaContract,
  taskContract,
} from "./contracts";
import { configContract } from "./contracts/config";

export * from "./schemas";

export const contract = {
  client: clientContract,
  config: configContract,
  file: fileContract,
  job: jobContract,
  media: mediaContract,
  task: taskContract,
};
