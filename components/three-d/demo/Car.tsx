import React, { Suspense } from "react";
import Draggable from "./Dragable";

import Model from "./Model";

interface Props {}

const Car = (props: Props) => {
  return (
    <Suspense fallback={null}>
      <Draggable transformGroup>
        <Model
          path="/images/tesla_model_3/scene.gltf"
          scale={new Array(3).fill(0.01)}
        />
      </Draggable>
    </Suspense>
  );
};

export default Car;
