"use client";
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import rough from "roughjs/bundled/rough.esm.js";

export declare class DoodleCanvasRef {
  getCanvasData: () => string | null;
  clear: () => void;
}

export const DoodleCanvas = forwardRef(function DoodleCanvas(_, ref) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [points, setPoints] = useState([] as {x1: number, y1: number, x2: number, y2: number}[]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const rc = rough.svg(svg);

    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    points.forEach((point) => {
      const line = rc.line(point.x1, point.y1, point.x2, point.y2, {stroke: 'currentColor'});
      svg.appendChild(line);
    });
  }, [points]);

  useImperativeHandle(ref, () => ({
    getCanvasData: () => {
      if (!svgRef.current) return null;
      svgRef.current.setAttribute("viewBox", `0 0 ${svgRef.current.getAttribute("width")} ${svgRef.current.getAttribute("height")}`);
      svgRef.current.removeAttribute("width");
      svgRef.current.removeAttribute("height");
      const svgString = new XMLSerializer().serializeToString(svgRef.current);
      return "data:image/svg+xml;base64," + btoa(svgString);
    },
    clear: () => {
        setPoints([]);
    }
  }));

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if(!svgRef.current) return;
    setDrawing(true);
    const { clientX, clientY } = e;
    const { left, top } = svgRef.current.getBoundingClientRect();
    setPoints([...points, { x1: clientX - left, y1: clientY - top, x2: clientX - left, y2: clientY - top }]);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    if (!drawing) return;
    const { clientX, clientY } = e;
    const { left, top } = svgRef.current.getBoundingClientRect();
    const newPoints = [...points];
    const lastPoint = newPoints[newPoints.length - 1];
    lastPoint.x2 = clientX - left;
    lastPoint.y2 = clientY - top;
    setPoints(newPoints);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <div className="border mt-4"> 
      <svg
        ref={svgRef}
        width={512}
        height={512}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
});
