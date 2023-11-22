import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  //canvasRef çizim yapılacak olan canvas elementine referans oluyor.
  const canvasRef = useRef(null);

  //çizim durumunu tutan state
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

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
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  //Fare tuşu bırakıldığında veya canvas elementinden çıkıldığında çizim biter.
  const finishDrawing = () => {
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
        onMouseOut={finishDrawing}
      ></canvas>
    </div>
  );
}

export default App;
