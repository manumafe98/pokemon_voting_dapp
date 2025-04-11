import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { ImageUploader } from "@/components/ImageUploader";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";

export const Admin = () => {
  return (
    <Layout>
      <Form>
        <ImageUploader />
        <Input label="Name" type="text" placeholder="Lugia" />
        <Button text="Create" type="submit" customStyles="w-[75%] p-4" onClick={() => {}} />
      </Form>
    </Layout>
  );
};
