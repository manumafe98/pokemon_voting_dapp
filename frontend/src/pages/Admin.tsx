import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { ImageUploader } from "@/components/ImageUploader";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { uploadToPinata } from "@/hooks/uploadToPinata";
import { useState } from "react";

export const Admin = () => {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | undefined>();

  const handleChange = (
    _: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setName(value);
  };

    const handleImageChange = (file: File | undefined) => {
      setImage(file);
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const test = uploadToPinata(image as File);
    console.log(test);
  };

  return (
    <Layout>
      <Form handleSubmit={handleSubmit}>
        <ImageUploader handleImageChange={handleImageChange} />
        <Input
          label="Name"
          type="text"
          placeholder="Lugia"
          handleChange={handleChange}
        />
        <Button text="Create" type="submit" customStyles="w-[75%] p-4" />
      </Form>
    </Layout>
  );
};
