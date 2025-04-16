import { BrowserProvider, JsonRpcSigner } from "ethers";
import { useEffect, useState } from "react";
import { getProvider } from "./getProvider";

const LOCAL_STORAGE_KEY = "wallet-connected";

export const getSigner = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) === "true") {
      connect();
    }
  }, []);

  const connect = async () => {
    const provider = getProvider() as BrowserProvider;

    try {
      const signer = await provider.getSigner();
      setSigner(signer);
      setAddress(await signer.getAddress());
      setIsConnected(true);
      localStorage.setItem(LOCAL_STORAGE_KEY, "true");
    } catch (error) {
      disconnect();
      console.error("Failed to connect:", error);
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(undefined);
    setSigner(undefined);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return {
    isConnected,
    address,
    signer,
    connect,
    disconnect,
  };
};
