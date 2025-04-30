import { Arrow } from "@/assets/icons/Arrow";
import { Copy } from "@/assets/icons/Copy";
import { X } from "@/assets/icons/X";
import default_image from "@/assets/images/default_profile.webp";
import { useAuth } from "@/context/AuthProvider";
import { getPokemonById } from "@/hooks/getPokemonById";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { ImageProfile } from "./ImageProfile";
import { VoterInformation } from "./VoterInformation";

interface LoggedMenuProps {
  address: string;
  isOpen: boolean;
  isMenuIconOn: boolean;
  isOwner: boolean;
  onClose: () => void;
  disconnect: () => void;
  connect: () => void;
}

export const LoggedMenu = ({
  address,
  isOpen,
  isMenuIconOn,
  isOwner,
  onClose,
  disconnect,
  connect,
}: LoggedMenuProps) => {
  const { isRegistered, voterData } = useAuth();
  const displayedAddress = !isMenuIconOn
    ? `${address.substring(0, 5)}...${address.substring(address.length - 4)}`
    : "";
  const [pokemonName, setPokemonName] = useState<string>("-");
  const [profileImage, setProfileImage] = useState<string>(default_image);
  const navigate = useNavigate();

  const copyAddressToClipboard = async () => {
    await navigator.clipboard.writeText(address);
  };

  useEffect(() => {
    const refreshUserData = async () => {
      if (voterData?.hasVoted && voterData?.vote) {
        const name = (await getPokemonById(voterData?.vote)).name;
        setPokemonName(name);
      }
      setProfileImage(
        isRegistered
          ? `${import.meta.env.PINATA_GATEWAY}/ipfs/${voterData?.ipfsHash}`
          : default_image,
      );
    };
    refreshUserData();
  }, [isOpen]);

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

  return (
    <div
      className={`fixed top-0 right-0 ${isMenuIconOn ? "w-2/4" : "w-1/4"} h-screen p-4 bg-background border-l-1 border-solid border-white ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-1`}
    >
      {isMenuIconOn ? (
        <>
          <Button
            text={undefined}
            className="rounded-4xl p-3 hover:bg-gray-500/35 absolute right-5 top-5"
            type="button"
            onClick={onClose}
          >
            <X className="fill-current text-white w-9 h-9" />
          </Button>
          <div className="flex justify-center mt-20">
            <Button
              text="Connect"
              type="button"
              className="bg-primary border-1 border-solid border-white hover:bg-light-primary h-16 w-11/12"
              onClick={connect}
            />
          </div>
          <ul className="flex flex-col gap-10 text-4xl mt-96">
            {menuOptions.map((option, index) => {
              if (option.onlyOwner && !isOwner) {
                return null;
              }

              return (
                <div className="group flex items-center justify-between border-b-1 border-solid border-gray-800 p-5 cursor-pointer">
                  <li
                    key={index}
                    onClick={option.onClick}
                    className="group-hover:text-primary"
                  >
                    {option.name}
                  </li>
                  <Arrow className="w-8 h-8 group-hover:text-primary" />
                </div>
              );
            })}
          </ul>
        </>
      ) : (
        <>
          <Button
            text={undefined}
            className="rounded-4xl p-3 hover:bg-gray-500/35 absolute right-5 top-5"
            type="button"
            onClick={onClose}
          >
            <X className="fill-current text-white w-9 h-9" />
          </Button>
          <div className="h-96">
            <div className="flex items-center gap-10 border-b-1 border-solid border-gray-800 px-5 py-8">
              <ImageProfile
                imageUrl={profileImage}
                imageAlt={`${voterData?.name} profile image`}
                className="w-24 h-24"
              />
              <div className="flex gap-2">
                <span className="text-3xl">{displayedAddress}</span>
                <Copy
                  className="fill-current text-white w-9 h-9 hover:text-primary cursor-pointer"
                  onClick={copyAddressToClipboard}
                />
              </div>
            </div>
            <VoterInformation
              hasVoted={voterData?.hasVoted}
              pokemonName={pokemonName}
            />
            <div className="flex justify-center">
              <Button
                text="Disconnect Wallet"
                type="button"
                className="bg-primary border-1 border-solid border-white hover:bg-light-primary h-16 w-11/12"
                onClick={disconnect}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
