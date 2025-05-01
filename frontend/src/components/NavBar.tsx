import { Menu } from "@/assets/icons/Menu";
import default_image from "@/assets/images/default_profile.webp";
import { useAuth } from "@/context/AuthProvider";
import { getPokemonById } from "@/hooks/getPokemonById";
import { navigateToPath } from "@/hooks/navigateToPath";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { ImageProfile } from "./ImageProfile";
import { LoggedMenu } from "./LoggedMenu";
import { Navigation } from "./Navigation";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const showMenuIcon = useWindowSize();
  const [profileImage, setProfileImage] = useState<string>(default_image);
  const [pokemonName, setPokemonName] = useState<string>("-");
  const {
    connect,
    disconnect,
    isConnected,
    address,
    isReady,
    isOwner,
    isRegistered,
    voterData,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshUserData = async () => {
      if (isRegistered && voterData?.ipfsHash) {
        setProfileImage(
          `${import.meta.env.PINATA_GATEWAY}/ipfs/${voterData.ipfsHash}`,
        );
      } else {
        setProfileImage(default_image);
      }

      if (voterData?.hasVoted && voterData?.vote) {
        const name = (await getPokemonById(voterData.vote)).name;
        setPokemonName(name);
      }
    };

    refreshUserData();
  }, [isMenuOpen, isRegistered, voterData]);

  const LoggedMenuWrapper = () => (
    <LoggedMenu
      isMenuIconOn={showMenuIcon}
      address={address as string}
      isOpen={isMenuOpen}
      isOwner={isOwner}
      isConnected={isConnected}
      voterData={voterData}
      pokemonName={pokemonName}
      profileImage={profileImage}
      onClose={() => setIsMenuOpen(false)}
      connect={connect}
      disconnect={() => {
        disconnect();
        setIsMenuOpen(false);
      }}
    />
  );

  if (!isReady) {
    return <div className="bg-background h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-between items-center bg-background h-28 text-white px-10 border-b-1 border-solid border-white max-sm:px-5">
      <h1
        className="text-3xl cursor-pointer w-96 max-sm:text-2xl"
        onClick={() => navigateToPath(navigate, "/")}
      >
        [PokemonVotingDapp]
      </h1>
      {showMenuIcon ? (
        <>
          <Menu onClick={() => setIsMenuOpen(true)} />
          <LoggedMenuWrapper />
        </>
      ) : (
        <>
          <Navigation showMenuIcon={showMenuIcon} isOwner={isOwner} />
          {isReady ? (
            <div className="flex justify-end w-96">
              {isConnected ? (
                <>
                  <ImageProfile
                    imageUrl={profileImage}
                    imageAlt={`${voterData?.name} profile image`}
                    className="w-16 h-16 cursor-pointer rounded-full hover:scale-105 duration-300 transform"
                    onClick={() => setIsMenuOpen(true)}
                  />
                  <LoggedMenuWrapper />
                </>
              ) : (
                <Button
                  text="Connect Wallet"
                  type="button"
                  className="bg-primary border-1 border-solid border-white hover:bg-light-primary p-4"
                  onClick={connect}
                />
              )}
            </div>
          ) : (
            <div className="w-96" />
          )}
        </>
      )}
    </div>
  );
};
