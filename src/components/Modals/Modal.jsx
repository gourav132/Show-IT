import React from "react";

export default function Modal() {
  return (
    <div className="h-screen w-full absolute top-0 left-0 z-10 bg-black/70 flex justify-center items-center">
      <div className="px-8 py-8 bg-zinc-800 rounded-xl">
        <h1 className="font-light text-xl">
          Are you sure you want to save the changes?
        </h1>
        <p className="mt-2 text-sm tracking-tighter text-gray-400">
          once changed you can't go back to the previous version
        </p>
        <div className="w-full flex gap-4 mt-4 justify-end">
          <button className="block px-4 py-2 font-semibold text-sm bg-gray-500 hover:bg-gray-600 transition-colors rounded">
            Cancel
          </button>
          <button className="block px-4 py-2 font-semibold text-sm bg-green-500 hover:bg-green-600 transition-colors rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
