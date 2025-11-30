import React from "react";

const Chip = ({ text, color }) => {
  return (
    <span
      className="text-xs px-2 py-1 rounded-full font-semibold shadow-sm transition-all duration-150"
      style={{
        backgroundColor: color || "#e2e8f0",
        color: color ? "#fff" : "#4b5563",
      }}
    >
      {text}
    </span>
  );
};

export default Chip;
