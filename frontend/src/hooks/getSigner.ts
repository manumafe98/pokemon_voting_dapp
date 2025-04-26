import { BrowserProvider, JsonRpcSigner } from "ethers";
import { useEffect, useState } from "react";
import { getIsRegistered } from "./getIsRegistered";
import { getOwnerWallet } from "./getOwnerWallet";
import { getProvider } from "./getProvider";

const LOCAL_STORAGE_KEY = "wallet-connected";

export const getSigner = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) === "true") {
      silentReconnect().finally(() => setIsReady(true));
    } else {
      setIsReady(true);
    }
  }, []);

  const connect = async () => {
    const provider = getProvider() as BrowserProvider;

    try {
      await window.ethereum?.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const ownerWallet = await getOwnerWallet();
      const isWalletRegistered = await getIsRegistered(userAddress);

      const message = "Sign to confirm login";
      await signer.signMessage(message);

      setSigner(signer);
      setAddress(userAddress);
      setIsConnected(true);
      setIsOwner(userAddress === ownerWallet);
      setIsRegistered(isWalletRegistered);
      localStorage.setItem(LOCAL_STORAGE_KEY, "true");
    } catch (error) {
      disconnect();
      console.error("Failed to connect:", error);
    }
  };

  const silentReconnect = async () => {
    const provider = getProvider() as BrowserProvider;

    try {
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const ownerWallet = await getOwnerWallet();
      const isWalletRegistered = await getIsRegistered(userAddress);

      setSigner(signer);
      setAddress(userAddress);
      setIsConnected(true);
      setIsOwner(userAddress === ownerWallet);
      setIsRegistered(isWalletRegistered);
    } catch (error) {
      disconnect();
      console.error("Failed to reconnect silently:", error);
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
    isOwner,
    isRegistered,
    isReady,
    connect,
    disconnect,
  };
};
