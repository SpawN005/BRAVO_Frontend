"use client";
import React, { useState } from "react";
import Format from "./Format";
import Schedule from "./Schedule";
import Rules from "./Rules";
import InviteManagers from "./InviteManagers";

const Index = () => {
  const steps = [
    { label: "Format" },
    { label: "Schedule" },
    { label: "Rules" },
    { label: "Invite Managers" },
  ];
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [stepper, setStepper] = useState(1);
  const nextStep = () => {
    setStepper((stepper) => stepper + 1);
    setIsNextDisabled(true);
  };
  const prevStep = () => {
    setStepper((stepper) => stepper - 1);
    setIsNextDisabled(false);
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
                  stepper > index ? "text-green-500" : "text-gray-500"
                }`}
              >
                <div className="cursor-pointer text-center">{step.label}</div>
                {index < steps.length && (
                  <div className="my-1 h-1">
                    <div
                      className={`absolute bottom-0 left-0 h-1 bg-green-500 ${
                        stepper > index ? "w-full" : "w-0"
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
        {stepper === 1 && (
          <Format onNextStep={nextStep} onPrevStep={prevStep} />
        )}

        {stepper === 2 && (
          <Schedule onNextStep={nextStep} onPrevStep={prevStep} />
        )}
        {stepper === 3 && <Rules onNextStep={nextStep} onPrevStep={prevStep} />}
        {stepper === 4 && (
          <InviteManagers onNextStep={nextStep} onPrevStep={prevStep} />
        )}
      </div>
    </>
  );
};

export default Index;
