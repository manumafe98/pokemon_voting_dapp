// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

error PokemonVotingDapp__NotOwner();
error PokemonVotingDapp__VoterAlreadyRegistered();
error PokemonVotingDapp__PleaseRegisterAWalletYouOwn();
error PokemonVotingDapp__YouAlreadyVoted();
error PokemonVotingDapp__ToVoteYouHaveToBeRegistered();

contract PokemonVotingDapp {

    address immutable i_owner;
    uint256 private s_totalPokemons;

    struct Pokemon {
        uint256 id;
        string name;
        string ipfsHash;
        uint256 votes;
        address[] pokemonVoters;
    }

    struct Voter {
        address _address;
        string name;
        string ipfsHash;
        bool isAllowedToVote;
        bool hasVoted;
        uint256 vote;
    }

    event CreatePokemon(
        uint256 indexed id,
        string name,
        string ipfsHash,
        uint256 votes,
        address[] pokemonVoters
    );

    event RegisterVoter(
        address indexed _address,
        string name,
        string ipfsHash,
        bool isAllowedToVote,
        bool hasVoted,
        uint256 vote
    );

    mapping(uint256 => Pokemon) private pokemons;
    mapping(address => Voter) private voters;
    mapping(address => bool) private isRegistered;

    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert PokemonVotingDapp__NotOwner();
        }
        _;
    }

    constructor() {
        i_owner = msg.sender;
    }

    function createPokemon(string memory _name, string memory _ipfsHash) external onlyOwner {
        uint256 totalPokemons = s_totalPokemons += 1;

        Pokemon storage pokemon = pokemons[totalPokemons];
        pokemon.id = totalPokemons;
        pokemon.name = _name;
        pokemon.ipfsHash = _ipfsHash;
        pokemon.votes = 0;

        emit CreatePokemon(totalPokemons, _name, _ipfsHash, pokemon.votes, pokemon.pokemonVoters);
    }

    function getPokemonById(uint256 _id) external view returns(Pokemon memory) {
        return pokemons[_id];
    }

    function registerVoter(address _address, string memory _name, string memory _ipfsHash) external {
        if(msg.sender != _address) {
            revert PokemonVotingDapp__PleaseRegisterAWalletYouOwn();
        }
        if (isRegistered[_address]) {
            revert PokemonVotingDapp__VoterAlreadyRegistered();
        }

        Voter storage voter = voters[_address];
        voter._address = _address;
        voter.name = _name;
        voter.ipfsHash = _ipfsHash;
        voter.isAllowedToVote = true;
        voter.hasVoted = false;
        voter.vote = 0;

        isRegistered[msg.sender] = true;

        emit RegisterVoter(msg.sender, _name, _ipfsHash, voter.isAllowedToVote, voter.hasVoted, voter.vote);
    }

    function getVoterByAddress(address _address) external view returns(Voter memory) {
        return voters[_address];
    }

    function votePokemon(uint256 _id) external {
        Voter storage voter = voters[msg.sender];

        if(!isRegistered[msg.sender]) {
            revert PokemonVotingDapp__ToVoteYouHaveToBeRegistered();
        }
        if (!voter.isAllowedToVote) {
            revert PokemonVotingDapp__YouAlreadyVoted();
        }

        Pokemon storage pokemon = pokemons[_id];
        pokemon.votes += 1;
        pokemon.pokemonVoters.push(msg.sender);

        voter.hasVoted = true;
        voter.isAllowedToVote = false;
        voter.vote = _id;
    }

    function getOwner() external view returns(address) {
        return i_owner;
    }

    function getTotalPokemons() external view returns(uint256) {
        return s_totalPokemons;
    }

    function getIsRegistered(address _address) external view returns(bool) {
        return isRegistered[_address];
    }
}
