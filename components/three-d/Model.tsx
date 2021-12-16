import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface Props {
  path: string;
  [x: string]: any;
}

// https://sketchfab.com/
const Model = ({ path, ...props }: Props) => {
  //console.log("props", props);

  const model = useLoader(GLTFLoader, path);

  return <primitive object={model.scene} {...props} />;
};

export default Model;
