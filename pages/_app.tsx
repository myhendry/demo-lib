import "../styles/globals.css";

import axios from "axios";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import type { AppProps /*, AppContext */ } from "next/app";

import { DemoContextProvider } from "./demo/context/providers";
import { Demo2Provider, Web3Provider } from "../components/ethereum/context";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    //* using nprogress and axios.defaults.baseURL (https://github.com/myhendry/demo-next-passport/blob/main/pages/_app.js)

    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url).then((r) => r.data),
        //* using fetch instead of axios setup
        // fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <SessionProvider session={session}>
        <Web3Provider>
          <Demo2Provider>
            <DemoContextProvider>
              <Component {...pageProps} />
            </DemoContextProvider>
          </Demo2Provider>
        </Web3Provider>
      </SessionProvider>
    </SWRConfig>
  );
}
export default MyApp;
