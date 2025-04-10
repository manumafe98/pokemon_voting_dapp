import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { ImageUploader } from "@/components/ImageUploader";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";

export const Register = () => {
  return (
    <Layout>
      <Form>
        <ImageUploader />
        <Input label="Name" type="text" placeholder="John Doe" />
        <Input label="Address" type="text" placeholder="0x0000" />
        <Button text="Register" customStyles="w-[75%] p-4" onClick={() => {}} />
      </Form>
    </Layout>
  );
};
