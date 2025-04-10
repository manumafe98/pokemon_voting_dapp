import { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
}

export const Form = ({ children }: FormProps) => {
  return (
    <div className="flex justify-center items-center h-full">
      <form className="flex flex-col justify-center items-center w-2/5 h-11/12 border-1 border-solid border-white text-white gap-y-10">
        {children}
      </form>
    </div>
  );
};
