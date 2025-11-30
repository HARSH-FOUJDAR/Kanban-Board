import React, { useEffect, useRef } from "react";

function Dropdown(props) {
  const dropdownRef = useRef();

  const handleClick = (event) => {
    if (
      dropdownRef &&
      !dropdownRef.current?.contains(event.target) &&
      props.onClose
    ) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`
        absolute right-0 top-full bg-white rounded-2xl 
        min-w-[120px] max-w-[250px] max-h-[400px] w-fit h-fit 
        overflow-y-auto z-50 shadow-xl border border-gray-200 p-2
        animate-scale transition-transform duration-200
        ${props.class || ""}
      `}
    >
      {props.children}
    </div>
  );
}

export default Dropdown;
