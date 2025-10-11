"use client";
import { ImageDefinition } from "jazz-tools";
import { highestResAvailable } from "jazz-tools/media";
import { ReactSVG } from "react-svg";

export function SvgImage({ svg }: { svg: ImageDefinition }) {
  const stream = highestResAvailable(svg, 512, 512)?.image.toBlob();
  const url = stream && URL.createObjectURL(stream);
  if (!url) return null;
  return <ReactSVG src={url} className="w-full max-h-128" />;
}
