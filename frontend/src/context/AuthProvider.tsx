import { getIsRegistered } from "@/hooks/getIsRegistered";
import { getOwnerWallet } from "@/hooks/getOwnerWallet";
import { getProvider } from "@/hooks/getProvider";
import { getVoterByAddress } from "@/hooks/getVoterByAddress";
import { Voter } from "@/types/voter.type";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const LOCAL_STORAGE_KEY = "wallet_connected";

interface AuthContextType {
  isConnected: boolean;
  address?: string;
  signer?: JsonRpcSigner;
  isOwner: boolean;
  isRegistered: boolean;
  isReady: boolean;
  voterData: Voter | undefined;
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
  const [voterData, setVoterData] = useState<Voter | undefined>(undefined);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) === "true") {
      silentReconnect().finally(() => setIsReady(true));
    } else {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    const fetchVoterData = async () => {
      if (isRegistered && address) {
        const voterData = await getVoterByAddress(address);
        setVoterData(voterData);
      }
    }
    fetchVoterData();
  }, [isRegistered, address])

  const setupConnection = async (requirePermission: boolean) => {
    const provider = getProvider() as BrowserProvider;
    try {
      if (requirePermission) {
        await window.ethereum?.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });

        const signer = await provider.getSigner();
        await signer.signMessage("Sign to confirm login");
      }

      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const ownerWallet = await getOwnerWallet();
      const isWalletRegistered = await getIsRegistered(userAddress);

      setSigner(signer);
      setAddress(userAddress);
      setIsConnected(true);
      setIsOwner(userAddress === ownerWallet);
      setIsRegistered(isWalletRegistered);

      if (requirePermission) {
        localStorage.setItem(LOCAL_STORAGE_KEY, "true");
      }
    } catch (error) {
      disconnect();
      console.error(
        requirePermission
          ? "Failed to connect:"
          : "Failed to reconnect silently:",
        error,
      );
    }
  };

  const connect = () => setupConnection(true);
  const silentReconnect = () => setupConnection(false);

  const disconnect = () => {
    setAddress(undefined);
    setSigner(undefined);
    setVoterData(undefined);
    setIsOwner(false);
    setIsConnected(false);
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
        voterData,
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
