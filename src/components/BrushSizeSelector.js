import React from "react";
import {
  PiPencilCircleThin,
  PiPencilCircleLight,
  PiPencilCircleFill,
} from "react-icons/pi";

const BrushSizeSelector = ({ brushSize, setBrushSize, setEraser }) => {
  return (
    <div className="flex space-x-2">
      {[
        { size: 2, icon: <PiPencilCircleThin size={26} /> },
        { size: 5, icon: <PiPencilCircleLight size={26} /> },
        { size: 10, icon: <PiPencilCircleFill size={26} /> },
      ].map((item) => (
        <button
          key={item.size}
          className={`bg-[#FEFAE0] p-4 rounded-full text-[#B99470] ${
            brushSize === item.size
          }`}
          onClick={() => {
            setBrushSize(2);
            setEraser(false);
          }}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export default BrushSizeSelector;
