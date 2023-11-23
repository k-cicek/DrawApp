// CanvasComponent.js
import React, { useEffect } from "react";

const Canvas = ({ startDrawing, draw, finishDrawing, canvasRef }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set initial canvas properties
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [canvasRef]);

  return (
    <canvas
      className="cursor-crosshair shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
      width={700}
      height={500}
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={finishDrawing}
      onMouseOut={finishDrawing}
    ></canvas>
  );
};

export default Canvas;
