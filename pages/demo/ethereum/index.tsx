import React from "react";

import { Layout } from "../../../components/common";
import { useWeb3 } from "../../../components/ethereum/context";
import { useAccount, useNetwork } from "../../../components/ethereum/hooks";
import Details from "./details";

interface Props {}

// Solidity & Ethereum in React (Next JS): The Complete Guide
// NEXT: L153

const Ethereum = (props: Props) => {
  const { isLoading, requireInstall, connect, web3 } = useWeb3();

  const { account } = useAccount();

  const { network } = useNetwork();

  return (
    <Layout>
      <p>Ethereum</p>
      <div className="border rounded-md p-3 m-2">
        <strong className="underline">In Index</strong>
        <p>Metmask Network: {network.data}</p>
        <p>
          Env Network: {network.target} in {process.env.NODE_ENV} mode
        </p>
        <p>Network Supported: {network.isSupported ? "Yes" : "No"}</p>
        <p>Data: {account.data}</p>
      </div>
      <Details network={network} account={account} />
      {isLoading ? (
        <button
          disabled
          onClick={connect}
          className="bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Loading
        </button>
      ) : account.data ? (
        <button disabled className="bg-gray-200">
          Hi There {account.isAdmin ? "Admin" : "User"}
        </button>
      ) : requireInstall ? (
        <button
          onClick={() =>
            window.open("https://metamask.io/download.html", "_blank")
          }
          className="bg-gray-500"
        >
          Install Metamask
        </button>
      ) : (
        <button onClick={connect} className="bg-yellow-500">
          Connect
        </button>
      )}
      <div>
        {requireInstall && (
          <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center justify-center w-12 bg-red-500">
              <svg
                className="w-6 h-6 text-white fill-current"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
              </svg>
            </div>

            <div
              className="px-4 py-2 -mx-3"
              onClick={() =>
                window.open("https://metamask.io/download.html", "_blank")
              }
            >
              <div className="mx-3">
                <span className="font-semibold text-red-500 dark:text-red-400">
                  Error
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-200">
                  Cannot connect to network! Please install metamask
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Ethereum;
