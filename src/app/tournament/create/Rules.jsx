import { useTournamentStore } from "@/app/store/zustand";
import FormInput from "@/components/DefaultInput/FormInput";
import Checkbox from "@/components/Checkboxes/CheckboxFour";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const Rules = ({ onNextStep, onPrevStep }) => {
  const { updateTournament, tournament } = useTournamentStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    updateTournament(data);

    onNextStep();
  };

  useEffect(() => {
    // Populate form with initial values from store
    Object.keys(tournament).forEach((key) => {
      setValue(key, tournament[key]);
    });
  }, [tournament, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-auto w-auto flex-col justify-between space-y-4 rounded-lg border border-slate-400 p-7"
    >
      <h1 className="text-2xl font-bold text-black">Teams</h1>
      <div className="flex flex-row">
        <div className="flex flex-col space-y-2">
          <FormInput
            label="Number of Teams"
            type="number"
            placeholder="Placeholder"
            {...register("rules.nbTeams", {
              required: "nbTeams is required",

              pattern: {
                value: /^[1-9]\d*$/,
                message: "Please enter a valid number of teams.",
              },
              valueAsNumber: true,
            })}
          />
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setValue("rules.nbTeams", 4)}
              className="rounded-full border px-1"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => setValue("rules.nbTeams", 8)}
              className="rounded-full border px-1"
            >
              8
            </button>
            <button
              type="button"
              onClick={() => setValue("rules.nbTeams", 16)}
              className="rounded-full border px-1"
            >
              16
            </button>
          </div>
        </div>
        {/* <div className="flex flex-col space-y-2">
          <FormInput
            label="Number Player per Team"
            type="number"
            placeholder="Placeholder"
            {...register("rules.nbPlayerPerTeam", {
              required: "nbPlayerPerTeam is required",
              pattern: {
                value: /^[1-9]\d*$/,
                message: "Please enter a valid number of players.",
              },
              valueAsNumber: true,
            })}
          />
          <div className="flex space-x-2">
            <button
              type="button"
              className="rounded-full border px-1"
              onClick={() => setValue("rules.nbPlayerPerTeam", 4)}
            >
              4
            </button>
            <button
              type="button"
              className="rounded-full border px-1"
              onClick={() => setValue("rules.nbPlayerPerTeam", 8)}
            >
              8
            </button>
          </div>
        </div> */}
        {tournament.rules.type === "GROUP_KNOCKOUT" ? (
          <FormInput
            label="Team per pool"
            type="number"
            placeholder="Placeholder"
            {...register("rules.teamsPerPool", {
              required: "teamsPerPool is required",
              pattern: {
                value: /^[1-9]\d*$/,
                message: "Please enter a valid number of players.",
              },
              valueAsNumber: true,
            })}
          />
        ) : (
          ""
        )}
        {/* <div className="flex flex-col space-y-2">
          <p>Qualified Teams</p>
          <input
            type="number"
            placeholder="Placeholder"
            {...register("qualifiedTeams", {
              required: "qualifiedTeams is required",
              pattern: {
                value: /^[1-9]\d*$/,
                message: "Please enter a valid number of teams.",
              },
              valueAsNumber: true,
            })}
          />
          <div className="flex space-x-2">
            <button
              type="button"
              className="rounded-full border px-1"
              onClick={() => setValue("qualifiedTeams", 2)}
            >
              2
            </button>
            <button
              type="button"
              className="rounded-full border px-1"
              onClick={() => setValue("qualifiedTeams", 3)}
            >
              3
            </button>
          </div>
        </div> */}
      </div>
      {tournament.rules.type === "GROUP_KNOCKOUT" ||
      tournament.rules.type === "GROUP" ? (
        <>
          {" "}
          <p className="w-full border-b border-slate-400 text-xl font-bold text-black">
            Points Calculations
          </p>
          <div className="flex flex-row">
            <div>
              {" "}
              <p>Points per win</p>
              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-400 active:border-green-400 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="number"
                placeholder="Placeholder"
                {...register("rules.pointsPerWin", {
                  required: "pointsPerWin is required",
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: "Please enter a valid number of points.",
                  },
                  valueAsNumber: true,
                })}
              />
            </div>
            <div>
              {" "}
              <p>Points per draw</p>
              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-400 active:border-green-400 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="number"
                placeholder="Placeholder"
                {...register("rules.pointsPerDraw", {
                  required: "pointsPerDraw is required",
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: "Please enter a valid number of players.",
                  },
                  valueAsNumber: true,
                })}
              />
            </div>
            <div>
              {" "}
              <p>Points per loss</p>
              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-400 active:border-green-400 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="number"
                placeholder="Placeholder"
                {...register("rules.pointsPerLoss", {
                  required: "pointsPerLoss is required",
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: "Please enter a valid number of players.",
                  },
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          <p className="w-full border-b border-slate-400 text-xl font-bold text-black">
            Tie Breaking rules
          </p>
          <div className="row flex justify-around ">
            <div className="space-y-2">
              {" "}
              <Checkbox
                value="HTH"
                label="Head to Head"
                {...register("rules.tieBreakingRules")}
              />
              <Checkbox
                value="NOP"
                label="Numbers Of Points"
                {...register("rules.tieBreakingRules")}
              />
              <Checkbox
                label="Goal Difference"
                value="GD"
                {...register("rules.tieBreakingRules")}
              />
            </div>
            <div className="space-y-2">
              {" "}
              <Checkbox
                label="Goals Scored"
                value="GS"
                {...register("rules.tieBreakingRules")}
              />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="flex w-full justify-between">
        <button
          onClick={onPrevStep}
          className="mt-2 h-12 w-20 rounded-md bg-green-500 font-semibold text-white"
        >
          Previous
        </button>
        <button
          type="submit"
          className={`mt-2 h-12 w-20 rounded-md font-semibold text-white transition-colors delay-150 duration-300 ease-in-out ${
            isValid ? "bg-green-500" : "bg-neutral-400"
          }`}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Rules;
