import React from "react";
import Image from "next/image";

import { Layout } from "../../../components/common";

interface Props {}

const PicsLab = (props: Props) => {
  return (
    <Layout>
      <h1>Images</h1>
      <div className="h-screen bg-yellow-300">
        <Image
          src={
            "https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2146&q=80"
          }
          height="fill"
          width="fill"
        />
      </div>
    </Layout>
  );
};

export default PicsLab;
