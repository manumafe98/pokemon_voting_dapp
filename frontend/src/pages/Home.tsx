import { Button } from "@/components/Button";
import { Layout } from "@/components/Layout";
import { getPokemons } from "@/hooks/getPokemons";
import { Pokemon } from "@/types/pokemon.type";
import { useEffect, useState } from "react";

export const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const newPokemons = await getPokemons();
      setPokemons(newPokemons);
    };
    fetchPokemons();
  }, []);

  return (
    <Layout>
      <div className="grid grid-rows-2 grid-cols-3 place-items-center h-full p-10 gap-4 text-white">
        {pokemons.map((pokemon, index) => (
          <div
            key={index}
            className="flex flex-col border-1 border-solid border-gray-600 h-10/12 w-80 group hover:border-white"
          >
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
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
