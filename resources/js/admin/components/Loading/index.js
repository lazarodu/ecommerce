import React from "react";
import Lottie from "react-lottie";
import loadingLottie from "../../lotties/work-from-home.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Loading = () => {
  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default Loading;
