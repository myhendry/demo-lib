import React from "react";
import { NextPage, NextPageContext } from "next";
import useSWR from "swr";

import { Layout, Spinner } from "../../../components/common";
import clientPromise from "../../../lib/mongodb";

interface Props {
  attendees: { name: string; age: number }[];
}

const Mongo: NextPage<Props> = ({ attendees }) => {
  const { data, error } = useSWR<{ name: string; age: number }[]>("/api/demo");

  if (error)
    return (
      <Layout>
        <p>Failed to Load Data</p>
      </Layout>
    );

  if (!data)
    return (
      <Layout>
        <Spinner />
      </Layout>
    );

  return (
    <Layout>
      <h1>Client Side using SWR</h1>
      {data?.map((d, i) => (
        <div key={i}>
          {d.name} {d.age}
        </div>
      ))}
      <h1>Server Side using GetServerSideProps</h1>
      {attendees?.map((d, i) => (
        <div key={i}>
          {d.name} {d.age}
        </div>
      ))}
    </Layout>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const client = await clientPromise;
  const db = await client.db();
  const data = await db.collection("sample").find({}).toArray();

  return {
    props: {
      attendees: JSON.parse(JSON.stringify(data)),
    },
  };
};

export default Mongo;
