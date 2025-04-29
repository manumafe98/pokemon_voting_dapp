interface ImageProfileProps {
  className: string;
  imageUrl: string;
  imageAlt: string;
  onClick?: () => void;
}

export const ImageProfile = ({
  className,
  imageUrl,
  imageAlt,
  onClick,
}: ImageProfileProps) => {
  return (
    <div
      className={`overflow-hidden rounded-full ${className}`}
      onClick={onClick}
    >
      <img
        src={imageUrl}
        className="object-cover w-full h-full"
        alt={imageAlt}
      />
    </div>
  );
};
