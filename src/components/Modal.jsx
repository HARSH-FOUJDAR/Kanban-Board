import React from "react";

function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={() => onClose && onClose()}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-h-[95vh] overflow-y-auto p-4 
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
