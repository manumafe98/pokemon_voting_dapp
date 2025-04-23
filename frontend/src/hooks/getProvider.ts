import { BrowserProvider, Eip1193Provider, ethers } from "ethers";

export const getProvider = () => {
  let provider = null;

  if (window.ethereum == null) {
    provider = ethers.getDefaultProvider();
  } else {
    provider = new BrowserProvider(
      window.ethereum as unknown as Eip1193Provider,
    );
  }

  return provider;
};
