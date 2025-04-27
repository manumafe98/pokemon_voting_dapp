import { Layout } from "@/components/Layout";

export const Unavailable = () => {
  return (
    <Layout>
      <div className="flex items-center bg-background h-full justify-center my-auto min-h-full">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-white mb-6">404</h1>
          <p className="text-2xl text-white mb-2">Oops! Page Not Found</p>
          <p className="text-white">
            We are sorry, but the page you requested was not found.
          </p>
        </div>
      </div>
    </Layout>
  );
};
