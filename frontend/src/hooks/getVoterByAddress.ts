import { Voter } from "@/types/voter.type";
import { getContract } from "./getContract";

export const getVoterByAddress = async (
  voterAddress: string,
): Promise<Voter> => {
  const contract = getContract();
  return await contract.getVoterByAddress(voterAddress);
};
