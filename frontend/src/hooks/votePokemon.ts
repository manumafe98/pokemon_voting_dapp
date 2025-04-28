import { JsonRpcSigner } from "ethers";
import { getContract } from "./getContract"

export const votePokemon = async (signer: JsonRpcSigner, pokemonId: number) => {
  const contract = getContract(signer);
  await contract.votePokemon(pokemonId);
}
