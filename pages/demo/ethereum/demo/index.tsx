import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import useSWR from "swr";

import { Layout } from "../../../../components/common";
import { loadContract } from "../../../../lib/eth/loadContract";
import { GetServerSideProps } from "next";

interface Props {}

// https://github.com/myhendry/nft-marketplace
// https://github.com/myhendry/nft
// https://github.com/tomhirst/solidity-nextjs-starter/blob/main/pages/index.js
// truffle migrate --network rinkeby
const Demo = (props: Props) => {
  const [web3Api, setWeb3Api] = useState<{
    web3: Web3 | undefined;
    isProviderLoaded: boolean;
    provider: any;
    contract: any;
    error: string;
    // contractName: string;
  }>({
    isProviderLoaded: false,
    web3: undefined,
    provider: undefined,
    contract: undefined,
    error: "",
    // contractName: "",
  });

  const [name, setName] = useState<string>("");

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

  const getContractName = async (contract: any) => {
    try {
      const contractName = await contract?.methods.name().call();

      console.log("Demo contractName", contractName);
    } catch (error) {
      console.log(error);
      setWeb3Api((prevState) => ({
        ...prevState,
        error: "Not Enough Gas",
      }));
    }
  };

  // ! Provider
  const loadProvider = async () => {
    const provider = await detectEthereumProvider();
    const web3 = new Web3(provider as any);

    if (provider) {
      const contract = await loadContract("Demo", web3);
      console.log("Demo contract", contract);

      // todo if call() here can result in Out of Gas error if use other networks other than Ganache
      // const contractName = await contract?.methods.name().call();
      // console.log("Demo contractName", contractName);

      setWeb3Api({
        web3,
        provider,
        contract,
        isProviderLoaded: true,
        error: "",
        // contractName,
      });
    } else {
      setWeb3Api((api) => {
        return {
          ...api,
          isProviderLoaded: true,
        };
      });
      console.log("No ethereum wallet detected. Please install Metamask");
    }
  };

  useEffect(() => {
    loadProvider();
  }, []);

  // ! Account
  const { mutate: mutateAccount, data: account } = useSWR(
    () => {
      return web3Api.web3 ? "web3/accounts" : null;
    },
    async () => {
      const accounts = await web3Api.web3!.eth.getAccounts();
      return accounts[0];
    }
  );

  useEffect(() => {
    web3Api.provider &&
      web3Api.provider.on("accountsChanged", (accounts: string[]) =>
        mutateAccount(accounts[0] ?? null)
      );
  }, [web3Api.provider]);

  // ! Network
  const { mutate: mutateNetwork, data: network } = useSWR(
    () => {
      return web3Api.web3 ? "web3/networks" : null;
    },
    async () => {
      const CHAIN_ID = await web3Api.web3!.eth.getChainId();
      return NETWORKS[CHAIN_ID];
    }
  );

  useEffect(() => {
    web3Api.provider &&
      web3Api.provider.on("chainChanged", (chainId: string) => {
        mutateNetwork(NETWORKS[parseInt(chainId, 16)]);
      });
  }, [web3Api.provider]);

  const ENV_CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_TARGET_CHAIN_ID!);
  const targetNetwork = NETWORKS[ENV_CHAIN_ID];

  return (
    <Layout>
      <p>Demo</p>
      {web3Api.isProviderLoaded ? (
        <div>
          {account && network ? (
            <div>
              <p>Account: {account}</p>
              <p>Network: {network}</p>
              {targetNetwork !== network
                ? "Network Not Supported"
                : "Network Supported"}
            </div>
          ) : !web3Api.provider ? (
            <>
              <div>
                Wallet is not detected!{" "}
                <a
                  target="_blank"
                  href="http://docs.metamask.io"
                  rel="noopener noreferrer"
                >
                  Install Metamask
                </a>
              </div>
            </>
          ) : (
            <button
              onClick={() =>
                web3Api.provider.request({ method: "eth_requestAccounts" })
              }
            >
              Connect Wallet
            </button>
          )}
        </div>
      ) : (
        <span>Looking for Web3...</span>
      )}
      <button onClick={() => getContractName(web3Api.contract)}>
        Get Name
      </button>
      {/* <p>Contract: {web3Api.contractName}</p> */}
      <p>{web3Api.error}</p>
      <div className="border rounded-md m-5 p-3">
        <form
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();

            await web3Api.contract.methods
              .change_name(name)
              .send({ from: account })
              .on("transactionHash", (_: any) => {
                setWeb3Api((prevState) => ({
                  ...prevState,
                  contractName: name,
                }));
              })
              .on("error", (error: any) => {
                console.log(error);
                window.alert("There was an error!");
              });
            setName("");
          }}
        >
          <input
            type="text"
            className="rounded-md"
            placeholder="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.persist();
              setName(e.target.value);
            }}
          />
          <input type="submit" className="rounded-md m-5 p-2" />
        </form>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Demo;
