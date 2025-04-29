import { ContractTransactionResponse, JsonRpcSigner } from "ethers";
import { getContract } from "./getContract";

export const registerVoter = async (
  signer: JsonRpcSigner,
  voterAddress: string,
  voterName: string,
  ipfsHash: string,
) => {
  let success;

  try {
    const contract = getContract(signer);
    const transaction: Promise<ContractTransactionResponse> =
      await contract.registerVoter(voterAddress, voterName, ipfsHash);
    const receipt = await (await transaction).wait();

    success = receipt?.status === 1;
  } catch {
    success = false;
  }

  return success;
};
