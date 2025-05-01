import { BrowserProvider, JsonRpcProvider } from "ethers";

export const getProvider = () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    return new BrowserProvider(window.ethereum);
  }

  return new JsonRpcProvider(import.meta.env.RPC_URL);
};
