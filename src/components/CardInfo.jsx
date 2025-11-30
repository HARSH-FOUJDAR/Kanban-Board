import React, { useEffect, useState } from "react";
import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  X,
} from "react-feather";
import Modal from "./Modal";
import Editable from "./Editable";

const CardInfo = ({ card, boardId, updateCard, onClose }) => {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];
  const [selectedColor, setSelectedColor] = useState();
  const [values, setValues] = useState({ ...card });

  const updateTitle = (v) => setValues({ ...values, title: v });
  const updateDesc = (v) => setValues({ ...values, desc: v });
  const addLabel = (label) => {
    if (values.labels.findIndex((item) => item.text === label.text) > -1)
      return;
    setSelectedColor("");
    setValues({ ...values, labels: [...values.labels, label] });
  };
  const removeLabel = (label) =>
    setValues({
      ...values,
      labels: values.labels.filter((item) => item.text !== label.text),
    });
  const addTask = (text) =>
    setValues({
      ...values,
      tasks: [...values.tasks, { id: Date.now(), text, completed: false }],
    });
  const removeTask = (id) =>
    setValues({ ...values, tasks: values.tasks.filter((t) => t.id !== id) });
  const updateTask = (id, completed) => {
    const tasks = values.tasks.map((t) =>
      t.id === id ? { ...t, completed } : t
    );
    setValues({ ...values, tasks });
  };
  const calculatePercent = () =>
    values.tasks.length
      ? (values.tasks.filter((t) => t.completed).length / values.tasks.length) *
        100
      : 0;
  const updateDate = (date) => date && setValues({ ...values, date });

  useEffect(() => {
    if (updateCard) updateCard(boardId, values.id, values);
  }, [values]);

  return (
    <Modal onClose={onClose}>
      <div className="p-8 w-full max-w-[650px] bg-white rounded-xl shadow-xl flex flex-col gap-8 font-sans">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-yellow-600" />
            <h2 className="text-lg font-bold text-gray-800">Title</h2>
          </div>
          <Editable
            defaultValue={values.title}
            text={values.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
            displayClass="border-b border-gray-300 focus:border-yellow-500 outline-none text-lg px-2 py-1 w-full"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <List className="w-5 h-5 text-yellow-600" />
            <h2 className="text-lg font-bold text-gray-800">Description</h2>
          </div>
          <Editable
            defaultValue={values.desc}
            text={values.desc || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
            displayClass="border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-yellow-600" />
            <h2 className="text-lg font-bold text-gray-800">Date</h2>
          </div>
          <input
            type="date"
            defaultValue={values.date}
            min={new Date().toISOString().substr(0, 10)}
            className="border border-gray-300 rounded-md px-4 py-2 text-lg outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) => updateDate(e.target.value)}
          />
        </div>

        {/* Labels */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-yellow-600" />
            <h2 className="text-lg font-bold text-gray-800">Labels</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {values.labels.map((l, i) => (
              <label
                key={i}
                className="px-3 py-1 rounded-full flex items-center gap-2 shadow-md text-white text-sm"
                style={{ backgroundColor: l.color }}
              >
                {l.text}
                <X
                  className="w-4 h-4 cursor-pointer hover:text-red-300 transition"
                  onClick={() => removeLabel(l)}
                />
              </label>
            ))}
          </div>
          <ul className="flex gap-3 mt-2">
            {colors.map((c, i) => (
              <li
                key={i}
                style={{ backgroundColor: c }}
                onClick={() => setSelectedColor(c)}
                className={`w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-110 ${
                  selectedColor === c ? "ring-4 ring-yellow-400" : ""
                }`}
              />
            ))}
          </ul>
          <Editable
            text="Add Label"
            placeholder="Enter label text"
            onSubmit={(v) => addLabel({ color: selectedColor, text: v })}
            displayClass="w-full border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>

        {/* Tasks */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-yellow-600" />
            <h2 className="text-lg font-bold text-gray-800">Tasks</h2>
          </div>
          <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full transition-all rounded-full"
              style={{
                width: `${calculatePercent()}%`,
                backgroundColor:
                  calculatePercent() === 100 ? "#16a34a" : "#f59e0b",
              }}
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {values.tasks.map((t) => (
              <div key={t.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer accent-yellow-500"
                  defaultChecked={t.completed}
                  onChange={(e) => updateTask(t.id, e.target.checked)}
                />
                <p
                  className={`flex-1 text-sm ${
                    t.completed ? "line-through text-gray-400" : "text-gray-700"
                  }`}
                >
                  {t.text}
                </p>
                <Trash
                  className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-600 transition"
                  onClick={() => removeTask(t.id)}
                />
              </div>
            ))}
          </div>
          <Editable
            text="Add a Task"
            placeholder="Enter task"
            onSubmit={addTask}
            displayClass="w-full border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>
      </div>
    </Modal>
  );
};

export default CardInfo;
