import Link from "next/link";

import { Layout } from "../components/common";
//import { Web3Provider } from "./ethereum/context";

export default function Home() {
  return (
    <Layout>
      {/* <Web3Provider> */}
      <div className="flex flex-col justify-center text-center">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 m-3">
          <div className="w-2 bg-gray-800 dark:bg-gray-900"></div>

          <div className="flex items-center px-2 py-3">
            <img
              className="object-cover w-10 h-10 rounded-full"
              alt="User avatar"
              src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
            />

            <div className="mx-3">
              <p className="text-gray-600 dark:text-gray-200">
                Welcome to my Kitchen Sink Page
              </p>
            </div>
          </div>
        </div>
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
          <Link href="/demo/mongodb">
            <a className="cursor-pointer">MongoDB</a>
          </Link>
        </div>
      </div>
      {/* </Web3Provider> */}
    </Layout>
  );
}
