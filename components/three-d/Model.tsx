import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface Props {
  path: string;
  [x: string]: any;
}

const Model = ({ path, ...props }: Props) => {
  const model = useLoader(GLTFLoader, path);

  return <primitive object={model.scene} {...props} />;
};

export default Model;
