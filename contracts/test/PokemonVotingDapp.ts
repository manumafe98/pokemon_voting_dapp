import { expect } from "chai";
import { Signer, Wallet } from "ethers";
import hre from "hardhat";
import { PokemonVotingDapp } from "../typechain-types";

const POKEMON_NAME = "Lugia";
const POKEMON_IMAGE = "https://lugia.image.example";
const POKEMON_IPFS = "abcd";

const VOTER_NAME = "Manumafe";
const VOTER_IMAGE = "https://profile.manumafe.image";
const VOTER_IPFS = "efgjk";

describe("PokemonVotingDapp", () => {
  let pokemonVotingDapp: PokemonVotingDapp;
  let deployer: Signer, buyer: Signer;

  beforeEach(async () => {
    [deployer, buyer] = await hre.ethers.getSigners();

    const PokemonVotingDappFactory =
      hre.ethers.getContractFactory("PokemonVotingDapp");
    pokemonVotingDapp = await (await PokemonVotingDappFactory).deploy();
  });

  describe("Test Deployment", () => {
    it("Sets the owner", async () => {
      expect(await pokemonVotingDapp.owner()).to.equal(
        await deployer.getAddress(),
      );
    });
  });

  describe("Test Pokemon tasks", () => {
    beforeEach(async () => {
      const pokemonTransaction = await pokemonVotingDapp
        .connect(deployer)
        .createPokemon(POKEMON_NAME, POKEMON_IMAGE, POKEMON_IPFS);

      await pokemonTransaction.wait();
    });

    it("Returns pokemon attributes", async () => {
      const pokemon = await pokemonVotingDapp.getPokemonById(1);
      expect(pokemon.id).to.equal(1);
      expect(pokemon.name).to.equal(POKEMON_NAME);
      expect(pokemon.image).to.equal(POKEMON_IMAGE);
      expect(pokemon.ipfs).to.equal(POKEMON_IPFS);
    });

    it("Updates pokemon count", async () => {
      const totalPokemons = await pokemonVotingDapp.totalPokemons();
      expect(totalPokemons).to.equal(1);
    });
  });

  describe("Test Voter tasks", () => {
    beforeEach(async () => {
      const voterTransaction = await pokemonVotingDapp
        .connect(buyer)
        .registerVoter(buyer, VOTER_NAME, VOTER_IMAGE, VOTER_IPFS);

      await voterTransaction.wait();
    });

    it("Returns voter attributes", async () => {
      const voter = await pokemonVotingDapp.getVoterByAddress(buyer);
      expect(voter._address).to.equal(buyer);
      expect(voter.name).to.equal(VOTER_NAME);
      expect(voter.image).to.equal(VOTER_IMAGE);
    });

    it("Test re register fails", async () => {
      await expect(
        pokemonVotingDapp
          .connect(buyer)
          .registerVoter(buyer, VOTER_NAME, VOTER_IMAGE, VOTER_IPFS),
      ).to.revertedWith("Voter already registered");
    });

    it("Test try to register a wallet not owned", async () => {
      const randomWallet = Wallet.createRandom();
      await expect(
        pokemonVotingDapp
          .connect(buyer)
          .registerVoter(randomWallet, VOTER_NAME, VOTER_IMAGE, VOTER_IPFS),
      ).to.revertedWith("Please registered a wallet you own");
    })
  });
});
