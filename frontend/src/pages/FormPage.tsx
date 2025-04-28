import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { ImageUploader } from "@/components/ImageUploader";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
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
  ) => void;
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
  const [address, setAddress] = useState<string>("");
  const [image, setImage] = useState<File | undefined>();

  const handleChange = (
    label: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    if (label === "Name") {
      setName(value);
    } else {
      setAddress(value);
    }
  };

  const handleImageChange = (file: File | undefined) => {
    setImage(file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(name, showAddressField ? address : undefined, image);
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
    </Layout>
  );
};
