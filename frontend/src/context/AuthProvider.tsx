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
  voterData?: Voter;
  connect: (requirePermission?: boolean) => Promise<void>;
  disconnect: () => void;
  refreshVoterState: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string>();
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [isOwner, setIsOwner] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [voterData, setVoterData] = useState<Voter>();

  const isConnected = !!address;

  useEffect(() => {
    const autoConnect = async () => {
      if (localStorage.getItem(LOCAL_STORAGE_KEY) === "true") {
        await connect(false);
      }
      setIsReady(true);
    };
    autoConnect();
  }, []);

  const connect = async (requirePermission: boolean = true) => {
    const provider = getProvider() as BrowserProvider;
    try {
      if (requirePermission) {
        await provider.send("wallet_requestPermissions", [
          { eth_accounts: {} },
        ]);
      }

      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      if (requirePermission) {
        await signer.signMessage("Sign to confirm login");
        localStorage.setItem(LOCAL_STORAGE_KEY, "true");
      }

      setSigner(signer);
      setAddress(userAddress);

      const [ownerWallet, registered] = await Promise.all([
        getOwnerWallet(),
        getIsRegistered(userAddress),
      ]);

      setIsOwner(userAddress === ownerWallet);
      setIsRegistered(registered);

      setVoterData(
        registered ? await getVoterByAddress(userAddress) : undefined,
      );
    } catch (error) {
      disconnect();
      console.error(
        requirePermission ? "Failed to connect:" : "Silent reconnect failed:",
        error,
      );
    }
  };

  const disconnect = () => {
    setAddress(undefined);
    setSigner(undefined);
    setVoterData(undefined);
    setIsOwner(false);
    setIsRegistered(false);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const refreshVoterState = async () => {
    if (!address) return;

    const registered = await getIsRegistered(address);
    setIsRegistered(registered);

    setVoterData(registered ? await getVoterByAddress(address) : undefined);
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
        refreshVoterState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
