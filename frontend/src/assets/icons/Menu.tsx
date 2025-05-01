interface MenuProps {
  onClick: () => void;
}

export const Menu = ({ onClick }: MenuProps) => {
  return (
    <button
      className="
        w-10 h-10 p-2 bg-white invert flex items-center justify-center cursor-pointer
        before:content-[''] before:absolute before:top-[30%] before:left-0
        before:h-[0.25rem] before:w-6 before:rounded-sm before:bg-background
        before:transition-all before:duration-200
        
        after:content-[''] after:absolute after:bottom-[30%] after:left-0
        after:h-[0.1875rem] after:w-[1.125rem] after:rounded-sm after:bg-background
        after:transition-[width] after:duration-200
        hover:after:w-6
      "
      onClick={onClick}
    />
  );
};
