interface ButtonProps {
  text: string;
  type: "button" | "submit";
  customStyles: string;
  onClick?: () => void;
}

export const Button = ({ text, type, customStyles, onClick }: ButtonProps) => {
  return (
    <button
      className={`bg-primary border-1 border-solid border-white hover:bg-light-primary cursor-pointer ${customStyles}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
