import { useEffect, useRef, useState } from "react";
import "./App.css";
import { FaEraser, FaUndo } from "react-icons/fa";
import Canvas from "./components/Canvas";
import BrushSizeSelector from "./components/BrushSizeSelector";
import ColorPalette from "./components/ColorPalette";

function App() {
  //canvasRef çizim yapılacak olan canvas elementine referans oluyor.
  const canvasRef = useRef(null);

  //çizim durumunu tutan state
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [brushSize, setBrushSize] = useState(2);
  const [brushColor, setBrushColor] = useState("#3A4D39");
  const [isEraser, setEraser] = useState(false);
  const [drawHistory, setDrawHistory] = useState([]);

  const colorPalette = ["#F9B572", "#A9B388", "#FEFAE0", "#B99470"];

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
      <div className="flex justify-between items-center my-2">
        <button
          className="bg-[#FEFAE0] px-4 py-2 rounded-full text-[#B99470]"
          onClick={undoDraw}
        >
          <FaUndo />
        </button>
        <button
          className="bg-[#FEFAE0] px-4 py-2 rounded-full text-[#B99470]"
          onClick={clearCanvas}
        >
          Clear All
        </button>
      </div>
      <Canvas
        startDrawing={startDrawing}
        draw={draw}
        finishDrawing={finishDrawing}
        canvasRef={canvasRef}
        brushSize={brushSize}
        brushColor={brushColor}
        isEraser={isEraser}
      />
      <div className="flex flex-row justify-between py-4 px-2 bg-[#5F6F52]">
        <BrushSizeSelector
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          setEraser={setEraser}
        />

        <ColorPalette
          colorPalette={colorPalette}
          brushColor={brushColor}
          setBrushColor={setBrushColor}
        />
        <div className="flex items-center">
          <button
            className="bg-[#FEFAE0] p-4 rounded-full text-[#B99470]"
            onClick={toggleEraser}
          >
            <FaEraser size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
