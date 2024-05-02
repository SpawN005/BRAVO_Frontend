"use client";
import React, { useState } from "react";
import Format from "./Format";
import Schedule from "./Schedule";
import Rules from "./Rules";
import InviteManagers from "./InviteManagers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

import touramentsService from "@/services/tournament/tournamentsService";

const Index = () => {
  const steps = [
    { label: "Format" },
    { label: "Schedule" },
    { label: "Rules" },
    { label: "Invite Managers" },
  ];
  const [solde, setSolde] = useState(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [stepper, setStepper] = useState(1);
  const router = useRouter();

  const nextStep = () => {
    setStepper((stepper) => stepper + 1);
    setIsNextDisabled(true);
  };
  const prevStep = () => {
    setStepper((stepper) => stepper - 1);
    setIsNextDisabled(false);
  };

  useEffect(() => {
    const fetchUserSolde = async () => {
      try {
        const userId = localStorage.getItem("userId");

        console.log(userId);

        const response = await axios.get(
          `https://bravo-backend.onrender.com/users/${userId}`,
        );
        console.log("User data:", response.data.data.abonnement); // Log the abonnement object
        const status = response.data.data.abonnement.status;
        setStatus(status);
        console.log("Stat:", status);

        if (userId) {
          const userSolde = await touramentsService.getsolde(userId);
          setSolde(userSolde);
          console.log("Solde:", userSolde);

          // Redirect if solde is 0

          if (status !== "active" && userSolde.solde === 0) {
            router.push("/dashboard");
          }
        }
      } catch (error) {
        console.error("Error fetching user solde:", error.message);
      }
    };

    fetchUserSolde();
  }, [router]);

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
