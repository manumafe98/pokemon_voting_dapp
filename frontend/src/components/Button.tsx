import { ReactNode } from "react";

interface ButtonProps {
  text: string | undefined;
  type: "button" | "submit";
  className: string;
  onClick?: () => void;
  children?: ReactNode;
}

export const Button = ({ text, children, type, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`cursor-pointer ${className}`}
      type={type}
      onClick={onClick}
    >
      {text ?? children}
    </button>
  );
};
