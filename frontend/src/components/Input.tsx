interface InputProps {
  label: string;
  type: string;
  placeholder: string;
}

export const Input = ({ label, type, placeholder }: InputProps) => {
  return (
    <div className="flex flex-col w-[75%]">
      <label className="mb-0.5" htmlFor={label.toLowerCase()}>
        {label}
      </label>
      <input
        className="h-12 border-1 border-solid border-gray-600 p-2"
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};
