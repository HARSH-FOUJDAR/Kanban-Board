import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Editable from "./Editable";
import Card from "./CardInfo";

const Board = ({
  board,
  removeBoard,
  removeCard,
  dragEntered,
  dragEnded,
  updateCard,
  addCard,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-w-[300px] w-[300px] bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex flex-col gap-4 transition-all hover:-translate-y-1 hover:shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg flex items-center gap-2 text-gray-800">
          {board?.title}
          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-sm">
            {board?.cards?.length || 0}
          </span>
        </p>

        {/* Dropdown */}
        <div className="relative">
          <button
            className="p-2 rounded-lg hover:bg-gray-200 transition"
            onClick={() => setOpen(!open)}
          >
            <MoreHorizontal className="text-gray-600" />
          </button>

          {open && (
            <div className="absolute right-0 top-10 bg-white shadow-xl  relative w-44 rounded-lg p-3 animate-scale">
              <button
                onClick={() => {
                  removeBoard();
                  setOpen(false);
                }}
                className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded-md text-red-500 font-medium"
              >
                Delete Board
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="bg-white/70 p-3 rounded-xl border border-gray-100 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
        {board?.cards?.map((card) => (
          <Card
            key={card.id}
            card={card}
            boardId={board.id}
            removeCard={removeCard}
            dragEntered={dragEntered}
            dragEnded={dragEnded}
            updateCard={updateCard}
          />
        ))}

        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="w-full text-center bg-indigo-50 text-indigo-700 py-3 rounded-lg shadow hover:bg-indigo-100 cursor-pointer font-medium"
          editClass="w-full bg-white p-3 rounded-lg shadow"
          onSubmit={(value) => addCard(board?.id, value)}
        />
      </div>
    </div>
  );
};

export default Board;
