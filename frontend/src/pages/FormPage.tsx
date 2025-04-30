import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { ImageUploader } from "@/components/ImageUploader";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { PopUpNotification } from "@/components/PopUpNotification";
import { useAuth } from "@/context/AuthProvider";
import { useNotification } from "@/hooks/useNotification";
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
  const { isConnected, address, refreshVoterState } = useAuth();
  const {
    showPopUpNotification,
    notificationMessage,
    notificationType,
    showNotification,
  } = useNotification();

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

  const formValidation = (
    name: string,
    formAddress: string,
    image: File | undefined,
  ) => {
    if (showAddressField && !isConnected) {
      showNotification(
        "Please connect your wallet to continue the registration",
        "error",
      );
      return false;
    }

    if (!image) {
      showNotification("Please add an image", "error");
      return false;
    }

    if (name.trim() === "") {
      showNotification("Please enter a valid name", "error");
      return false;
    }

    if (showAddressField && formAddress.trim() === "") {
      showNotification("Please enter a valid address", "error");
      return false;
    }

    if (showAddressField && address !== formAddress) {
      showNotification("You can't register non connected wallets", "error");
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
        showNotification(formMessage, "success");
      } else {
        showNotification("Something went wrong!", "error");
      }

      if (showAddressField) {
        refreshVoterState();
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
