import { useEffect, useRef, useState } from "react";
import "./App.css";
import { FaEraser, FaTimes } from "react-icons/fa";

function App() {
  //canvasRef çizim yapılacak olan canvas elementine referans oluyor.
  const canvasRef = useRef(null);

  //çizim durumunu tutan state
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [brushSize, setBrushSize] = useState(2);
  const [brushColor, setBrushColor] = useState("#000000");
  const [isEraser, setEraser] = useState(false);

  //canvas elementine erişilir ve context state'ine atanır.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setContext(ctx);

    //canvas elementinin arkaplan rengi ayarlanır.
    ctx.fillStyle = "white";
    //canvas elementinin boyutları ayarlanır.
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  //Fare tuşuna basıldığında çizime başlanır.
  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    context.globalCompositeOperation = isEraser
      ? "destination-out"
      : "source-over";
    setIsDrawing(true);
  };

  //Fare hareket ettirildiğinde çizim devam eder.
  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;

    //kalem boyutu ayarlanır.
    context.lineWidth = brushSize;

    //Eraser aktif ise kalem rengi beyaz yapılır.
    if (isEraser) {
      context.globalCompositeOperation = "destination-out";
      context.strokeStyle = "white";
    } else {
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = brushColor;
    }

    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  //Fare tuşu bırakıldığında veya canvas elementinden çıkıldığında çizim biter.
  const finishDrawing = () => {
    context.closePath();
    setIsDrawing(false);
  };

  //Eraser aktif ise kalem rengi beyaz yapılır.
  const toggleEraser = () => {
    setEraser(!isEraser);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = isEraser ? "destination-out" : "source-over";

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "source-over";

    setEraser(false);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
      <button onClick={toggleEraser}>
        <FaEraser />
      </button>
      <button onClick={clearCanvas}>
        <FaTimes />
      </button>
    </div>
  );
}

export default App;
