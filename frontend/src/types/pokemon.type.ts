export interface Pokemon {
  id: number;
  name: string;
  image: string;
  ipfsHash: string;
  votes: number;
  pokemonVoters: string[];
}
