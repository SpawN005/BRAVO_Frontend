import React from "react";

const InviteManagers = ({ onNextStep }: any) => {
  return (
    <div className="flex h-64 w-1/3 flex-col justify-center space-y-8 rounded-lg border border-slate-400 p-4 ">
      <h1 className=" text-2xl font-bold text-black">Invite Managers</h1>
      <h1>Share Via Email</h1>
      <input className="mb-10 w-1/2" type="text" placeholder="email" />
    </div>
  );
};

export default InviteManagers;
