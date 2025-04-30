import { Pokemon } from "@/types/pokemon.type";
import { Button } from "./Button";

interface PokemonCardProps {
  pokemon: Pokemon;
  handlePokemonVote: (id: number) => Promise<void>;
}

export const PokemonCard = ({
  pokemon,
  handlePokemonVote,
}: PokemonCardProps) => {
  return (
    <div className="flex flex-col border-1 border-solid border-gray-600 h-10/12 w-80 group hover:border-white max-lg:w-2/3 max-sm:w-full">
      <div className="w-full h-4/5 overflow-hidden">
        <img
          className="h-full w-full group-hover:scale-105 transition-transform duration-900"
          src={`${import.meta.env.PINATA_GATEWAY}/ipfs/${pokemon.ipfsHash}`}
          alt={`${pokemon.name} image url`}
        />
      </div>
      <div className="h-1/5">
        <div className="text-lg font-bold p-2 group-hover:text-light-primary h-6/12">
          {pokemon.name}
        </div>
        <div className="flex border-t-1 border-solid border-gray-600 p-2 justify-between h-6/12">
          <div className="flex flex-col">
            <span className="text-gray-600">Total votes</span>
            <span>{pokemon.votes}</span>
          </div>
          <div className="h-10 w-px bg-gray-600 mx-4 my-1" />
          <Button
            text="Vote"
            type="button"
            className="bg-primary border-1 border-solid border-white hover:bg-light-primary px-8"
            onClick={() => handlePokemonVote(pokemon.id)}
          />
        </div>
      </div>
    </div>
  );
};
