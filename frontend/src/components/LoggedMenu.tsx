import { Copy } from "@/assets/icons/Copy";
import { X } from "@/assets/icons/X";
import { Button } from "./Button";
import { ImageProfile } from "./ImageProfile";
import { useAuth } from "@/context/AuthProvider";
import default_image from "@/assets/images/default_profile.webp";

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

  const copyAddressToClipboard = async () => {
    await navigator.clipboard.writeText(address);
  };

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
            imageUrl={
              isRegistered
                ? `${import.meta.env.PINATA_GATEWAY}/ipfs/${voterData?.ipfsHash}`
                : default_image
            }
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
        <div className="flex justify-between h-48 p-10">
          <div className="flex flex-col items-center">
            <div className="text-gray-600 text-2xl">My Vote</div>
            <div className="text-white text-3xl mt-4">Lugia</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-gray-600 text-2xl">Available Votes</div>
            <div className="text-white text-3xl mt-4">1</div>
          </div>
        </div>
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
