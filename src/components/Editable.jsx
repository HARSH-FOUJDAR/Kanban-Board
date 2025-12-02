import React, { useState } from "react";
import { X } from "react-feather";

function Editable(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(props.defaultValue || "");

  const submission = (e) => {
    e.preventDefault();
    if (inputText.trim() && props.onSubmit) {
      props.onSubmit(inputText.trim());
      setInputText("");
    }
    setIsEditable(false);
  };

  return (
    <div className="w-full">
      {isEditable ? (
        <form
          className={`flex flex-col gap-3 ${props.editClass || ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={props.placeholder || props.text}
            onChange={(e) => setInputText(e.target.value)}
            autoFocus
            className="border-2 border-indigo-400 focus:ring-2 focus:ring-indigo-300 rounded-xl outline-none text-base p-3 transition-all duration-200 bg-white/90 placeholder-gray-400"
          />

          <div className="flex gap-3 items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 active:translate-y-[2px] transition-all shadow-md"
            >
              {props.buttonText || "Add"}
            </button>

            <X
              onClick={() => setIsEditable(false)}
              className="w-6 h-6 text-gray-500 hover:text-gray-800 cursor-pointer transition-colors"
            />
          </div>
        </form>
      ) : (
        <p
          className={`inline-block px-4 py-2 rounded-xl bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-200 shadow-sm text-gray-800 ${props.displayClass || ""}`}
          onClick={() => setIsEditable(true)}
        >
          {props.text}
        </p>
      )}
    </div>
  );
}

export default Editable;
