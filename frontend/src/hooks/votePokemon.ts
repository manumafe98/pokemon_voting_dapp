import { ContractTransactionResponse, JsonRpcSigner } from "ethers";
import { getContract } from "./getContract";

export const votePokemon = async (signer: JsonRpcSigner, pokemonId: number) => {
  let success;

  try {
    const contract = getContract(signer);
    const transaction: Promise<ContractTransactionResponse> =
      await contract.votePokemon(pokemonId);
    const receipt = await (await transaction).wait();

    success = receipt?.status === 1;
  } catch {
    success = false;
  }

  return success;
};
