import { GetStaticProps } from "next";
import Link from "next/link";

import { Layout } from "../../../components/common";

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface IProps {
  users: IUser[];
}

const Static: React.FC<IProps> = ({ users }) => {
  return (
    <Layout>
      {users.map((u) => (
        <div key={u.id}>
          <Link href={`/static/${u.id}`}>
            <a>
              {u.id.toString()} {u.name}
            </a>
          </Link>
        </div>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return {
    props: {
      users,
    },
  };
};

export default Static;
