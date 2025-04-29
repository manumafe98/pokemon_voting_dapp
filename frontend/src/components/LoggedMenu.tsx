import { Copy } from "@/assets/icons/Copy";
import { X } from "@/assets/icons/X";
import default_image from "@/assets/images/default_profile.webp";
import { useAuth } from "@/context/AuthProvider";
import { getPokemonById } from "@/hooks/getPokemonById";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { ImageProfile } from "./ImageProfile";
import { VoterInformation } from "./VoterInformation";

interface LoggedMenuProps {
  address: string;
  isOpen: boolean;
  onClose: () => void;
  disconnect: () => void;
}

export const LoggedMenu = ({
  address,
  isOpen,
  onClose,
  disconnect,
}: LoggedMenuProps) => {
  const { isRegistered, voterData } = useAuth();
  const displayedAddress = `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
  const [pokemonName, setPokemonName] = useState<string>("-");
  const [profileImage, setProfileImage] = useState<string>(default_image);

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

  return (
    <div
      className={`fixed top-0 right-0 w-1/4 h-screen p-4 bg-background border-l-1 border-solid border-white ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-1`}
    >
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
    </div>
  );
};
