import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { GiSoccerBall } from "react-icons/gi";

import { Layout } from "../components/common";

interface ILink {
  url: string;
  name: string;
}

export default function Home() {
  const renderLinks = (links: ILink[]): ReactNode => {
    return links.map((link, i) => (
      <Link key={i} href={link.url}>
        <a className="cursor-pointer bg-yellow-500 border rounded">
          {link.name}
        </a>
      </Link>
    ));
  };

  return (
    <Layout>
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
                Welcome to my Kitchen Sink Page!
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <Image
              src={"https://avatars.githubusercontent.com/u/20642843?v=4"}
              width="500"
              height="400"
              layout="fixed"
              alt="avatar"
            />

            <div className="py-5 text-center">
              <a
                href="#"
                className="block text-2xl font-bold text-gray-800 dark:text-white"
              >
                Hendry Lim
              </a>
              <span className="text-sm text-gray-700 dark:text-gray-200">
                Coding Enthusiast
              </span>
              <div className="flex justify-center items-center space-x-2">
                <span>
                  <GiSoccerBall className="text-yellow-700" />
                </span>
                <a
                  href="https://github.com/myhendry/lab"
                  target="_blank"
                  className="cursor-pointer text-sm text-yellow-700"
                >
                  Visit Github Repository
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 m-3">
          {renderLinks(links)}
        </div>
      </div>
    </Layout>
  );
}

const links = [
  {
    url: "/demo/canvas",
    name: "Canvas",
  },
  {
    url: "/demo/static",
    name: "Static",
  },
  {
    url: "/demo/swr",
    name: "SWR",
  },
  {
    url: "/demo/context",
    name: "React Context",
  },
  {
    url: "/demo/auth",
    name: "Next-Auth",
  },
  {
    url: "/demo/form",
    name: "Form",
  },
  {
    url: "/demo/design/merakiui",
    name: "MerakiUI",
  },
  {
    url: "/demo/spinners",
    name: "Spinners",
  },
  {
    url: "/demo/routes",
    name: "Routes",
  },
  {
    url: "/demo/images",
    name: "Images",
  },
  {
    url: "/demo/ethereum/marketplace-tf",
    name: "MarketPlace (Truffle)",
  },
  {
    url: "/demo/ethereum/demo-tf",
    name: "Demo (Truffle)",
  },
  {
    url: "/demo/ethereum/nft-hh",
    name: "NFT (Hardhat)",
  },
  {
    url: "/demo/pdf",
    name: "Pdf",
  },
  {
    url: "/demo/mongo",
    name: "Mongo",
  },
  {
    url: "/demo/three-d",
    name: "3D",
  },
];
