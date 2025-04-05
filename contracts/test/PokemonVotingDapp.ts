import { expect } from "chai";
import { Signer } from "ethers";
import hre from "hardhat";
import { PokemonVotingDapp } from "../typechain-types";

describe("PokemonVotingDapp", () => {
  let pokemonVotingDapp: PokemonVotingDapp;
  let deployer: Signer, buyer: Signer;

  beforeEach(async () => {
    [deployer, buyer] = await hre.ethers.getSigners();

    const PokemonVotingDappFactory =
      hre.ethers.getContractFactory("PokemonVotingDapp");
    pokemonVotingDapp = await (await PokemonVotingDappFactory).deploy();
  });

  describe("Deployment", () => {
    it("Sets the owner", async () => {
      expect(await pokemonVotingDapp.owner()).to.equal(
        await deployer.getAddress(),
      );
    });
  });
});
