import * as bodySegmentation from "@tensorflow-models/body-segmentation";
import "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/selfie_segmentation";

const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
const segmenterConfig = {
  runtime: "mediapipe",
  solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation",
  modelType: "general",
} as const;

const segmenter = await bodySegmentation.createSegmenter(
  model,
  segmenterConfig
);

const realImg: HTMLImageElement = document.querySelector("#real")!;

const segmentation = await segmenter.segmentPeople(realImg);
const opacity = 0.5;
const flipHorizontal = false;
const maskBlurAmount = 5;
const canvas = document.querySelector("#virtual") as HTMLCanvasElement;

const coloredPartImage = await bodySegmentation.toBinaryMask(segmentation);
bodySegmentation.drawMask(
  canvas,
  realImg,
  coloredPartImage,
  opacity,
  maskBlurAmount,
  flipHorizontal
);
