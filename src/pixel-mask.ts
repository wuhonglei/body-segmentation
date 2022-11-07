import * as bodySegmentation from "@tensorflow-models/body-segmentation";
import "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/selfie_segmentation";

const model = bodySegmentation.SupportedModels.BodyPix;
const segmenter = await bodySegmentation.createSegmenter(model);

const realImg: HTMLImageElement = document.querySelector("#real")!;

const segmentation = await segmenter.segmentPeople(realImg, {
  multiSegmentation: false,
  segmentBodyParts: true,
});
const opacity = 0.8;
const flipHorizontal = false;
const maskBlurAmount = 0;
const pixelCellWidth = 5;
const canvas = document.querySelector("#virtual") as HTMLCanvasElement;

/**
 * bodySegmentation.bodyPixMaskValueToRainbowColor 函数输出身体某部位大颜色值
 */
const coloredPartImage = await bodySegmentation.toColoredMask(
  segmentation,
  bodySegmentation.bodyPixMaskValueToRainbowColor,
  { r: 255, g: 255, b: 255, a: 255 }
);
await bodySegmentation.drawPixelatedMask(
  canvas,
  realImg,
  coloredPartImage,
  opacity,
  maskBlurAmount,
  flipHorizontal,
  pixelCellWidth
);
