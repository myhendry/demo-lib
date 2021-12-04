import React, { useRef, useEffect } from "react";
import { NextPage } from "next";

import { Layout } from "../../../components/common";

const CanvasHome: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    context!.fillStyle = "#000000";
    context!.fillRect(0, 0, context!.canvas.width, context!.canvas.height);
  }, []);
  return (
    <Layout>
      <canvas ref={canvasRef} />
    </Layout>
  );
};

export default CanvasHome;
