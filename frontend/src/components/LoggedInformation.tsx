import { Copy } from "@/assets/icons/Copy";
import { Button } from "./Button";
import { ImageProfile } from "./ImageProfile";
import { VoterInformation } from "./VoterInformation";

interface LoggedInformationProps {
  imageUrl: string;
  voterName: string;
  displayedAddress: string;
  voterHasVoted: boolean;
  pokemonName: string;
  copyAddressToClipboard: () => Promise<void>;
  disconnect: () => void;
}

export const LoggedInformation = ({
  imageUrl,
  voterName,
  displayedAddress,
  voterHasVoted,
  pokemonName,
  copyAddressToClipboard,
  disconnect,
}: LoggedInformationProps) => {
  return (
    <div className="h-96">
      <div className="flex items-center gap-10 border-b-1 border-solid border-gray-800 px-5 py-8">
        <ImageProfile
          imageUrl={imageUrl}
          imageAlt={`${voterName} profile image`}
          className="w-24 h-24 max-md:size-16"
        />
        <div className="flex gap-2">
          <span className="text-3xl max-md:text-xl">{displayedAddress}</span>
          <Copy
            className="fill-current text-white w-9 h-9 hover:text-primary cursor-pointer max-md:size-6"
            onClick={copyAddressToClipboard}
          />
        </div>
      </div>
      <VoterInformation hasVoted={voterHasVoted} pokemonName={pokemonName} />
      <div className="flex justify-center">
        <Button
          text="Disconnect Wallet"
          type="button"
          className="bg-primary border-1 border-solid border-white hover:bg-light-primary h-16 w-11/12"
          onClick={disconnect}
        />
      </div>
    </div>
  );
};
