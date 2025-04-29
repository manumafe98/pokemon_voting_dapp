import { Button } from "@/components/Button";
import { Layout } from "@/components/Layout";
import { PopUpNotification } from "@/components/PopUpNotification";
import { useAuth } from "@/context/AuthProvider";
import { getPokemons } from "@/hooks/getPokemons";
import { votePokemon } from "@/hooks/votePokemon";
import { NotificationType } from "@/types/notification.type";
import { Pokemon } from "@/types/pokemon.type";
import { JsonRpcSigner } from "ethers";
import { useEffect, useState } from "react";

export const Home = () => {
  const { signer, isConnected, isRegistered } = useAuth();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("error");
  const [showPopUpNotification, setShowPopUpNotification] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      const newPokemons = await getPokemons();
      setPokemons(newPokemons);
    };
    fetchPokemons();
  }, []);

  const popUpHelper = (message: string, status: NotificationType) => {
    setNotificationMessage(message);
    setNotificationType(status);
    setShowPopUpNotification(true);
    setTimeout(() => setShowPopUpNotification(false), 4000);
  };

  const handlePokemonVote = async (id: number) => {
    if (!isConnected) {
      popUpHelper("You have to be connected and registered to vote", "error");
      return;
    }
    if (!isRegistered) {
      popUpHelper("You have to be registered to vote", "error");
      return;
    }

    const success = await votePokemon(signer as JsonRpcSigner, id);
    if (success) {
      popUpHelper("Your vote was sucessfull", "success");
    } else {
      popUpHelper("Something went wrong", "error");
    }
  };

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
                  onClick={() => handlePokemonVote(pokemon.id)}
                />
              </div>
            </div>
          </div>
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
