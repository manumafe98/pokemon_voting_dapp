import { Arrow } from "@/assets/icons/Arrow";
import { navigateToPath } from "@/hooks/navigateToPath";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  isOwner: boolean;
  showMenuIcon: boolean;
}

export const Navigation = ({ isOwner, showMenuIcon }: NavigationProps) => {
  const navigate = useNavigate();
  const isShort = window.innerHeight < 1025;

  const menuOptions = [
    {
      name: "[Vote]",
      onClick: () => navigateToPath(navigate, "/"),
      onlyOwner: false,
    },
    {
      name: "[Register]",
      onClick: () => navigateToPath(navigate, "/register"),
      onlyOwner: false,
    },
    {
      name: "[Admin]",
      onClick: () => navigateToPath(navigate, "/admin"),
      onlyOwner: true,
    },
  ];

  const renderMenuItem = (option: (typeof menuOptions)[0], index: number) => {
    if (option.onlyOwner && !isOwner) return null;

    if (showMenuIcon) {
      return (
        <li
          key={index}
          className="group flex items-center justify-between border-b-1 border-solid border-gray-800 p-5 cursor-pointer"
          onClick={option.onClick}
        >
          <span className="group-hover:text-primary">{option.name}</span>
          <Arrow className="w-8 h-8 group-hover:text-primary" />
        </li>
      );
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
  };

  return (
    <ul
      className={
        showMenuIcon
          ? `flex flex-col gap-10 text-4xl ${isShort ? "mt-40" : "mt-96"} max-md:text-2xl max-md:mt-20 max-md:gap-5 max-sm:mt-5 max-sm:gap-2`
          : "flex gap-2 text-lg"
      }
    >
      {menuOptions.map(renderMenuItem)}
    </ul>
  );
};
