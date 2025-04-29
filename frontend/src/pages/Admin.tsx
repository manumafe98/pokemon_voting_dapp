import { useAuth } from "@/context/AuthProvider";
import { createPokemon } from "@/hooks/createPokemon";
import { uploadToPinata } from "@/hooks/uploadToPinata";
import { JsonRpcSigner } from "ethers";
import { FormPage } from "./FormPage";

export const Admin = () => {
  const { signer } = useAuth();

  const handleSubmit = async (
    name: string,
    _: string | undefined,
    image: File | undefined,
  ) => {
    if (!image) return;
    const cid = await uploadToPinata(image);
    return await createPokemon(signer as JsonRpcSigner, name, cid);
  };

  return (
    <FormPage
      title="Create Pokémon"
      inputs={[{ label: "Name", placeholder: "Lugia" }]}
      buttonText="Create"
      onSubmit={handleSubmit}
    />
  );
};
