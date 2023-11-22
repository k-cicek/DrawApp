import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  //canvasRef çizim yapılacak olan canvas elementine referans oluyor.
  const canvasRef = useRef(null);

  //çizim durumunu tutan state
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [brushSize, setBrushSize] = useState(2);
  const [brushColor, setBrushColor] = useState("#000000");

  //canvas elementine erişilir ve context state'ine atanır.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setContext(ctx);
  });

  //Fare tuşuna basıldığında çizime başlanır.
  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  //Fare hareket ettirildiğinde çizim devam eder.
  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;

    //kalem boyutu ayarlanır.
    context.lineWidth = brushSize;

    //kalem rengi ayarlanır.
    context.strokeStyle = brushColor;

    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  //Fare tuşu bırakıldığında veya canvas elementinden çıkıldığında çizim biter.
  const finishDrawing = () => {
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <div>
      <canvas
        className="cursor-crosshair	border border-solid border-black"
        width={800}
        height={500}
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
        onMouseOut={finishDrawing}
      ></canvas>
      <label htmlFor="brushSize">Pen Size:</label>
      <input
        type="range"
        id="brushSize"
        name="brushSize"
        min="1"
        max="20"
        value={brushSize}
        onChange={(e) => setBrushSize(parseInt(e.target.value))}
      />

      <label htmlFor="brushColor">Pen Color:</label>
      <input
        type="color"
        id="brushColor"
        name="brushColor"
        value={brushColor}
        onChange={(e) => setBrushColor(e.target.value)}
      />
    </div>
  );
}

export default App;
