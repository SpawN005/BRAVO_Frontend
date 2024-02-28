"use client";
import React, { useState } from "react";
import Format from "./Format";
import Schedule from "./Schedule";
import Rules from "./Rules";
import InviteManagers from "./InviteManagers";

const index = () => {
  const [stepper, setStepper] = useState(1);
  const nextStep = () => {
    setStepper(stepper + 1);
  };
  const prevStep = () => {
    setStepper(stepper - 1);
  };
  return (
    <>
      <div className="flex  w-full items-center justify-center p-4 text-3xl font-bold">
        New Tournament
      </div>
      <div className="flex h-full w-full items-center justify-center">
        {stepper === 1 && <Format />}
        {stepper === 2 && <Schedule />}
        {stepper === 3 && <Rules />}
        {stepper === 4 && <InviteManagers />}
      </div>
    </>
  );
};

export default index;
