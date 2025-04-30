import { getContract } from "./getContract";

export const getIsRegistered = async (
  walletAddress: string,
): Promise<boolean> => {
  const contract = getContract();
  try {
    return await contract.getIsRegistered(walletAddress);
  } catch (error) {
    return false;
  }
};
