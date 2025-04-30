import { Layout } from "@/components/Layout";
import { PokemonCard } from "@/components/PokemonCard";
import { PopUpNotification } from "@/components/PopUpNotification";
import { useAuth } from "@/context/AuthProvider";
import { getPokemons } from "@/hooks/getPokemons";
import { useNotification } from "@/hooks/useNotification";
import { votePokemon } from "@/hooks/votePokemon";
import { Pokemon } from "@/types/pokemon.type";
import { JsonRpcSigner } from "ethers";
import { useEffect, useState } from "react";

export const Home = () => {
  const { signer, isConnected, isRegistered, voterData, refreshVoterState } =
    useAuth();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const {
    showPopUpNotification,
    notificationMessage,
    notificationType,
    showNotification,
  } = useNotification();

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    const newPokemons = await getPokemons();
    setPokemons(newPokemons);
  };

  const handlePokemonVote = async (id: number) => {
    if (voterData?.hasVoted) {
      showNotification("You already voted", "error");
      return;
    }

    if (!isConnected) {
      showNotification(
        "You have to be connected and registered to vote",
        "error",
      );
      return;
    }
    if (!isRegistered) {
      showNotification("You have to be registered to vote", "error");
      return;
    }

    const success = await votePokemon(signer as JsonRpcSigner, id);
    if (success) {
      fetchPokemons();
      refreshVoterState();
      showNotification("Your vote was sucessfull", "success");
    } else {
      showNotification("Something went wrong", "error");
    }
  };

  return (
    <Layout>
      <div className="grid grid-rows-2 grid-cols-3 max-xl:grid-rows-3 max-xl:grid-cols-2 max-lg:grid-cols-1 place-items-center h-full p-10 gap-4 text-white max-md:p-5 max-md:gap-0">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            handlePokemonVote={handlePokemonVote}
          />
        ))}
      </div>
      {showPopUpNotification && (
        <PopUpNotification
          message={notificationMessage}
          type={notificationType}
        />
      )}
    </Layout>
  );
};
