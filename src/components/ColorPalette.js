import React from "react";

const ColorPalette = ({ colorPalette, brushColor, setBrushColor }) => {
  return (
    <div className="flex space-x-2 py-3">
      {colorPalette.map((color, index) => (
        <button
          key={index}
          className="w-7 h-7 rounded-full text-[#B99470]"
          style={{
            backgroundColor: color,
            border: brushColor === color ? "2px solid #B99470" : "none",
          }}
          onClick={() => setBrushColor(color)}
        ></button>
      ))}
      <input
        type="color"
        id="brushColor"
        name="brushColor"
        value={brushColor}
        onChange={(e) => setBrushColor(e.target.value)}
      />
    </div>
  );
};

export default ColorPalette;
