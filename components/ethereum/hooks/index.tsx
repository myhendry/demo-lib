import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import Web3 from "web3";

import { useHooks } from "../context";

interface IAdminAddresses {
  [key: string]: boolean;
}

/* 
https://emn178.github.io/online-tools/keccak_256.html
Remove '0x' from the address 0x890E135d8b79d29B4585515c1a21305863cEfsdC and
change to 890E135d8b79d29B4585515c1a21305863cEc6dC before inputting into the Keccak-256
online hash function and will get ed56f7b0c74127ce6d2d4c09cd382fe90deff129d0c9a6eab0dcde59f551eb8e
which will be the hashed address
*/
const adminAddresses: IAdminAddresses = {
  "0xed56f7b0c74127ce6d2d4c09cd382fe90deff129d0c9a6eab0dcde59f551eb8e": true,
};

// https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
interface INetwork {
  [key: number]: string;
}

const NETWORKS: INetwork = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
};

// 2 Setup Hook
export const setupHooks = (web3?: Web3, provider?: any) => {
  // console.log("# of calls to set up hooks");
  return {
    useAccount: createAccountHook(web3, provider),
    useNetwork: createNetworkHook(web3, provider),
  };
};

// 1 Write Hook Logic
export const createAccountHook = (web3?: Web3, provider?: any) => () => {
  //! OPTION 1: using useState, useEffect
  // const [account, setAccount] = useState<string>("");

  // useEffect(() => {
  //   const getAccount = async () => {
  //     const accounts = await web3.eth.getAccounts();
  //     setAccount(accounts[0]);
  //   };
  //   web3 && getAccount();
  // }, [web3]);

  // useEffect(() => {
  //   provider &&
  //     provider.on("accountsChanged", (accounts: string[]) => {
  //       setAccount(accounts[0] ?? null);
  //     });
  // }, [provider]);

  // return {
  //   account,
  // };

  //! OPTION 2: Using SWR
  const { mutate, data, ...rest } = useSWR(
    () => {
      return web3 ? "web3/accounts" : null;
    },
    async () => {
      const accounts = await web3!.eth.getAccounts();
      return accounts[0];
    }
  );

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts: string[]) =>
        mutate(accounts[0] ?? null)
      );
  }, [provider]);

  // data is 0x890E135d8b79d29B4585515c1a21305863cEc6dC
  const dataKey: keyof IAdminAddresses = data!;

  return {
    data,
    isAdmin: (data && adminAddresses[web3!.utils.keccak256(dataKey)]) ?? false,
    mutate,
    ...rest,
  };
};

export const createNetworkHook = (web3?: Web3, provider?: any) => () => {
  const { data, mutate, ...rest } = useSWR<string, any>(
    () => (web3 ? "web3/network" : null),
    //! Indexing Option 1
    async () => {
      const CHAIN_ID: keyof typeof NETWORKS = await web3!.eth.getChainId();
      return NETWORKS[CHAIN_ID];
    }
    //! Indexing Option 2
    // async () => {
    //   const chainId = await web3.eth.getChainId();
    //   const x: keyof INetwork = chainId.toString();
    //   return NETWORKS[x];
    // }
  );

  const ENV_CHAIN_ID: keyof typeof NETWORKS = parseInt(
    process.env.NEXT_PUBLIC_TARGET_CHAIN_ID!
  );
  console.log("env chain id", ENV_CHAIN_ID);

  const targetNetwork = NETWORKS[ENV_CHAIN_ID];
  console.log("dev tn", targetNetwork);

  useEffect(() => {
    provider &&
      provider.on("chainChanged", (chainId: string) =>
        mutate(NETWORKS[parseInt(chainId, 16)])
      );
  }, [web3]);

  return {
    mutate,
    data,
    target: targetNetwork,
    isSupported: data === targetNetwork,
    ...rest,
  };
};

// 3 Expose to Front end
const enhanceHook = (swrRes: any) => {
  return {
    ...swrRes,
    hasInitialResponse: swrRes.data || swrRes.error,
  };
};

export const useAccount = (): {
  account: {
    data: string;
    isAdmin: boolean;
    mutate: any;
  };
} => {
  const swrRes = enhanceHook(useHooks((hooks: any) => hooks.useAccount)());
  return { account: swrRes };
};

export const useNetwork = (): {
  network: {
    data: string;
    target: string;
    isSupported: boolean;
    hasInitialResponse: boolean;
  };
} => {
  const swrRes = enhanceHook(useHooks((hooks: any) => hooks.useNetwork)());
  return {
    network: swrRes,
  };
};

export const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  return {
    account,
    network,
    canPurchaseCourse: !!(account.data && network.isSupported),
  };
};
