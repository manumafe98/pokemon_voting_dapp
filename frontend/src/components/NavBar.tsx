import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  const navigateToPath = (path: string) => {
    navigate(path);
  }

  return (
    <div className="flex justify-between items-center bg-background h-28 text-white px-10 border-b-1 border-solid border-white">
      <h1
        className="text-3xl cursor-pointer w-96"
        onClick={() => navigateToPath("/")}
      >
        [PokemonVotingDapp]
      </h1>
      <ul className="flex gap-2 text-lg">
        <li
          className="cursor-pointer hover:scale-105 transition-transform duration-500"
          onClick={() => navigateToPath("/")}
        >
          [Vote]
        </li>
        <li
          className="cursor-pointer hover:scale-105 transition-transform duration-500"
          onClick={() => navigateToPath("/register")}
        >
          [Register]
        </li>
      </ul>
      <div className="flex justify-end w-96">
        <button className="border-1 border-solid border-white bg-primary hover:bg-light-primary p-4">
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
