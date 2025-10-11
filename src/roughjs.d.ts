declare module "roughjs/bundled/rough.esm.js" {
  declare class RoughSvg {
    line(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      options?: { [stroke: string]: string },
    ): SVGElement;

    circle(
      x: number,
      y: number,
      diameter: number,
      options?: { [stroke: string]: string, [fill: string]: string },
    ): SVGElement;
  }

  export function svg(SVGSVGElement): RoughSvg;
}
