import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import { useTournamentStore } from "../../store/zustand";
import FormInput from "@/components/DefaultInput/FormInput";
import axios from "axios";

interface ScheduleProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}

const Schedule: React.FC<ScheduleProps> = ({ onNextStep, onPrevStep }) => {
  const { updateTournament, tournament } = useTournamentStore();
  const [startDate, setStartDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<typeof tournament>();

  const startDateValidation = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(date);

    console.log(inputDate);
    return inputDate >= today || "Start date cannot be before today";
  };

  // Custom validation for end date
  const endDateValidation = (date) => {
    const endDate = new Date(date);
    console.log(startDate);
    if (startDate) {
      const startDateObj = new Date(startDate);
      console.log(endDate);
      if (endDate < startDateObj) {
        // Return an error message if the end date is earlier than the start date
        return "End date cannot be before start date";
      }
    }
    return true;
  };
  const onSubmit = async (data: any) => {
    const form = new FormData();
    console.log(data.logo);
    form.append("file", data.logo[0]);
    form.append("upload_preset", "khalil");

    const result = await axios.post(
      "https://api.cloudinary.com/v1_1/dy4wwv7k4/upload",
      form,
    );
    data.logo = result.data.secure_url;

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
        {...register("name", {
          required: "name is required",
        })}
      />
      <DatePickerOne
        {...register("startDate", {
          required: "Please enter your date.",
          validate: startDateValidation,
          onChange: (e) => {
            setStartDate(e.target.value);
          },
        })}
      />
      <DatePickerOne
        {...register("endDate", {
          required: "Please enter your date.",
          validate: endDateValidation,
        })}
      />
      <div>
        <label className="mb-3 block text-sm font-bold text-slate-700 dark:text-white">
          Tournament Logo
        </label>
        <input
          type="file"
          className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          {...register("logo", { required: "logo is required" })}
        />
      </div>
      <FormInput
        label="Location"
        type="text"
        {...register("location", { required: "Location is required" })}
      />
      {errors.startDate && (
        <p className="mt-2	text-[#b91c1c] ">{errors.startDate.message}</p>
      )}
      {errors.endDate && (
        <p className="mt-2 text-[#b91c1c]">{errors.endDate.message}</p>
      )}
      {errors.location && (
        <p className="mt-2 text-[#b91c1c]	">{errors.location.message}</p>
      )}
      {errors.logo && (
        <p className="mt-2 text-[#b91c1c]	">{errors.logo.message}</p>
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
