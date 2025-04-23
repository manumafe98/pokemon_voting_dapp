import abi from "@/assets/abi/PokemonVotingDapp.json";
import config from "@/config.json";
import { Contract, ContractRunner } from "ethers";
import { getProvider } from "./getProvider";

export const getContract = (runner?: ContractRunner) => {
  if (!runner) {
    runner = getProvider();
  }
  return new Contract(config[31337].PokemonVotingDapp.address, abi, runner);
};
