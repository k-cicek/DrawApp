import { useEffect, useRef, useState } from "react";
import "./App.css";
import { FaEraser, FaTimes, FaUndo } from "react-icons/fa";

function App() {
  //canvasRef çizim yapılacak olan canvas elementine referans oluyor.
  const canvasRef = useRef(null);

  //çizim durumunu tutan state
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [brushSize, setBrushSize] = useState(2);
  const [brushColor, setBrushColor] = useState("#000000");
  const [isEraser, setEraser] = useState(false);
  const [drawHistory, setDrawHistory] = useState([]);

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

    // Eraser modu ise rengi beyaz olarak ayarla
    context.strokeStyle = isEraser ? "white" : brushColor;
    setIsDrawing(true);

    // Çizim geçmişini temizle
    setDrawHistory([]);
  };

  //Fare hareket ettirildiğinde çizim devam eder.
  const draw = (e) => {
    if (!isDrawing || !context) return;
    const { offsetX, offsetY } = e.nativeEvent;

    context.lineWidth = brushSize; //kalem boyutu ayarlanır.
    context.lineCap = "round"; // Çizgi uçları yuvarlak olsun

    // Eraser modu ise rengi beyaz olarak ayarla
    context.strokeStyle = isEraser ? "white" : brushColor;

    context.lineTo(offsetX, offsetY);
    context.stroke();

    //çizim adımını kaydet
    setDrawHistory((prev) => [
      ...prev,
      context.getImageData(0, 0, context.canvas.width, context.canvas.height),
    ]);
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

    // Eraser modu açıkken, kalem rengini beyaz yap ve modu kapat
    if (isEraser) {
      ctx.strokeStyle = "white";
      setEraser(false); // Eraser modunu kapat
    }

    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Temizlenmiş canvas'ı beyaz renkle doldur
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Canvas temizlendiğinde çizim adımlarını temizler
    setDrawHistory([]);
  };

  const undoDraw = () => {
    if (drawHistory.length > 1) {
      //son çizim adımını sil
      drawHistory.pop();
      //canvas'ı temizle
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      //çizim adımlarını geri al
      context.putImageData(drawHistory[drawHistory.length - 1], 0, 0);
    } else {
      //Geri alınacak çizim adımı kalmadıysa canvas'ı temizle
      clearCanvas();
    }
  };

  return (
    <div className="">
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
      <div className="flex flex-row justify-between">
        <div>
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
        </div>
        <div>
          <label htmlFor="brushColor">Pen Color:</label>
          <input
            type="color"
            id="brushColor"
            name="brushColor"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
          />
        </div>

        <button onClick={toggleEraser}>
          <FaEraser />
        </button>
        <button onClick={clearCanvas}>
          <FaTimes />
        </button>
        <button onClick={undoDraw}>
          <FaUndo />
        </button>
      </div>
    </div>
  );
}

export default App;
