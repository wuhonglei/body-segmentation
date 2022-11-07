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
const maskImg: HTMLImageElement = document.querySelector("#mask")!;

const segmentation = await segmenter.segmentPeople(realImg);

function getImgUrl(imgData: ImageData): string {
  const canvas = document.createElement("canvas");
  canvas.width = imgData.width;
  canvas.height = imgData.height;

  const ctx = canvas.getContext("2d")!;
  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL("image/png");
}

const coloredPartImage = await bodySegmentation.toBinaryMask(segmentation);
maskImg.src = getImgUrl(coloredPartImage);
