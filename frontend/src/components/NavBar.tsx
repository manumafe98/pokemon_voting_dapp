import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { getSigner } from "@/hooks/getSigner";
import { LoggedMenu } from "./LoggedMenu";
import { useState } from "react";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { connect, disconnect, isConnected, address } = getSigner();

  const navigateToPath = (path: string) => {
    navigate(path);
  };

  const menuOptions = [
    {
      name: "[Vote]",
      onClick: () => navigateToPath("/"),
    },
    {
      name: "[Register]",
      onClick: () => navigateToPath("/register"),
    },
    {
      name: "[Admin]",
      onClick: () => navigateToPath("/admin"),
    },
  ];

  return (
    <div className="flex justify-between items-center bg-background h-28 text-white px-10 border-b-1 border-solid border-white">
      <h1
        className="text-3xl cursor-pointer w-96"
        onClick={() => navigateToPath("/")}
      >
        [PokemonVotingDapp]
      </h1>
      <ul className="flex gap-2 text-lg">
        {menuOptions.map((option, index) => (
          <li
            key={index}
            className="cursor-pointer hover:scale-105 transition-transform duration-500"
            onClick={option.onClick}
          >
            {option.name}
          </li>
        ))}
      </ul>
      <div className="flex justify-end w-96">
        {isConnected ? (
          <>
            <div className="rounded-full w-18 h-18 bg-white border-1 border-solid border-white cursor-pointer p-4" onClick={() => setIsMenuOpen(true)} />
            <LoggedMenu address={address as string} isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} disconnect={disconnect}/>
          </>
        ) : (
          <Button
            text="Connect Wallet"
            type="button"
            customStyles="p-4"
            onClick={connect}
          />
        )}
      </div>
    </div>
  );
};
