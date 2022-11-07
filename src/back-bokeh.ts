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
const canvas = document.querySelector("#virtual") as HTMLCanvasElement;

const segmentation = await segmenter.segmentPeople(realImg);
const foregroundThreshold = 0.5;
const backgroundBlurAmount = 2;
const edgeBlurAmount = 3;
const flipHorizontal = false;

await bodySegmentation.drawBokehEffect(
  canvas,
  realImg,
  segmentation,
  foregroundThreshold,
  backgroundBlurAmount,
  edgeBlurAmount,
  flipHorizontal
);
