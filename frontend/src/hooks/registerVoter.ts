import { JsonRpcSigner } from "ethers";
import { getContract } from "./getContract";

export const registerVoter = async (
  signer: JsonRpcSigner,
  voterAddress: string,
  voterName: string,
  ipfsHash: string,
) => {
  const contract = getContract(signer);
  await contract.registerVoter(voterAddress, voterName, ipfsHash);
};
