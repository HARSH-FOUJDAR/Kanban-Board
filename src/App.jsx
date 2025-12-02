import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import Editable from "./components/Editable";

export default function App() {
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("prac-kanban")) || []);
  const [targetCard, setTargetCard] = useState({ bid: "", cid: "" });

  const addBoard = (name) => setBoards([...boards, { id: Date.now(), title: name, cards: [] }]);
  const removeBoard = (id) => setBoards(boards.filter((b) => b.id !== id));
  const addCard = (bid, title) =>
    setBoards(
      boards.map((b) => (b.id === bid ? { ...b, cards: [...b.cards, { id: Date.now(), title, labels: [], date: "", tasks: [] }] } : b))
    );
  const removeCard = (bid, cid) =>
    setBoards(boards.map((b) => (b.id === bid ? { ...b, cards: b.cards.filter((c) => c.id !== cid) } : b)));
  const updateCard = (bid, cid, card) =>
    setBoards(boards.map((b) => (b.id === bid ? { ...b, cards: b.cards.map((c) => (c.id === cid ? card : c)) } : b)));

  const dragEntered = (bid, cid) => targetCard.cid !== cid && setTargetCard({ bid, cid });
  const dragEnded = (bid, cid) => {
    const sBoardIndex = boards.findIndex((b) => b.id === bid);
    const sCardIndex = boards[sBoardIndex]?.cards?.findIndex((c) => c.id === cid);
    const tBoardIndex = boards.findIndex((b) => b.id === targetCard.bid);
    const tCardIndex = boards[tBoardIndex]?.cards?.findIndex((c) => c.id === targetCard.cid);
    if ([sBoardIndex, sCardIndex, tBoardIndex, tCardIndex].some((i) => i < 0)) return;
    const temp = [...boards];
    const [moved] = temp[sBoardIndex].cards.splice(sCardIndex, 1);
    temp[tBoardIndex].cards.splice(tCardIndex, 0, moved);
    setBoards(temp);
    setTargetCard({ bid: "", cid: "" });
  };

  useEffect(() => localStorage.setItem("prac-kanban", JSON.stringify(boards)), [boards]);

  return (
    <div className="flex flex-col w-full h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900 shadow-md border-b py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#fff]">Kanban Board</h1>
      </header>

      {/* Boards wrapper */}
      <main className="flex-1 overflow-x-auto py-4 px-6 bg-orange-50">
        <div className="flex gap-4 w-fit max-h-[85vh] rounded-full mt-60">
          {boards.map((b) => (
            <Board
              key={b.id}
              board={b}
              addCard={addCard}
              removeBoard={() => removeBoard(b.id)}
              removeCard={removeCard}
              dragEntered={dragEntered}
              dragEnded={dragEnded}
              updateCard={updateCard}
            />
          ))}

          {/* Add new board */}
          <div className="min-w-[260px]">
            <Editable
              displayClass="bg-indigo-100 text-indigo-700 shadow border border-indigo-200 rounded-lg text-center py-2 cursor-pointer hover:bg-indigo-200 font-medium"
              editClass="bg-white shadow rounded-lg p-2"
              placeholder="Enter Board Name"
              text="+ Add Board"
              buttonText="Add Board"
              onSubmit={addBoard}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
