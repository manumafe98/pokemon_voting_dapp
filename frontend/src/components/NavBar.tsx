import default_image from "@/assets/images/default_profile.webp";
import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { ImageProfile } from "./ImageProfile";
import { LoggedMenu } from "./LoggedMenu";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>(default_image);
  const navigate = useNavigate();
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

  useEffect(() => {
    setProfileImage(
      isRegistered
        ? `${import.meta.env.PINATA_GATEWAY}/ipfs/${voterData?.ipfsHash}`
        : default_image,
    );
  }, [isRegistered]);

  const navigateToPath = (path: string) => {
    navigate(path);
  };

  const menuOptions = [
    {
      name: "[Vote]",
      onClick: () => navigateToPath("/"),
      onlyOwner: false,
    },
    {
      name: "[Register]",
      onClick: () => navigateToPath("/register"),
      onlyOwner: false,
    },
    {
      name: "[Admin]",
      onClick: () => navigateToPath("/admin"),
      onlyOwner: true,
    },
  ];

  if (!isReady) {
    return <div className="bg-background h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-between items-center bg-background h-28 text-white px-10 border-b-1 border-solid border-white max-sm:px-5">
      <h1
        className="text-3xl cursor-pointer w-96 max-sm:text-2xl"
        onClick={() => navigateToPath("/")}
      >
        [PokemonVotingDapp]
      </h1>
      <ul className="flex gap-2 text-lg">
        {menuOptions.map((option, index) => {
          if (option.onlyOwner && !isOwner) {
            return null;
          }

          return (
            <li
              key={index}
              className="cursor-pointer hover:scale-105 transition-transform duration-500"
              onClick={option.onClick}
            >
              {option.name}
            </li>
          );
        })}
      </ul>
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
              <LoggedMenu
                address={address as string}
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                disconnect={() => {
                  disconnect();
                  setIsMenuOpen(false);
                }}
              />
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
    </div>
  );
};
