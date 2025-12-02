import React from "react";

function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn"
      onClick={() => onClose && onClose()}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-h-[95vh] w-full max-w-2xl overflow-y-auto p-6
          scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 transition-transform duration-300
          hover:scale-[1.01]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
