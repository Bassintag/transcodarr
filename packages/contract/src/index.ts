import { fileContract, jobContract, mediaContract } from "./contracts";
import { configContract } from "./contracts/config";

export * from "./schemas";

export const contract = {
  config: configContract,
  file: fileContract,
  job: jobContract,
  media: mediaContract,
};
