interface PinataResponse {
  data: {
    cid: string;
    [key: string]: unknown;
  };
}

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

  const response: PinataResponse = await request.json();
  return response.data.cid;
};
