export const uploadToPinata = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("network", "public");

  const request = await fetch("https://uploads.pinata.cloud/v3/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.PINATA_JWT}`,
    },
    body: formData,
  });
  
  return await request.json();
}
