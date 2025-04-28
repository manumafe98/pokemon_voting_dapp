import { Pokemon } from "@/types/pokemon.type";
import { getContract } from "./getContract";

export const getPokemonById = async (pokemonId: number): Promise<Pokemon> => {
  const contract = getContract();
  return await contract.getPokemonById(pokemonId);
};
