import { DownloadCloudIcon } from "@/assets/icons/DownloadCloudIcon";
import { X } from "@/assets/icons/X";
import { useRef, useState } from "react";

interface ImageUploaderProps {
  handleImageChange: (file: File | undefined) => void;
}

export const ImageUploader = ({ handleImageChange }: ImageUploaderProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [altText, setAltText] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFile = (file: File | undefined) => {
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAltText(file.name);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFile(file);
    handleImageChange(file);
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
    setAltText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files[0]);
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-[75%] h-[40%] border-1 border-dashed border-gray-600 p-5 relative"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {!image ? (
        <>
          {isDragging ? (
            <>
              <DownloadCloudIcon className="w-48 h-48" />
            </>
          ) : (
            <>
              <span>Upload file: JPG, PNG, WEPB Max 10MB</span>
              <DownloadCloudIcon />
              <span>Drag & Drop File</span>
              <span>or</span>
              <span
                className="mt-2 underline opacity-50 cursor-pointer"
                role="button"
                onClick={selectFiles}
              >
                Browse Media on your device
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <X
            className="absolute fill-current text-white w-6 h-6 right-1 top-1 cursor-pointer"
            onClick={removeImage}
          />
          <img src={previewUrl as string} alt={altText} className="max-h-72" />
        </>
      )}
      <input
        className="hidden"
        type="file"
        name="file"
        multiple={false}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
};
