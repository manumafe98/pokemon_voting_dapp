import { expect } from "chai";
import { ContractTransactionResponse, Signer, Wallet } from "ethers";
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
    let pokemonTransaction: ContractTransactionResponse;

    beforeEach(async () => {
      pokemonTransaction = await pokemonVotingDapp
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
      expect(pokemon.pokemonVoters).to.deep.equal([]);
    });

    it("Updates pokemon count", async () => {
      const totalPokemons = await pokemonVotingDapp.totalPokemons();
      expect(totalPokemons).to.equal(1);
    });

    it("Transaction emits CreatePokemon event", async () => {
      expect(pokemonTransaction).to.emit(pokemonVotingDapp, "CreatePokemon");
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
      expect(
        pokemonVotingDapp
          .connect(buyer)
          .registerVoter(randomWallet, VOTER_NAME, VOTER_IMAGE, VOTER_IPFS),
      ).to.revertedWith("Please registered a wallet you own");
    });
  });

  describe("Test vote pokemon", () => {
    beforeEach(async function () {
      if (this.currentTest?.title === "Voter non registered") return;

      const voterTransaction = await pokemonVotingDapp
        .connect(buyer)
        .registerVoter(buyer, VOTER_NAME, VOTER_IMAGE, VOTER_IPFS);

      const voteTransaction = await pokemonVotingDapp
        .connect(buyer)
        .votePokemon(1);

      await voterTransaction.wait();
      await voteTransaction.wait();
    });

    it("Voter non registered", async () => {
      expect(pokemonVotingDapp.connect(buyer).votePokemon(1)).to.revertedWith(
        "To vote you have to be registered",
      );
    });

    it("Check vote was sucessfull", async () => {
      const voter = await pokemonVotingDapp.getVoterByAddress(buyer);
      const pokemon = await pokemonVotingDapp.getPokemonById(1);

      expect(pokemon.votes).to.equal(1);
      expect(pokemon.pokemonVoters).to.deep.equal([await buyer.getAddress()]);
      expect(voter.hasVoted).to.equal(true);
      expect(voter.isAllowedToVote).to.equal(false);
      expect(voter.vote).to.equal(1);
    });

    it("User try to vote again", async () => {
      expect(pokemonVotingDapp.connect(buyer).votePokemon(1)).to.revertedWith(
        "You already voted",
      );
    });

    it("Test other voter", async () => {
      const registerDeployer = await pokemonVotingDapp
        .connect(deployer)
        .registerVoter(deployer, VOTER_NAME, VOTER_IMAGE, VOTER_IPFS);
      const otherUserTransaction = await pokemonVotingDapp
        .connect(deployer)
        .votePokemon(1);

      await registerDeployer.wait();
      await otherUserTransaction.wait();

      const pokemon = await pokemonVotingDapp.getPokemonById(1);

      expect(pokemon.votes).to.equal(2);
      expect(pokemon.pokemonVoters.length).to.equal(2);
    });
  });
});
