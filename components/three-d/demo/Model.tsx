import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface Props {
  path: string;
  scale: any;
  [x: string]: any;
}

// https://sketchfab.com/
const Model = ({ path, ...props }: Props) => {
  //console.log("props", props);

  const model = useLoader(GLTFLoader, path);

  return <primitive object={model.scene} scale={props.scale} {...props} />;
};

export default Model;
