import * as THREE from "three";

export const Bulb2 = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial emissive={new THREE.Color(0xff0000)} />
    </mesh>
  );
};
