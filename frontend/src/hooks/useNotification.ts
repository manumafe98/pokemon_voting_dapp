import { NotificationType } from "@/types/notification.type";
import { useState } from "react";

export const useNotification = () => {
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("error");
  const [showPopUpNotification, setShowPopUpNotification] =
    useState<boolean>(false);

  const showNotification = (
    message: string,
    type: NotificationType,
    duration: number = 4000,
  ) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowPopUpNotification(true);
    setTimeout(() => setShowPopUpNotification(false), duration);
  };

  return {
    notificationMessage,
    notificationType,
    showPopUpNotification,
    showNotification,
  };
};
