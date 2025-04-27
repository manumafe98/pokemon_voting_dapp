import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { ImageUploader } from "@/components/ImageUploader";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/context/AuthProvider";
import { createPokemon } from "@/hooks/createPokemon";
import { uploadToPinata } from "@/hooks/uploadToPinata";
import { JsonRpcSigner } from "ethers";
import { useState } from "react";

export const Admin = () => {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | undefined>();
  const { signer } = useAuth();

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const cid = await uploadToPinata(image as File);
    createPokemon(signer as JsonRpcSigner, name, cid);
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
        <Button
          text="Create"
          type="submit"
          className="bg-primary border-1 border-solid border-white hover:bg-light-primary w-[75%] p-4"
        />
      </Form>
    </Layout>
  );
};
