import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("PokemonVotingDapp", (module) => {
  const pokemonVotingDapp = module.contract("PokemonVotingDapp");

  return { pokemonVotingDapp };
});
