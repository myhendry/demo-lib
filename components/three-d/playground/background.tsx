import { useMemo } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const Background = (props: any) => {
  const texture = useLoader(
    THREE.TextureLoader,
    "/images/lone-road-desert.jpg"
  );

  const { gl } = useThree();

  const formatted = useMemo(
    () =>
      new THREE.WebGLCubeRenderTarget(
        texture.image.height
      ).fromEquirectangularTexture(gl, texture),
    [gl, texture]
  );

  return <primitive attach="background" object={formatted.texture} />;
};
