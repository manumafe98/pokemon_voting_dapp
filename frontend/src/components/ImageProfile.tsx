import default_image from "@/assets/images/default_profile.webp";
import { Button } from "./Button";

interface ImageProfileProps {
  className: string;
  onClick?: () => void;
}

export const ImageProfile = ({ className, onClick }: ImageProfileProps) => {
  return (
    <Button
      text={undefined}
      type="button"
      className={`${className}`}
      onClick={onClick}
    >
      <img src={default_image} alt="" />
    </Button>
  );
};
