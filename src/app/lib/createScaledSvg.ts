import rough from "roughjs/bundled/rough.esm.js";

type Point = { x1: number; y1: number; x2: number; y2: number };

export function createScaledSvg(
  points: Point[],
  dimensions: { width: number; height: number },
  targetSize: number,
): SVGSVGElement | null {
  const { width, height } = dimensions;
  if (width === 0 || height === 0) {
    return null;
  }

  const scaledSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  scaledSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  scaledSvg.setAttribute("width", String(targetSize));
  scaledSvg.setAttribute("height", String(targetSize));
  scaledSvg.setAttribute("viewBox", `0 0 ${targetSize} ${targetSize}`);

  const rc = rough.svg(scaledSvg);
  const scaleX = targetSize / width;
  const scaleY = targetSize / height;

  points.forEach((point) => {
    const line = rc.line(
      point.x1 * scaleX,
      point.y1 * scaleY,
      point.x2 * scaleX,
      point.y2 * scaleY,
      {
        stroke: "currentColor",
      },
    );
    scaledSvg.appendChild(line);
  });

  scaledSvg.removeAttribute("width");
  scaledSvg.removeAttribute("height");

  return scaledSvg;
}
