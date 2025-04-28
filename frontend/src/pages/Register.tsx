import { useAuth } from "@/context/AuthProvider";
import { registerVoter } from "@/hooks/registerVoter";
import { uploadToPinata } from "@/hooks/uploadToPinata";
import { JsonRpcSigner } from "ethers";
import { FormPage } from "./FormPage";

export const Register = () => {
  const { signer } = useAuth();

  const handleSubmit = async (
    name: string,
    address: string | undefined,
    image: File | undefined,
  ) => {
    if (!image) return;
    const cid = await uploadToPinata(image);
    registerVoter(signer as JsonRpcSigner, address as string, name, cid);
  };

  return (
    <FormPage
      title="Register"
      inputs={[
        { label: "Name", placeholder: "John Doe" },
        { label: "Address", placeholder: "0x0000" },
      ]}
      buttonText="Register"
      onSubmit={handleSubmit}
      showAddressField
    />
  );
};
