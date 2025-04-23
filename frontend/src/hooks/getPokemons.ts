import { Pokemon } from "@/types/pokemon.type";
import { getContract } from "./getContract";

export const getPokemons = async () => {
  const contract = getContract();
  const totalPokemons = Number(await contract.totalPokemons()) + 1;
  const pokemons: Pokemon[] = [];

  for (let index = 1; index < totalPokemons; index++) {
    const pokemon = await contract.getPokemonById(index);
    pokemons.push(pokemon);
  }

  return pokemons;
};
