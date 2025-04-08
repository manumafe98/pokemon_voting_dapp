// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract PokemonVotingDapp {

    address public owner;
    uint256 public totalPokemons;

    struct Pokemon {
        uint256 id;
        string name;
        string image;
        string ipfs;
        uint256 votes;
        address[] pokemonVoters;
    }

    struct Voter {
        address _address;
        string name;
        string image;
        string ipfs;
        bool isAllowedToVote;
        bool hasVoted;
        uint256 vote;
    }

    event CreatePokemon(
        uint256 indexed id,
        string name,
        string image,
        string ipfs,
        uint256 votes,
        address[] pokemonVoters
    );

    event RegisterVoter(
        address indexed _address,
        string name,
        string image,
        string ipfs,
        bool isAllowedToVote,
        bool hasVoted,
        uint256 vote
    );

    mapping(uint256 => Pokemon) pokemons;
    mapping(address => Voter) voters;
    mapping(address => bool) isRegistered;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createPokemon(string memory _name, string memory _image, string memory _ipfs) public onlyOwner {
        totalPokemons += 1;

        Pokemon storage pokemon = pokemons[totalPokemons];
        pokemon.id = totalPokemons;
        pokemon.name = _name;
        pokemon.image = _image;
        pokemon.ipfs = _ipfs;
        pokemon.votes = 0;

        emit CreatePokemon(totalPokemons, _name, _image, _ipfs, pokemon.votes, pokemon.pokemonVoters);
    }

    function getPokemonById(uint256 _id) public view returns(Pokemon memory) {
        return pokemons[_id];
    }

    function registerVoter(address _address, string memory _name, string memory _image, string memory _ipfs) external {
        require(msg.sender == _address, "Please registered a wallet you own");
        require(!isRegistered[_address], "Voter already registered");

        Voter storage voter = voters[_address];
        voter._address = _address;
        voter.name = _name;
        voter.image = _image;
        voter.ipfs = _ipfs;
        voter.isAllowedToVote = true;
        voter.hasVoted = false;
        voter.vote = 0;

        isRegistered[msg.sender] = true;

        emit RegisterVoter(msg.sender, _name, _image, _ipfs, voter.isAllowedToVote, voter.hasVoted, voter.vote);
    }

    function getVoterByAddress(address _address) public view returns(Voter memory) {
        return voters[_address];
    }

    function votePokemon(uint256 _id) public {
        Voter storage voter = voters[msg.sender];

        require(isRegistered[msg.sender], "To vote you have to be registered");
        require(voter.isAllowedToVote, "You already voted");

        Pokemon storage pokemon = pokemons[_id];
        pokemon.votes += 1;
        pokemon.pokemonVoters.push(msg.sender);

        voter.hasVoted = true;
        voter.isAllowedToVote = false;
        voter.vote = _id;
    }
}
