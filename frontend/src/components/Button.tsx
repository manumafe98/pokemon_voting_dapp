interface ButtonProps {
  text: string;
  customStyles: string;
  onClick: () => void;
}

export const Button = ({ text, customStyles, onClick }: ButtonProps) => {
  return (
    <button
      className={`bg-primary border-1 border-solid border-white hover:bg-light-primary cursor-pointer ${customStyles}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
