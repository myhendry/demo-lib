import React, { createContext, useContext } from "react";

interface IPerson {
  name: string;
  age: number;
}

type PrintMessage = () => void;

type ContextType = {
  text: string;
  persons: IPerson[];
  print: PrintMessage;
};

const DemoContext = createContext<ContextType>({
  text: "",
  persons: [],
  print: () => {},
});

const DemoContextProvider: React.FC = ({ children }) => {
  return (
    <DemoContext.Provider
      value={{ text: "hello", persons, print: printMessage }}
    >
      {children}
    </DemoContext.Provider>
  );
};

const useDemoContext = () => {
  return useContext(DemoContext);
};

const printMessage = () => {
  console.log("Hello World");
};

const persons = [
  {
    name: "Jerry",
    age: 26,
  },
  {
    name: "Sally",
    age: 30,
  },
];

export { DemoContextProvider, useDemoContext };
