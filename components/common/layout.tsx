import React from "react";
import Head from "next/head";

import { Header } from "./header";

const Layout = ({ children, title = "Kitchen HQ" }: any) => {
  return (
    <div className="min-w-min">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
      </Head>
      <Header />
      <div className="container mx-10">{children}</div>
    </div>
  );
};

export { Layout };
