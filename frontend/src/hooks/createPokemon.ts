import { ContractTransactionResponse, JsonRpcSigner } from "ethers";
import { getContract } from "./getContract";

export const createPokemon = async (
  signer: JsonRpcSigner,
  pokemonName: string,
  ipfsHash: string,
) => {
  let success;

  try {
    const contract = getContract(signer);
    const transaction: Promise<ContractTransactionResponse> =
      await contract.createPokemon(pokemonName, ipfsHash);
    const receipt = await (await transaction).wait();

    success = receipt?.status === 1;
  } catch {
    success = false;
  }

  return success;
};
