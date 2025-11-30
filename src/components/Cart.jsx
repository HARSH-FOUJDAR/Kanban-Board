import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Dropdown from "./Dropdown";
import CardInfo from "./CardInfo";
import Chip from "./Chip";

const Card = ({
  card,
  boardId,
  removeCard,
  dragEntered,
  dragEnded,
  updateCard,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id, title, date, tasks, labels } = card;

  const formatDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${d.getDate()} ${months[d.getMonth()]}`;
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={card}
          boardId={boardId}
          updateCard={updateCard}
        />
      )}

      <div
        className="p-4 flex flex-col gap-3 bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer"
        draggable
        onDragEnd={() => dragEnded(boardId, id)}
        onDragEnter={() => dragEntered(boardId, id)}
        onClick={() => setShowModal(true)}
      >
        {/* Labels + Dropdown */}
        <div className="flex justify-between items-start">
          <div className="flex flex-wrap gap-2">
            {labels?.map((item, idx) => (
              <Chip key={idx} text={item.text} color={item.color} />
            ))}
          </div>

          <div
            className="relative p-1 rounded-full hover:bg-gray-100 transition"
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
          >
            <MoreHorizontal className="text-gray-500" />
            {showDropdown && (
              <Dropdown
                className="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p
                  onClick={() => removeCard(boardId, id)}
                  className="px-2 py-1 hover:bg-red-50 hover:text-red-600 rounded-md cursor-pointer font-medium"
                >
                  Delete Card
                </p>
              </Dropdown>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="text-gray-800 font-semibold text-[1rem] leading-6 truncate">
          {title}
        </div>

        {/* Footer: Date & Tasks */}
        <div className="flex gap-2 mt-2">
          {date && (
            <div className="flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
              <Clock className="h-4 w-4" />
              {formatDate(date)}
            </div>
          )}

          {tasks?.length > 0 && (
            <div className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              <CheckSquare className="h-4 w-4" />
              {tasks.filter((t) => t.completed).length}/{tasks.length}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
