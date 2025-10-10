export function serializeSvg(svg: SVGSVGElement | null): string | null{
  if (!svg) return null;
  const svgString = new XMLSerializer().serializeToString(svg);
  return "data:image/svg+xml;base64," + btoa(svgString);
}