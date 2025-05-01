import { X } from "@/assets/icons/X";
import { Voter } from "@/types/voter.type";
import { Button } from "./Button";
import { LoggedInformation } from "./LoggedInformation";
import { Navigation } from "./Navigation";

interface LoggedMenuProps {
  address: string;
  isOpen: boolean;
  isMenuIconOn: boolean;
  isOwner: boolean;
  isConnected: boolean;
  voterData: Voter | undefined;
  pokemonName: string;
  profileImage: string;
  onClose: () => void;
  disconnect: () => void;
  connect: () => void;
}

export const LoggedMenu = ({
  address,
  isOpen,
  isMenuIconOn,
  isOwner,
  isConnected,
  voterData,
  pokemonName,
  profileImage,
  onClose,
  disconnect,
  connect,
}: LoggedMenuProps) => {
  const displayedAddress =
    isConnected && address
      ? `${address.substring(0, 5)}...${address.substring(address.length - 4)}`
      : "";

  const copyAddressToClipboard = async () => {
    await navigator.clipboard.writeText(address);
  };

  return (
    <div
      className={`fixed top-0 right-0 ${
        isMenuIconOn
          ? "w-2/4 max-lg:w-3/4 max-md:w-full"
          : "w-1/4 max-[1905px]:w-2/4"
      } h-screen p-4 bg-background border-l-1 border-solid border-white ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform  ease-in-out duration-500 z-1`}
    >
      <Button
        text={undefined}
        className="rounded-4xl p-3 hover:bg-gray-500/35 absolute right-5 top-5"
        type="button"
        onClick={onClose}
      >
        <X className="fill-current text-white w-9 h-9 max-md:size-6" />
      </Button>
      {isConnected ? (
        <LoggedInformation
          imageUrl={profileImage}
          voterName={voterData?.name ?? ""}
          displayedAddress={displayedAddress}
          voterHasVoted={voterData?.hasVoted ?? false}
          pokemonName={pokemonName}
          copyAddressToClipboard={copyAddressToClipboard}
          disconnect={disconnect}
        />
      ) : (
        <div className="flex justify-center mt-20">
          <Button
            text="Connect"
            type="button"
            className="bg-primary border-1 border-solid border-white hover:bg-light-primary h-16 w-11/12"
            onClick={connect}
          />
        </div>
      )}
      {isMenuIconOn && (
        <Navigation showMenuIcon={isMenuIconOn} isOwner={isOwner} />
      )}
    </div>
  );
};
