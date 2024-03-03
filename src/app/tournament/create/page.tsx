"use client";
import React, { useState } from "react";
import Format from "./Format";
import Schedule from "./Schedule";
import Rules from "./Rules";
import InviteManagers from "./InviteManagers";

const index = () => {
  const steps = [
    { label: "Format" },
    { label: "Schedule" },
    { label: "Rules" },
    { label: "Invite Managers" },
  ];
  const [stepper, setStepper] = useState(4);
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
      <div className="flex items-center justify-center">
        <div className="w-1/4">
          <div className="mb-4 flex">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex-1 text-sm ${
                  stepper > index + 1 ? "text-green-500" : "text-gray-500"
                }`}
              >
                <div className="text-center">{step.label}</div>
                {index < steps.length - 1 && (
                  <div className="bg-gray-300 my-1 h-1">
                    <div
                      className={`absolute bottom-0 left-0 h-1 bg-green-500 ${
                        stepper > index + 1 ? "w-full" : "w-0"
                      } transition-width duration-500 ease-in-out`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex  flex-col items-center justify-center space-y-6">
        {stepper === 1 && <Format onNextStep={nextStep} />}
        {stepper === 2 && <Schedule onNextStep={nextStep} />}
        {stepper === 3 && <Rules onNextStep={nextStep} />}
        {stepper === 4 && <InviteManagers onNextStep={nextStep} />}
        {stepper > 1 && (
          <div className="flex w-1/3 justify-between">
            <button
              onClick={prevStep}
              className="h-12 w-20 rounded-md bg-green-500 font-semibold text-white"
            >
              Previous
            </button>
            {stepper < 4 && (
              <button
                onClick={nextStep}
                className="h-12 w-20 rounded-md bg-green-500 font-semibold text-white"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default index;
