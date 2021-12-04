import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import { Layout } from "../../../components/common";

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

const Static: React.FC<IUser> = ({ user }: any) => {
  return (
    <Layout>
      <p>{user.name}</p>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${context.params!.id}`
  );
  const user = await res.json();
  return {
    props: {
      user,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  const ids = users.map((user: IUser) => user.id);
  //! id needs to be in string format
  const paths = ids.map((id: number) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export default Static;
