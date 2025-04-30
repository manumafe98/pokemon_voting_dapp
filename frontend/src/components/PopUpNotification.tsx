import { NotificationType } from "@/types/notification.type";

interface PopUpNotificationProps {
  message: string;
  type: NotificationType;
}

export const PopUpNotification = ({
  message,
  type,
}: PopUpNotificationProps) => {
  const bgColor = type === "success" ? "bg-light-primary" : "bg-primary";

  return (
    <div
      className={`flex items-center justify-center absolute bottom-4 left-1/2 transform -translate-x-1/2 h-16 w-4/12 my-4 px-4 py-2 transition-opacity duration-300 ${bgColor} border-1 border-solid border-white`}
    >
      <p className="text-center text-white text-lg font-bold">{message}</p>
    </div>
  );
};
