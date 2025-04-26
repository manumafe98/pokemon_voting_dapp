import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { ImageUploader } from "@/components/ImageUploader";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { useState } from "react";

export const Register = () => {
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
  };

  return (
    <Layout>
      <Form handleSubmit={handleSubmit}>
        <ImageUploader handleImageChange={handleImageChange} />
        <Input
          label="Name"
          type="text"
          placeholder="John Doe"
          handleChange={handleChange}
        />
        <Input
          label="Address"
          type="text"
          placeholder="0x0000"
          handleChange={handleChange}
        />
        <Button
          text="Register"
          type="submit"
          className="bg-primary border-1 border-solid border-white hover:bg-light-primary w-[75%] p-4"
        />
      </Form>
    </Layout>
  );
};
