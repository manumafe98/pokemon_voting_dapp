// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract PokemonVotingDapp {

    address public owner;
    uint256 public totalPokemons;
    uint256 public totalVoters;

    struct Pokemon {
        uint256 id;
        string name;
        string image;
        string ipfs;
        uint256 votes;
    }

    struct Voter {
        uint256 id;
        string name;
        string image;
        string ipfs;
        address _address;
        bool isAllowedToVote;
        bool hasVoted;
        uint256 vote;
    }

    event CreatePokemon(
        uint256 indexed id,
        string name,
        string image,
        string ipfs,
        uint256 votes
    );

    event RegisterVoter(
        uint256 indexed id,
        string name,
        string image,
        string ipfs,
        address _address,
        bool isAllowedToVote,
        bool hasVoted,
        uint256 vote
    );

    mapping(uint256 => Pokemon) pokemons;
    mapping(uint256 => Voter) voters;

    constructor() {
        owner = msg.sender;
    }
}
