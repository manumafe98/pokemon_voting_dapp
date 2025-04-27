import { getIsRegistered } from "@/hooks/getIsRegistered";
import { getOwnerWallet } from "@/hooks/getOwnerWallet";
import { getProvider } from "@/hooks/getProvider";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const LOCAL_STORAGE_KEY = "wallet-connected";

interface AuthContextType {
  isConnected: boolean;
  address?: string;
  signer?: JsonRpcSigner;
  isOwner: boolean;
  isRegistered: boolean;
  isReady: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>();
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [isOwner, setIsOwner] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isReady, setIsReady] = useState(false);

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
    setIsOwner(false);
    setIsRegistered(false);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        isConnected,
        address,
        signer,
        isOwner,
        isRegistered,
        isReady,
        connect,
        disconnect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSigner must be used within a SignerProvider");
  }
  return context;
};
