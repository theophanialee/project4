import React from "react";

export default function ListsPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Lists */}
      <div className="flex items-center justify-between bg-neutral-500 p-4 h-1/3 w-full">
        <h1 className="text-2xl font-bold">Top Lists</h1>
        <div className="flex overflow-x-auto">
          {/* Add your top list containers here */}
        </div>
      </div>

      {/* All Lists */}
      <div className="flex flex-wrap justify-around p-4 flex-grow h-2/3">
        All other lists
      </div>
    </div>
  );
}
