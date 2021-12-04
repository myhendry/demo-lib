import React from "react";
import Head from "next/head";

import { Header } from "./header";

const Layout = ({ children, title = "Kitchen HQ" }: any) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
      </Head>
      <Header />
      <div className="container">{children}</div>
    </>
  );
};

export { Layout };
