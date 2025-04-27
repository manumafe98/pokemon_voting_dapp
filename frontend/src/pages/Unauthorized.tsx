import { Layout } from "@/components/Layout";

export const Unauthorized = () => {
  return (
    <Layout>
      <div className="flex items-center bg-background h-full justify-center my-auto min-h-full">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-white mb-6">401</h1>
          <p className="text-2xl text-white mb-2">Unauthorized</p>
          <p className="text-white">
            We are sorry, but you are not authorized to access this page
          </p>
        </div>
      </div>
    </Layout>
  );
};
