import { getContract } from "./getContract";

export const getOwnerWallet = async (): Promise<string> => {
  const contract = getContract();

  return await contract.owner();
};
