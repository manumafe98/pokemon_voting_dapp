import default_image from "@/assets/images/default_profile.webp";

interface ImageProfileProps {
  className: string;
  onClick?: () => void;
}

export const ImageProfile = ({ className, onClick }: ImageProfileProps) => {
  return (
    <div className={`overflow-hidden rounded-full ${className}`} onClick={onClick}>
      <img src={default_image} alt="" />
    </div>
  );
};
