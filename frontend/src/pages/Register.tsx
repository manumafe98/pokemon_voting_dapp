import { Layout } from "@/components/Layout";
import { DownloadCloudIcon } from "@/assets/icons/DownloadCloudIcon";

export const Register = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <form className="flex flex-col justify-center items-center w-2/5 h-11/12 border-1 border-solid border-white text-white gap-y-10">
          <div className="flex flex-col justify-center items-center w-[75%] h-[40%] border-1 border-dashed border-gray-600 p-5">
            <span>Upload file: JPG, PNG, WEPB Max 10MB</span>
            <DownloadCloudIcon />
            <span>Drag & Drop File</span>
            <span className="mt-5">or Browse Media on your device</span>
          </div>
          <div className="flex flex-col w-[75%]">
            <label className="mb-0.5" htmlFor="name">
              Name
            </label>
            <input
              className="h-12 border-1 border-solid border-gray-600 p-2"
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col w-[75%]">
            <label className="mb-0.5" htmlFor="address">
              Address
            </label>
            <input
              className="h-12 border-1 border-solid border-gray-600 p-2"
              id="address"
              name="address"
              type="text"
              placeholder="0x0000"
            />
          </div>
          <button className="w-[75%] border-1 border-solid border-white bg-primary hover:bg-light-primary p-4">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
}
