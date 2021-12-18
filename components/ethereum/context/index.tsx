import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

import { setupHooks } from "../hooks";
import { loadContract } from "../../../lib/eth/loadContract";

interface IWeb3Context {
  provider: any;
  web3: Web3 | undefined;
  contract: any;
  isLoading: boolean;
  hooks: any;
}

interface IWeb3ExtendedContext {
  provider: any;
  web3: Web3 | undefined;
  //todo resolve typing for getHooks to use with swr
  // getHooks: () => any;
  //! below typing appropriate when using with useState only in useAccount
  // getHooks: () => {
  //   useAccount: () => {
  //     account: string | null;
  //   };
  // };
  contract: any;
  isLoading: boolean;
  connect: () => any;
  hooks: any;
  requireInstall: boolean;
}

const createWeb3State = ({
  web3,
  provider,
  contract,
  isLoading,
}: {
  web3: Web3 | undefined;
  provider: any;
  contract: any;
  isLoading: boolean;
}) => {
  return {
    web3,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ web3, provider, contract }),
  };
};

const Web3Context = createContext<IWeb3Context | null>(null);

export const Web3Provider: React.FC = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<IWeb3Context>(
    createWeb3State({
      web3: undefined,
      provider: null,
      contract: null,
      isLoading: true,
    })
  );

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider as any);

        const contract = await loadContract("Marketplace", web3);
        // console.log("Demo contract", contract);

        setWeb3Api(
          createWeb3State({
            web3,
            provider,
            contract,
            isLoading: false,
          })
        );
      } else {
        setWeb3Api((api) => ({
          ...api,
          isLoading: false,
        }));
        console.error("Please install Metamask");
      }
    };

    loadProvider();
  }, []);

  const _web3Api = useMemo<IWeb3ExtendedContext>(() => {
    const { web3, provider, isLoading } = web3Api;
    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
      connect: provider
        ? async () => {
            try {
              await provider.request({
                method: "eth_requestAccounts",
              });
            } catch (error) {
              location.reload();
            }
          }
        : () => console.log("Cannot connect to Metamask"),
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  return useContext(Web3Context) as IWeb3ExtendedContext;
};

export const useHooks = (cb: any) => {
  const { hooks } = useWeb3();
  return cb(hooks);
};

//* Demo Code
interface IDemo2Context {
  text: string;
}

const Demo2Context = createContext<IDemo2Context | null>(null);

export const Demo2Provider: React.FC = ({ children }) => {
  const [data, setData] = useState<IDemo2Context>({
    text: "a",
  });

  return <Demo2Context.Provider value={data}>{children}</Demo2Context.Provider>;
};

export const useDemo2 = () => {
  return useContext(Demo2Context);
};
