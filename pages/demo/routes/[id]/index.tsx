import React from "react";
import { useRouter } from "next/router";

import { Layout } from "../../../../components/common";

interface Props {}

const Index = (props: Props) => {
  const { query } = useRouter();

  let recordId: string | undefined;
  recordId = query.id as string;
  if (!recordId && typeof window !== "undefined") {
    recordId = window.location.pathname.split("/").pop();
  }

  return (
    <Layout>
      <div className="flex justify-center text-center mt-12">
        <p>{recordId}</p>
      </div>
    </Layout>
  );
};

export default Index;
