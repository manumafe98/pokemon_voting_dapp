import { JsonRpcSigner } from "ethers";
import { getContract } from "./getContract";

export const createPokemon = async (
  signer: JsonRpcSigner,
  pokemonName: string,
  ipfsHash: string,
) => {
  const contract = getContract(signer);
  await contract.createPokemon(pokemonName, ipfsHash);
};
