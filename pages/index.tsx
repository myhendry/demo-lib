import Link from "next/link";

import { Layout } from "../components/common";
//import { Web3Provider } from "./ethereum/context";

export default function Home() {
  return (
    <Layout>
      {/* <Web3Provider> */}
      <div className="flex flex-col justify-center text-center">
        <h2 className="text-2xl space-y-1">Welcome to my kitchen sink page!</h2>
        <div className="flex flex-col space-y-1">
          <Link href="/demo/canvas">
            <a className="cursor-pointer">Canvas</a>
          </Link>
          <Link href="/demo/static">
            <a className="cursor-pointer">Static</a>
          </Link>
          <Link href="/demo/swr">
            <a className="cursor-pointer">SWR</a>
          </Link>
          <Link href="/demo/context">
            <a className="cursor-pointer">React Context</a>
          </Link>
          <Link href="/demo/auth">
            <a className="cursor-pointer">Next-Auth</a>
          </Link>
          <Link href="/demo/form">
            <a className="cursor-pointer">Form</a>
          </Link>
          <Link href="/demo/design/merakiui">
            <a className="cursor-pointer">MerakiUI</a>
          </Link>
          <Link href="/demo/spinners">
            <a className="cursor-pointer">Spinners</a>
          </Link>
          <Link href="/demo/images">
            <a className="cursor-pointer">Images</a>
          </Link>
          <Link href="/demo/ethereum">
            <a className="cursor-pointer">Ethereum</a>
          </Link>
          <Link href="/demo/pdf">
            <a className="cursor-pointer">Pdf</a>
          </Link>
        </div>
      </div>
      {/* </Web3Provider> */}
    </Layout>
  );
}
