import { DownloadCloudIcon } from "@/assets/icons/DownloadCloudIcon";

export const ImageUploader = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[75%] h-[40%] border-1 border-dashed border-gray-600 p-5">
      <span>Upload file: JPG, PNG, WEPB Max 10MB</span>
      <DownloadCloudIcon />
      <span>Drag & Drop File</span>
      <span className="mt-5">or Browse Media on your device</span>
    </div>
  );
};
