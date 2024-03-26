import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import { useTournamentStore } from "../../store/zustand";
import FormInput from "@/components/DefaultInput/FormInput";

interface ScheduleProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}

const Schedule: React.FC<ScheduleProps> = ({ onNextStep, onPrevStep }) => {
  const { updateTournament, tournament } = useTournamentStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<typeof tournament>();

  const onSubmit = (data: any) => {
    updateTournament(data);

    onNextStep();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-auto w-1/4 flex-col justify-between space-y-2 rounded-lg border border-slate-300 p-6"
    >
      <h1 className="text-3xl font-bold text-black">Schedule Tournament</h1>
      <p className="mb-2">Choose a date and a location for your tournament.</p>
      <FormInput
        label="Name"
        type="text"
        {...register("name", { required: "name is required" })}
      />
      <DatePickerOne
        {...register("startDate", {
          required: "Please enter your date.",
        })}
      />
      <DatePickerOne
        {...register("endDate", {
          required: "Please enter your date.",
        })}
      />
      <FormInput
        label="Location"
        type="text"
        {...register("location", { required: "Location is required" })}
      />
      {errors.startDate && (
        <p className="mt-2	text-[#b91c1c] ">{errors.startDate.message}</p>
      )}
      {errors.location && (
        <p className="mt-2 text-[#b91c1c]	">{errors.location.message}</p>
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

export default Schedule;
