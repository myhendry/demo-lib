import React from "react";

import { Layout } from "../../../components/common";
import { useDemoContext } from "./providers";

interface Props {}

/*
Provider wrapped Component in _app.tsx
*/

const Index = (props: Props) => {
  const { text, persons, print } = useDemoContext();
  return (
    <Layout>
      <p>React Context</p>
      <p>{text}</p>
      {persons.map((p, i) => (
        <div key={i}>
          <p>
            {p.name} {p.age}
          </p>
        </div>
      ))}
      {print()}
    </Layout>
  );
};

export default Index;
