import * as THREE from "three";

interface IProps {
  dims: any;
  position: any;
}

export const Bulb = (props: IProps) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={props.dims} />
      <meshPhongMaterial emissive={new THREE.Color(0xff0000)} />
    </mesh>
  );
};
