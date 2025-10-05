"use client";
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import rough from "roughjs/bundled/rough.esm.js";

export const DoodleCanvas = forwardRef(function DoodleCanvas(_, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach((point) => {
      rc.line(point.x1, point.y1, point.x2, point.y2);
    });
  }, [points]);

  useImperativeHandle(ref, () => ({
    toDataURL: () => {
      if (!canvasRef.current) return null;
      return canvasRef.current.toDataURL();
    },
    clear: () => {
      setPoints([]);
    }
  }));

  const handleMouseDown = (e) => {
    if(!canvasRef.current) return;
    setDrawing(true);
    const { clientX, clientY } = e;
    const { left, top } = canvasRef.current.getBoundingClientRect();
    setPoints([...points, { x1: clientX - left, y1: clientY - top, x2: clientX - left, y2: clientY - top }]);
  };

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    if (!drawing) return;
    const { clientX, clientY } = e;
    const { left, top } = canvasRef.current.getBoundingClientRect();
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
    <canvas
      ref={canvasRef}
      width={512}
      height={512}
      className="border mt-4"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
});
