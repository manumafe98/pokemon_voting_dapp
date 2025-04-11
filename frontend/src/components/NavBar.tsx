import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const NavBar = () => {
  const navigate = useNavigate();

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
        <Button
          text="Connect Wallet"
          type="button"
          customStyles="p-4"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
