import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import { Layout } from "../../../components/common";

interface Props {}

const Auth = (props: Props) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center mt-12 space-y-3">
          <h1>Auth</h1>
          <p>Signed in as {session?.user?.email} </p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
          >
            Sign out
          </button>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center mt-12 space-y-3">
        <p>Not Signed In</p>
        <button
          onClick={() => signIn()}
          className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
        >
          Sign in
        </button>
      </div>
    </Layout>
  );
};

export default Auth;
