import * as bodySegmentation from "@tensorflow-models/body-segmentation";
import "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/selfie_segmentation";

const model = bodySegmentation.SupportedModels.BodyPix;
const segmenter = await bodySegmentation.createSegmenter(model);

const realImg: HTMLImageElement = document.querySelector("#real")!;
const canvas = document.querySelector("#virtual") as HTMLCanvasElement;

const segmentation = await segmenter.segmentPeople(realImg, {
  multiSegmentation: false,
  segmentBodyParts: true,
  maxDetections: 1,
});
const foregroundThreshold = 0.5;
const backgroundBlurAmount = 3;
const edgeBlurAmount = 3;
const flipHorizontal = false;
const faceBodyPartIdsToBlur = [0, 1];

await bodySegmentation.blurBodyPart(
  canvas,
  realImg,
  segmentation,
  faceBodyPartIdsToBlur,
  foregroundThreshold,
  backgroundBlurAmount,
  edgeBlurAmount,
  flipHorizontal
);
