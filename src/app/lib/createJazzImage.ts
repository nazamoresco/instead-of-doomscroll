import { Account, Group } from "jazz-tools";
import { createImage } from "jazz-tools/media";
import { DoodleCanvasRef } from "../components/DoodleCanvas";

export type CreateJazzImageOptions = {
  owner?: Group | Account;
  placeholder?: "blur" | false;
  maxSize?: number;
  progressive?: boolean;
};

export async function createJazzImage(
  canvas: DoodleCanvasRef | null,
  options: CreateJazzImageOptions = {},
) {
  if (!canvas) return;
  const dataUrl = canvas?.getCanvasData();
  if (!dataUrl) return;

  const blob = await (await fetch(dataUrl)).blob();
  const image = await createImage(blob, {
    owner: options.owner,
    maxSize: options.maxSize,
    progressive: options.progressive,
  });
  return image;
}
