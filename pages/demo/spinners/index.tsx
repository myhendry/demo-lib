import React from "react";

import { Layout } from "../../../components/common";

interface Props {}

const SpinnerLab = (props: Props) => {
  return (
    <Layout>
      <h1>Spinners</h1>
      <style>
        {`
		.loader {
		border-top-color: #3498db;
		-webkit-animation: spinner 1.5s linear infinite;
		animation: spinner 1.5s linear infinite;
		}

		@-webkit-keyframes spinner {
		0% {
		-webkit-transform: rotate(0deg);
		}
		100% {
		-webkit-transform: rotate(360deg);
		}
		}

		@keyframes spinner {
		0% {
		transform: rotate(0deg);
		}
		100% {
		transform: rotate(360deg);
		}
		}
	`}
      </style>
      <div className="flex flex-col justify-center items-center">
        <p>Spinner 1</p>
        <div
          className="
		loader
		ease-linear
		rounded-full
		border-8 border-t-8 border-gray-200
		h-32
		w-32
			"
        ></div>
        <p>Spinner 2</p>
        <div
          className="
      animate-spin
      rounded-full
      h-32
      w-32
      border-t-2 border-b-2 border-purple-500
    "
        ></div>
        <p>Spinner 3</p>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    </Layout>
  );
};

export default SpinnerLab;
