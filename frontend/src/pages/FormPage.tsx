import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { ImageUploader } from "@/components/ImageUploader";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { PopUpNotification } from "@/components/PopUpNotification";
import { useAuth } from "@/context/AuthProvider";
import { NotificationType } from "@/types/notification.type";
import { useState } from "react";

interface InputField {
  label: string;
  placeholder: string;
}

interface FormPageProps {
  title: string;
  inputs: InputField[];
  buttonText: string;
  onSubmit: (
    name: string,
    address: string | undefined,
    image: File | undefined,
  ) => Promise<boolean | undefined>;
  showAddressField?: boolean;
}

export const FormPage = ({
  title,
  inputs,
  buttonText,
  onSubmit,
  showAddressField = false,
}: FormPageProps) => {
  const [name, setName] = useState<string>("");
  const [formAddress, setFormAddress] = useState<string>("");
  const [image, setImage] = useState<File | undefined>();
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("error");
  const [showPopUpNotification, setShowPopUpNotification] =
    useState<boolean>(false);
  const { isConnected, address } = useAuth();

  const handleChange = (
    label: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    if (label === "Name") {
      setName(value);
    } else {
      setFormAddress(value);
    }
  };

  const handleImageChange = (file: File | undefined) => {
    setImage(file);
  };

  const popUpHelper = (message: string, status: NotificationType) => {
    setNotificationMessage(message);
    setNotificationType(status);
    setShowPopUpNotification(true);
    setTimeout(() => setShowPopUpNotification(false), 4000);
  };

  const formValidation = (
    name: string,
    formAddress: string,
    image: File | undefined,
  ) => {
    if (showAddressField && !isConnected) {
      popUpHelper(
        "Please connect your wallet to continue the registration",
        "error",
      );
      return false;
    }

    if (!image) {
      popUpHelper("Please add an image", "error");
      return false;
    }

    if (name.trim() === "") {
      popUpHelper("Please enter a valid name", "error");
      return false;
    }

    if (showAddressField && formAddress.trim() === "") {
      popUpHelper("Please enter a valid address", "error");
      return false;
    }

    if (showAddressField && address !== formAddress) {
      popUpHelper("You can't register non connected wallets", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formSuccess = formValidation(name, formAddress, image);
    if (formSuccess) {
      const success = await onSubmit(
        name,
        showAddressField ? formAddress : undefined,
        image,
      );
      if (success) {
        const formMessage = !showAddressField
          ? `${name} was successfully created`
          : `You sucessfully registered`;
        popUpHelper(formMessage, "success");
      } else {
        popUpHelper("Something went wrong!", "error");
      }
    }
  };

  return (
    <Layout>
      <Form handleSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <ImageUploader handleImageChange={handleImageChange} />
        {inputs.map((input) => (
          <Input
            key={input.label}
            label={input.label}
            type="text"
            placeholder={input.placeholder}
            handleChange={handleChange}
          />
        ))}
        <Button
          text={buttonText}
          type="submit"
          className="bg-primary border-1 border-solid border-white hover:bg-light-primary w-[75%] p-4"
        />
      </Form>
      {showPopUpNotification && (
        <PopUpNotification
          message={notificationMessage}
          type={notificationType}
        />
      )}
    </Layout>
  );
};
