import React from "react";

const Rules = ({ onNextStep }: any) => {
  return (
    <div className="flex h-96 w-1/3 flex-col justify-between rounded-lg border border-slate-400 p-7">
      <h1 className="text-2xl font-bold text-black">Teams</h1>
      <div className="flex flex-row">
        <div className="flex flex-col space-y-2">
          <p>Number of Teams</p> <input type="text" placeholder="Placeholder" />
          <div className="flex space-x-2">
            <button className="rounded-full border px-1">4</button>
            <button className="rounded-full border px-1">8</button>
            <button className="rounded-full border px-1">16</button>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <p>Teams Per group</p>
          <input type="text" placeholder="Placeholder" />
          <div className="flex space-x-2">
            <button className="rounded-full border px-1">4</button>
            <button className="rounded-full border px-1">8</button>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <p>Qualified Teams</p>
          <input type="text" placeholder="Placeholder" />
          <div className="flex space-x-2">
            <button className="rounded-full border px-1">2</button>
            <button className="rounded-full border px-1">3</button>
          </div>
        </div>
      </div>
      <p className="w-full border-b border-slate-400 text-xl font-bold text-black">
        Points Calculations
      </p>
      <p className="w-full border-b border-slate-400 text-xl font-bold text-black">
        Matching Type
      </p>
    </div>
  );
};

export default Rules;
